import Timer from './Timer';
import './RestPage.scss'
import BasicButton from './BasicButton';

const RestPage = ({ nextVideo, restData, nextExerciseName }) => {

    return (
        <>
            <div className='container-rest'>
            <div className="message1">
                    <h1>Rest</h1>
                    </div>
                <div className='timer-div'>
                    <Timer onTimeout={nextVideo} />
                </div>
                <div
                className = "button-div">
                    <BasicButton
                        option={"Skip to next exercise"}
                        next={nextVideo}
                    />
                    </div>
                <div className="message1">
                    <h1>Next up</h1>
                <div className="message2">
                    <h1>{nextExerciseName}</h1>
                    </div>
                </div>


            </div>

        </>

    )
}

export default RestPage;
