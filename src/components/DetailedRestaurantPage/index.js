import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {FaRupeeSign} from 'react-icons/fa'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class DetailedRestaurantPage extends Component {
  state = {restaurantDataStatus: apiConstants.initial, restaurantData: {}}

  componentDidMount = () => {
    this.getRestaurantInfo()
  }

  convertItemsData = eachItem => ({
    id: eachItem.id,
    cost: eachItem.cost,
    foodType: eachItem.food_type,
    imageUrl: eachItem.image_url,
    name: eachItem.name,
    rating: eachItem.rating,
  })

  getRestaurantInfo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        restaurantId: data.id,
        imageUrl: data.image_url,
        itemCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        foodItems: data.food_items.map(eachItem =>
          this.convertItemsData(eachItem),
        ),
      }
      this.setState({
        restaurantDataStatus: apiConstants.success,
        restaurantData: {...updatedData},
      })
    } else {
      this.setState({restaurantDataStatus: apiConstants.failed})
    }
  }

  renderRestaurantSuccessView = () => {
    const {restaurantData} = this.state
    const {
      costForTwo,
      cuisine,
      restaurantId,
      imageUrl,
      itemCount,
      location,
      name,
      rating,
      reviewsCount,
      foodItems,
    } = restaurantData
    console.log(itemCount, foodItems)
    return (
      <div className="restaurant-view-cont">
        <div data-testid={restaurantId} className="about-restaurant-cont">
          <img
            src={imageUrl}
            alt="banner-img"
            className="banner-restaurant-img"
          />
          <div className="about-details-cont">
            <h1 className="banner-heading">{name}</h1>
            <p className="banner-description">{cuisine}</p>
            <p className="banner-description">{location}</p>
            <div className="banner-rating-cost-cont">
              <div className="banner-sub-cont">
                <div className="rating-container">
                  <AiFillStar className="banner-icon" />
                  <span className="banner-title">{rating}</span>
                </div>
                <p className="banner-para">{reviewsCount}+ Ratings</p>
              </div>
              <hr className="horizontal-line" />
              <div className="banner-sub-cont">
                <div className="rating-container">
                  <FaRupeeSign className="banner-icon" />
                  <span className="banner-title">{costForTwo}</span>
                </div>
                <p className="banner-para">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-container">
          {foodItems.map(foodItem => (
            <FoodItem foodItem={foodItem} key={foodItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderRestaurantLoadingView = () => (
    <div data-testid="restaurants-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderView = () => {
    const {restaurantDataStatus} = this.state

    switch (restaurantDataStatus) {
      case apiConstants.success:
        return this.renderRestaurantSuccessView()
      case apiConstants.inProgress:
        return this.renderRestaurantLoadingView()
      default:
        return null
    }
  }

  render() {
    console.log(localStorage.getItem('cartItems'))
    return (
      <div className="restaurant-detail-view">
        <Header />
        {this.renderView()}
        <Footer />
      </div>
    )
  }
}

export default DetailedRestaurantPage
