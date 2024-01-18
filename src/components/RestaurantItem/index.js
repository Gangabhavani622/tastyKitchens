import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const RestaurantItem = prop => {
  const {restaurantItem} = prop
  const {imageUrl, name, cuisine, id, userRating} = restaurantItem
  const {rating, totalReviews} = userRating

  return (
    <li>
      <Link
        to={`/restaurant/${id}`}
        style={{textDecoration: 'none'}}
        testid="restaurant-item"
        className="item-container"
      >
        <img alt="restaurant" src={imageUrl} className="restaurant-img" />
        <div className="restaurant-details-cont">
          <h1 className="restaurant-title">{name}</h1>
          <p className="food-type">{cuisine}</p>
          <div className="rating-cont">
            <FaStar size="13px" color="#FFCC00" />
            <span className="rating">{rating}</span>
            <span className="reviews">({totalReviews} ratings)</span>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantItem
