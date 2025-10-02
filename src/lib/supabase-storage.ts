import { createClient } from "@supabase/supabase-js";
import { env } from "~/env";

// Supabase client for storage operations
// Use fallback values for build-time (will be replaced at runtime in production)
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key";
const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY ?? "placeholder-service-key";

// Log environment variable status on initialization
console.log("Supabase storage initialization:", {
  urlFromEnv: !!env.NEXT_PUBLIC_SUPABASE_URL,
  anonKeyFromEnv: !!env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  serviceKeyFromEnv: !!env.SUPABASE_SERVICE_ROLE_KEY,
  usingPlaceholderUrl: supabaseUrl === "https://placeholder.supabase.co",
  usingPlaceholderServiceKey: supabaseServiceRoleKey === "placeholder-service-key",
});

// Client-side Supabase client (for public operations)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client with service role key
// This bypasses RLS, which is OK because we're doing auth checks in NextAuth
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

// Storage bucket name for images
export const STORAGE_BUCKET = "event-project-images";

/**
 * Upload file to Supabase Storage (server-side only)
 * Uses service role key which bypasses RLS - auth is handled by NextAuth
 * @param file File to upload
 * @param path Storage path (e.g., 'events/event-id/filename.jpg')
 * @returns Public URL of uploaded file
 */
export async function uploadFileToSupabase(
  file: File,
  path: string,
): Promise<{ url: string; path: string }> {
  // Log configuration (mask sensitive data)
  console.log("Supabase config:", {
    url: supabaseUrl,
    serviceKeyExists: !!supabaseServiceRoleKey,
    serviceKeyIsPlaceholder: supabaseServiceRoleKey === "placeholder-service-key",
    serviceKeyLength: supabaseServiceRoleKey?.length,
    bucket: STORAGE_BUCKET,
  });

  // Convert File to ArrayBuffer for server-side upload
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  console.log("About to upload to Supabase:", {
    path,
    bufferSize: buffer.length,
    contentType: file.type,
  });

  const { data, error} = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Supabase upload error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    throw new Error(`Upload failed: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from(STORAGE_BUCKET).getPublicUrl(data.path);

  return {
    url: publicUrl,
    path: data.path,
  };
}

/**
 * Delete file from Supabase Storage (server-side only)
 * Uses service role key which bypasses RLS - auth is handled by NextAuth
 * @param path Storage path to delete
 */
export async function deleteFileFromSupabase(path: string): Promise<void> {
  const { error } = await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([path]);

  if (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }
}

/**
 * Generate unique filename with timestamp
 * @param originalName Original filename
 * @returns Unique filename
 */
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop();
  const nameWithoutExt = originalName.replace(`.${extension}`, "");
  const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, "-");

  return `${timestamp}-${randomString}-${sanitizedName}.${extension}`;
}
