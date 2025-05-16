import { useState } from 'react';
import { Input } from '@/components/ui/input';

export function MediaStep() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  return (
    <div className="space-y-4">
      <div className="w-full border border-dashed rounded-lg p-6 bg-muted flex flex-col items-center justify-center text-center text-muted-foreground">
        {preview ? (
          <div className="w-full max-h-[300px] overflow-hidden rounded-md">
            {file?.type.startsWith('video') ? (
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
            <p className="mb-2">Upload a cover photo</p>
            <p className="text-xs">
              Recommended: Bright, clear images to help people connect
            </p>
          </>
        )}
      </div>

      <Input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="cursor-pointer bg-background"
      />
      {file && (
        <p className="text-sm text-muted-foreground truncate">
          Selected: {file.name}
        </p>
      )}
      <p className="text-sm text-muted-foreground">
        You can skip this step and add media later.
      </p>
    </div>
  );
}
