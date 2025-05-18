'use client';
import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { useCreateCampaignStore } from '@/stores/useCreateCampaignStore';
import { useShallow } from 'zustand/shallow';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';

export function MediaStep() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mediaUrl, setMediaUrl } = useCreateCampaignStore(
    useShallow((s) => ({ mediaUrl: s.mediaUrl, setMediaUrl: s.setMediaUrl }))
  );

  const [preview, setPreview] = useState<string | null>(mediaUrl);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

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
      const { uploadResponse } = await res.json();

      setMediaUrl(uploadResponse.url);
      setPreview(uploadResponse.url);
    } catch (err) {
      console.error(err);
      alert('Upload failed. Please try again.');
      handleRemove();
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setMediaUrl('');
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col items-start justify-center w-full gap-5">
      <div className="w-1/2 border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center text-muted-foreground">
        {preview ? (
          <div className="w-full max-h-[300px] overflow-hidden rounded-md relative">
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
            <div className="absolute top-2 right-2 flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer rounded-[6px]"
                onClick={handleRemove}
                disabled={isUploading}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
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
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        disabled={isUploading}
        className="w-1/2 cursor-pointer bg-background"
      />

      {isUploading && (
        <p className="text-sm text-muted-foreground">Uploading…</p>
      )}
    </div>
  );
}
