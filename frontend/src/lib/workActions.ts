"use server";

import { supabase } from "./supabase";

export async function fetchWorksPagination(page: number, limit: number = 8) {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from("works")
      .select("id, title, slug, thumbnail_url, banner_url, client_name")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      throw new Error(error.message);
    }

    return {
      data: data || [],
      error: null,
      hasMore: data?.length === limit,
    };
  } catch (err: any) {
    return {
      data: [],
      error: err.message || "An error occurred while fetching works.",
      hasMore: false,
    };
  }
}