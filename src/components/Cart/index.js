import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'
import EmptyCart from '../EmptyCart'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartItems} = value

      const onPlaceOrder = () => {
        console.log('Order placed')
      }
      const cartListUI = () => {
        const finalPrice = cartItems.reduce(
          (totalPrice, item) => totalPrice + item.cost * item.quantity,
          0,
        )

        return (
          <div className="cart-items-box">
            <div className="t-header">
              <h1 className="t-h-item">Item</h1>
              <h1 className="t-h-item">Quantity</h1>
              <h1 className="t-h-item">Price</h1>
            </div>
            <ul className="cart-items-list">
              {cartItems.map(e => (
                <CartItem key={e.id} itemDetails={e} />
              ))}
              <hr className="cart-items-line" />
            </ul>
            <div className="total-price-box">
              <h1 className="order-total-text">Order Total:</h1>
              <div className="box">
                <p className="total-price" testid="total-price">
                  <BiRupee /> {finalPrice}
                </p>
              </div>
            </div>
            <div className="plaord-ref-btn-box">
              <button
                type="button"
                className="place-order-btn"
                onClick={onPlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        )
      }

      return (
        <>
          <Header />
          {cartItems.length === 0 ? <EmptyCart /> : cartListUI()}
          <Footer />
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
