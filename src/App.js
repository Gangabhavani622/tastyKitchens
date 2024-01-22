import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import CartContext from './context/CartContext'
import Home from './components/Home'
import DetailedRestaurantPage from './components/DetailedRestaurantPage'
import LoginPage from './components/LoginPage'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {cartItems: []}

  componentDidMount() {
    const cartItemsJSON = localStorage.getItem('cart_items')
    if (cartItemsJSON) {
      const cartItems = JSON.parse(cartItemsJSON)
      this.setState({cartItems})
    }
  }

  addCartItem = newItem => {
    const {cartItems} = this.state
    const isExistNewItem = cartItems.find(
      eachItem => eachItem.id === newItem.id,
    )
    if (cartItems.length === 0 || !isExistNewItem) {
      const updatedItems = [...cartItems, newItem]
      this.setState({cartItems: updatedItems})
      localStorage.setItem('cart_items', JSON.stringify(updatedItems))
    } else if (isExistNewItem) {
      const updatedItems = cartItems.map(eachItem =>
        eachItem.id === newItem.id
          ? {...eachItem, quantity: newItem.quantity}
          : eachItem,
      )
      this.setState({cartItems: [...updatedItems]})
      localStorage.setItem('cart_items', JSON.stringify(updatedItems))
    }
  }

  deleteCartItem = item => {
    const {cartItems} = this.state
    let updatedItems
    if (item.quantity === 0) {
      updatedItems = cartItems.filter(eachItem => eachItem.id !== item.id)
    } else {
      updatedItems = cartItems.map(eachItem =>
        eachItem.id === item.id
          ? {...eachItem, quantity: item.quantity}
          : eachItem,
      )
    }
    this.setState({cartItems: updatedItems})
    localStorage.setItem('cart_items', JSON.stringify(updatedItems))
  }

  render() {
    const {cartItems} = this.state
    console.log(cartItems)
    // // localStorage.setItem('cart_items', [])

    // localStorage.setItem('cart_items', cartItems)
    console.log(localStorage.getItem('cartItems'))
    return (
      <CartContext.Provider
        value={{
          cartItems,
          addCartItem: this.addCartItem,
          deleteCartItem: this.deleteCartItem,
        }}
      >
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={DetailedRestaurantPage}
            />
          </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
