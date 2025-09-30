import "./Home.css";
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMoviesMultiplePages } from "../services/api";
import type { Movie } from "../interfaces/Movie";
import {
  simpleFilter,
  familyFriendlyFilter,
  combineFilters,
} from "../utils/movieFilters";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Combine multiple filters for comprehensive filtering
  const movieFilter = combineFilters(
    simpleFilter, // Exclude horror/scary content
    familyFriendlyFilter // Family-friendly content only
  );

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMoviesMultiplePages(5);
        const filtered = (popularMovies ?? []).filter(movieFilter);
        setMovies(filtered);
      } catch (err) {
        setError(`Failed to load movies... ${err}`);
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, [movieFilter]);

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      const filtered = (searchResults ?? []).filter(movieFilter);
      setMovies(filtered);
      setError("");
    } catch {
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Smaller, more subtle floating orbs like Vite */}
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero" className="hero" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            without the Hassle.
          </h1>
        </header>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <div className="movies-grid">
            {movies.map(
              (mappedMovie) =>
                mappedMovie.title
                  .toLowerCase()
                  .startsWith(searchQuery.toLowerCase()) && (
                  <MovieCard movie={mappedMovie} key={mappedMovie.id} />
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
