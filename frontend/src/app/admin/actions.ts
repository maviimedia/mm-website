"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { supabase } from "../../lib/supabase";

export async function loginAdmin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  const { data: adminList } = await supabase
    .from("admins")
    .select("*")
    .eq("username", username);
    
  const admin = adminList?.[0];

  if (!admin) {
    return { error: "Invalid credentials" };
  }

  const dbPasswordHash = admin.password_hash || admin.passwordHash;

  const isValid = await bcrypt.compare(password, dbPasswordHash);
  if (!isValid) {
    return { error: "Invalid credentials" };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", admin.id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  redirect("/admin/dashboard");
}