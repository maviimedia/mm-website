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
  try {
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
      return { error: "Banner image is required" };
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
      return { error: workError.message };
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
            return { error: mediaError.message };
          }
          displayOrder++;
        }
      }
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/works");
  } catch (error: any) {
    return { error: error.message || "Failed to add work" };
  }
}

export async function updateWork(formData: FormData) {
  try {
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
      return { error: updateError.message };
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
              return { error: mediaError.message };
            }
            displayOrder++;
          }
        }
      }
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/works");
  } catch (error: any) {
    return { error: error.message || "Failed to update work" };
  }
}

export async function deleteWork(id: number) {
  try {
    const { error: mediaError } = await supabase.from("work_media").delete().eq("work_id", id);
    if (mediaError) {
      return { error: mediaError.message };
    }

    const { error: workError } = await supabase.from("works").delete().eq("id", id);
    if (workError) {
      return { error: workError.message };
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/works");
  } catch (error: any) {
    return { error: error.message || "Failed to delete work" };
  }
}