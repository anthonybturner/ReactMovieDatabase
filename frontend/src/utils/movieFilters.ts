import type { Movie } from "../interfaces/Movie";

// Method 1: Simple string exclusions
export const simpleExclusionFilters = [
  "conjuring", "demon slayer", "bring her back", "night carnage", "the home", "maa", "the hac", "sinners"
];

// Method 2: Advanced filtering with categories
export interface FilterConfig {
  genres?: string[];        // Genre IDs or names to exclude
  keywords?: string[];      // Keywords in title/overview to exclude
  ratings?: string[];       // Ratings to exclude (R, PG-13, etc.)
  yearRange?: {            // Year range to exclude
    start?: number;
    end?: number;
  };
  runtime?: {              // Runtime limits
    min?: number;
    max?: number;
  };
}

// Method 3: Regex-based exclusions
export const regexExclusions = [
  /horror/i,
  /scary|frightening|terrifying/i,
  /blood|gore|violence/i,
  /haunted|ghost|demon/i
];

// Method 4: Advanced movie filter function
export const createMovieFilter = (config: FilterConfig) => {
  return (movie: Movie): boolean => {
    const title = movie.title?.toLowerCase() ?? "";
    const overview = movie.overview?.toLowerCase() ?? "";
    
    // Check keywords
    if (config.keywords) {
      const hasExcludedKeyword = config.keywords.some(keyword => 
        title.includes(keyword.toLowerCase()) || 
        overview.includes(keyword.toLowerCase())
      );
      if (hasExcludedKeyword) return false;
    }
    
    // Check year range
    if (config.yearRange && movie.release_date) {
      const year = new Date(movie.release_date).getFullYear();
      if (config.yearRange.start && year < config.yearRange.start) return false;
      if (config.yearRange.end && year > config.yearRange.end) return false;
    }
    
    return true;
  };
};

// Method 5: Multiple filter combination
export const combineFilters = (...filters: ((movie: Movie) => boolean)[]) => {
  return (movie: Movie): boolean => {
    return filters.every(filter => filter(movie));
  };
};

// Method 6: Whitelist approach (only include certain items)
export const createWhitelistFilter = (allowedKeywords: string[]) => {
  return (movie: Movie): boolean => {
    const title = movie.title?.toLowerCase() ?? "";
    const overview = movie.overview?.toLowerCase() ?? "";
    
    return allowedKeywords.some(keyword => 
      title.includes(keyword.toLowerCase()) || 
      overview.includes(keyword.toLowerCase())
    );
  };
};

// Usage Examples:

// Simple exclusion
export const simpleFilter = (movie: Movie): boolean => {
  const title = movie.title?.toLowerCase() ?? "";
  const overview = movie.overview?.toLowerCase() ?? "";
  
  return !simpleExclusionFilters.some(filter => 
    title.includes(filter) || overview.includes(filter)
  );
};

// Regex-based exclusion
export const regexFilter = (movie: Movie): boolean => {
  const title = movie.title ?? "";
  const overview = movie.overview ?? "";
  
  return !regexExclusions.some(regex => 
    regex.test(title) || regex.test(overview)
  );
};

// Complex filter example
export const familyFriendlyFilter = createMovieFilter({
  keywords: ["horror", "scary", "violence", "blood", "murder"],
  yearRange: { start: 2000 }, // Only movies from 2000 onwards
});