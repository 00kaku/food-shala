import React, { Component } from 'react'
import {place_order,menu_items} from './UserFunctions'


class DetailMenu extends Component {

state={
	menuItems:[],
	isCustomer:this.props.isCustomer,
	customerId:this.props.customerId,
	restaurantId:this.props.restaurantId,
	selectedMenuItems:{},
	price:0,
	showSelectAlert:false,
	showSuccessAlert:false,
  loading:true
}


componentDidMount(){
    
    menu_items(this.state.restaurantId).then(res => {
			this.setState({menuItems:res.result,loading:false})})
.catch(err=>{console.log(err)})
 }

handleQuantityChange =(e,price,Name,restaurantId)=>{
e.preventDefault()

if(Name in this.state.selectedMenuItems)
{
if(e.target.value<this.state.selectedMenuItems[Name])
 {this.state.price=this.state.price-(this.state.selectedMenuItems[Name]-e.target.value)*price}

else 
{this.state.price=this.state.price +(e.target.value-this.state.selectedMenuItems[Name])*price}
}

else{if(e.target.value>0)
	this.state.price = this.state.price+(price*1)

}
this.state.selectedMenuItems[Name]=e.target.value

this.updateState(this.state.selectedMenuItems,this.state.price)

}

updateState =(selectedMenuItems,price)=>
{
	this.setState({selectedMenuItems:selectedMenuItems,price:price})

}

placeOrder=(e)=>{
	e.preventDefault()
 if(this.state.price>0)
 {const keys = Object.keys(this.state.selectedMenuItems)
 let menuItems =''
  keys.map(key=>{
  	if(this.state.selectedMenuItems[key]>0)
      menuItems=menuItems+key+'X'+this.state.selectedMenuItems[key]+','
  })

	const order ={
		customerId:this.state.customerId,
		restaurantId:this.state.restaurantId,
		price:this.state.price,
		menuItems:menuItems
	}
  
  place_order(order).then(res => {
     	this.setState({price:0,selectedMenuItems:{}})

     	this.setState({showSuccessAlert:true})


         }).catch(err=>{console.log(err)}) }

else {
	this.setState({showSelectAlert:true})
}
}


render()
{ 
  if(this.state.showSelectAlert === true)
{  setTimeout(() => {
      this.setState({
        showSelectAlert:false
      });
    },600);}
 if(this.state.showSuccessAlert === true)
{setTimeout(() => {
      this.setState({
        showSuccessAlert:false
      });
    },600);}

	return( <div className="container-fluid mt-50">
            
          { this.state.loading? 
      <div className="text-center"><h1 className="fa fa-circle-o-notch fa-spin fa-4x mt-200"></h1></div>:
            
            <div>
            <div>
            <h1 className="text-center">Menu</h1>
            {this.state.isCustomer?(<div><button className=" btn btn-success" onClick={this.placeOrder}>Order</button>
            <h5 className="text-muted">Total: <span className="fa fa-inr "></span>&nbsp; {this.state.price} </h5></div>):<div></div>}
            {this.state.showSelectAlert?<p className="alert alert-danger">Select something to order</p>:null}
            {this.state.showSuccessAlert?<p className="alert alert-success">Order Placed. Thank you!!</p>:null}
            </div>
             <div className="row ">
  					{
  				this.state.menuItems.map(item=>{
  					return(
  					<div className="col-lg-3 mb-3">
  					<div className="card text-center bg-secondary text-white">	
  					<div className="card-body">
    				<h5 className="card-title text-warning">{item['Name']}&nbsp;
    				<span className="fa fa-circle" style={{color:item['isVeg']?'green':'red',fontSize:'14px'}}></span></h5>
    				<p className="card-text">{item['description']}</p>
  					<p className="card-text"><span className="fa fa-inr text-warning">  &nbsp;</span>{item['price']}</p>
  					{this.state.isCustomer? (
  						<form >
  							<div className="form-group">
    						<input id="Quantity" type="number" className="form-control" min='0' step="1"placeholder="Enter Quantity" name="item" required="true"
    						onChange ={(e)=>this.handleQuantityChange(e,item['price'],item['Name'])}/>
 							</div>
  						</form>):null}
  					</div>
  					</div>
  					
  					</div>
  					)
					})}
  		</div>
      </div>}		
		</div>)
}


}

export default DetailMenu;