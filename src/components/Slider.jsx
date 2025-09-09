import axios from "axios";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Slider({ title, fetchURL }) {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((res) => {
      setMovieData(res?.data?.results);
    });
  }, []);
  const handleScroll = (e, direction) => {
    const slider = e.target.closest(".group").querySelector(".slider");

    if (direction === "left") {
      slider.scrollLeft -= 500;
    } else {
      slider.scrollLeft += 500;
    }
  };

  return (
    <div className="w-full overflow-hidden px-4 py-4 relative group">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-white font-robo font-bold text-xl xl:text-2xl">
          {title}
        </h1>
        <div className="text-white flex gap-2">
          <button
            className="h-10 w-10 bg-white/20 text-white cursor-pointer opacity-0 transition duration-200 group-hover:opacity-100 hover:bg-white hover:text-black text-xl rounded-full"
            onClick={(e) => handleScroll(e, "left")}
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <button
            className="h-10 w-10 bg-white/20 text-white cursor-pointer opacity-0 transition duration-200 group-hover:opacity-100 hover:bg-white hover:text-black text-xl rounded-full"
            onClick={(e) => handleScroll(e, "right")}
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="flex w-full slider items-center overflow-x-scroll gap-10">
        {movieData?.map((movie) => (
          <Link
            state={movie}
            to={"/movieDetail"}
            key={movie.id}
            className="movie-card overflow-hidden min-w-80 xl:min-w-100 xl:h-60 h-50 inline-block border border-neutral-600 shadow-xl shadow-neutral-700 hover:shadow-neutral-200 transition duration-200 cursor-pointer relative group/card"
          >
            {/* 👆 new group/card for overlay + scale */}

            {/* Overlay + image */}
            <div className="h-full w-full relative">
              <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 bg-gradient-to-r from-black/60 via-transparent to-black/60 transition duration-150 z-10"></div>

              <img
                src={`https://image.tmdb.org/t/p/original${
                  movie?.backdrop_path ?? movie?.poster_path
                }`}
                alt={movie?.title}
                className="w-full h-full object-cover group-hover/card:scale-110 transition duration-200"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Slider;
