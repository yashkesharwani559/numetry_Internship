import React from 'react'
import './Contact.css'
import theme_pattern from "../../assets/theme_pattern.svg"
import mail_icon from "../../assets/mail_icon.svg"
import location_icon from "../../assets/location_icon.svg"
import call_icon from "../../assets/call_icon.svg"


const Contact = () => {

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "7935bd7c-5c69-4a8e-a022-c4ee137be656");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
            alert(res.message);
        }
    };
    
    const leetcode = () => {
        window.open("https://leetcode.com/u/yashkesharwani559", "_blank");
    }

    const hackerrank = () => {
        window.open("https://www.hackerrank.com/profile/yashkesharwani51", "_blank");
    }

    const linkedin = () => {
        window.open("https://www.linkedin.com/in/yash-kesharwani-737725283/", "_blank");
    }

    const github = () => {
        window.open("https://github.com/yashkesharwani559", "_blank");
    }

    const credly = () => {
        window.open("https://www.credly.com/users/yash-kesharwani.9cf3bb80", "_blank");
    }

  return (
      <div id='contact' className='contact'>
          <div className="contact-title">
              <h1>Get In Touch</h1>
              <img src={theme_pattern} alt="" />
          </div>
          <div className="contact-section">
              <div className="contact-left">
                  <h1>Let's Talk</h1>
                  <p>I'm currently available to get new skills,taking new responsibilities and working on new projects. So feel free to contact me anytime.</p>

                      <div className="contact-detail">
                        <p onClick={linkedin}>https://www.linkedin.com/in/yash-kesharwani-737725283/</p>
                      </div>
                      <div className="contact-detail">
                        <p onClick={hackerrank}>https://www.hackerrank.com/profile/yashkesharwani51</p>
                      </div>
                      <div className="contact-detail">
                        <p onClick={leetcode}>https://leetcode.com/u/yashkesharwani559/</p>
                      </div>
                      <div className="contact-detail">
                        <p onClick={github}>https://github.com/yashkesharwani559</p>
                      </div>
                      <div className="contact-detail">
                        <p onClick={credly}>https://www.credly.com/users/yash-kesharwani.9cf3bb80</p>
                      </div>
                  <div className="contact-details">
                      <div className="contact-detail">
                          <img src={mail_icon} alt="" />
                        <p>yashkesharwani559@gmail.com</p>  
                      </div>
                      <div className="contact-detail">
                          <img src={call_icon} alt="" />
                          <p>7489967083</p>
                      </div>
                      <div className="contact-detail">
                          <img src={location_icon} alt="" />
                          <p>ITI, Greencity, Madhya Pradesh, India Pincode: 482002</p>
                      </div>
                  </div>
              </div>
              <form onSubmit={onSubmit} className="contact-right">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" name="name" placeholder='Enter your name' id="name" />
                  <label htmlFor="email">Your Email</label>
                  <input type="email" name="email" id="email" placeholder='Enter your email' />
                  <label htmlFor="message">Write your message Here</label>
                  <textarea name="message" id="message" cols={10} rows={8} placeholder='Enter your message'></textarea>
                  <button type='submit' className="contact-submit">Submit now</button>
              </form>
          </div>
    </div>
  )
}

export default Contact