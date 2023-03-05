import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveTab, setDuration } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";
import { useEffect, useState } from "react";
import { DURATION, FOCUS, DIFFICULTY} from "../utils/constants";
import SelectButton from "../utils/SelectButton";
import './style.scss'
import { AiFillInfoCircle } from "react-icons/ai";
import { OverlayTrigger, Popover } from "react-bootstrap";

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
        navigate(`/select/${FOCUS}`);
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
        <div className="title-div">
            <div className="info-wrapper"/>
            <div className="title-text" > Duration </div>
            <OverlayTrigger trigger={['click', 'hover']} placement="top" overlay={popover}>
                <div className="info-wrapper">
                    <AiFillInfoCircle className='info-icon' size={20} />
                </div>  
            </OverlayTrigger>
            
        </div>
        <div className="selection-container">
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
                    durationOptions?.map((option) => {
                        return (
                            <SelectButton 
                                key={option} 
                                type={DURATION} 
                                option={option} 
                                to={`/select/${FOCUS}`}
                                selected = {completed}
                            />
                        )
                    })
                }
            </div>
            <div className="right-arrow-div">
                {completed && <NavButtons next={`/select/${FOCUS}`}/>}
            </div>
        </div>
        </>
    )
}

export default SelectDuration;

const popover = (
    <Popover id="popover-basic" className="popover-display">
      {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
      <Popover.Body className='popover-text'>
        The duration determines the maximum length of your workout.
      </Popover.Body>
    </Popover>
);