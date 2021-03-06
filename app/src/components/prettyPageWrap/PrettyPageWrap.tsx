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
                <div className="container-fluid">
                    <Link
                        className="font-family-open-sans fw-boldest colour-primary colour-secondary-on-hover font-size-30 text-decoration-none"
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
                                            className="nav-link font-family-open-sans fw-bold cursor_pointer my-clickable-nav-item colour-secondary colour-primary-on-hover font-size-20 text-decoration-none"
                                            to="/manage/admins"
                                        >
                                            Manage Admins
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link font-family-open-sans fw-bold cursor_pointer my-clickable-nav-item colour-secondary colour-primary-on-hover font-size-20 text-decoration-none"
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
                                <span className="nav-link font-family-open-sans fw-bold colour-secondary font-size-20 text-decoration-none">
                                    {getCurrentUserName()}
                                </span>
                            </li>
                            <li className="nav-item">
                                <span className="d-none d-sm-block font-family-open-sans fw-bold colour-secondary font-size-20 text-decoration-none">
                                    <Gravatar
                                        className="rounded-3"
                                        email={getCurrentEmail()}
                                    />
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <main className="container">{children}</main>
    </>
);

export default PrettyPageWrap;
