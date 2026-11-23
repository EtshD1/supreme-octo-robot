"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logIn() {
  (await cookies()).set("learn-admin", "yes", { path: "/" });
  redirect("/learn/proxy/admin");
}

export async function logOut() {
  (await cookies()).delete("learn-admin");
  redirect("/learn/proxy");
}
