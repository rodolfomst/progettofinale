import { useEffect, useState } from "react";
import { Link } from "react-router"; // Usa react-router-dom (al posto di react-router)
import styles from "../pages/genere/genere.module.css";

const url = "https://api.rawg.io/api/genres?key=4325697e08ae47af9f63f693271a8c3a";

export default function Sidebar() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setGenres(json.results);
    };
    fetchGenres();
  }, []);

  return (
    <div className={styles.sidebar}>
      <details className={styles.dropdown}>
        <summary className={styles.dropdownSummary}>lista dei giochi</summary>
        <ul className={styles.genresList}>
          {genres.map((genre) => (
            <li key={genre.id} className={styles.genreItem}>
              <Link to={`/games/${genre.slug}`} className={styles.genreLink}>
                <img
                  // Verifica se l'API restituisce un URL per l'immagine del genere
                  src={genre.image_background || `https://via.placeholder.com/100?text=${genre.name}`} 
                  alt={`${genre.name} icon`}
                  className={styles.genreImage}
                />
                <span className={styles.genreName}>{genre.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
