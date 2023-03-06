import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, setNavDirection } from "../../redux/slices/selectSlice";
import { useEffect, useState } from "react";
import { DIFFICULTY, DURATION } from "../utils/constants";
import SelectButton from "../utils/SelectButton";
import NavButtons from "../utils/NavButtons";
import './style.scss';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Popover } from "react-bootstrap";
import { RiInformationFill } from "react-icons/ri";

const SelectDifficulty = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch()
    const difficultyOptions = ["Easy", "Medium", "Hard"];
    
    const completed = useSelector((state) => (state.select.difficulty))
    const direction = useSelector((state) => (state.select.navDirection))

    useEffect(() => {
        dispatch(setActiveTab(DIFFICULTY));
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
            <div className="title-text" > Difficulty </div>
            <OverlayTrigger 
                trigger={window.matchMedia('(hover: hover)').matches? 'hover': 'click'} 
                placement="top" overlay={popover}>
                <div className="info-wrapper">
                    <RiInformationFill className='info-icon'/>
                </div>  
            </OverlayTrigger>
            
        </div>
        <div className="selection-container">
            <div className="left-arrow-div"></div>
            <div className="options-div"
                style={{
                    animation: (direction=="forwards")? "slide-in-right 0.5s forwards":"slide-in-left 0.5s forwards",   
                }}>
                {difficultyOptions?.map((option) => {
                    return (

                        <SelectButton
                            key={option}
                            type={DIFFICULTY}
                            option={option}
                            to={`/select/${DURATION}`}
                            selected = {completed} />

                    );
                })}
            </div>
            <div className="right-arrow-div">
                {completed && <NavButtons 
                    next={`/select/${DURATION}`}/>}
            </div>
        </div>
        </>
    )
}

export default SelectDifficulty;

const popover = (
    <Popover id="popover-basic" className="popover-display">
      {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
      <Popover.Body className='popover-text'>
        The difficulty determines the average intensity of your workout. 
      </Popover.Body>
    </Popover>
);
