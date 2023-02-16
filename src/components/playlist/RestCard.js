import { RiTimerLine } from 'react-icons/ri'
import './ExerciseCard.scss'

const RestCard = ({time}) => {
    return(
            <div className='rest-card'>
                <RiTimerLine size={28} />
                <p className='rest-card__text'>{time}s rest</p>
            </div>
           
    );
}

export default RestCard;