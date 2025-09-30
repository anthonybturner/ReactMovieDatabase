import "./MovieCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import type { Movie } from "../interfaces/Movie";
import { useMovieContext } from "../contexts/MovieContext";
import { useState } from "react";
import { createPortal } from "react-dom";
import MovieModal from "./MovieModal";

function MovieCard({ movie }: { movie: Movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onFavoriteClicked() {
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  function showModal() {
    console.log("Opening modal for:", movie.title);
    setIsModalOpen(true);
  }

  function closeModal() {
    console.log("Closing modal");
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="movie-card">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            onClick={showModal}
          />
          <div className="movie-overlay">
            <button
              className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={onFavoriteClicked}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <hr />
          <p>{movie.overview}</p>
          <p>{movie.release_date?.split("-")[0]}</p>
        </div>
      </div>

      {isModalOpen &&
        createPortal(
          <MovieModal
            movie={movie}
            isOpen={isModalOpen}
            onClose={closeModal}
          />,
          document.body
        )}
    </>
  );
}

export default MovieCard;
