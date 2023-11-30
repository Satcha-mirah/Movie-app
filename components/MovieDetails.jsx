import React, { useEffect, useState } from "react";
import loader from "../../public/images/loader.gif";
import related from "../../public/images/related-content.png";
import play from "../../public/images/play-yt.jpg";

// router
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function MovieDetails() {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const [hasFetched, setHasFetched] = useState(false);
  const [genreArr, setGenreArr] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [cantFetch, setCantFetch] = useState(false);

  function getPicUrl(pic_path) {
    return `https://image.tmdb.org/t/p/original/${pic_path}`;
  }

  useEffect(() => {
    const details = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTc5Yzk0ZDBiMDYxNzA2ZTMzNWE0NjZhMWEyZDVkNSIsInN1YiI6IjY0ZmYwZTg3ZWZlYTdhMDEzN2QxYmZhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9IvEzXnOqz4mp2KOOk36OFKHp8MLGjJlPUUJZSkI5Ao",
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, details)
      .then((response) => response.json())
      .then((response) => {
        setHasFetched(true);
        setCantFetch(false);
        setGenreArr(response.genres);
        return setMovie(response);
      })
      .catch((err) => { 
        setCantFetch(true)
        return console.error(err)});
  }, []);

  console.log(movie);
  // let runtimeMins = movie.runtime % 60
  // let runtimeHour = Math.floor(movie.runtime / 60)

  // console.log(genreArr)

  return (
    <div className="text-black w-[100%]">
      {cantFetch ? (
        <div className="text-lg">
          Something went wrong, check your network connection...
        </div>
      ) : (
        ""
      )}

      <img
        src={loader}
        className={`${
          hasFetched ? "hidden" : "block"
        } fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]`}
        alt=""
      />

      {/* container of page */}
      <div className={`${hasFetched ? "block" : "hidden"} relative flex`}>
        {/* dashboard */}
        <Dashboard />

        {/* main content */}

        <div className="flex flex-col gap-4 w-[100%]">
          {/* trailer section */}
          <div className="flex justify-center items-center overflow-hidden bg-gray-300 p-4 relative">
            {/* loader for image */}
            <div
              src={loader}
              className={`${
                hasLoaded ? "hidden" : "block"
              } h-[102%] w-[102%] bg-white flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
            >
              <img src={loader} alt="" />
            </div>

            {/* actual content, i.e the image */}
            <div className="w-[60%] -720:w-[85%] -400:w-[90%] flex justify-around items-center min-h-[25vh]">
              <img
                src={getPicUrl(
                  movie.backdrop_path ? movie.backdrop_path : movie.poster_path
                )}
                className="rounded-xl object-cover max-h-[70vh]"
                alt=""
                onLoad={() => {
                  setHasLoaded(true);
                }}
              />
            </div>
          </div>

          {/* movie main details and rating */}
          <div className="flex justify-start items-center gap-2 text-[#404040] font-[600] -950:flex-col -950:items-start -950:px-8">
            {/* movie title */}
            <p data-testid="movie-title">{movie.title}</p>
            <div className="-950:hidden">•</div>

            {/* release date */}
            <p data-testid="movie-release-date">{new Date(movie.release_date).toUTCString()}</p>
            <div className="-950:hidden">•</div>

            {/* run time */}
            <p data-testid="movie-runtime">{movie.runtime}mins</p>

            {/* genres */}
            <div className="text-mainRed text-sm font-bold flex gap-4 flex-wrap">
              {genreArr.map((genre) => (
                <p className="border-[1px] border-[#F8E7EB] rounded-[20px] p-2">
                  {genre.name}
                </p>
              ))}
            </div>
          </div>

          {/* movie overview and related content */}
          <div className="flex -950:px-8">
            {/* movie overview, directors and writers */}
            <div className="flex flex-col gap-4 w-[100%]">
              <p data-testid="movie-overview">{movie.overview}</p>

              <p>
                Director:{" "}
                <span className="text-mainRed">Lorem ipsum dolor sit amet</span>
              </p>

              <p>
                Writers:{" "}
                <span className="text-mainRed">Lorem ipsum dolor sit amet</span>
              </p>

              <p>
                Stars:{" "}
                <span className="text-mainRed">Lorem ipsum dolor sit amet</span>
              </p>

              {/* <div>Top rated movie</div> */}
            </div>

            {/* movie related content */}
            <div>{/* <img src={related} alt="" />   */}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
