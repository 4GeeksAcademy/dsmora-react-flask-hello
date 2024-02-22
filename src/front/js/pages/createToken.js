import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const CreateToken = () => {
    const { store, actions } = useContext(Context);

    const { token } = store;

    const navigate = useNavigate();

    const body = {
        email: "test@test.com",
        password: "test"
    };


    return (
        <div className="text-center">
            <h1>Create Token</h1>
            <button onClick={() => actions.createToken(body)}>Create Token</button>

            {
                token &&
                <div>
                    <button onClick={() => navigate('/users')}>Get Users</button>
                </div>
            }

        </div>
    );
};
