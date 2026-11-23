"use server";
import { cookies } from "next/headers";

// You can only SET cookies in a Server Action or Route Handler (not while rendering a page).
export async function setTheme(formData: FormData) {
  const theme = String(formData.get("theme"));
  const cookieStore = await cookies();
  cookieStore.set("lesson-theme", theme, { path: "/", maxAge: 60 * 60 * 24 * 30 });
}

export async function clearTheme() {
  (await cookies()).delete("lesson-theme");
}
