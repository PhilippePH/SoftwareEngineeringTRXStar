import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";



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
                <MdArrowBackIos 
                    style={{
                        // borderRadius: "8px"
                        fontSize:"50px",
                        cursor: "pointer",
                        color: "gray"
                    }}
                    onClick={()=>{navigateHandler(prev)}}
                />
            }
            {
                next 
                &&
                <MdArrowForwardIos 
                    style={{
                        // borderRadius: "8px"
                        fontSize:"50px",
                        cursor: "pointer",
                        color: "gray"
                    }}
                    onClick={()=>{navigateHandler(next)}}
                    Next
                />
            }
        </div>
    )
}

export default NavButtons;