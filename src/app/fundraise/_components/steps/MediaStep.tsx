'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useCreateCampaignStore } from '@/stores/useCreateCampaignStore';
import { useShallow } from 'zustand/shallow';

export function MediaStep() {
  const { mediaUrl, setMediaUrl } = useCreateCampaignStore(
    useShallow((s) => ({ mediaUrl: s.mediaUrl, setMediaUrl: s.setMediaUrl }))
  );

  const [preview, setPreview] = useState<string | null>(mediaUrl);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // show a quick local preview
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    // upload to your API route
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    try {
      setIsUploading(true);
      const res = await fetch('/api/imagekit', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error(await res.text());

      const json = await res.json();
      const uploadResponse = json.uploadResponse;
      // console.log('Upload response:', uploadResponse);
      // assume { url: string } returned
      setMediaUrl(uploadResponse.url);
      setPreview(uploadResponse.url);
    } catch (err) {
      console.error(err);
      alert('Upload failed. Please try again.');
      setMediaUrl('');
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="w-full border border-dashed rounded-lg p-6 bg-muted flex flex-col items-center justify-center text-center text-muted-foreground">
        {preview ? (
          <div className="w-full max-h-[300px] overflow-hidden rounded-md">
            {preview.endsWith('.mp4') ||
            (preview.startsWith('blob:') && mediaUrl?.includes('video')) ? (
              <video
                src={preview}
                controls
                className="w-full h-auto rounded-md"
              />
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto rounded-md object-cover"
              />
            )}
          </div>
        ) : (
          <>
            <p className="mb-2">Upload a cover photo or video</p>
            <p className="text-xs">
              Recommended: Bright, clear images (or short videos) to help people
              connect
            </p>
          </>
        )}
      </div>

      <Input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        disabled={isUploading}
        className="cursor-pointer bg-background"
      />

      {isUploading && (
        <p className="text-sm text-muted-foreground">Uploading…</p>
      )}

      {/* {mediaUrl && !isUploading && (
        <p className="text-sm text-muted-foreground truncate">Uploaded</p>
      )} */}

      {/* <p className="text-sm text-muted-foreground">
        You can skip this step and add media later.
      </p> */}
    </div>
  );
}
