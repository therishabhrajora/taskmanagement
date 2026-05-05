import { HomeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Homebtn() {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate("/dashboard")}>
                <HomeIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 hover:cursor-pointer mx-5" aria-hidden="true" />
            </button>
        </>
    )
}