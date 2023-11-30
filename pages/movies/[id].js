// pages/movies/[id].js
import { useRouter } from 'next/router';
import MovieDetails from '../../components/MovieDetails';

const MovieDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="font-main flex flex-col gap-[100px] w-[100%] justify-center items-center relative">
      <MovieDetails id={id} />
    </div>
  );
};

export default MovieDetailsPage;
