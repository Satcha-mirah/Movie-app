import React from "react";
import { useEffect, useRef, useState } from "react";
import Hero from "./Hero";
import Header from "./Header";
import MovieList from "./MovieList";
import Footer from "./Footer";

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
