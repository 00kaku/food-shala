import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import RestaurantAuth from './components/RestaurantAuth'
import CustomerAuth from './components/CustomerAuth'
import Profile from './components/Profile'
import RestaurantOrders from './components/RestaurantOrders'
import CustomerOrders from './components/CustomerOrders'
import Menu from './components/Menu'
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/customerAuth" component={CustomerAuth} />
            <Route exact path="/restaurantAuth" component={RestaurantAuth} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/restaurantOrders" component={RestaurantOrders} />
            <Route exact path="/customerOrders" component={CustomerOrders} />
            <Route exact path="/Menu" component={Menu}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default App