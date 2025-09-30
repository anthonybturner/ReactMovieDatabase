const API_KEY = "b59c4a80099a77209b69326bb1f66c8c";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async(page: number = 1) => {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();
        return data.results;
}

export const getPopularMoviesMultiplePages = async(pages: number = 3) => {
        const promises = [];
        for (let i = 1; i <= pages; i++) {
            promises.push(getPopularMovies(i));
        }
        const results = await Promise.all(promises);
        return results.flat(); // Flatten array of arrays into single array
}

export const getPopularMoviesWithPagination = async(page: number = 1) => {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();
        return {
            movies: data.results,
            currentPage: data.page,
            totalPages: data.total_pages,
            totalResults: data.total_results
        };
}

export const getMovieVideos = async(movieId: number) => {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
        const data = await response.json();
        return data.results;
}

export const searchMovies = async(query: string) => {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}`
        );
        const data = await response.json();
        return data.results;
}