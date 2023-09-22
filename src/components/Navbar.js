import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { MenuList } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { sectionChange } from "../redux/actions/sectionAction";
import { userLogoutAction } from "../redux/actions/userAction";

import { Link, useNavigate } from "react-router-dom";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.signIn);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function changeSectionHandler(section) {
    dispatch(sectionChange(section));
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // log out user
  const logOutUser = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {userInfo ? (
        <>
          <MenuItem onClick={handleMenuClose}>
            <Link to={"/"} onClick={handleMenuClose}>
              Home
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to={"/admin/dashboard"} onClick={handleMenuClose}>
              Dashboard
            </Link>
          </MenuItem>
         
          <MenuItem onClick={logOutUser}>Logout</MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={handleMenuClose}>
            <Link to={"/"} onClick={handleMenuClose}>
              Home
            </Link>
          </MenuItem>

          <MenuItem onClick={handleMenuClose}>
            <Link to={"/login"} onClick={handleMenuClose}>
              Login
            </Link>
          </MenuItem>

          <MenuItem onClick={handleMenuClose}>
            <Link to={"/register"} onClick={handleMenuClose}>
              Register
            </Link>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuList className="flex flex-col">
        <MenuItem
          className="!pl-7"
          onClick={() => changeSectionHandler("Anasayfa")}
        >
          <Link to={"/"}>Anasayfa</Link>
        </MenuItem>
        <MenuItem
          className="!pl-7"
          onClick={() => changeSectionHandler("Yazilar")}
        >
          Yazılar
        </MenuItem>
        <MenuItem
          className="!pl-7"
          onClick={() => changeSectionHandler("Siirler")}
        >
          Şiirler
        </MenuItem>
        <MenuItem
          className="!pl-7"
          onClick={() => changeSectionHandler("Makaleler")}
        >
          Makaleler
        </MenuItem>
        <MenuItem
          className="!pl-7 !pr-4"
          onClick={() => changeSectionHandler("Gundeme-Dair")}
        >
          Gündeme Dair
        </MenuItem>

        <MenuItem className="!pl-7">
          <Link to={"/admin/hakkimda"}>Hakkımda</Link>
        </MenuItem>
      </MenuList>

   
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }} className="pt-12">
      <AppBar className="grid place-content-center sticky top-0  !bg-[#FFFFFF] !text-slate-800 !shadow-sm">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="pr-8 pl-12"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Ali Çendek
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }} className="pr-4">
            <MenuList className="flex flex-row">
            

              {/* {userInfo ??  userInfo.role === "admin" &&     <MenuItem onClick={() => changeSectionHandler("anasayfa")}> */}
              {userInfo ? (
                <>
                  {userInfo.role === "admin" && (
                     <MenuItem onClick={() => changeSectionHandler("Anasayfa")}>
                     Anasayfa
                   </MenuItem>
                  )}
                </>
              ) : (
                <MenuItem onClick={() => changeSectionHandler("Anasayfa")}>
                <Link to={"/"}>Anasayfa</Link>
              </MenuItem>
              )}

              <MenuItem onClick={() => changeSectionHandler("Yazilar")}>
                Yazılar
              </MenuItem>
              <MenuItem onClick={() => changeSectionHandler("Siirler")}>
                Şiirler
              </MenuItem>
              <MenuItem onClick={() => changeSectionHandler("Makaleler")}>
                Makaleler
              </MenuItem>
              <MenuItem onClick={() => changeSectionHandler("Gundeme-Dair")}>
                Gündeme Dair
              </MenuItem>

              {userInfo ? (
                <>
                  {userInfo.role === "admin" && (
                     <MenuItem>
                     <Link to={"/admin/profile"}>Hakkımda</Link>
                   </MenuItem>
                  )}
                </>
              ) : (
                <MenuItem>
                <Link to={"/admin/hakkimda"}>Hakkımda</Link>
              </MenuItem>
              )}

                </MenuList>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
