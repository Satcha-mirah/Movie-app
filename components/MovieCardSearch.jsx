import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import loader from "../public/images/loader.gif";

export default function (props) {
  const [genreEls, setGenreEls] = useState([]);
const [hasLoaded, setHasLoaded] = useState(false);


  function getPicUrl(pic_path) {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${pic_path}`;
  }

  useEffect(() => {
    const genres = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTc5Yzk0ZDBiMDYxNzA2ZTMzNWE0NjZhMWEyZDVkNSIsInN1YiI6IjY0ZmYwZTg3ZWZlYTdhMDEzN2QxYmZhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9IvEzXnOqz4mp2KOOk36OFKHp8MLGjJlPUUJZSkI5Ao",
      },
    };
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", genres)
      .then((response) => response.json())
      .then((response) =>
        // setting the array of genre elements from the api call
        setGenreEls((prevEl) => {
          let test = props.genreId.map((genre) => {
            let obj = response.genres.find((genreArrObj) => {
              return genreArrObj.id === genre;
            });

            return obj.name;
          });

          return test;
        })
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <Link to={`/movies/${props.id}`}>
      <div
        data-testid="movie-card"
        className="flex items-center w-[70%] -500:w-[95%] gap-4"
      >
        {/* movie poster */}
        <div className="w-[110px] h-[150px] flex relative">
          <img
            className="w-[100%] min-w-[110px] h-[100%] text-black"
            src={getPicUrl(props.path)}
            alt="movie-poster"
            onLoad={()=>{
              setHasLoaded(true)
            }}
          />

          {/* loader for image */}
          <div
            src={loader}
            className={`${
              hasLoaded ? "hidden" : "block"
            } h-[102%] w-[102%] bg-white flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
          >
            <img src={loader} alt="" />
          </div>
        </div>

        {/* movie details */}
        <div className="flex flex-col items-start">
          {/* year of release and region */}
          <div className="text-movieGray">
            <span> {new Date(props.date).toUTCString()}</span>
          </div>

          {/* movie title */}
          <h3 className="font-bold text-black">
            {props.title}
          </h3>

          {/* rating */}
          <div></div>

          {/* movie genre */}
          <div className="text-movieGray">{genreEls.join(", ")}</div>
        </div>
      </div>
    </Link>
  );
}
