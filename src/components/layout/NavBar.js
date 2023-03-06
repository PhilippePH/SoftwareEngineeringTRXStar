import { useNavigate, useLocation} from "react-router-dom";
import logo from "../../assets/logo.png";
import { GrHomeRounded } from "react-icons/gr";

const withoutSidebarRoutes = ["/youtube"];


const NavBar = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    if (withoutSidebarRoutes.some((item) => pathname.includes(item))) return null;

    return (
        <div 
            id="navbar-container"
            style={{
                position: "sticky",
                top: "0px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                justifyContent: "space-between",
                borderBottom: "2px solid black",
                paddingTop: "1rem",
                paddingBottom: "0.5rem"
            }}
        >
            <div 
                id="navbar-logo" 
                onClick={() => { navigate("/") }}
                style={{
                    cursor: "pointer"
                }}
            >
                <img
                    style={{
                        paddingLeft: "1rem",
                        height: "2.5rem",
                        width: "3.5rem"
                    }}
                    src={logo}
                    alt={"logo"}
                />
            </div>
            <div 
                id="navbar-home" 
                onClick={() => { navigate("/") }}
                style={{
                    paddingRight: 15,
                    cursor: "pointer"
                }}
            >
                <p>RIP House</p>
            </div>  
        </div>
    )
}

export default NavBar;