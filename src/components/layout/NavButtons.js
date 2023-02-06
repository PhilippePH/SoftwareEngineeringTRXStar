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
                <button onClick={()=>{navigateHandler(prev)}}>
                    Prev
                </button>
            }
            {
                next 
                &&
                <button onClick={()=>{navigateHandler(next)}}>
                    Next
                </button>
            }
        </div>
    )
}

export default NavButtons;