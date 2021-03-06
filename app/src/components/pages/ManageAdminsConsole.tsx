import React, { useState, useEffect } from "react";
import Elle from "../../images/Elle";
import {
    streamAllUserProfiles,
    updateAdmin,
} from "../../firebase/users/UserService";
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
            <div className="col-md col-12 d-grid">
                <button
                    type="button"
                    className="btn btn-danger"
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

    useEffect(() => {
        const unsubscribe = streamAllUserProfiles(
            (updatedSnaps) => setUsers(updatedSnaps),
            (error) => console.log(error)
        );
        return unsubscribe;
    }, [streamAllUserProfiles, setUsers]);

    return (
        <div className="my-3">
            <h2>
                <Elle className="mini-elle-image" />
                Manage Admins Console
            </h2>
            <p className="styled-horizontal-rule" />
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
