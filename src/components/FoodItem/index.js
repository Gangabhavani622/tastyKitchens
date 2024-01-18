import {FaStar} from 'react-icons/fa'
import Counter from '../Counter'
import './index.css'

const FoodItem = props => {
  const {foodItem} = props
  const {cost, imageUrl, name, rating} = foodItem
  return (
    <li data-testid="foodItem" className="food-item-container">
      <img alt="restaurant" src={imageUrl} className="food-item-img" />
      <div className="food-item-details-cont">
        <h1 className="food-item-title">{name}</h1>
        <p className="food-item-type"> ₹{cost}</p>
        <div className="food-item-rating-cont">
          <FaStar size="13px" color="#FFCC00" />
          <span className="food-item-rating">{rating}</span>
        </div>
        <Counter foodItem={foodItem} />
      </div>
    </li>
  )
}

export default FoodItem
