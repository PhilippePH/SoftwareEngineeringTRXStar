import SelectProgress from "./SelectProgress";



const style = {
    display: "flex",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const SelectPage = ({ selectForm }) => {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <SelectProgress/>
                
            </div>
            <div>
                {selectForm}
            </div>
        </>
    )
}

export default SelectPage;