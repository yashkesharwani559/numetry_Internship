import React from 'react'
import './About.css'
import theme_pattern from "../../assets/theme_pattern.svg"
import profile_img from "../../assets/about_profile.png"

const About = () => {
  return (
      <div id='about' className='about'>
          <div className="about-title">
              <h1>About Me</h1>
              <img src={theme_pattern} alt="" />
          </div>
          <div className="about-sections">
              <div className="about-left">
                  <img src={profile_img} alt="" />
              </div>
              <div className="about-right">
                  <div className="about-para">
                      <p>I'm a Computer Science Engineering student skilled in Java, SQL, and MySQL, passionate about finding effective solutions to technical challenges. I enjoy exploring emerging technologies and aim to apply my skills to real-world impact.</p>

                      <p>With a solid academic background and a love for innovation, I'm driven to work on projects that push the boundaries of technology. My goal is to contribute meaningfully in the tech industry, creating solutions that combine efficiency and thoughtful design.</p>
                  </div>
                  
                  <div className="about-skills">
                      <div className="about-skill">
                          <p>Core Java</p>
                          <hr style={{width:"90%"}} />
                      </div>
                      <div className="about-skill">
                          <p>SQL and MySQL</p>
                          <hr style={{width:"80%"}} />
                      </div>
                      <div className="about-skill">
                          <p>Python & JavaScript</p>
                          <hr style={{width:"70%"}} />
                      </div>
                      <div className="about-skill">
                          <p>Git & Github</p>
                          <hr style={{width:"50%"}} />
                      </div>
                      <div className="about-skill">
                          <p>React JS and Hibernate</p>
                          <hr style={{width:"65%"}} />
                      </div>
                      <div className="about-skill">
                          <p>AWS Services</p>
                          <hr style={{width:"65%"}} />
                      </div>
                  </div>
              </div>
          </div>
          <div className="about-achievements">
              <div className="about-achievement">
                  <h1>300+</h1>
                  <p>Problems Solved on Leetcode</p>
              </div>
              <hr />
              <div className="about-achievement">
                  <h1>20+</h1>
                  <p>Git Repositories</p>
              </div>
              <hr />
              <div className="about-achievement">
                  <h1>Gold Badge</h1>
                  <p>In Java on HackerRank</p>
              </div>
          </div>
    </div>
  )
}

export default About