import { useDispatch } from "react-redux";
import SelectedOptions from "../playlist/SelectedOptions";
import { setBodyParts } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";

const SelectBodyParts = () => {
    const dispatch = useDispatch();
    const bodyPartsOptions = [
        "Core",
        "Lower Body",
        "Upper body"
    ];

    const clickHandler = (option) => {
        dispatch(setBodyParts(option));
    }

    return (
        <div>
            <ul>
                {
                    bodyPartsOptions?.map((bodyPartsOption) => {
                        return (
                            <button key={bodyPartsOption} onClick={()=>clickHandler(bodyPartsOption)}>
                                {bodyPartsOption}
                            </button>
                        )
                    })
                }
            </ul>
            <SelectedOptions/>
            <NavButtons
                prev="/select/duration"
                next="/select/muscles"
            />
        </div>
    )
}

export default SelectBodyParts;