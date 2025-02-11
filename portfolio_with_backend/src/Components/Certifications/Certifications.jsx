import React from 'react'
import "./Certifications.css"
import theme_pattern from "../../assets/theme_pattern.svg"
import certificates_data from "../../assets/certifications_data.js"
import arrow_icon from "../../assets/arrow_icon.svg"

const Certifications = () => {
  return (
      <div id='certifications' className='services'>
          <div className="services-title">
              <h1>Certifications</h1>
              <img src={theme_pattern} alt="" />
          </div>
          <div className="services-container">
            {certificates_data.map((certificate, index) => {
                      return <div key={index} className = "services-format">
                          <h3>{certificate.s_no}</h3>
                          <h2>{certificate.s_name}</h2>
                          <p><img src={certificate.c_img} alt="" /></p>
                          
                      </div>
            })}
          </div>
    </div>
  )
}

export default Certifications