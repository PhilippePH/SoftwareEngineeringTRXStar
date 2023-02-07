import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"



const NavButtons = ({prev, next}) => {
    const navigate = useNavigate();

    const navigateHandler = (to) => {
        navigate(to);
    }
    return (
        <div style={{
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center"
            }}>
            {
                prev
                &&
                <button className="button" onClick={()=>{navigateHandler(prev)}}>
                    Prev
                </button>
            }
            {
                next 
                &&
                <button className="button" onClick={()=>{navigateHandler(next)}}>
                    Next
                </button>
            }
        </div>
    )
}

export default NavButtons;