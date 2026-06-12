import { useNavigateDelay } from "../../hooks/useNavigateDelay";
import { ROUTES } from "../../constants/routes";

const Portfolio = () => {

    useNavigateDelay(ROUTES.HOME);

    return (
        <div className="flex items-center justify-center h-screen bg-warm-150">
            <p>The project is this website! Redirecting you to the homepage...</p>
        </div>
    )
}
export default Portfolio;