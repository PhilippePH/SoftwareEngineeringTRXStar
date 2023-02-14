import React from 'react';
import './BasicButton.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const BasicButton = ({option, next}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

  return (
        <button className='basic-button'
            onClick={next}
            style={{
                width: "8rem",
                paddingTop: "0.5rem",
                paddingbottom: "0.5rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                textAlign: "center",
                cursor: "pointer",
                border: "2px solid black",
                borderRadius: "8px",
                margin: "4rem 9.5rem"
            }}
        
        >
            <p
                style={{
                    fontSize: "1.1rem"
                }}
            >
                {option}
            </p>
        </button>
  );
}

export default BasicButton;