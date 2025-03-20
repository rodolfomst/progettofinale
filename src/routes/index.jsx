import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Markup from "../layout";
import Home from '../pages/home';
import Genre from '../pages/genere';  
import Game from "../pages/game";
import Account from "../pages/account";  // Aggiungi la pagina dell'account
import Favourites from "../pages/favourites";  // Aggiungi la pagina per i preferiti
import Review from "../pages/Reviews/Reviews";  // Aggiungi la pagina per le recensioni

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Markup />}>
      <Route index element={<Home />} /> {/* Home page */}
      <Route path="games/:genre" element={<Genre />} /> {/* Genere */}
      <Route path="games/:id/:game" element={<Game />} /> {/* Pagina del gioco */}
      <Route path="account" element={<Account />} /> {/* Account utente */}
      <Route path="account/favourites" element={<Favourites />} /> {/* Giochi preferiti */}
      <Route path="games/:id/:game/review" element={<Review />} /> {/* Scrivere recensione */}
    </Route>
  )
);

export default router;
