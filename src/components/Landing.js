import React, { Component } from 'react'
import mid from '../assets/landing-mid.svg'
import background from '../assets/landing-background.svg'
class Landing extends Component {
  render() {
    return (<div>
      <div className="container">
            <div className="mt-5 row"> 

              <div className="col-lg-2 "></div>

              <div className="col-lg-8">
              <img  className="img-fluid" src={mid}/>

              </div>

              <div className="col-lg-2"></div>
            </div>
          </div>
        </div>
    )
  }
}

export default Landing