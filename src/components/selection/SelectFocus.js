import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveTab, setFocus } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";
import { useEffect, useState } from "react";
import { DIFFICULTY, DURATION, FOCUS } from "../utils/constants";
import SelectButton from "../utils/SelectButton";
import './style.scss'


const SelectFocus = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const focusOptions = ["HIIT", "Strength", "Endurance", "Recovery"];
    const completed = useSelector((state) => (state.select.focus));
    const direction = useSelector((state) => (state.select.navDirection));

    const clickHandler = (option) => {
        dispatch(setFocus(option))
        navigate(`/select/${DURATION}`);
    }

    useEffect(() => {
        dispatch(setActiveTab(FOCUS));
    }, []);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <>
        <div className="category-div"> 
            FOCUS
        </div>
        <div className='selection-container'>
            <div className="left-arrow-div">
                <NavButtons prev={`/select/${DIFFICULTY}`}/>
            </div>
            <div 
                className="options-div"
                style={{
                    animation: (direction=="forwards")? "slide-in-right 0.5s forwards":"slide-in-left 0.5s forwards",   
                }}
            >
                {
                    focusOptions?.map((option) => {
                        return (
                            <SelectButton 
                                key={option} 
                                type={FOCUS} 
                                option={option}
                                to={`/select/${DURATION}`} 
                                selected = {completed}
                            />
                        )
                    })
                }
            </div>
            <div className="right-arrow-div">
                {completed && <NavButtons next={`/select/${DURATION}`}/>}
            </div>
                    
        </div>
        </>

    )

            {/* <ul
                style={{
                    display: "grid",
                    justifyContent: "center",
                    placeItems: "center",
                    marginTop: "10%",
                    marginBottom: "5%",
                    alignItems: "center",
                    maxWidth: "25rem",
                    width: "100%",
                    maxHeight:"100%",
                    padding: "0px",
                    gridTemplateColumns: width > 768 ? 'repeat(2, 1fr)' : '1fr',
                    gridRowGap: '10px',
                    gridColumnGap: "10px",
                }}
            > 
                
            </ul> */}
            {/* <SelectedOptions/> */}
            
            {/* <div
                style={{width:"200%"}}
                >
                <NavButtons
                    prev={`/select/${DIFFICULTY}`}
                    next={null}
                />
            </div> */}

    
}

export default SelectFocus;