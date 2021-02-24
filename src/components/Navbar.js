import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Logo from '../assets/logo.svg'
class Navbar extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/restaurantAuth" className="nav-link">
           For Restaurant
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/customerAuth" className="nav-link">
            For Customer
          </Link>
        </li>
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <img src={Logo} className="img-fluid"/>
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
          <ul className="navbar-nav">
          <li className="nav-item">
          <Link to="/Menu" className="nav-link">
                Menu
              </Link>
          </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)