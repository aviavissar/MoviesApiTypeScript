export const fetchMoviesArr = async (query = "") => {
  try {
    if (query.length > 2) {
      query = query.trim();
      if (query.indexOf(" ") >= 0) {
        return "space";
      }
      const response = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=f2de5c87&page=10&s=${query}`
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
      `http://www.omdbapi.com/?i=${id}&plot=${plotSize}&apikey=f2de5c87`
    );

    return await response.json();
  } catch (error) {
    throw error;
  }
};
