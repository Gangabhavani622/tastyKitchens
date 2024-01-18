import {BiRupee} from 'react-icons/bi'
import Counter from '../Counter'
import './index.css'

const CartItem = props => {
  const {itemDetails} = props
  const {imageUrl, name, cost, quantity} = itemDetails
  return (
    <li testid="cartItem" className="cart-item">
      <div className="image-name-box">
        <img src={imageUrl} alt="cart-img" className="cart-item-image" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0px',
            marginLeft: '10px',
          }}
        >
          <h2 className="cart-item-name">{name}</h2>
        </div>
      </div>
      <div className="quantity-box">
        <Counter foodItem={itemDetails} />
      </div>
      <div className="cart-price-box">
        <h1 className="cart-item-price">
          <BiRupee /> {quantity * cost}
        </h1>
      </div>
      <img src={imageUrl} alt="cart img" className="mob-cart-item-image" />
      <div className="cart-item-details">
        <h1 className="cart-item-name">{name}</h1>
        <div className="mob-cart-quantity-box">
          <Counter foodItem={itemDetails} />
        </div>
        <h1 className="cart-item-price">
          <BiRupee /> {quantity * cost}
        </h1>
      </div>
    </li>
  )
}

export default CartItem
