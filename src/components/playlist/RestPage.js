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
            <div className="RestPage">
                <Timer onTimeout={nextVideo} />
                    <BasicButton
                        option={"Skip to next exercise"}
                        next = {nextVideo}
                        />
            </div>


        </>

    )
}

export default RestPage;
