import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";



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
                <IoIosArrowBack 
                    style={{
                        // borderRadius: "8px"
                        fontSize:"50px",
                        cursor: "pointer",
                        color: "gray",
                    }}
                    onClick={()=>{navigateHandler(prev)}}
                />
            }
            {
                next 
                &&
                <IoIosArrowForward 
                    style={{
                        // borderRadius: "8px"
                        fontSize:"50px",
                        cursor: "pointer",
                        color: "gray"
                    }}
                    onClick={()=>{navigateHandler(next)}}
                />
            }
        </div>
    )
}

export default NavButtons;