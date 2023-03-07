import './AboutPage.scss';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { Container } from "react-bootstrap";



const About = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
    <Container className = 'about__container'>
      <div className ='about__title'>About Us</div>
      <div className = 'about__description'>
        TRX STAR is an exercise app that democratizes the workout platform by providing personalised workouts completely free of charge.
        Simply select your preferences and let us create a curated playlist for you! 
        <br></br>We want to thank Private GYM for the amazing YouTube videos, which you can find at <a className='about__YTLink' href="https://www.youtube.com/@PrivateGYMFitness">PrivateGYMFitness</a>.
      </div>
      <div className='about__team-div'>
        <div className ='about__team-title'>Our Team</div>
        <div className='about__team-members'>
          <div className='about__member'>
            <img className='about__member-photo' src="/images/danPhoto.jpeg" />
            <div className='about__member-name'>Dan</div>
            <a className='about__member-link' href="https://www.linkedin.com/in/daniel-doyle-21800b142/">LinkedIn</a>
          </div>
          <div className='about__member'>
            <img className='about__member-photo' src="/images/eugenePhoto.jpeg" />
            <div className='about__member-name'>Eugene</div>
            <a className='about__member-link' href="https://www.linkedin.com/in/tsun-eugene-ting/">LinkedIn</a>
          </div>
          <div className='about__member'>
            <img className='about__member-photo' src="/images/sofiaPhoto.jpeg" />
            <div className='about__member-name'>Sofia</div>
            <a className='about__member-link' href="https://www.linkedin.com/in/sofiahernandezgelado/">LinkedIn</a>
          </div>
          <div className='about__member'>
            <img className='about__member-photo' src="/images/adelaPhoto.jpeg" />
            <div className='about__member-name'>Adela</div>
            <a className='about__member-link' href="https://www.linkedin.com/in/adela-viskova/">LinkedIn</a>
          </div>
          <div className='about__member'>
            <img className='about__member-photo' src="/images/sorenPhoto.jpeg" />
            <div className='about__member-name'>Soren</div>
            <a className='about__member-link' href="https://www.linkedin.com/in/soren-antebi/">LinkedIn</a>
          </div>
          <div className='about__member'>
            <img className='about__member-photo' src="/images/philippePhoto.jpeg" />
            <div className='about__member-name'>Philippe</div>
            <a className='about__member-link' href="https://www.linkedin.com/in/philippe-paquin-hirtle/">LinkedIn</a>
          </div>
          
          
          
        </div>
      </div>
    </Container>
    )
}

export default About;


