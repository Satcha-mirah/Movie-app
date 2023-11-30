import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import loader from "../public/images/loader.gif";

export default function MovieList(props) {
    const [movieData, setMovieData] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);
    const [cantFetch, setCantFetch] = useState(false);

    useEffect(() => {
        const topMovies = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTc5Yzk0ZDBiMDYxNzA2ZTMzNWE0NjZhMWEyZDVkNSIsInN1YiI6IjY0ZmYwZTg3ZWZlYTdhMDEzN2QxYmZhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9IvEzXnOqz4mp2KOOk36OFKHp8MLGjJlPUUJZSkI5Ao",
            },
        };

        fetch(
            "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
            topMovies
        )
            .then((response) => response.json())
            .then((response) => {
                setHasFetched(true);
                setCantFetch(false);
                return setMovieData(response.results);
            })
            .catch((err) => {
                setCantFetch(true);
                return console.error(err);
            });

        // const trendingMovies = {
        //   method: "GET",
        //   headers: {
        //     accept: "application/json",
        //     Authorization:
        //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTc5Yzk0ZDBiMDYxNzA2ZTMzNWE0NjZhMWEyZDVkNSIsInN1YiI6IjY0ZmYwZTg3ZWZlYTdhMDEzN2QxYmZhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9IvEzXnOqz4mp2KOOk36OFKHp8MLGjJlPUUJZSkI5Ao",
        //   },
        // };
        // fetch(
        //   "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        //   trendingMovies
        // )
        //   .then((response) => response.json())
        //   .then((response) => {
        //     setMovieData(response.results);
        //   })
        //   .catch((err) => console.error(err));
    }, []);

    // console.log(movieData);

    const movieCardEls = movieData.slice(0, 10).map((data) => {
        return (
            <MovieCard
                id={data.id}
                title={data.title}
                path={data.poster_path}
                key={data.id}
                genreId={data.genre_ids}
                date={data.release_date}
                rating={data.vote_average}
            />
        );
    });

    return (
        <div className="flex flex-col w-[100%] gap-16 items-center">
            <div className="flex justify-between w-[80%]">
                <h3 className="text-4xl font-bold">Featured Movies</h3>

                <p className="text-mainRed cursor-pointer">
                    See more <span className="font-bold">{">"}</span>
                </p>
            </div>

            {cantFetch ? (
                <div className="text-lg">
                    Something went wrong, check your network connection...
                </div>
            ) : (
                ""
            )}

            <div className={` movie-list grid relative`}>
                <img
                    src={loader}
                    className={`${
                        hasFetched ? "hidden" : "block"
                    } absolute top-[0%] left-[50%] translate-x-[-50%]`}
                    alt=""
                />
                {hasFetched ? movieCardEls : ""}
            </div>
            {hasFetched ? props.children : ""}
        </div>
    );
}
