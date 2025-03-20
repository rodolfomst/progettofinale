import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useFetchSolution from "../../hooks/useFetchSolution";
import GameCard from '../../components/GameCard';
import styles from "../home/Home.module.css";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const navigate = useNavigate();
  const game = searchParams.get("query");

  const initialUrl = `https://api.rawg.io/api/games?key=4325697e08ae47af9f63f693271a8c3a&search=${game}`;

  const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    updateUrl(initialUrl);
  }, [game]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="container">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search a game."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <h1>{game} games</h1>
      {loading && (
        <img
          style={{ width: "100%", height: "100vh" }}
          alt="loading"
          id="loadingImages"
         
        />
      )}
      {error && <h1 className="error-message">{error}</h1>}
      <div className={styles.games_wrapper}>
        {data &&
          data.results.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
}
