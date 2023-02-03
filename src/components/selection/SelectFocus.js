import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectedOptions from "../playlist/SelectedOptions";
import { setActiveTab, setFocus } from "../../redux/slices/selectSlice";
import NavButtons from "../layout/NavButtons";
import { useEffect } from "react";
import { DIFFICULTY, DURATION, FOCUS } from "../utils/constants";
import SelectButton from "../utils/SelectButton";

const SelectFocus = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const focusOptions = ["HIIT", "Strength", "Endurance", "Recovery"];

    const clickHandler = (option) => {
        dispatch(setFocus(option))
        navigate(`/select/${DURATION}`);
    }

    useEffect(() => {
        dispatch(setActiveTab(FOCUS));
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
                    focusOptions?.map((option) => {
                        return (
                            <SelectButton 
                                key={option} 
                                type={FOCUS} 
                                option={option}
                                to={`/select/${DURATION}`} 
                            />
                        )
                    })
                }
            </ul>
            <SelectedOptions/>
            <NavButtons
                prev={`/select/${DIFFICULTY}`}
                next={`/select/${DURATION}`}
            />
        </div>
    )
}

export default SelectFocus;