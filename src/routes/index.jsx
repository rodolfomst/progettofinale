import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import Markup from "../layout";
import Home from '../pages/home';
import Genre from '../pages/genere';  
import Game from "../pages/game";
import Account from "../pages/account"; 
import Favourites from "../pages/favourites";
import Review from "../pages/Reviews/Reviews"; 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Markup />}>
      <Route index element={<Home />} /> 
      <Route path="games/:genre" element={<Genre />} /> 
      <Route path="games/:id/:game" element={<Game />} /> 
      <Route path="account" element={<Account />} /> 
      <Route path="account/favourites" element={<Favourites />} /> 
      <Route path="games/:id/:game/review" element={<Review />} /> 
    </Route>
  )
);

export default router;
