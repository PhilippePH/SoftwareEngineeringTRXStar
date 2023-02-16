import React from 'react';
import './basicButton.scss';
import { useEffect, useState } from 'react';


const BasicButton = ({option, next}) => {

    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);


  return (
        <button className='basic-button'
            onClick={next}
            style={{
                //width: width > 768 ? "320px" : width < 500? "200px" : "260px",
                //height: width > 768 ? "6rem": width < 500? "3rem": "4rem",
                //fontSize: width > 768 ? "1.5rem": width < 500? "0.75rem":"1rem",                        paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                textAlign: "center",
                border: "1px solid black",
                borderRadius: "20px",
                
            }}>
                {option}
        </button>
  );
}

export default BasicButton;