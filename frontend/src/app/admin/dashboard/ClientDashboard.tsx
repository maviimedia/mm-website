"use client";

import { useState, useRef, useMemo } from "react";
import { addWork, updateWork, deleteWork } from "./actions";

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

export default function ClientDashboard({ initialWorks, fetchError }: { initialWorks: Work[], fetchError?: string | null }) {
  const [activeTab, setActiveTab] = useState<"manage" | "form">("manage");
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(fetchError || null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "title-asc" | "title-desc">("newest");
  const [filterType, setFilterType] = useState("All");

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearMessages();
    const formData = new FormData(e.currentTarget);

    try {
      let result;
      if (editingWork) {
        formData.append("id", editingWork.id.toString());
        result = await updateWork(formData);
      } else {
        result = await addWork(formData);
      }

      if (result?.error) {
        throw new Error(result.error);
      }

      setSuccessMsg(editingWork ? "Project successfully updated!" : "Project successfully published!");
      setActiveTab("manage");
      setEditingWork(null);
      formRef.current?.reset();
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Failed to process work");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (work: Work) => {
    setEditingWork(work);
    setActiveTab("form");
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to permanently delete this work?")) {
      clearMessages();
      try {
        const result = await deleteWork(id);
        if (result?.error) {
          setErrorMsg(result.error);
        } else {
          setSuccessMsg("Work successfully deleted!");
        }
      } catch (error) {
        setErrorMsg(error instanceof Error ? error.message : "Failed to delete work");
      }
    }
  };

  const resetForm = () => {
    clearMessages();
    setEditingWork(null);
    setActiveTab("form");
    formRef.current?.reset();
  };

  const handleLogout = () => {
    window.location.href = "/admin/login";
  };

  return (
    <div style={{ backgroundColor: "var(--page-bg)", color: "var(--page-ink)" }} className="min-h-[100dvh] flex flex-col md:flex-row">
      <aside className="w-full md:w-64 lg:w-72 border-r border-white/10 p-6 lg:p-10 flex flex-col">
        <div className="mb-16">
          <img src="/assets/Logo-ICON.svg" alt="Maviimedia Logo" className="w-10 mb-6" />
          <p style={{ fontFamily: "var(--ff-body)", color: "var(--pp-muted)" }} className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
            Studio Panel
          </p>
          <p style={{ fontFamily: "var(--ff-body)", color: "var(--pp-muted)" }} className="text-xs opacity-80">
            Centralized command center for managing digital assets, client works, and studio publications.
          </p>
        </div>
        
        <nav className="flex flex-col gap-4 flex-1">
          <button 
            onClick={() => setActiveTab("manage")}
            style={{ fontFamily: "var(--ff-label)" }}
            className={`text-left text-xs uppercase tracking-widest py-2 transition-colors ${activeTab === "manage" ? "text-white" : "text-white/40 hover:text-white/80"}`}
          >
            Manage Works
          </button>
          <button 
            onClick={resetForm}
            style={{ fontFamily: "var(--ff-label)" }}
            className={`text-left text-xs uppercase tracking-widest py-2 transition-colors ${activeTab === "form" ? "text-white" : "text-white/40 hover:text-white/80"}`}
          >
            Add New Work
          </button>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
          <button 
            onClick={handleLogout}
            style={{ fontFamily: "var(--ff-label)" }}
            className="text-left text-xs uppercase tracking-widest py-2 text-white/40 hover:text-[#c5151b] transition-colors w-full flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Secure Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 lg:p-16 overflow-y-auto relative">
        
        {(errorMsg || successMsg) && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
            {errorMsg && (
              <div className="bg-red-900/90 border border-red-500 text-white px-6 py-4 rounded shadow-lg flex justify-between items-center mb-2">
                <p style={{ fontFamily: "var(--ff-body)" }} className="text-sm">{errorMsg}</p>
                <button onClick={() => setErrorMsg(null)} className="text-white/70 hover:text-white">&times;</button>
              </div>
            )}
            {successMsg && (
              <div className="bg-emerald-900/90 border border-emerald-500 text-white px-6 py-4 rounded shadow-lg flex justify-between items-center mb-2">
                <p style={{ fontFamily: "var(--ff-body)" }} className="text-sm">{successMsg}</p>
                <button onClick={() => setSuccessMsg(null)} className="text-white/70 hover:text-white">&times;</button>
              </div>
            )}
          </div>
        )}

        {activeTab === "manage" && (
          <div className="max-w-[1440px] mx-auto">
            
            <div className="wrk-header flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <div>
                <h1 style={{ fontFamily: "var(--ff-head)" }} className="text-4xl lg:text-5xl mb-8">Studio Overview</h1>
                <div className="flex flex-wrap gap-12">
                  <div>
                    <p className="ci-label">Total Works</p>
                    <p style={{ fontFamily: "var(--ff-head)" }} className="text-4xl mt-1">{initialWorks.length}</p>
                  </div>
                  <div>
                    <p className="ci-label">Total Clients</p>
                    <p style={{ fontFamily: "var(--ff-head)" }} className="text-4xl mt-1">{clientTypes.length - 1}</p>
                  </div>
                  <div>
                    <p className="ci-label">System Status</p>
                    <p style={{ fontFamily: "var(--ff-head)" }} className="text-3xl mt-1 flex items-center gap-3">
                      <span className="flex h-2 w-2 relative mb-1">
                        <span className="animate-ping absolute inline-flex h-full w-full bg-white opacity-40"></span>
                        <span className="relative inline-flex h-2 w-2 bg-white"></span>
                      </span>
                      Active
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-end gap-6 mb-12">
              <div className="w-full md:w-96 ci-group mb-0">
                <label className="ci-label">Search</label>
                <input 
                  type="text" 
                  placeholder="Search works or clients..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ fontFamily: "var(--ff-body)" }}
                  className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="w-full md:w-64 ci-group mb-0">
                <label className="ci-label">Filter Client</label>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  style={{ fontFamily: "var(--ff-body)" }}
                  className="w-full py-3 bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer rounded-none"
                >
                  {clientTypes.map(type => (
                    <option key={type} value={type} className="bg-black text-white">{type}</option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-64 ci-group mb-0">
                <label className="ci-label">Sort By</label>
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  style={{ fontFamily: "var(--ff-body)" }}
                  className="w-full py-3 bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer rounded-none"
                >
                  <option value="newest" className="bg-black text-white">Newest First</option>
                  <option value="title-asc" className="bg-black text-white">Title (A-Z)</option>
                  <option value="title-desc" className="bg-black text-white">Title (Z-A)</option>
                </select>
              </div>
            </div>
            
            <div className="wrk-grid">
              {filteredAndSortedWorks.map((work) => (
                <div key={work.id} className="wrk-item group">
                  <div className="wrk-visual bg-[#0a0a0a]">
                    {work.thumbnailUrl || work.bannerUrl ? (
                      <img src={(work.thumbnailUrl || work.bannerUrl) as string} alt={work.title} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 uppercase tracking-widest text-xs font-bold">No Cover</div>
                    )}
                    <div className="wrk-overlay">
                      <span className="wrk-title">{work.title}</span>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button onClick={() => handleEdit(work)} className="ci-pill hover:bg-white hover:text-black transition-colors cursor-pointer">Edit</button>
                      <button onClick={() => handleDelete(work.id)} className="ci-pill bg-black hover:bg-red-600 border-white/20 transition-colors cursor-pointer">Delete</button>
                    </div>
                  </div>
                  <div className="pt-5">
                    <h3 style={{ fontFamily: "var(--ff-label)" }} className="text-xl uppercase tracking-wider mb-1">{work.title}</h3>
                    <p style={{ fontFamily: "var(--ff-body)", color: "var(--pp-muted)" }} className="text-sm">{work.clientName} &middot; {work.clientType}</p>
                  </div>
                </div>
              ))}
              
              {filteredAndSortedWorks.length === 0 && (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                  <p style={{ fontFamily: "var(--ff-body)", color: "var(--pp-muted)" }} className="text-sm uppercase tracking-widest">No works match your current filters.</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setFilterType('All');}} 
                    style={{ fontFamily: "var(--ff-label)" }} 
                    className="mt-4 text-[10px] uppercase tracking-widest text-white border-b border-white hover:text-[#c5151b] hover:border-[#c5151b] pb-1 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "form" && (
          <div className="max-w-4xl">
            <div className="wrk-header mb-12">
              <h1 style={{ fontFamily: "var(--ff-head)" }} className="text-4xl lg:text-5xl">{editingWork ? "Edit Project" : "New Project"}</h1>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="ci-group mb-0">
                  <label className="ci-label">Project Title</label>
                  <input name="title" type="text" defaultValue={editingWork?.title} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors" placeholder="e.g. Neon Horizon" />
                </div>
                <div className="ci-group mb-0">
                  <label className="ci-label">URL Slug</label>
                  <input name="slug" type="text" defaultValue={editingWork?.slug} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors" placeholder="e.g. neon-horizon" />
                </div>
                <div className="ci-group mb-0">
                  <label className="ci-label">Pill Text</label>
                  <input name="pill" type="text" defaultValue={editingWork?.pill} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors" placeholder="e.g. Case Study" />
                </div>
                <div className="ci-group mb-0">
                  <label className="ci-label">Client Name</label>
                  <input name="clientName" type="text" defaultValue={editingWork?.clientName} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors" placeholder="e.g. Acme Corp" />
                </div>
                <div className="ci-group mb-0 md:col-span-2">
                  <label className="ci-label">Client Type</label>
                  <input name="clientType" type="text" defaultValue={editingWork?.clientType} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors" placeholder="e.g. Tech Startup" />
                </div>
              </div>

              <div className="ci-group mb-0">
                <label className="ci-label">Services Provided</label>
                <input name="services" type="text" defaultValue={editingWork?.services} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors" placeholder="e.g. Branding, UI/UX, Web Development" />
              </div>

              <div className="ci-group mb-0">
                <label className="ci-label">The Brief</label>
                <textarea name="brief" rows={3} defaultValue={editingWork?.brief} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors resize-none" placeholder="Describe the initial problem or request..."></textarea>
              </div>

              <div className="ci-group mb-0">
                <label className="ci-label">The Big Idea</label>
                <textarea name="bigIdea" rows={3} defaultValue={editingWork?.bigIdea} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors resize-none" placeholder="Explain the creative approach and execution..."></textarea>
              </div>

              <div className="ci-group mb-0">
                <label className="ci-label">The Result</label>
                <textarea name="result" rows={3} defaultValue={editingWork?.result} required style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors resize-none" placeholder="Share the final impact and metrics..."></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-8 border-t border-white/10">
                <div className="ci-group mb-0">
                  <label className="ci-label">Thumbnail Image</label>
                  <input name="thumbnailFile" type="file" accept="image/*" required={!editingWork} style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 transition-colors cursor-pointer" />
                  {editingWork?.thumbnailUrl && <p className="text-[10px] uppercase tracking-widest text-white/50 mt-2">Active thumbnail present</p>}
                </div>
                <div className="ci-group mb-0">
                  <label className="ci-label">Banner Image</label>
                  <input name="bannerFile" type="file" accept="image/*" required={!editingWork} style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-white file:text-black hover:file:bg-zinc-200 transition-colors cursor-pointer" />
                  {editingWork?.bannerUrl && <p className="text-[10px] uppercase tracking-widest text-white/50 mt-2">Active banner present</p>}
                </div>
                <div className="ci-group mb-0 md:col-span-2">
                  <label className="ci-label">Gallery Images</label>
                  <input name="galleryFiles" type="file" accept="image/*" multiple required={!editingWork} style={{ fontFamily: "var(--ff-body)" }} className="w-full py-3 bg-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 transition-colors cursor-pointer" />
                </div>
              </div>

              <div className="pt-8 flex gap-6">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{ fontFamily: "var(--ff-label)", backgroundColor: "var(--pp-card-red)", color: "var(--page-ink)" }}
                  className="px-10 py-4 text-xs font-bold tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-colors disabled:opacity-50 flex items-center gap-3"
                >
                  {isSubmitting ? "Processing..." : (editingWork ? "Update Project" : "Publish Project")}
                </button>
                {editingWork && (
                  <button 
                    type="button" 
                    onClick={resetForm}
                    style={{ fontFamily: "var(--ff-label)" }}
                    className="px-10 py-4 text-xs font-bold tracking-[0.15em] uppercase text-white bg-transparent border border-white/20 hover:border-white transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}