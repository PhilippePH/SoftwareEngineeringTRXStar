import { useSelector } from "react-redux";
import { DIFFICULTY, DURATION, FOCUS, MUSCLES, MUSCLE_GROUPS } from "../utils/constants";

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem"
};

const tabContainerStyle = {
    display: "flex",
};

const activeTabStyle = {
    width: "3rem",
    height: "0.5rem",
    backgroundColor: "black",
    borderRadius: "8px",
    margin: "0.5rem"
};

const inactiveTabStyle = {
    width: "3rem",
    height: "0.5rem",
    backgroundColor: "lightgrey",
    borderRadius: "8px",
    margin: "0.5rem"
}

const SelectProgress = () => {

    const activeTab = useSelector((state) => (state.select.activeTab));

    return (
        <div
            style={containerStyle}
        >
            <div>
                {"Select your preferences"}
            </div>
            <div 
                style={tabContainerStyle}
            >
                <div
                    style={activeTab==DIFFICULTY?activeTabStyle:inactiveTabStyle}
                />
                <div
                    style={activeTab==FOCUS?activeTabStyle:inactiveTabStyle}
                />
                <div
                    style={activeTab==DURATION?activeTabStyle:inactiveTabStyle}
                />
                <div
                    style={activeTab==MUSCLE_GROUPS?activeTabStyle:inactiveTabStyle}
                />
                <div
                    style={activeTab==MUSCLES?activeTabStyle:inactiveTabStyle}
                />
            </div>
        </div>
    )
}

export default SelectProgress;