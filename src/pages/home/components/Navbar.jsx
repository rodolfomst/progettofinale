import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router"; 
import supabase from "../../../supabase/client";
import SessionContext from "../../../context/SessionContext";
import { Toaster, toast } from "sonner";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AvatarUpload from "../../account/components/Avatar"; 
import styles from "./Navbar.module.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out!");
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const updateAvatarUrl = async (filePath) => {
    try {
      const { error } = await supabase
        .from("profilo") 
        .update({ avatar_url: filePath })
        .eq("id", session.user.id);

      if (error) {
        console.error("Error updating avatar:", error.message);
        toast.error("Error updating avatar");
      } else {
        toast.success("Avatar updated successfully");
        fetchUserData();
        setIsAvatarModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating avatar:", error.message);
      toast.error("Error updating avatar");
    }
  };

  const fetchUserData = async () => {
    if (session && session.user?.id) {
      const { data, error } = await supabase
        .from("profilo")
        .select("username, avatar_url")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error.message);
      } else {
        setUserData(data);
      }
    }
  };

  useEffect(() => {
    if (session) {
      fetchUserData(); 
    }
  }, [session]);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <a href="/" className={styles.logo}>Progetto Finale</a>

          {/* Search Bar */}
          <form className={styles.searchBar} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Cerca un gioco..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          {/* User Menu o Accedi/Registrati */}
          {session && session.user ? (
            <Box sx={{ flexGrow: 0 }} className={styles.avatarMenu}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User Avatar"
                    src={userData?.avatar_url ? `${userData.avatar_url}?t=${new Date().getTime()}` : undefined}
                    className={styles.avatar}
                  />
                </IconButton>
              </Tooltip>
              <Typography
                sx={{ textAlign: "center", p: 0, cursor: "pointer" }}
                onClick={handleOpenUserMenu}
                className={styles.email}
              >
                {userData?.username || session.user.email}
              </Typography>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                 <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <Link to={"/account"} style={{ textDecoration: "none" }}>
                      Profilo
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{ textAlign: "center", color: "black" }}
                    onClick={signOut}
                  >
                    Esci
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login">Accedi</Link>
              <Link to="/register">Registrati</Link>
            </div>
          )}
        </div>
      </nav>

      {isAvatarModalOpen && <AvatarUpload url={userData?.avatar_url} size={40} onUpload={updateAvatarUrl} />}
      <Toaster position="bottom-center" />
    </>
  );
}