import { useLocation } from "react-router-dom";

export default function MovieDetailPage() {
  const { state: data } = useLocation();
  console.log(data);

  return (
    <div
      className="h-screen w-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${
          data?.backdrop_path ? data?.backdrop_path : data?.poster_path
        })`,
      }}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black to-50% to-transparent"></div>
      <div className="absolute left-1/2 z-100 bottom-50 transform -translate-x-1/2 w-full px-10 md:w-[70%] xl:w-[50%]">
        <h1 className="text-2xl text-center font-poppins max-w-full text-white font-bold whitespace-nowrap">
          {data?.title}
        </h1>
        <p className="text-white font-poppins text-center">
          Release Date : {data?.release_date}
        </p>
        <p className="text-white mt-5 w-full text-center font-poppins">
          {data?.overview}
        </p>
      </div>
    </div>
  );
}
