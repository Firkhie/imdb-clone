import HeroCustom from "../components/HeroCustom";
import MovieCard from "../components/MovieCard";

export default function LandingPage() {
  return (
    <>
      <HeroCustom />
      <section className="movies">
        <h2>What to watch</h2>
        <h3>Fan Favorites</h3>
        <div className="movies-content">
          <MovieCard />
        </div>
      </section>
    </>
  );
}
