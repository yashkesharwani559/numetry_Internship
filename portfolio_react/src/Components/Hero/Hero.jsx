import React from 'react'
import './Hero.css'
import profile_img from "../../assets/profile_img.png"
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Hero = () => {

  const getResume = () => {
    window.open("https://drive.google.com/file/d/18XeuCj6HRODicbwiof-gBSv96iZgOkPR/view?usp=drive_link", "_blank")
  }

  return (
      <div id='hero' className='hero'>
          <img src={profile_img} alt="" />
          <h1><span>I'm Yash,</span> CSE student and Full-Stack Developer.</h1>
          <p>
          I'm a dedicated Computer Science Engineering student with expertise in Java, SQL, and MySQL, passionate about problem-solving and creating efficient solutions in real-world tech challenges.
          </p>
          <div className="hero-action">
              <div className="hero-connect"><AnchorLink className='anchor-link' offset={50} href='#contact'>  Connect With Me</AnchorLink></div>
              <div className="hero-resume" onClick={getResume}>My Resume</div>
          </div>
    </div>
  )
}

export default Hero