import { useLoaderData } from "react-router-dom"
import NavBar from "./NavBar";



export default function DashBoard () {
    const user = useLoaderData();

    // console.log(user);
    return (
        <div>
            <NavBar />
            Hqllo
        </div>
    )
}