import axios from 'axios'

export const c_register = newUser => {
  return axios
    .post('/customers/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      username: newUser.username,
      isVeg: newUser.isVeg
    })
    .then(response => {
      return response.data
    })
}

export const c_login = user => {
  return axios
    .post('/customers/login', {
      username: user.username,
      password: user.password
    })
    .then(response => {
      if(response.data.ERROR ==='Data Invalid')
        return response.data

      else
        localStorage.setItem('usertoken',JSON.stringify(response.data))
        return response.data
    })
    .catch(err => {
      console.log(err)
    })
}




export const r_register = newUser => {
  return axios
    .post('/restaurants/register', {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      username: newUser.username,
      cusine:newUser.cusine
    })
    .then(response => {
      return response.data
    })
}

export const r_login = user => {
  return axios
    .post('/restaurants/login', {
      username: user.username,
      password: user.password
    })
    .then(response => {
      if(response.data.ERROR ==='Data Invalid')
        return response.data

      else
        localStorage.setItem('usertoken',JSON.stringify(response.data))
        return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const add_item = item => {
  return axios
    .post('/restaurants/add', {
      name: item.name,
      description: item.description,
      isVeg:item.isVeg,
      price:item.price,
      username:item.username
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
      console.log(err)
    })
}


export const menu_list = () => {
  return axios
    .post('/restaurants/list', {
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
      console.log(err)
    })
}



export const menu_items = (restaurantId) => {
  return axios
    .post('/restaurants/menu', {
      restaurantId:restaurantId
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const place_order = (order) => {
  return axios
    .post('/customers/order', {
      restaurantId:order.restaurantId,
      customerId:order.customerId,
      price:order.price,
      menuItems:order.menuItems
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
      console.log(err)
    })
}



export const c_orderList = (customerId) => {
  return axios
    .post('/customers/orderList', {
      customerId:customerId,
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const r_orderList = (restaurantId) => {
  return axios
    .post('/restaurants/orderList', {
      restaurantId:restaurantId,
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

