import React from 'react';
import { useEffect, useState } from 'react';
import './BasicButton.scss'


const BasicButton = ({option, next}) => {

    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);


  return (
        <button className='button'
            onClick={next}
           >
            <div className="basic-button-text">
                {option}
                </div>
        </button>
  );
}

export default BasicButton;