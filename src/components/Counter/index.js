import {Component} from 'react'
import {LuPlusSquare, LuMinusSquare} from 'react-icons/lu'
import CartContext from '../../context/CartContext'
import './index.css'

class Counter extends Component {
  state = {quantity: 0}

  componentDidMount() {
    const {foodItem} = this.props
    const {cartItems} = this.context
    const existingCartItem = cartItems.find(item => item.id === foodItem.id)

    if (existingCartItem) {
      this.setState({quantity: existingCartItem.quantity})
    }
  }

  onIncrementFoodItem = () => {
    const {quantity} = this.state
    const {foodItem} = this.props
    const {addCartItem} = this.context

    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))

    addCartItem({...foodItem, quantity: quantity + 1})
  }

  onDecrementFoodItem = () => {
    const {quantity} = this.state
    const {foodItem} = this.props
    const {deleteCartItem} = this.context // Access deleteCartItem from the context

    if (quantity > 1) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
      deleteCartItem({...foodItem, quantity: quantity - 1})
    } else if (quantity === 1) {
      this.setState({quantity: 0})
      deleteCartItem({...foodItem, quantity: 0}) // You may want to remove the item completely here
    }
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {foodItem} = this.props
          const {quantity} = this.state
          const {addCartItem} = value

          const onClickAddToCart = () => {
            console.log('New item added', foodItem)
            addCartItem({...foodItem, quantity: 1})
            this.setState({quantity: 1})
          }

          return (
            <>
              {quantity > 0 ? (
                <div className='btn-container'>
                  <button
                    type='button'
                    testid='decrement-count'
                    onClick={this.onDecrementFoodItem}
                    className='btn'
                  >
                    <LuMinusSquare />
                  </button>
                  <p testid='active-count' className='count'>
                    {quantity}
                  </p>
                  <button
                    type='button'
                    testid='increment-count'
                    onClick={this.onIncrementFoodItem}
                    className='btn'
                  >
                    <LuPlusSquare />
                  </button>
                </div>
              ) : (
                <button
                  type='button'
                  className='add-btn'
                  onClick={onClickAddToCart}
                >
                  {' '}
                  Add{' '}
                </button>
              )}
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

Counter.contextType = CartContext

export default Counter
