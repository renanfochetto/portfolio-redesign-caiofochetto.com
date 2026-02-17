import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  type: "video" | "playlist" | "multiple";
  url?: string;      // Video ID ou Playlist ID
  urls?: string[];   // Array de Video IDs (para type="multiple")
  title: string;
  placeholder?: string;
}

export function YouTubeEmbed({ type, url, urls, title, placeholder }: YouTubeEmbedProps) {
  // TIPO 1: Playlist
  if (type === "playlist" && url) {
    const embedUrl = `https://www.youtube-nocookie.com/embed/videoseries?list=${url}`;

    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-600 bg-background">
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  // TIPO 2: Vídeo único
  if (type === "video" && url) {
    const embedUrl = `https://www.youtube-nocookie.com/embed/${url}`;

    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-600 bg-background">
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  // TIPO 3: Múltiplos vídeos (grid 2 colunas)
  if (type === "multiple" && urls && urls.length > 0) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {urls.map((videoId, index) => {
          const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

          return (
            <div
              key={videoId}
              className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-600 bg-background"
            >
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title={`${title} - Part ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          );
        })}
      </div>
    );
  }

  // Fallback: Placeholder
  return placeholder ? (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-600 bg-muted">
      <img
        src={placeholder}
        alt={title}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <Play className="h-16 w-16 text-white opacity-80" />
      </div>
    </div>
  ) : null;
}