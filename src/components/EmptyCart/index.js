import {withRouter} from 'react-router-dom'
import './index.css'

const EmptyCart = props => {
  const onClickRouteToHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/doofdbsu7/image/upload/v1705250639/cooking_1_1_v0ivhy.png"
        alt="empty cart"
        className="empty-cart-img"
      />
      <h1 className="empty-cart-heading">No Orders Yet!</h1>
      <p className="empty-cart-description">
        Your cart is empty. Add something from the menu
      </p>
      <buttuon type="button" onClick={onClickRouteToHome} className="order-btn">
        Order Now
      </buttuon>
    </div>
  )
}
export default withRouter(EmptyCart)
