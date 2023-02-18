import { useSelector } from "react-redux";
import { DIFFICULTY, DURATION, FOCUS, MUSCLES, MUSCLE_GROUPS } from "../utils/constants";
import './style.scss'
import { useNavigate } from 'react-router-dom';
import { GiJumpingRope,GiWeightLiftingUp} from "react-icons/gi";
import {BiRun} from "react-icons/bi"
import {GrYoga} from "react-icons/gr"
import {WiTime12,WiTime6,WiTime3,WiTime9} from "react-icons/wi"
import {TbAntennaBars3,TbAntennaBars4,TbAntennaBars5} from "react-icons/tb"

const SelectProgress = () => {
    const navigate = useNavigate();

    const optionIcons = {
        "15 min": WiTime3, 
        "30 min": WiTime6,
        "45 min": WiTime9,
        "60 min": WiTime12,
        "HIIT": GiJumpingRope, 
        "Strength": GiWeightLiftingUp, 
        "Endurance": BiRun, 
        "Recovery": GrYoga,
        "Easy": TbAntennaBars3, 
        "Medium": TbAntennaBars4, 
        "Hard": TbAntennaBars5,
        
    };

    const activeTab = useSelector((state) => (state.select.activeTab));
    const selectedDifficulty = useSelector((state) => (state.select.difficulty));
    const selectedFocus = useSelector((state) => (state.select.focus));
    const selectedDuration = useSelector((state) => (state.select.duration));

    return (
        <div className="progress-container">
            <div className="progress-text">
                {"Select your preferences"}
            </div>
            <div className="tab-container">
                <div className={activeTab==DIFFICULTY?"active-tab":"inactive-tab"}
                     onClick={() => { navigate(`/select/${DIFFICULTY}`) }}>
                    {selectedDifficulty && <Icon icon={optionIcons[selectedDifficulty]} />}
                </div>
                <div className={activeTab==FOCUS?"active-tab":"inactive-tab"}
                     onClick={() => { navigate(`/select/${FOCUS}`) }}>
                    {selectedFocus && <Icon icon={optionIcons[selectedFocus]} />}
                </div>
                <div className={activeTab==DURATION?"active-tab":"inactive-tab"}
                     onClick={() => { navigate(`/select/${DURATION}`) }}>
                    {selectedDuration && <Icon icon={optionIcons[selectedDuration]} />}
                </div>
                <div className={activeTab==MUSCLE_GROUPS?"active-tab":"inactive-tab"}
                     onClick={() => { navigate(`/select/${MUSCLE_GROUPS}`) }}>
                </div>
                {/* <div className={activeTab==MUSCLES?"active-tab":"inactive-tab"}/> */}
            </div>
        </div>
    )
}

export default SelectProgress;

const Icon = ({ icon }) => {
    const IconComponent = icon;
    return <IconComponent />;
};