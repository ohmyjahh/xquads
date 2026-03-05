'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, User } from 'lucide-react';
import Image from 'next/image';

export function AgentAvatar({ agentId, size = 40 }: { agentId: string; size?: number }) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`/api/agents/photo/${agentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.url) setPhotoUrl(data.url + '?t=' + Date.now());
      })
      .catch(() => {});
  }, [agentId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('agentId', agentId);

    try {
      const res = await fetch('/api/agents/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) setPhotoUrl(data.url + '?t=' + Date.now());
    } catch {
      // silently fail
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group shrink-0">
      <div
        className="rounded-full overflow-hidden bg-[#262629] flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={agentId}
            width={size}
            height={size}
            className="object-cover w-full h-full"
            unoptimized
          />
        ) : (
          <User className="text-[#666]" style={{ width: size * 0.5, height: size * 0.5 }} />
        )}
      </div>
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
      >
        <Camera className="text-white" style={{ width: size * 0.35, height: size * 0.35 }} />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
}
