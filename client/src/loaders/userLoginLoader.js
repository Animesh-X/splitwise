
import { redirect } from "react-router-dom";

const getUserFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem("splitwiseUser");
    if (loggedUserJSON) {
        return JSON.parse(loggedUserJSON);
    }
    return null;
};

const userLoginLoader = async () => {
    const user = getUserFromLocalStorage();
    if (user) {
        return redirect("/dashboard");
    }
    return { user };
};

export default userLoginLoader;