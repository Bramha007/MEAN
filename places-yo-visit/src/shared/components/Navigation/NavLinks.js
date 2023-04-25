import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
    const auth = useContext(AuthContext);
    return (
        <ul className="nav-links">
            <NavLink to="/" exact>
                ALL USERS
            </NavLink>
            {auth.isLoggedIn && (
                <NavLink to="/:userId/places" exact>
                    MY PLACES
                </NavLink>
            )}
            {auth.isLoggedIn && <NavLink to="/places/new">ADD PLACE</NavLink>}
            {!auth.isLoggedIn && <NavLink to="/auth">AUTHENTICATE</NavLink>}
            {auth.isLoggedIn && (
                <li>
                    <button onClick={auth.logout}>LOGOUT</button>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
