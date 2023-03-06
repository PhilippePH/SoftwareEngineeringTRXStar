
import './ExerciseCard.scss'
import { BsHourglassSplit, BsTrash } from 'react-icons/bs';
import { useState } from 'react';
import { store } from '../../redux/store';
import { removeFromPlaylist } from "../../redux/slices/playlistSlice.js"

const RestCard = ({time, index}) => {

    const [isFadingOut, setIsFadingOut] = useState(false);

    const fadeOut = (event) => {
        setIsFadingOut(true);
    };
    
    const handleRemoveDiv = (event) => {
        event.stopPropagation();
        fadeOut(); 
        setTimeout(() => {
            store.dispatch(removeFromPlaylist(index));
            setIsFadingOut(false);
          }, 1000000);
      };

    return(
        <div className={isFadingOut ? 'item-fadeout' : 'item1'}>
        <div className={'custom-container'}
        style = {{minHeight : 50}}>
                    <div>
                        <div className={'exercise-card'}>
                            <div className={'exercise-card__left-container'}>
                                <BsHourglassSplit size={28} color='gray' />
                                <div className='exercise-card__exercise-name'>
                                    {time}s rest
                                </div>
                            </div>
                            <div className='exercise-card__right-container' >
                                <BsTrash size={28} className='exercise-card__trash' onClick={handleRemoveDiv} style={{ marginRight: '10px', strokeWidth: '0.3' }} />
                            </div>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
        </div>


           
    );
}

export default RestCard;