import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env } from "~/env";

// Storage bucket name for images
export const STORAGE_BUCKET = "event-project-images";

// Lazy-initialized clients to avoid creating them during build
let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

// Client-side Supabase client (for public operations)
export const supabase = new Proxy({} as SupabaseClient, {
  get: (target, prop) => {
    if (!_supabase) {
      const url = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
      _supabase = createClient(url, key);
    }
    return (_supabase as any)[prop];
  }
});

// Server-side Supabase client with service role key
// This bypasses RLS, which is OK because we're doing auth checks in NextAuth
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get: (target, prop) => {
    if (!_supabaseAdmin) {
      const url = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const key = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!;
      _supabaseAdmin = createClient(url, key, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
    }
    return (_supabaseAdmin as any)[prop];
  }
});

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
  console.log("Supabase upload attempt:", {
    path,
    fileSize: file.size,
    fileType: file.type,
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

  let data, error;
  
  try {
    const result = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(path, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });
    data = result.data;
    error = result.error;
  } catch (uploadError) {
    console.error("Supabase upload threw exception:", {
      error: uploadError,
      message: uploadError instanceof Error ? uploadError.message : String(uploadError),
      stack: uploadError instanceof Error ? uploadError.stack : undefined,
      cause: uploadError instanceof Error ? uploadError.cause : undefined,
    });
    throw uploadError;
  }

  if (error) {
    console.error("Supabase upload error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
      statusCode: (error as any).statusCode,
      error: error,
    });
    throw new Error(`Upload failed: ${error.message}`);
  }

  if (!data) {
    throw new Error("Upload succeeded but no data returned");
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
