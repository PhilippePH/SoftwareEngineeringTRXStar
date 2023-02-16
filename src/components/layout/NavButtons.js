import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import { GoArrowLeft, GoArrowRight } from "react-icons/go";



const NavButtons = ({prev, next}) => {
    const navigate = useNavigate();

    const navigateHandler = (to) => {
        navigate(to);
    }
    return (
        <div style={{
            display: "flex", 
            // justifyContent: "center", 
            // alignItems: "center"
            
            }}>
            {
                prev
                &&
                <GoArrowLeft 
                    style={{
                        // borderRadius: "8px"
                        fontSize:"50px",
                        cursor: "pointer"
                    }}
                    onClick={()=>{navigateHandler(prev)}}
                />
            }
            {
                next 
                &&
                <GoArrowRight 
                    style={{
                        // borderRadius: "8px"
                        fontSize:"50px",
                        cursor: "pointer"
                    }}
                    onClick={()=>{navigateHandler(next)}}
                    Next
                />
            }
        </div>
    )
}

export default NavButtons;