import React, { Component } from 'react'
import {menu_list} from './UserFunctions'
import { Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import DetailMenu from './DetailMenu'
class Menu extends Component {

state={
	restaurants:[],
	isCustomer:false,
	customerId:null,
	restaurantId:null,
	showDetailMenu:false,
  loading:true
}


componentDidMount(){

menu_list().then(res => {
			this.setState({restaurants:res.result,loading:false})})
.catch(err=>{console.log(err)}) 

const token = localStorage.usertoken
    if(token)
    {let decoded = jwt_decode(token)
    if(decoded.identity.last_name)
      {
          this.setState({isCustomer:true,customerId:decoded.identity.username})
      } 
}
 }

handleMenu =(e,restaurantId)=>{
	e.preventDefault()
	this.setState({showDetailMenu:true,restaurantId:restaurantId})
}

handleMenuClose =(e)=>{
e.preventDefault()
this.setState({showDetailMenu:false,restaurantId:null})
}
render()
{
	const restaurantList =(<div className="container-fluid mt-50">
            <h1 className="text-center">Restaurants' List</h1>
             <div className="row ">
  					{
  				this.state.restaurants.map(restaurant=>{
  					return(
  					<div className="col-lg-3 mb-3">
  					<div className="card text-center bg-secondary text-white">	
  					<div className="card-body">
    				<h5 className="card-title text-warning">{restaurant['Name']}</h5>
      				<p className="card-text">{restaurant['cusine']}</p>
    				<button className="btn btn-dark" onClick={(e)=>this.handleMenu(e,restaurant['username'])}>
    				{this.state.isCustomer?"Place Order":"View Menu"}</button>
  					</div>
  					</div>
  					</div>
  					)
					})}
  		</div>		
		</div>)


	
	return(
		<div >
		{ this.state.loading?	
      <div className="text-center"><h1 className="fa fa-circle-o-notch fa-spin fa-4x mt-200"></h1></div>:
     <div>
     <div>{this.state.showDetailMenu?<button className=" mt-2 btn btn-danger"
      onClick={this.handleMenuClose}>Close Menu</button>:null}</div>
			<div>{this.state.showDetailMenu?<DetailMenu isCustomer={this.state.isCustomer} 
			customerId={this.state.customerId}
			restaurantId={this.state.restaurantId}/>:restaurantList}</div>
      </div>
    }

		</div>

		)
}


}

export default Menu
;