import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";
import { useEffect } from "react";
import { DURATION, FOCUS, MUSCLE_GROUPS } from "../utils/constants";
import SelectButton from "../utils/SelectButton";
import './style.scss'
import { OverlayTrigger, Popover } from "react-bootstrap";
import { RiInformationFill } from "react-icons/ri";

const SelectFocus = () => {

    const dispatch = useDispatch();
    const focusOptions = ["HIIT", "Strength", "Endurance", "Recovery"];

    const completed = useSelector((state) => (state.select.focus));
    const direction = useSelector((state) => (state.select.navDirection));

    useEffect(() => {
        dispatch(setActiveTab(FOCUS));
    }, []);

    return (
        <>
        <div className="title">
            <div className="title__wrapper"/>
            <div className="title__text" > Focus </div>
            <OverlayTrigger 
                trigger={['hover', 'focus', 'click']} 
                placement="bottom" overlay={popover}>
                <div className="title__wrapper">
                    <RiInformationFill className='title__icon'/>
                </div>  
            </OverlayTrigger>
        </div>
        <div className='selection-container'>
            <div className="selection-container__left">
                <NavButtons prev={`/select/${DURATION}`}/>
            </div>
            <div 
                className="selection-container__options"
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
            <div className="selection-container__right">
                {completed && <NavButtons next={`/select/${MUSCLE_GROUPS}`}/>}
            </div>
                    
        </div>
        </>

    ) 
    
}

export default SelectFocus;

const popover = (
    <Popover id="popover-basic" className="popover">
      <Popover.Body className='popover__text'>
        The focus determines the type of exercises. 
        <ul>
        <li>HIIT: High intensity intervals of work and rest</li>
        <li>Strength: Resistance training to build muscle and increase strength </li>
        <li>Endurance: Low-to-moderate intensity exercises to build cardiovascular endurance</li>
        <li>Recovery: Active recovery exercises to help with muscle soreness and prevent injury </li>
        </ul>
      </Popover.Body>
    </Popover>
);