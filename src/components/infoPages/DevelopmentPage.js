import './infoPages.scss';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Container } from "react-bootstrap";



const Development = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <Container className='dev__container'>
        <div className='dev__title'>Development</div>
            <div className='dev__description'>
                <div className='dev__description-text'>
                    <p> Our application is open source and we welcome contributions from the community.  </p>
                    <p>If you're interested in contributing, please check out our GitLab repository and follow the instructions in the README file to get started. 
                    We're always looking for help with new features, with updates to the algorithm behind the workout generation or with updating our video database.</p>
                    <p>Join us in building something great!</p>
                </div>
                <div className='dev__gitlab-div'>
                    <a className='dev__gitlab-link' href="https://gitlab.doc.ic.ac.uk/g227004210/trx-exercise-app" target="_blank" rel="noopener noreferrer">
                        GitLab Repository
                    </a>
                </div>
            </div>
            
        </Container>
    );
  };

  export default Development;