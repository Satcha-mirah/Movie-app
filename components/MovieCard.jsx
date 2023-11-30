import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import heart from "../public/images/heart.png";
import imdb from "../public/images/imdb.svg";
import tomato from "../public/images/tomato.svg";
import loader from "../public/images/loader.gif";

export default function MovieCard(props) {
    const [genreEls, setGenreEls] = useState([]);
    const [isFavourite, setIsFavourite] = useState(false);
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
        fetch(
            "https://api.themoviedb.org/3/genre/movie/list?language=en",
            genres
        )
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
        <div className="relative">
            {/* favourties container */}
            <div
                onClick={() => {
                    setIsFavourite(!isFavourite);
                }}
                className={`favorite ${
                    isFavourite ? "active" : ""
                } absolute top-4 right-4 p-2 rounded-[50%] bg-favourite z-[10]`}
            >
                <Image
                    src="/images/heart.png"
                    alt="Heart"
                    width={24}
                    height={24}
                />
            </div>

            <Link href={`/movies/${props.id}`}>
                <div
                    data-testid="movie-card"
                    className="flex flex-col items-start w-[100%] gap-4 relative"
                >
                    {/* movie poster */}
                    <div className="w-[100%] relative">
                        <Image
                            data-testid="movie-poster"
                            src={getPicUrl(props.path)}
                            alt="movie-poster"
                            width={220} // Set your desired width
                            height={330} // Set your desired height
                            onLoad={() => {
                                setHasLoaded(true);
                            }}
                        />

                        {/* loader for image */}
                        <div
                            className={`${
                                hasLoaded ? "hidden" : "block"
                            } h-[102%] w-[102%] bg-white flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
                        >
                            <Image
                                src="/images/loader.gif"
                                alt="Loader"
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>

                    {/* movie details */}
                    <div className="flex flex-col items-start gap-[6px]">
                        {/* year of release and region */}
                        <div className="text-movieGray">
                            Release date:
                            <span data-testid="movie-release-date">
                                {" "}
                                {new Date(props.date).toUTCString()}
                            </span>
                        </div>

                        {/* movie title */}
                        <h3 data-testid="movie-title" className="font-bold">
                            {props.title}
                        </h3>

                        {/* rating */}
                        <div className="flex w-[100%] justify-between">
                            {/* imdb rating */}
                            <div className="flex gap-[4px] items-center">
                                <img src={imdb} className="h-[100%]" alt="" />
                                <p className="text-sm">
                                    {props.rating * 10}/100
                                </p>
                            </div>

                            {/* rotten tomato rating */}
                            <div className="flex gap-[4px] items-center">
                                <img src={tomato} className="h-[100%]" alt="" />
                                <p className="text-sm">{props.rating * 10}%</p>
                            </div>
                        </div>

                        {/* movie genre */}
                        <div className="text-movieGray font-bold">
                            {genreEls.join(", ")}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
