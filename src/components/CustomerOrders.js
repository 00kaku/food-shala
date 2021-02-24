import React, { Component } from 'react'
import {c_orderList} from './UserFunctions'
import jwt_decode from 'jwt-decode'
class CustomerOrders extends Component {

state ={
		orders:[],
		name:'',
    loading:true
}

componentDidMount() {
const token = localStorage.usertoken
    if(token)
    {let decoded = jwt_decode(token)
    if(decoded.identity.last_name)
      {

this.setState({name:decoded.identity.first_name+' '+decoded.identity.last_name+"'s ",loading:false})
c_orderList(decoded.identity.username).then(res => {
			this.setState({orders:res.result})})
.catch(err=>{console.log(err)}) }
    else
      this.props.history.push(`/`)
}
    else
      this.props.history.push(`/`)
}

render(){

console.log(this.state.orders)

return(

<div className="container-fluid mt-50">
            
             {this.state.loading ? 
             <div className="text-center"><h1 className="fa fa-circle-o-notch fa-spin fa-4x"></h1></div> 
              :null}
           {this.state.loading ?
           null:   
            <div>
            <h1 className="text-center">{this.state.name}Orders</h1> 
             <div className="row ">
  					{
  				this.state.orders.map(order=>{
  					return(
  					<div className="col-lg-3 mb-3">
  					<div className="card text-center bg-secondary text-white">	
  					<div className="card-body">
    				<h5 className="card-title text-warning">{order['Name']}</h5>
      				<p className="card-text">{order['menuItems']}</p>
      				<p className="card-text text-info font-weight-bold"><span className="fa fa-inr"></span>{order['price']}</p>
            <p className="card-text">Order Number: {order['orderId']}</p>
	      				<p className="card-text">{order['Date']}</p>
  					</div>
  					</div>
  					</div>
  					)
					})}
  		</div>
      </div>	}	
		</div>

	)


}




}



export default CustomerOrders;