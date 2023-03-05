import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveTab, setFocus } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";
import { useEffect, useState } from "react";
import { DURATION, FOCUS, MUSCLE_GROUPS } from "../utils/constants";
import SelectButton from "../utils/SelectButton";
import './style.scss'
import { OverlayTrigger, Popover } from "react-bootstrap";
import { RiInformationFill } from "react-icons/ri";

const SelectFocus = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const focusOptions = ["HIIT", "Strength", "Endurance", "Recovery"];
    const completed = useSelector((state) => (state.select.focus));
    const direction = useSelector((state) => (state.select.navDirection));

    const clickHandler = (option) => {
        dispatch(setFocus(option))
        navigate(`/select/${MUSCLE_GROUPS}`);
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
        <div className="title-div">
            <div className="info-wrapper"/>
            <div className="title-text" > Focus </div>
            <OverlayTrigger trigger={['click', 'hover']} placement="top" overlay={popover}>
                <div className="info-wrapper">
                    <RiInformationFill className='info-icon' size={20} />
                </div>  
            </OverlayTrigger>
            
        </div>
        <div className='selection-container'>
            <div className="left-arrow-div">
                <NavButtons prev={`/select/${DURATION}`}/>
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

    ) 
    
}

export default SelectFocus;

const popover = (
    <Popover id="popover-basic" className="popover-display">
      <Popover.Body className='popover-text'>
        The focus determines the type of exercises and the rest periods. 
        <ul>
        <li>HIIT: </li>
        <li>Strength: </li>
        <li>Endurance: </li>
        <li>Recovery: </li>
        </ul>
      </Popover.Body>
    </Popover>
);