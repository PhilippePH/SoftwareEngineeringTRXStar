import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectedOptions from "../playlist/SelectedOptions";
import { setActiveTab, setDuration } from "../../redux/slices/selectSlice";
import NavButtons from "../layout/NavButtons";
import { useEffect } from "react";
import { DURATION, FOCUS, MUSCLE_GROUPS } from "../utils/constants";
import SelectButton from "../utils/SelectButton";

const SelectDuration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const durationOptions = [
        "15 min", 
        "30 min",
        "45 min",
        "60 min"
    ];

    const clickHandler = (option) => {
        dispatch(setDuration(option));
        navigate(`/select/${MUSCLE_GROUPS}`);
    }

    useEffect(() => {
        dispatch(setActiveTab(DURATION));
    }, []);

    return (
        <div>
            <ul
                style={{
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    padding: "0px"
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
                            />
                        )
                    })
                }
            </ul>
            <SelectedOptions/>
            <NavButtons
                prev={`/select/${FOCUS}`}
                next={`/select/${MUSCLE_GROUPS}`}
            />
        </div>
    )
}

export default SelectDuration;