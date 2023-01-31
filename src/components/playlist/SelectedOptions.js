import { useSelector } from "react-redux"

// just to display the current redux state, not needed in final app
const SelectedOptions = () => {
    const selectedOptions = useSelector((state) => (state.select));

    return (
        <div>
            <h1>Selected options:</h1>
            <ul>
                {JSON.stringify(selectedOptions, null, "\t")}
            </ul>
        </div>
    )
}

export default SelectedOptions;