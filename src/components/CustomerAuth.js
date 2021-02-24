import React, { Component } from 'react'
import {c_register,c_login} from './UserFunctions'

class CustomerAuth extends Component {
  
state={
email:null,
password:null,
first_name:null,
last_name:null,
isVeg:1,
username:null,
showRegisterForm:false,
result:null,
showMandatoryFieldAlert:false
}

 onChange = e => this.setState({ [e.target.name]: e.target.value })

showRegisterFormToggle=(e)=>{
  e.preventDefault();
  let toggleValue = !this.state.showRegisterForm
  this.setState({showRegisterForm:toggleValue})
}

register =(e) =>{
  
 e.preventDefault()
if(this.state.first_name && this.state.email && this.state.password && this.state.username){
  const newUser = {
    first_name:this.state.first_name,
    last_name :this.state.last_name,
    isVeg : this.state.isVeg,
    username: this.state.username,
    email: this.state.email,
    password:this.state.password,
  }

 c_register(newUser).then(res => {
      this.setState({result:res.result})
    }).catch(err=>{console.log(err)})  }

else
{
  this.setState({showMandatoryFieldAlert:true})
}

}




login =(e) =>{

e.preventDefault()

const user ={
  username:this.state.username,
  password:this.state.password
}

c_login(user).then(res => {
     this.setState({result:res.ERROR})
    }).catch(err=>{this.setState({result:'Data Invalid'})}) 

}

render(){

if(this.state.result!==null && this.state.result!=='Username Taken' && this.state.result!=='Data Invalid')
  this.props.history.push(`/`)

if(this.state.result=='Username Taken' || this.state.result=='Data Invalid')
{  setTimeout(() => {
      this.setState({
        result:null
      });
    },1000);}

if(this.state.showMandatoryFieldAlert === true)
{  setTimeout(() => {
      this.setState({
        showMandatoryFieldAlert:false
      });
    },1000);}



const registerForm = (  
<div><h1 className="text-center">Cusomter Regestration</h1>
<h3 className="text-center text-muted"> Please provide details</h3>

  <div className="row mt-50">
  
    <div className="col-lg-3"></div>
<div className="col-lg-6 ">
    <form>
  <div className="form-group">
    <label htmlFor="User">Username <span className="text-danger">*</span></label>
    <input type="Text" className="form-control" id="User" placeholder="Enter username" name="username" required="true" 
    onChange = {this.onChange}/>
  </div>


  <div className="form-group">
    <label htmlFor="f_name">First Name<span className="text-danger">*</span></label>
    <input type="Text" className="form-control" id="f_name" placeholder="Enter first name" name="first_name" required="true"
    onChange = {this.onChange}/>
  </div>


  <div className="form-group">
    <label htmlFor="l_name">Last Name</label>
    <input type="Text" className="form-control" id="l_name" placeholder="Enter last name" name="last_name" required="true"
    onChange = {this.onChange}/>
  </div>


<div className="form-group">
    <label htmlFor="Email1">Email address <span className="text-danger">*</span></label>
    <input type="email" className="form-control" id="Email1" aria-describedby="emailHelp" placeholder="Enter email" name="email" required="true"
    onChange = {this.onChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>

  <div className="form-group">
    <label htmlFor="Password">Password <span className="text-danger">*</span></label>
    <input type="password" className="form-control" id="Password" placeholder="Password" name="password" required="true"
    onChange = {this.onChange}/>
  </div>

  <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="isVeg" id="Radio1" value="1" checked onChange={this.onChange}/>
  <label class="form-check-label " for="Radio1">
    Vegetarian
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="isVeg" id="Radio2" value="0" onChange={this.onChange}/>
  <label class="form-check-label " for="Radios2">
    Non Vegetarian 
  </label>
</div>


  <button type="submit" className="btn btn-primary mr-2" onClick={this.register}>Register</button>
  <button type="submit" className="btn btn-success" onClick={this.showRegisterFormToggle}>Login</button>
</form>
</div>

<div className="col-lg-3 col-sm"></div>
  </div>
</div>  )


const loginForm=(

  <div>
  <h1 className="text-center">Cusomter Login</h1>
  <h3 className="text-center text-muted">Please provide details</h3>

  <div className="row mt-50">
  
    <div className="col-lg-3"></div>
<div className="col-lg-6 ">
    <form>
  <div className="form-group">
    <label htmlFor="Username">Username</label>
    <input type="Name" className="form-control" id="Username" placeholder="Enter username" name="username"
    onChange = {this.onChange}/>
  </div>

  <div className="form-group">
    <label htmlFor="Password">Password</label>
    <input type="password" className="form-control" id="Password" placeholder="Password" name="password"
    onChange = {this.onChange}/>
  </div>
  
  <button type="submit" className="btn btn-success mr-2" onClick={this.login}>Login</button>
  <button type="submit" className="btn btn-primary" onClick={this.showRegisterFormToggle}>Register</button>
</form>
</div>

<div className="col-lg-3 col-sm"></div>
  </div>
</div>  
  )

const loginFailAlert =(<div className="row">
  <div className="col-lg-4"></div>
  <div className="alert alert-danger alert-dismissible mt-3 col-lg-4" role="alert">
  INVALID CREDENTIALS
</div>
<div className="col-lg-4"></div>
</div>
  )

const registerFailAlert =(<div className="row">
  <div className="col-lg-4"></div>
  <div className="alert alert-danger  alert-dismissible mt-3 col-lg-4" role="alert">
  USERNAME TAKEN
</div>
<div className="col-lg-4"></div>
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

return (
  <div className="mt-5">
  {this.state.showRegisterForm? registerForm:loginForm}
  {this.state.result? this.state.showRegisterForm? registerFailAlert:loginFailAlert:null }
  {this.state.showMandatoryFieldAlert? mandatoryFieldAlert:null}
  </div>)
}
} 
 


export default CustomerAuth