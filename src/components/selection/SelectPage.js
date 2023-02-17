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
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: '100vh'
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1
                }}
            >
                <SelectProgress/>
                
            </div>
            
            {selectForm}
            
        </div>
    )
}

export default SelectPage;