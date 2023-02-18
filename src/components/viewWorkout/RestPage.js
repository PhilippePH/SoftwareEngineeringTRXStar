import Timer from './Timer';
import './RestPage.scss'
import BasicButton from './BasicButton';

const RestPage = ({ nextVideo, restData, nextExerciseName }) => {

    return (
        <>
            <div className='container-rest'>
            <div className="message-black1">
                </div>
                <div className="message-black1">
                    Rest
                </div>
                <div className='timer-div'>
                    <Timer onTimeout={nextVideo}  restData = {restData}/>
                </div>
                <div className="message-black2">
                    Next up
                </div>
                <div className="message-yellow">
                    {nextExerciseName}
                </div>
                <div
                    className="button-div">
                    <BasicButton
                        option={"Next exercise"}
                        next={nextVideo}
                    />
                </div>


            </div>

        </>

    )
}

export default RestPage;
