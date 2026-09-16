"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export interface InquiryInput {
  name: string;
  phone: string;
  project: string;
  email?: string;
}

export async function submitInquiry(payload: InquiryInput) {
  try {
    const { name, phone, project, email } = payload;

    if (!name.trim() || !phone.trim() || !project.trim()) {
      return { error: "Name, phone, and project are required." };
    }

    const { error } = await supabaseAdmin.from("inquiries").insert([
      {
        name: name.trim(),
        phone: phone.trim(),
        project: project.trim(),
        email: email?.trim() || null,
      },
    ]);

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to process inquiry submission." };
  }
}