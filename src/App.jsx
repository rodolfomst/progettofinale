import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import Markup from "./layout/index";
import Home from "./pages/home/index";
import Genre from "./pages/genere/index";
import Game from "./pages/game/index";
import SignUp from "./pages/signUp/index.jsx";
import SignIn from "./pages/signIn/index";
import Account from "./pages/account/index";
import Search from './pages/search/index';
import Review from "./pages/Reviews/index.jsx";
import SessionContextProvider from "./context/SessionContextProvider";
import SessionContext from "./context/SessionContext";
import FavContextProvider from './context/FavContextProvider';
import "./index.css";

export function ProtectedRoute() {
  const { session } = useContext(SessionContext);
  if (!session) {
    return <Navigate to={"/"} />;  // Redirect to home if not authenticated
  }
  return <Outlet />;  // Show protected content
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Markup />}>
          <Route path="/" element={<Home />} />
          <Route path="/games/:genre" element={<Genre />} />
          <Route path="/games/:id/:game" element={<Game />} />
          <Route path="/games/review/:id" element={<Review />} />
          <Route path="/search" element={<Search />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Account />} />
            {/* Additional protected routes can be added here */}
          </Route>
        </Route>
        <Route path="/register" element={<SignUp />} />  {/* Changed from "/registr" to "/register" */}
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

function Root() {
  return (
    <SessionContextProvider>
      <FavContextProvider>
        <App />
      </FavContextProvider>
    </SessionContextProvider>
  );
}

export default Root;
