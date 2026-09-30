const MUX_PLAYER_URL = "https://player.mux.com";

function createPlayerUrl({ playbackId, videoId, title }) {
  const params = new URLSearchParams({
    autoplay: "muted",
    loop: "true",
    muted: "true",
    playsinline: "true",
    preload: "auto",
    "accent-color": "#8ea6ff",
    "metadata-video-id": videoId,
    "metadata-video-title": title,
    "metadata-player-name": "Portfólio Rodrigo Camilo",
  });

  return `${MUX_PLAYER_URL}/${playbackId}?${params.toString()}`;
}

export function ProjectVideoPlayer({ className, playbackId, title, videoId }) {
  return (
    <iframe
      className={className}
      src={createPlayerUrl({ playbackId, videoId, title })}
      title={title}
      allow="accelerometer; autoplay; encrypted-media; fullscreen; gyroscope; picture-in-picture"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
