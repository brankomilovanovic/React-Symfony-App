import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAndStoreCurrentUser } from "../Actions/AuthActions";
import { useLocation, useNavigate } from "react-router-dom";
import { checkPagePermission } from "../route";

const AuthWrapper = (props) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const authUser = useSelector((state) => state.AuthReducer.authUser);
    const isUserLoading = useSelector((state) => state.AuthReducer.isUserLoading);

    useEffect(() => {
        fetchAndStoreCurrentUser(dispatch);
    }, []);

    const checkPermission = () => {

        if(!checkPagePermission(location.pathname, authUser) && !isUserLoading) {
            window.location = '/'
        }

        return props.children;
    }

    return checkPermission();
};

export default AuthWrapper;
