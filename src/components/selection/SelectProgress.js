import { useSelector } from "react-redux";
import { DIFFICULTY, DURATION, FOCUS, MUSCLES, MUSCLE_GROUPS } from "../utils/constants";
import './style.scss'

const SelectProgress = () => {

    const activeTab = useSelector((state) => (state.select.activeTab));

    return (
        <div className="progress-container">
            <div className="progress-text">
                {"Select your preferences"}
            </div>
            <div className="tab-container">
                <div className={activeTab==DIFFICULTY?"active-tab":"inactive-tab"}/>
                <div className={activeTab==FOCUS?"active-tab":"inactive-tab"}/>
                <div className={activeTab==DURATION?"active-tab":"inactive-tab"}/>
                <div className={activeTab==MUSCLE_GROUPS?"active-tab":"inactive-tab"}/>
                <div className={activeTab==MUSCLES?"active-tab":"inactive-tab"}/>
            </div>
        </div>
    )
}

export default SelectProgress;