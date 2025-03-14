import { useContext, useState } from "react";
import { getLanding } from "../../services/landingService";
import { UserContext } from "../../contexts/UserContext";

const Landing = () => {
    const { user } = useContext(UserContext);
    const [landing, setLanding] = useState([]);

    const fetchLanding = async () => {
        try {
            const landing = await getLanding();
            setLanding(landing);
        } catch (err) {
            console.log(err);
        }
    }

    fetchLanding();

    return (
        <>
            <div>
                <h1>{landing}</h1>
            </div>
            {!user ? (
                <h1> There is no user</h1>
            ) : (
                <h1> Welcome {user.username}</h1>
            )}
        </>
    )
}

export default Landing;