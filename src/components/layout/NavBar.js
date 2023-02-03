import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { GrHomeRounded } from "react-icons/gr";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <div 
            id="navbar-container"
            style={{
                position: "sticky",
                top: "0px",
                width: "100%",
                display: "flex",
                alignItems: "center",
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
                        height: "2rem",
                        width: "2rem"
                    }}
                    src={logo}
                    alt={"logo"}
                />
            </div>
            <div 
                id="navbar-home" 
                onClick={() => { navigate("/") }}
                style={{
                    cursor: "pointer"
                }}
            >
                <GrHomeRounded
                    style={{
                        "&:hover": {
                            backgroundColor: "red",
                            color: "green"
                          },
                    }}
                />
            </div>  
        </div>
    )
}

export default NavBar;