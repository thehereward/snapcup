import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "./SignOutButton";
import Gravatar from "react-gravatar";

import {
    getCurrentUserName,
    getCurrentEmail,
} from "../../firebase/users/UserService";

const PrettyPageWrap = ({ children, isAdmin, setLoggedIn }) => (
    <>
        <header className="sticky-top">
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <Link
                    className="title colour-purple-selected hover-purple-hover font-size-30 text-decoration-none"
                    to="/"
                >
                    Snap Cup
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarTogglerDemo01"
                >
                    <ul className="navbar-nav align-items-center">
                        {isAdmin && (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link my-clickable-nav-item colour-purple-hover hover-purple-selected font-size-20 text-decoration-none"
                                        to="/manage/admins"
                                    >
                                        Manage Admins
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link my-clickable-nav-item colour-purple-hover hover-purple-selected font-size-20 text-decoration-none"
                                        to="/manage/cups"
                                    >
                                        Manage Cups
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <SignOutButton setLoggedIn={setLoggedIn} />
                        </li>
                        <li className="nav-item">
                            <span className="nav-link my-nav-item colour-purple-hover font-size-20 text-decoration-none">
                                {getCurrentUserName()}
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="d-none d-sm-block my-nav-item colour-purple-hover font-size-20 text-decoration-none">
                                <Gravatar
                                    className="rounded-lg"
                                    email={getCurrentEmail()}
                                />
                            </span>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <main className="container">{children}</main>
    </>
);

export default PrettyPageWrap;
