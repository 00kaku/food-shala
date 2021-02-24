import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import {add_item} from './UserFunctions'
class Profile extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      username: '',
      email: '',
      isVeg:1,
      isCustomer:'',
      price:'',
      item_name:'',
      description:'',
      showMandatoryFieldAlert:false,
      showSuccesAddItemAlert:false
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    if(token)
    {let decoded = jwt_decode(token)
    if(decoded.identity.name)
      {
          this.setState({name:decoded.identity.name, username:decoded.identity.username , isCustomer:false})
      }


    else
      {
       this.setState({name:decoded.identity.first_name+' '+decoded.identity.last_name, username:decoded.identity.username , isCustomer:true , isVeg:decoded.identity.isVeg})   
      }

      }
    else
      this.props.history.push(`/`)
  }

onChange = e => this.setState({ [e.target.name]: e.target.value })


addItem = e =>{
  e.preventDefault()

if(this.state.item_name  && this.state.price){
const item ={
  name : this.state.item_name,
  description :this.state.description,
  price : this.state.price,
  username: this.state.username,
  isVeg:  this.state.isVeg
}

 add_item(item).then(res => {
     document.getElementById("addItemForm").reset();
     this.setState({showSuccesAddItemAlert:true})
    }).catch(err=>{console.log(err)})}
else
{
  this.setState({showMandatoryFieldAlert:true})
}

      }


restaurantOrder =()=>{
    this.props.history.push(`/restaurantOrders`)
}

customerOrder =()=>{
    this.props.history.push(`/customerOrders`)

}


  render() {
      if(this.state.showMandatoryFieldAlert === true)
{  setTimeout(() => {
      this.setState({
        showMandatoryFieldAlert:false
      });
    },1000);}

if(this.state.showSuccesAddItemAlert === true)
{  setTimeout(() => {
      this.setState({
        showSuccesAddItemAlert:false
      });
    },1000);}





    const restaurantProfile =(<div>

  <div className="row mt-50">
  
<div className="col-lg-5">
<h2> Restaurant Details </h2>
<table className="table table-hover">
  <tbody>
    <tr>
      <td >Name</td>
      <td>{this.state.name}</td>
    </tr>

    <tr>
      <td>User Name</td>
      <td>{this.state.username}</td>
    </tr>

  </tbody>
</table>

<button className="btn btn-large btn-warning" onClick={this.restaurantOrder}>CHECK ORDERS</button>
</div>


<div className="col-lg-2"></div>

<div className="col-lg-5 ">
    <h2>Add New Menu Item</h2>
    <form id="addItemForm">
  <div className="form-group">
    <label htmlFor="User">Name<span className="text-danger">*</span></label>
    <input type="Text" className="form-control" id="User" placeholder="Enter Dish name" name="item_name" required="true" 
    onChange = {this.onChange}/>
  </div>
  

  <div className="form-group">
    <label htmlFor="desc">Description</label>
    <input type="Text" className="form-control" id="desc" placeholder="Enter atmost 150 words Description" name="description"
      maxlength="150" onChange = {this.onChange}/>
  </div>


  <div className="form-group">
    <label htmlFor="price">Price<span className="text-danger">*</span></label>
    <input type="number" className="form-control" step="1" id="price" placeholder="Enter Price per Serving" name="price" required="true"
    onChange = {this.onChange}/>
  </div>

<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="isVeg" id="Radio1" value="1" checked onChange={this.onChange}/>
  <label className="form-check-label " for="Radio1">
    Vegetarian
  </label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="isVeg" id="Radio2" value="0" onChange={this.onChange}/>
  <label className="form-check-label " for="Radios2">
    Non Vegetarian 
  </label>
</div>

  
  <button type="submit" className="btn btn-danger" onClick={this.addItem}>ADD ITEM</button>
</form>
</div>
  </div>
</div> 

  )  
const mandatoryFieldAlert =(<div className="row">
  <div className="col-lg-4"></div>
  <div className="alert alert-danger  alert-dismissible mt-3 col-lg-4" role="alert">
  Please fill in the mandatory fields
</div>
<div className="col-lg-4"></div>
</div>
  )

const succesAddItemAlert =(<div className="row">
  <div className="col-lg-4"></div>
  <div className="alert alert-success alert-dismissible mt-3 col-lg-4" role="alert">
    Item added successfuly
</div>
<div className="col-lg-4"></div>
</div>
  )


const customerProfile =(<div>
 <div className="row ">
  
  <div className="col-lg-3"></div>
<div className="col-lg-6">
<h2> Cutomer Details </h2>
<table className="table table-hover">
  <tbody>
    <tr>
      <td >Name</td>
      <td>{this.state.name}</td>
    </tr>

    <tr>
      <td>User Name</td>
      <td>{this.state.username}</td>
    </tr>

    <tr>
      <td >Preference</td>
      <td>{this.state.isVeg? "Vegetarian":"Non Vegetarian"}</td>
    </tr>

  </tbody>
</table>

<button className="btn btn-large btn-warning" onClick={this.customerOrder}>CHECK ORDERS</button>
</div>


  <div className="col-lg-3"></div>
</div>
</div>)

    return (
      <div>
      {this.state.isCustomer ? customerProfile:restaurantProfile}
      {this.state.showMandatoryFieldAlert? mandatoryFieldAlert:null}
      {this.state.showSuccesAddItemAlert ? succesAddItemAlert:null}
      </div>
    )
  }
}

export default Profile