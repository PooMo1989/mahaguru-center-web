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
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const entityType = formData.get("entityType") as string;
    const entityId = formData.get("entityId") as string;

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

    // Upload to Supabase Storage
    const { url, path } = await uploadFileToSupabase(file, storagePath);

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
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
