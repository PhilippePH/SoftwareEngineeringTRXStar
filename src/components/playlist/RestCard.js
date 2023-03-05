
import './ExerciseCard.scss'

const RestCard = ({time}) => {
    return(
            <div className='rest-card'>
              
                <p className='rest-card__text'>{time}s rest</p>
            </div>
           
    );
}

export default RestCard;