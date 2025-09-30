import React, { useRef, useEffect, useState } from "react";
import "./MovieModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faStar,
  faCalendar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import type { Movie } from "../interfaces/Movie";
import VideoInfo from "./VideoInfo";

interface MovieModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

function MovieModal({ movie, isOpen, onClose }: MovieModalProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMarquee, setShouldMarquee] = useState(false);

  useEffect(() => {
    if (isOpen && titleRef.current && containerRef.current) {
      const titleWidth = titleRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      setShouldMarquee(titleWidth > containerWidth);
    }
  }, [isOpen, movie.title, movie.id]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="modal-body">
          <div className="modal-main">
            <div className="modal-poster">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            <div className="modal-info">
              <div className="title-marquee" ref={containerRef}>
                <h2
                  ref={titleRef}
                  className={`marquee-text ${
                    shouldMarquee ? "animate-marquee" : ""
                  }`}
                >
                  {movie.title}
                </h2>
              </div>
              <hr />

              <div className="movie-meta">
                <div className="meta-item">
                  <FontAwesomeIcon icon={faStar} />
                  <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
                </div>
                <div className="meta-item">
                  <FontAwesomeIcon icon={faCalendar} />
                  <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
                </div>
                <div className="meta-item">
                  <FontAwesomeIcon icon={faClock} />
                  <span>{movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
                </div>
              </div>

              <div className="movie-overview">
                <h3>Overview</h3>
                <p>{movie.overview || "No overview available."}</p>
              </div>

              <div className="movie-details">
                <div className="detail-row">
                  <strong>Original Title:</strong>
                  <span>{movie.original_title || movie.title}</span>
                </div>
                <div className="detail-row">
                  <strong>Language:</strong>
                  <span>{movie.original_language?.toUpperCase() || "N/A"}</span>
                </div>
                <div className="detail-row">
                  <strong>Popularity:</strong>
                  <span>{movie.popularity?.toFixed(0) || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
          <VideoInfo movie={movie}></VideoInfo>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
