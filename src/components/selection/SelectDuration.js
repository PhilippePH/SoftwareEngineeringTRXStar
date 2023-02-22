import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveTab, setDuration } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";
import { useEffect, useState } from "react";
import { DURATION, FOCUS, MUSCLE_GROUPS } from "../utils/constants";
import SelectButton from "../utils/SelectButton";
import './style.scss'

const SelectDuration = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const durationOptions = [
        "15 min", 
        "30 min",
        "45 min",
        "60 min"
    ];
    const completed = useSelector((state) => (state.select.duration));
    const direction = useSelector((state) => (state.select.navDirection));

    const clickHandler = (option) => {
        dispatch(setDuration(option));
        navigate(`/select/${MUSCLE_GROUPS}`);
    }

    useEffect(() => {
        dispatch(setActiveTab(DURATION));
    }, []);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    
    return (
        <>
        <div className="category-div">
            Duration
        </div>
        <div className="selection-container">
            <div className="left-arrow-div">
                <NavButtons prev={`/select/${FOCUS}`}/>
            </div>
            <div 
                className="options-div"
                style={{
                    animation: (direction=="forwards")? "slide-in-right 0.5s forwards":"slide-in-left 0.5s forwards",   
                }}
            >
                {
                    durationOptions?.map((option) => {
                        return (
                            <SelectButton 
                                key={option} 
                                type={DURATION} 
                                option={option} 
                                to={`/select/${MUSCLE_GROUPS}`}
                                selected = {completed}
                            />
                        )
                    })
                }
            </div>
            <div className="right-arrow-div">
                {completed && <NavButtons next={`/select/${MUSCLE_GROUPS}`}/>}
            </div>
        </div>
        </>
        //     <ul
        //         style={{
        //             display: "grid",
        //             placeItems: "center",
        //             justifyContent: "center",
        //             alignItems: "center",
        //             maxWidth: "25rem",
        //             width: "100%",
        //             marginTop: "10%",
        //             marginBottom: "5%",
        //             padding: "0px",
        //             gridTemplateColumns: width > 768 ? 'repeat(2, 1fr)' : '1fr',
        //             gridRowGap: '10px',
        //             gridColumnGap: "10px",
        //         }}
        //     >
        //         {
        //             durationOptions?.map((option) => {
        //                 return (
        //                     <SelectButton 
        //                         key={option} 
        //                         type={DURATION} 
        //                         option={option} 
        //                         to={`/select/${MUSCLE_GROUPS}`}
        //                     />
        //                 )
        //             })
        //         }
        //     </ul>
        //     {/* <SelectedOptions/> */}
        //     <div
        //         style={{width:"200%"}}
        //         >
                
        //     </div>
        // </div>
        // </>
    )
}

export default SelectDuration;