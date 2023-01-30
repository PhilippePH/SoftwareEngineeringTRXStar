import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectedOptions from "../playlist/SelectedOptions";
import { setDifficulty } from "../../redux/slices/selectSlice";
import NavButtons from "../utils/NavButtons";

const SelectDifficulty = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const difficultyOptions = ["easy", "medium", "hard"];
    // useSelector allows us to access the global state - retrieve state with callback function
    const completed = useSelector((state) => (state.select.difficulty))

    const clickHandler = (option) => {
        dispatch(setDifficulty(option))
        navigate("/select/focus");
    }

    return (
        <div>
            <ul>
                {
                    difficultyOptions?.map((difficultyOption) => {
                        return (
                            <button key={difficultyOption} onClick={()=>clickHandler(difficultyOption)}>
                                {difficultyOption}
                            </button>
                        )
                    })
                }
            </ul>
            <SelectedOptions/>
            <NavButtons
                prev={null}
                next={"/select/focus"}
                completed={completed}
            />
        </div>
    )
}

export default SelectDifficulty;