"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  placeholder?: string;
}

export function YouTubeEmbed({ videoId, title, placeholder }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black">
      <div className="relative aspect-video w-full">
        {/* Placeholder */}
        {!isLoaded && placeholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-cover bg-center">
            <img
              src={placeholder}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <button
              onClick={() => setIsLoaded(true)}
              className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label={`Play video: ${title}`}
            >
              <Play className="h-6 w-6 fill-background text-background" />
            </button>
          </div>
        )}

        {/* YouTube iframe */}
        {isLoaded && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>
    </div>
  );
}
