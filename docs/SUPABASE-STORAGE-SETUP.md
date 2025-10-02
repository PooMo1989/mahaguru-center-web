# Supabase Storage Setup Instructions

## Step 1: Get Supabase Credentials

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL**: `https://YOUR_PROJECT_ID.supabase.co`
   - **Anon/public key**: The `anon` key (safe to expose to clients)

## Step 2: Add Environment Variables

Add these to your `.env` file:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-public-key-here"
```

## Step 3: Create Storage Bucket in Supabase

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name it: `event-project-images`
4. Make it **Public** (so images can be accessed via URL)
5. Click **Create bucket**

## Step 4: Set Bucket Policies (Optional but Recommended)

To allow authenticated users to upload and delete their own files:

1. Go to **Storage** → `event-project-images` → **Policies**
2. Click **New Policy**

### Upload Policy:
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'event-project-images'
);
```

### Delete Policy:
```sql
CREATE POLICY "Authenticated users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'event-project-images'
);
```

### Public Read Policy:
```sql
CREATE POLICY "Public can read images"
ON storage.objects FOR SELECT
TO public
USING (
  bucket_id = 'event-project-images'
);
```

## Step 5: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to the admin panel
3. Create or edit an event/project
4. Try uploading an image
5. Check Supabase Storage dashboard to see the uploaded file

## Folder Structure in Storage

Images will be organized as:
```
event-project-images/
├── events/
│   ├── event-id-1/
│   │   ├── 1696234567890-abc123-image-name.jpg
│   │   └── 1696234567891-def456-another-image.png
│   └── event-id-2/
│       └── ...
└── projects/
    ├── project-id-1/
    │   └── ...
    └── project-id-2/
        └── ...
```

## Troubleshooting

### Error: "Failed to upload to Supabase"
- Check that your Supabase URL and anon key are correct
- Verify the bucket `event-project-images` exists
- Ensure the bucket is set to **Public**

### Error: "Unauthorized"
- Make sure you're logged in to the admin panel
- Check that NextAuth is working properly

### Images don't appear
- Verify the bucket is **Public**
- Check the browser console for errors
- Verify the public URL format in Supabase Storage settings

## Migration from URL-based Images

The system maintains backward compatibility:
- Existing URL-based photos continue to work
- New images are uploaded to Supabase
- Both methods can coexist
- Legacy URL input is available in a collapsible section
