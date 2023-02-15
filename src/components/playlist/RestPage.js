import Timer from './Timer';
import './RestPage.scss'
import BasicButton from './BasicButton';

const RestPage = ({nextVideo, restData, nextExerciseName}) => {

    return (
        <>
            <div className="message1">
                <h1>Next up</h1>
                </div>
                <div className="message2">
                <h1>{nextExerciseName}</h1>
            </div>
            <div className="RestPage"
                style={{
                    display:"grid",
                    height:"200%",
                    placeItems:"center",
                    justifyContent:"center",
                    alignContent:"center"
                    }}>
                
                <div>
                    <Timer onTimeout={nextVideo} />
                </div>
                
                
                <div    
                    style={{
                    paddingTop:"50px",
                    display:"grid",
                    placeItems:"center",
                    justifyContent:"center",
                    alignContent:"center"
                    }}>
                    <BasicButton
                        option={"Skip to next exercise"}
                        next = {nextVideo}
                    />
                </div>
                    
            </div>


        </>

    )
}

export default RestPage;
