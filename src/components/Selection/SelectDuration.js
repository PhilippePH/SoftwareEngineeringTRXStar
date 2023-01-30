import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectedOptions from "../playlist/SelectedOptions";
import { setDuration } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";

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
        navigate("/select/body-part");
    }

    return (
        <div>
            <ul>
                {
                    durationOptions?.map((durationOption) => {
                        return (
                            <button key={durationOption} onClick={()=>clickHandler(durationOption)}>
                                {durationOption}
                            </button>
                        )
                    })
                }
            </ul>
            <SelectedOptions/>
            <NavButtons
                prev="/select/focus"
                next="/select/body-part"
            />
        </div>
    )
}

export default SelectDuration;