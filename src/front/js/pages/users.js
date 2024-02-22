import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const { store, actions } = useContext(Context);

    const navigate = useNavigate()

    const { token } = store;

    useEffect(() => {
        actions.getUsers();
    }, [])

    if (!token) {
        navigate("/create-token");
        return null;
    };

    const { users } = store;

    if (!users.length) {
        return null
    }

    return (
        <div className="text-center">
            <ul>
                {users.map((user) =>
                    <li key={user.id}>
                        <p>{user.email}</p>
                    </li>
                )}
            </ul>
        </div>
    );
};
