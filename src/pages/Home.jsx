import { useContext } from "react";
import { MoviesDataContext } from "../context/ApiRequest";
import Slider from "../components/Slider";
import requestsEndPoints from "../Request";
import HomeShimmer from "../Shimmer/HomeShimmer";

function Home() {
  const { MoviesList } = useContext(MoviesDataContext);

  const ChoosenRandomMovieForPoster =
    MoviesList[Math.floor(Math.random() * MoviesList.length)];

  return !MoviesList.length ? (
    <HomeShimmer />
  ) : (
    <>
      <div className="w-full h-150 lg:h-screen relative text-white">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${ChoosenRandomMovieForPoster?.backdrop_path})`,
          }}
        ></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black to-transparent"></div>

        {/* Content */}
        <div className="relative pt-50 px-5 z-20 w-full h-full  ">
          <h1 className="text-3xl  md:text-5xl font-bold font-poppins ">
            {ChoosenRandomMovieForPoster?.title}
          </h1>
          <div className="mt-4 flex gap-3">
            <button className="py-1 font-poppins px-10 rounded bg-white text-black cursor-pointer">
              Play
            </button>
            <button className="py-1 font-poppins px-3 border cursor-pointer">
              Watch Later
            </button>
          </div>

          <p className="my-5">
            Released on : {ChoosenRandomMovieForPoster?.release_date}
          </p>

          <p className="md:w-[70%] lg:w-[50%] xl:w-[35%] font-poppins">
            {ChoosenRandomMovieForPoster?.overview.length > 200
              ? ChoosenRandomMovieForPoster?.overview.slice(0, 200) + "..."
              : ChoosenRandomMovieForPoster?.overview}
          </p>
        </div>
      </div>
      <Slider
        title={"TopRated"}
        fetchURL={requestsEndPoints?.requestTopRated}
      />
      <Slider
        title={"Trending"}
        fetchURL={requestsEndPoints?.requestTrending}
      />
      <Slider title={"Horror"} fetchURL={requestsEndPoints?.requestHorror} />
      <Slider
        title={"Upcoming"}
        fetchURL={requestsEndPoints?.requestUpcoming}
      />
    </>
  );
}

export default Home;
