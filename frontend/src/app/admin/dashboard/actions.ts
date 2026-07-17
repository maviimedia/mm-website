"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../../../lib/supabase";

async function uploadFileToSupabase(file: File | null) {
  if (!file || file.size === 0) {
    return null;
  }
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  
  const { error } = await supabase.storage.from('portfolio-media').upload(fileName, file);
    
  if (error) {
    throw new Error(error.message);
  }
  
  const { data } = supabase.storage.from('portfolio-media').getPublicUrl(fileName);
    
  return data.publicUrl;
}

export async function addWork(formData: FormData) {
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const clientName = formData.get("clientName") as string;
  const clientType = formData.get("clientType") as string;
  const services = formData.get("services") as string;
  const brief = formData.get("brief") as string;
  const bigIdea = formData.get("bigIdea") as string;
  const result = formData.get("result") as string;
  const pill = formData.get("pill") as string;

  const bannerFile = formData.get("bannerFile") as File | null;
  const thumbnailFile = formData.get("thumbnailFile") as File | null;
  const galleryFiles = formData.getAll("galleryFiles") as File[];

  const bannerUrl = await uploadFileToSupabase(bannerFile);
  const thumbnailUrl = await uploadFileToSupabase(thumbnailFile);

  if (!bannerUrl) {
    throw new Error("Banner image is required");
  }

  const { data: workData, error: workError } = await supabase.from("works").insert([{
    slug,
    title,
    client_name: clientName,
    client_type: clientType,
    services,
    brief,
    big_idea: bigIdea,
    result,
    banner_url: bannerUrl,
    thumbnail_url: thumbnailUrl,
    pill
  }]).select("id").single();

  if (workError) {
    throw new Error(workError.message);
  }

  const workId = workData.id;

  let displayOrder = 1;
  for (const file of galleryFiles) {
    if (file.size > 0) {
      const fileUrl = await uploadFileToSupabase(file);
      if (fileUrl) {
        const { error: mediaError } = await supabase.from("work_media").insert([{
          work_id: workId,
          image_url: fileUrl,
          title: file.name,
          display_order: displayOrder
        }]);
        
        if (mediaError) {
          throw new Error(mediaError.message);
        }
        displayOrder++;
      }
    }
  }

  revalidatePath("/admin/dashboard");
}

export async function updateWork(formData: FormData) {
  const id = Number(formData.get("id"));
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const clientName = formData.get("clientName") as string;
  const clientType = formData.get("clientType") as string;
  const services = formData.get("services") as string;
  const brief = formData.get("brief") as string;
  const bigIdea = formData.get("bigIdea") as string;
  const result = formData.get("result") as string;
  const pill = formData.get("pill") as string;
  
  const bannerFile = formData.get("bannerFile") as File | null;
  const thumbnailFile = formData.get("thumbnailFile") as File | null;
  const galleryFiles = formData.getAll("galleryFiles") as File[];
  
  const updateData: Record<string, any> = {
    slug,
    title,
    client_name: clientName,
    client_type: clientType,
    services,
    brief,
    big_idea: bigIdea,
    result,
    pill
  };

  if (bannerFile && bannerFile.size > 0) {
    const bannerUrl = await uploadFileToSupabase(bannerFile);
    if (bannerUrl) {
      updateData.banner_url = bannerUrl;
    }
  }

  if (thumbnailFile && thumbnailFile.size > 0) {
    const thumbnailUrl = await uploadFileToSupabase(thumbnailFile);
    if (thumbnailUrl) {
      updateData.thumbnail_url = thumbnailUrl;
    }
  }

  const { error: updateError } = await supabase.from("works").update(updateData).eq("id", id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  if (galleryFiles.length > 0 && galleryFiles[0].size > 0) {
    let displayOrder = 1;
    for (const file of galleryFiles) {
      if (file.size > 0) {
        const fileUrl = await uploadFileToSupabase(file);
        if (fileUrl) {
          const { error: mediaError } = await supabase.from("work_media").insert([{
            work_id: id,
            image_url: fileUrl,
            title: file.name,
            display_order: displayOrder
          }]);
          
          if (mediaError) {
            throw new Error(mediaError.message);
          }
          displayOrder++;
        }
      }
    }
  }

  revalidatePath("/admin/dashboard");
}

export async function deleteWork(id: number) {
  const { error: mediaError } = await supabase.from("work_media").delete().eq("work_id", id);
  if (mediaError) {
    throw new Error(mediaError.message);
  }

  const { error: workError } = await supabase.from("works").delete().eq("id", id);
  if (workError) {
    throw new Error(workError.message);
  }

  revalidatePath("/admin/dashboard");
}