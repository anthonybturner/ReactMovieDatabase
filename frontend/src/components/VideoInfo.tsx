import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { getMovieVideos } from "../services/api";
import type { Movie } from "../interfaces/Movie";
import "./VideoInfo.css";

interface VideoData {
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

function VideoInfo({ movie }: { movie: Movie }) {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [loadingVideos, setLoadingVideos] = useState(false);

  useEffect(() => {
    // Load videos when modal opens
    if (movie.id) {
      setLoadingVideos(true);
      getMovieVideos(movie.id)
        .then((videoData) => {
          // Filter for YouTube trailers and teasers
          const filteredVideos = videoData.filter(
            (video: VideoData) =>
              video.site === "YouTube" &&
              (video.type === "Trailer" || video.type === "Teaser")
          );
          setVideos(filteredVideos);
          // Set first trailer as default
          if (filteredVideos.length > 0) {
            setSelectedVideo(filteredVideos[0]);
          }
        })
        .catch((error) => {
          console.error("Error loading videos:", error);
        })
        .finally(() => {
          setLoadingVideos(false);
        });
    }
  }, [movie.title, movie.id]);

  return (
    <div className="video-info">
      {/* Video Thumbnails Section */}
      {videos.length > 0 && (
        <div className="video-section">
          <h3>Videos</h3>
          {loadingVideos ? (
            <div className="loading-videos">Loading videos...</div>
          ) : (
            <>
              {/* Main Video Player */}
              {selectedVideo && (
                <div className="main-video">
                  <iframe
                    width="100%"
                    height="600px"
                    src={`https://www.youtube.com/embed/${selectedVideo.key}?rel=0&modestbranding=1`}
                    title={selectedVideo.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p className="video-title">{selectedVideo.name}</p>
                </div>
              )}

              {/* Video Thumbnails */}
              {videos.length > 1 && (
                <div className="video-thumbnails">
                  {videos.map((video) => (
                    <div
                      key={video.key}
                      className={`video-thumbnail ${
                        selectedVideo?.key === video.key ? "active" : ""
                      }`}
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="thumbnail-wrapper">
                        <img
                          src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                          alt={video.name}
                          loading="lazy"
                        />
                        <div className="play-overlay">
                          <FontAwesomeIcon icon={faPlay} />
                        </div>
                      </div>
                      <span className="thumbnail-title">{video.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default VideoInfo;
