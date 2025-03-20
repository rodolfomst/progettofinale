import { Link, useNavigate } from "react-router";
import supabase from "../supabase/client";
import { useContext, useState } from "react";
import SessionContext from "../context/SessionContext";
import { Toaster, toast } from "sonner";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

export default function Header() {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);
  const [anchorElUser, setAnchorElUser] = useState(null);

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

  return (
    <>
      <nav>
        <ul>
          {session ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src="" />
                </IconButton>
              </Tooltip>
              <Typography
                sx={{ textAlign: "center", p: 0, cursor: "pointer" }}
                onClick={handleOpenUserMenu}
              >
                {session ? session.user.email : ""}
              </Typography>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <Link to={"/account"} style={{ textDecoration: "none" }}>
                      profilo
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{ textAlign: "center", color: "black" }}
                    onClick={signOut}
                  >
                    esci 
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
            </>
          )}
        </ul>
      </nav>
      <Toaster position="bottom-center" />
    </>
  );
}
