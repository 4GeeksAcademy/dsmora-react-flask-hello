import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const PrivateRoute = ({ children }) => {
    const { actions } = useContext(Context);
    const [isLogged, setLogged] = useState(false)
    const navigate = useNavigate();

    const getUser = async () => {
        await actions.getLoggedUser().then(resp => setLogged(resp));
    }
    getUser();

    if (!isLogged) navigate('/demo');

    return (children)
};
