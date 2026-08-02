"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../../../lib/supabase";

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
    
    const bannerUrl = formData.get("bannerUrl") as string;
    const thumbnailUrl = formData.get("thumbnailUrl") as string;
    const galleryDataStr = formData.get("galleryData") as string;

    if (!bannerUrl || !thumbnailUrl) {
      throw new Error("Missing required media URLs from payload");
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

    if (galleryDataStr) {
      const galleryItems = JSON.parse(galleryDataStr);
      if (galleryItems.length > 0) {
        const mediaInserts = galleryItems.map((item: any, index: number) => ({
          work_id: workData.id,
          image_url: item.url,
          title: item.name,
          display_order: index + 1
        }));

        const { error: mediaError } = await supabase.from("work_media").insert(mediaInserts);
        
        if (mediaError) {
          throw new Error(mediaError.message);
        }
      }
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/works");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to process work addition" };
  }
}

export async function updateWork(formData: FormData) {
  try {
    const id = Number(formData.get("id"));
    
    if (!id) {
      throw new Error("Invalid project ID provided");
    }

    const slug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    const clientName = formData.get("clientName") as string;
    const clientType = formData.get("clientType") as string;
    const services = formData.get("services") as string;
    const brief = formData.get("brief") as string;
    const bigIdea = formData.get("bigIdea") as string;
    const result = formData.get("result") as string;
    const pill = formData.get("pill") as string;
    
    const bannerUrl = formData.get("bannerUrl") as string | null;
    const thumbnailUrl = formData.get("thumbnailUrl") as string | null;
    const galleryDataStr = formData.get("galleryData") as string | null;
    
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

    if (bannerUrl) updateData.banner_url = bannerUrl;
    if (thumbnailUrl) updateData.thumbnail_url = thumbnailUrl;

    const { error: updateError } = await supabase.from("works").update(updateData).eq("id", id);

    if (updateError) {
      throw new Error(updateError.message);
    }

    if (galleryDataStr) {
      const galleryItems = JSON.parse(galleryDataStr);
      if (galleryItems.length > 0) {
        const mediaInserts = galleryItems.map((item: any, index: number) => ({
          work_id: id,
          image_url: item.url,
          title: item.name,
          display_order: index + 1
        }));

        const { error: mediaError } = await supabase.from("work_media").insert(mediaInserts);
        
        if (mediaError) {
          throw new Error(mediaError.message);
        }
      }
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/works");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to process work update" };
  }
}

export async function deleteWork(id: number) {
  try {
    if (!id) {
      throw new Error("Invalid project ID provided for deletion");
    }

    const { error: mediaError } = await supabase.from("work_media").delete().eq("work_id", id);
    if (mediaError) {
      throw new Error(mediaError.message);
    }

    const { error: workError } = await supabase.from("works").delete().eq("id", id);
    if (workError) {
      throw new Error(workError.message);
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/works");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to process work deletion" };
  }
}