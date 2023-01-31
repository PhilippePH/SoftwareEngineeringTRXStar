import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectedOptions from "../playlist/SelectedOptions";
import { setFocus } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";

const SelectFocus = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const focusOptions = ["HIIT", "Strength", "Endurance", "Recovery"];

    const clickHandler = (option) => {
        dispatch(setFocus(option))
        navigate("/select/duration");
    }

    return (
        <div>
            <ul>
                {
                    focusOptions?.map((focusOption) => {
                        return (
                            <button key={focusOption} onClick={()=>clickHandler(focusOption)}>
                                {focusOption}
                            </button>
                        )
                    })
                }
            </ul>
            <SelectedOptions/>
            <NavButtons
                prev="/select/difficulty"
                next="/select/duration"
            />
        </div>
    )
}

export default SelectFocus;