import { createContext, useEffect, useState } from "react";
import requestsEndPoints from "../Request";
import axios from "axios";
export const MoviesDataContext = createContext([]);

export const MoviesDataContextProvider = ({ children }) => {
  const [MoviesList, setMoviesList] = useState([]);

  useEffect(() => {
    // Api call to fetch all the movies Data
    axios.get(requestsEndPoints?.requestPopular).then((res) => {
      setMoviesList(res?.data?.results);
    });
  }, []);

  return (
    <MoviesDataContext.Provider value={{ MoviesList }}>
      {children}
    </MoviesDataContext.Provider>
  );
};
