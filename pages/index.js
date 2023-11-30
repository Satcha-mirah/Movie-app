import React from "react";
import Hero from "../components/Hero";
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="font-main flex flex-col gap-[100px] w-[100%] justify-center items-center">
      <Hero>
        <Header />
      </Hero>
      <MovieList>
        <Footer />
      </MovieList>
    </div>
  );
}
