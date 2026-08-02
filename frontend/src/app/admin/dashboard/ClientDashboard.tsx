"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { addWork, updateWork, deleteWork } from "./actions";
import { supabase } from "../../../lib/supabase";

interface Work {
  id: number;
  slug: string;
  title: string;
  clientName: string;
  clientType: string;
  services: string;
  brief: string;
  bigIdea: string;
  result: string;
  bannerUrl: string | null;
  thumbnailUrl: string | null;
  pill: string;
}

async function uploadFileClientSide(file: File) {
  if (!file || file.size === 0) return null;
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  
  const { error } = await supabase.storage.from('portfolio-media').upload(fileName, file);
  
  if (error) {
    throw new Error(error.message);
  }
  
  const { data } = supabase.storage.from('portfolio-media').getPublicUrl(fileName);
  return data.publicUrl;
}

export default function ClientDashboard({ initialWorks, fetchError }: { initialWorks: Work[], fetchError?: string | null }) {
  const [activeTab, setActiveTab] = useState<"manage" | "form">("manage");
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingState, setLoadingState] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(fetchError || null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "title-asc" | "title-desc">("newest");
  const [filterType, setFilterType] = useState("All");

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const clientTypes = useMemo(() => {
    const types = new Set(initialWorks.map(w => w.clientType));
    return ["All", ...Array.from(types)];
  }, [initialWorks]);

  const filteredAndSortedWorks = useMemo(() => {
    let result = [...initialWorks];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(w => w.title.toLowerCase().includes(q) || w.clientName.toLowerCase().includes(q));
    }

    if (filterType !== "All") {
      result = result.filter(w => w.clientType === filterType);
    }

    if (sortOrder === "title-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "title-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [initialWorks, searchQuery, filterType, sortOrder]);

  const clearMessages = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    if (files.length > 0) {
      setGalleryFiles(prev => [...prev, ...files]);
    }
  }, []);

  const handleGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setGalleryFiles(prev => [...prev, ...files]);
    }
  };

  const removeGalleryFile = (indexToRemove: number) => {
    setGalleryFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const resetFormFiles = () => {
    setThumbnailFile(null);
    setBannerFile(null);
    setGalleryFiles([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setLoadingState("Initializing system...");
    clearMessages();
    
    try {
      const rawFormData = new FormData(e.currentTarget);
      const processedData = new FormData();
      const textFields = ["title", "slug", "pill", "clientName", "clientType", "services", "brief", "bigIdea", "result"];
      
      textFields.forEach(field => {
        const val = rawFormData.get(field);
        if (val) processedData.append(field, val as string);
      });

      if (editingWork) {
        processedData.append("id", editingWork.id.toString());
      }

      // 1. Upload Thumbnail (Sequential Step 1)
      if (thumbnailFile) {
        setLoadingState("Uploading thumbnail asset...");
        try {
          const url = await uploadFileClientSide(thumbnailFile);
          if (url) processedData.append("thumbnailUrl", url);
        } catch (err: any) {
          throw new Error(`Thumbnail Upload Failed: ${err.message}`);
        }
      } else if (!editingWork) {
        throw new Error("Validation Error: Thumbnail image is strictly required.");
      }

      // 2. Upload Banner (Sequential Step 2)
      if (bannerFile) {
        setLoadingState("Uploading hero banner asset...");
        try {
          const url = await uploadFileClientSide(bannerFile);
          if (url) processedData.append("bannerUrl", url);
        } catch (err: any) {
          throw new Error(`Banner Upload Failed: ${err.message}`);
        }
      } else if (!editingWork) {
        throw new Error("Validation Error: Banner image is strictly required.");
      }

      // 3. Upload Gallery Files (Sequential Loop, NOT Promise.all)
      if (galleryFiles.length > 0) {
        const uploadedGallery = [];
        for (let i = 0; i < galleryFiles.length; i++) {
          const file = galleryFiles[i];
          setLoadingState(`Uploading gallery asset ${i + 1} of ${galleryFiles.length}...`);
          try {
            const url = await uploadFileClientSide(file);
            if (url) {
              uploadedGallery.push({ url, name: file.name });
            }
          } catch (err: any) {
            throw new Error(`Gallery Upload Failed on file "${file.name}": ${err.message}`);
          }
        }
        processedData.append("galleryData", JSON.stringify(uploadedGallery));
      }

      // 4. Server Action Execution
      setLoadingState("Syncing data with Supabase Database...");
      let result;
      try {
        if (editingWork) {
          result = await updateWork(processedData);
        } else {
          result = await addWork(processedData);
        }
      } catch (err: any) {
        throw new Error(`Database Sync Failed: ${err.message}`);
      }

      if (result?.error) {
        throw new Error(`Server Rejected Action: ${result.error}`);
      }

      // 5. Success Check
      setSuccessMsg(editingWork ? "Configuration successfully updated." : "New project successfully deployed.");
      setActiveTab("manage");
      setEditingWork(null);
      resetFormFiles();
      formRef.current?.reset();

    } catch (error: any) {
      // Robust UI Error Catcher
      console.error("Submission Process Halted:", error);
      setErrorMsg(error.message || "An unknown critical error occurred during execution.");
    } finally {
      setIsSubmitting(false);
      setLoadingState("");
    }
  };

  const handleEdit = (work: Work) => {
    setEditingWork(work);
    resetFormFiles();
    setActiveTab("form");
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Confirm permanent deletion of this project from the database?")) {
      clearMessages();
      try {
        const result = await deleteWork(id);
        if (result?.error) {
          throw new Error(result.error);
        }
        setSuccessMsg("Project record erased successfully.");
      } catch (error: any) {
        setErrorMsg(error.message || "Deletion failed due to a system error.");
      }
    }
  };

  const resetForm = () => {
    clearMessages();
    setEditingWork(null);
    resetFormFiles();
    setActiveTab("form");
    formRef.current?.reset();
  };

  const handleLogout = () => {
    window.location.href = "/admin/login";
  };

  return (
    <div style={{ backgroundColor: "var(--page-bg)", color: "var(--page-ink)" }} className="min-h-[100dvh] flex flex-col md:flex-row">
      
      {/* Strict UI Error Alert System - Fixed to top right */}
      {(errorMsg || successMsg) && (
        <div className="fixed top-6 right-6 z-[9999] w-full max-w-sm flex flex-col gap-3">
          {errorMsg && (
            <div className="bg-[#1a0505] border-l-4 border-[#c5151b] text-white p-5 shadow-2xl flex justify-between items-start">
              <div className="pr-4">
                <h4 className="text-[#c5151b] font-bold text-[10px] uppercase tracking-widest mb-2">Process Halted</h4>
                <p style={{ fontFamily: "var(--ff-body)" }} className="text-[13px] leading-relaxed break-words">{errorMsg}</p>
              </div>
              <button type="button" onClick={() => setErrorMsg(null)} className="text-white/40 hover:text-white flex-shrink-0 text-lg leading-none">&times;</button>
            </div>
          )}
          {successMsg && (
            <div className="bg-[#051a0a] border-l-4 border-green-500 text-white p-5 shadow-2xl flex justify-between items-start">
              <div className="pr-4">
                <h4 className="text-green-500 font-bold text-[10px] uppercase tracking-widest mb-2">Process Complete</h4>
                <p style={{ fontFamily: "var(--ff-body)" }} className="text-[13px] leading-relaxed break-words">{successMsg}</p>
              </div>
              <button type="button" onClick={() => setSuccessMsg(null)} className="text-white/40 hover:text-white flex-shrink-0 text-lg leading-none">&times;</button>
            </div>
          )}
        </div>
      )}

      <aside className="w-full md:w-[280px] shrink-0 border-r border-white/10 p-8 flex flex-col bg-black">
        <div className="mb-16">
          <img src="/assets/Logo-ICON.svg" alt="Maviimedia" className="w-12 mb-8" />
          <p style={{ fontFamily: "var(--ff-body)", color: "var(--pp-muted)" }} className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
            Studio Command
          </p>
          <p style={{ fontFamily: "var(--ff-body)", color: "var(--pp-muted)" }} className="text-xs opacity-70 leading-relaxed">
            Centralized management system for digital assets and publications.
          </p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1">
          <button 
            onClick={() => setActiveTab("manage")}
            style={{ fontFamily: "var(--ff-label)" }}
            className={`text-left text-[11px] uppercase tracking-widest py-3 px-4 transition-colors ${activeTab === "manage" ? "bg-white text-black" : "text-white/50 hover:text-white"}`}
          >
            Manage Works
          </button>
          <button 
            onClick={resetForm}
            style={{ fontFamily: "var(--ff-label)" }}
            className={`text-left text-[11px] uppercase tracking-widest py-3 px-4 transition-colors ${activeTab === "form" ? "bg-white text-black" : "text-white/50 hover:text-white"}`}
          >
            Deploy New Work
          </button>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
          <button 
            onClick={handleLogout}
            style={{ fontFamily: "var(--ff-label)" }}
            className="text-left text-[11px] uppercase tracking-widest py-2 px-4 text-white/40 hover:text-[#c5151b] transition-colors w-full flex items-center gap-3"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            System Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative bg-[#050505]">
        <div className="mavii_wrap py-12 md:py-16 px-6">
          
          {activeTab === "manage" && (
            <div>
              <div className="wrk-header flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div>
                  <h1 style={{ fontFamily: "var(--ff-head)" }} className="text-4xl md:text-5xl mb-6">Database Overview</h1>
                  <div className="flex flex-wrap gap-x-12 gap-y-6">
                    <div>
                      <p className="ci-label text-[10px]">Total Records</p>
                      <p style={{ fontFamily: "var(--ff-head)" }} className="text-3xl mt-1">{initialWorks.length}</p>
                    </div>
                    <div>
                      <p className="ci-label text-[10px]">Client Base</p>
                      <p style={{ fontFamily: "var(--ff-head)" }} className="text-3xl mt-1">{Math.max(0, clientTypes.length - 1)}</p>
                    </div>
                    <div>
                      <p className="ci-label text-[10px]">Node Status</p>
                      <p style={{ fontFamily: "var(--ff-head)" }} className={`text-2xl mt-2 flex items-center gap-3 ${fetchError ? "text-[#c5151b]" : "text-green-500"}`}>
                        <span className="relative flex h-2 w-2">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${fetchError ? "bg-[#c5151b]" : "bg-green-400"}`}></span>
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${fetchError ? "bg-[#c5151b]" : "bg-green-500"}`}></span>
                        </span>
                        {fetchError ? "Degraded" : "Online"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="ci-group mb-0">
                  <label className="ci-label text-[10px]">Search Index</label>
                  <input 
                    type="text" 
                    placeholder="Search query..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ fontFamily: "var(--ff-body)" }}
                    className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors text-sm"
                  />
                </div>

                <div className="ci-group mb-0">
                  <label className="ci-label text-[10px]">Filter Parameter</label>
                  <select 
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{ fontFamily: "var(--ff-body)" }}
                    className="w-full py-3 bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer rounded-none text-sm"
                  >
                    {clientTypes.map(type => (
                      <option key={type} value={type} className="bg-black text-white">{type}</option>
                    ))}
                  </select>
                </div>

                <div className="ci-group mb-0">
                  <label className="ci-label text-[10px]">Sort Order</label>
                  <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    style={{ fontFamily: "var(--ff-body)" }}
                    className="w-full py-3 bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer rounded-none text-sm"
                  >
                    <option value="newest" className="bg-black text-white">Chronological</option>
                    <option value="title-asc" className="bg-black text-white">Alphabetical (A-Z)</option>
                    <option value="title-desc" className="bg-black text-white">Alphabetical (Z-A)</option>
                  </select>
                </div>
              </div>
              
              <div className="wrk-grid">
                {filteredAndSortedWorks.map((work) => (
                  <div key={work.id} className="wrk-item group">
                    <div className="wrk-visual">
                      {work.thumbnailUrl || work.bannerUrl ? (
                        <img src={(work.thumbnailUrl || work.bannerUrl) as string} alt={work.title} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#111] text-white/20 uppercase tracking-widest text-[10px] font-bold">Awaiting Media</div>
                      )}
                      <div className="wrk-overlay">
                        <span className="wrk-title">{work.title}</span>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <button onClick={() => handleEdit(work)} className="ci-pill hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer">Edit</button>
                        <button onClick={() => handleDelete(work.id)} className="ci-pill bg-black text-white border-white/20 hover:bg-[#c5151b] hover:border-[#c5151b] transition-all cursor-pointer">Delete</button>
                      </div>
                    </div>
                    <div className="pt-4 flex flex-col gap-1">
                      <p className="ci-label text-[9px] mb-0">{work.pill}</p>
                      <h3 style={{ fontFamily: "var(--ff-label)" }} className="text-base uppercase tracking-wider text-white">{work.title}</h3>
                      <p style={{ fontFamily: "var(--ff-body)", color: "var(--pp-muted)" }} className="text-xs">{work.clientName} &middot; {work.clientType}</p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAndSortedWorks.length === 0 && (
                <div className="py-24 flex flex-col items-center justify-center text-center border border-white/10 border-dashed">
                  <p style={{ fontFamily: "var(--ff-body)", color: "var(--pp-muted)" }} className="text-xs uppercase tracking-widest mb-6">Zero records match active parameters.</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setFilterType('All');}} 
                    className="ci-pill cursor-pointer"
                  >
                    Reset Parameters
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "form" && (
            <div>
              <div className="wrk-header mb-12">
                <h1 style={{ fontFamily: "var(--ff-head)" }} className="text-4xl md:text-5xl">{editingWork ? "Edit Configuration" : "Deploy Project"}</h1>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="ci-group mb-0">
                    <label className="ci-label">Project Title</label>
                    <input name="title" type="text" defaultValue={editingWork?.title} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors text-sm" placeholder="e.g. Neon Horizon" />
                  </div>
                  <div className="ci-group mb-0">
                    <label className="ci-label">URL Slug</label>
                    <input name="slug" type="text" defaultValue={editingWork?.slug} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors text-sm" placeholder="e.g. neon-horizon" />
                  </div>
                  <div className="ci-group mb-0">
                    <label className="ci-label">Pill Identifier</label>
                    <input name="pill" type="text" defaultValue={editingWork?.pill} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors text-sm" placeholder="e.g. Case Study" />
                  </div>
                  <div className="ci-group mb-0">
                    <label className="ci-label">Client Entity</label>
                    <input name="clientName" type="text" defaultValue={editingWork?.clientName} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors text-sm" placeholder="e.g. Acme Corp" />
                  </div>
                  <div className="ci-group mb-0 md:col-span-2">
                    <label className="ci-label">Industry / Sector</label>
                    <input name="clientType" type="text" defaultValue={editingWork?.clientType} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors text-sm" placeholder="e.g. Tech Startup" />
                  </div>
                  <div className="ci-group mb-0 md:col-span-2">
                    <label className="ci-label">Services Provided</label>
                    <input name="services" type="text" defaultValue={editingWork?.services} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors text-sm" placeholder="e.g. Branding, UI/UX" />
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="ci-group mb-0">
                    <label className="ci-label">Project Brief</label>
                    <textarea name="brief" rows={4} defaultValue={editingWork?.brief} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors resize-y text-sm" placeholder="Define the core objective..."></textarea>
                  </div>
                  <div className="ci-group mb-0">
                    <label className="ci-label">The Big Idea</label>
                    <textarea name="bigIdea" rows={4} defaultValue={editingWork?.bigIdea} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors resize-y text-sm" placeholder="Detail the strategic approach..."></textarea>
                  </div>
                  <div className="ci-group mb-0">
                    <label className="ci-label">Execution Result</label>
                    <textarea name="result" rows={4} defaultValue={editingWork?.result} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors resize-y text-sm" placeholder="Outline the final impact..."></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-10 border-t border-white/10">
                  <div className="ci-group mb-0">
                    <label className="ci-label">Thumbnail Asset</label>
                    <div className="mt-3 relative border border-white/20 p-4 bg-[#111] hover:bg-[#1a1a1a] transition-colors text-center cursor-pointer">
                      <input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <span style={{ fontFamily: "var(--ff-body)" }} className="text-xs text-white/60 uppercase tracking-widest">{thumbnailFile ? thumbnailFile.name : "Select File"}</span>
                    </div>
                    {editingWork?.thumbnailUrl && !thumbnailFile && <p className="text-[10px] uppercase tracking-widest text-white/40 mt-3">Active asset detected in system</p>}
                  </div>

                  <div className="ci-group mb-0">
                    <label className="ci-label">Banner Asset</label>
                    <div className="mt-3 relative border border-white/20 p-4 bg-white text-black hover:bg-white/90 transition-colors text-center cursor-pointer">
                      <input type="file" accept="image/*" onChange={(e) => setBannerFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <span style={{ fontFamily: "var(--ff-label)" }} className="text-xs uppercase tracking-widest font-bold">{bannerFile ? bannerFile.name : "Select File"}</span>
                    </div>
                    {editingWork?.bannerUrl && !bannerFile && <p className="text-[10px] uppercase tracking-widest text-white/40 mt-3">Active asset detected in system</p>}
                  </div>

                  <div className="ci-group mb-0 md:col-span-2">
                    <div className="flex justify-between items-end mb-3">
                      <label className="ci-label mb-0">Gallery Assets</label>
                      <span style={{ fontFamily: "var(--ff-body)" }} className="text-[10px] uppercase tracking-widest text-white/40">{galleryFiles.length} files queued</span>
                    </div>
                    
                    <div 
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative w-full py-12 border border-dashed ${isDragging ? "border-white bg-[#111]" : "border-white/20 bg-transparent"} transition-all flex flex-col items-center justify-center text-center`}
                    >
                      <input type="file" accept="image/*" multiple onChange={handleGallerySelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <span style={{ fontFamily: "var(--ff-body)" }} className="text-xs uppercase tracking-widest text-white/40">Drag files here or click to browse system</span>
                    </div>

                    {galleryFiles.length > 0 && (
                      <div className="mt-6 flex flex-col gap-3">
                        {galleryFiles.map((file, idx) => (
                          <div key={`${file.name}-${idx}`} className="flex items-center justify-between pb-3 border-b border-white/10">
                            <span style={{ fontFamily: "var(--ff-body)" }} className="text-xs text-white/70 truncate mr-4">{file.name}</span>
                            <button type="button" onClick={() => removeGalleryFile(idx)} className="text-[10px] uppercase tracking-widest text-white/30 hover:text-[#c5151b] transition-colors flex-shrink-0">
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-10 flex flex-wrap items-center gap-6 relative">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    style={{ fontFamily: "var(--ff-label)" }}
                    className={`px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors disabled:opacity-50 flex items-center gap-3 ${isSubmitting ? "bg-white/10 text-white" : "bg-[#c5151b] text-white hover:bg-white hover:text-black"}`}
                  >
                    {isSubmitting ? "Executing..." : (editingWork ? "Update Record" : "Deploy Record")}
                  </button>
                  {editingWork && (
                    <button 
                      type="button" 
                      onClick={resetForm}
                      disabled={isSubmitting}
                      style={{ fontFamily: "var(--ff-label)" }}
                      className="px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase text-white bg-transparent border border-white/20 hover:border-white transition-colors disabled:opacity-50"
                    >
                      Abort Edit
                    </button>
                  )}
                  {isSubmitting && loadingState && (
                    <span style={{ fontFamily: "var(--ff-body)" }} className="text-[10px] uppercase tracking-widest text-[#c5151b] animate-pulse font-bold">{loadingState}</span>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}