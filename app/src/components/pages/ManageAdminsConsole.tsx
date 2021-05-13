import React, { useState, useEffect } from "react";
import {
    streamAllUserProfiles,
    updateAdmin,
} from "../../firebase/users/UserService";
import { StyledHorizontalRule } from "../adminConsole/AdminConsoleStyles";
import MiniElleImg from "../transferable/MiniElleImg";
import { Entity, UserProfile } from "../../types";

interface UserRowProps {
    user: Entity<UserProfile>;
}

const User: React.FC<UserRowProps> = ({ user }) => {
    return (
        <div className="row mb-2">
            <div className="col-md col-12 text-center text-md-left">
                {user.displayName}
            </div>
            <div className="col-md col-12">
                <button
                    type="button"
                    className="btn btn-block btn-danger"
                    onClick={() => updateAdmin(user.id, !user.isAdmin)}
                >
                    {user.isAdmin ? "Remove Admin" : "Make Admin"}
                </button>
            </div>
            <hr className="col-12 d-md-none" />
        </div>
    );
};

const ManageAdminsConsole = () => {
    const [users, setUsers] = useState<Entity<UserProfile>[]>([]);

    useEffect(async () => {
        const unsubscribe = streamAllUserProfiles(
            (updatedSnaps) => setUsers(updatedSnaps),
            (error) => console.log(error)
        );
        return unsubscribe;
    }, [streamAllUserProfiles, setUsers]);

    return (
        <div className="my-3">
            <h2>
                <MiniElleImg />
                Manage Admins Console
            </h2>
            <StyledHorizontalRule />
            <h3>Admins</h3>
            <div>
                {users
                    .filter((user) => user.isAdmin)
                    .map((user: Entity<UserProfile>) => (
                        <User user={user} key={user.id} />
                    ))}
            </div>
            <hr />
            <h3>Users</h3>
            <div>
                {users
                    .filter((user) => !user.isAdmin)
                    .map((user: Entity<UserProfile>) => (
                        <User user={user} key={user.id} />
                    ))}
            </div>
        </div>
    );
};

export default ManageAdminsConsole;
