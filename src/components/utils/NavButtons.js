import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setNavDirection } from "../../redux/slices/selectSlice";

const fadeIn = `
    @keyframes fade-in {
        0%   { opacity: 0; }
        50%  { opacity: 0; }
        100% { opacity: 1; }
    }`;

const NavButtons = ({prev, next}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const navigateHandler = (to, dir) => {
        dispatch(setNavDirection(dir))
        navigate(to);
    }
    return (
        <div style={{
            display: "flex", 
            // justifyContent: "center", 
            // alignItems: "center"
            
            }}>
                <style children={fadeIn} /> 
            {
                prev
                &&
                <IoIosArrowBack 
                    className="nav-button"
                    onClick={()=>{navigateHandler(prev, "backwards")}}
                />
            }
            {
                next 
                &&
                <IoIosArrowForward 
                    className="nav-button"
                    onClick={()=>{navigateHandler(next, "forwards")}}
                />
            }
        </div>
    )
}

export default NavButtons;