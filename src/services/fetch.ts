const KEY="";
export const fetchMoviesArr = async (query = "") => {
  try {
    if (query.length > 2) {
      query = query.trim();
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
      );

      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchMovie = async (id: string, plotSize = "short") => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${id}&plot=${plotSize}&apikey=${KEY}`
    );

    return await response.json();
  } catch (error) {
    throw error;
  }
};
