import { type NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";
import {
  uploadFileToSupabase,
  generateUniqueFilename,
} from "~/lib/supabase-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: NextRequest) {
  try {
    console.log("Upload API called");
    
    // Check authentication
    const session = await auth();
    console.log("Session:", session ? "authenticated" : "not authenticated");
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse form data
    console.log("Parsing form data...");
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const entityType = formData.get("entityType") as string;
    const entityId = formData.get("entityId") as string;
    
    console.log("File:", file?.name, "Size:", file?.size, "Type:", file?.type);
    console.log("Entity:", entityType, "ID:", entityId);

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!entityType || !entityId) {
      return NextResponse.json(
        { error: "Entity type and ID required" },
        { status: 400 },
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and WEBP are allowed." },
        { status: 400 },
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size must not exceed 5MB" },
        { status: 400 },
      );
    }

    // Generate unique filename
    const filename = generateUniqueFilename(file.name);
    const storagePath = `${entityType}s/${entityId}/${filename}`;
    
    console.log("Uploading to path:", storagePath);
    
    // Check environment variables before upload
    console.log("Environment check:", {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "SET" : "MISSING",
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "MISSING",
      NODE_ENV: process.env.NODE_ENV,
    });

    // Upload to Supabase Storage
    const { url, path } = await uploadFileToSupabase(file, storagePath);
    
    console.log("Upload successful, URL:", url);

    return NextResponse.json({
      success: true,
      data: {
        filename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        path,
        url,
      },
    });
  } catch (error) {
    console.error("Upload error FULL DETAILS:", error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
