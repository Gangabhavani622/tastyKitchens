import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import Cookies from 'js-cookie'

import Slide from 'react-slick'

import RestaurantItem from '../RestaurantItem'
import Footer from '../Footer'
import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failed: 'FAILED',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    carouselImages: [],
    currentPage: 1,
    carouselStatus: apiConstants.initial,
    selectedSortBy: 'Lowest',
    restaurantListStatus: apiConstants.initial,
    restaurantList: [],
    totalPages: 1,
  }

  componentDidMount() {
    this.getCarouselImages()
    this.getRestaurantList()
  }

  getCarouselImages = async () => {
    this.setState({carouselStatus: apiConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const imagesList = data.offers.map(eachImage => ({
        id: eachImage.id,
        imageUrl: eachImage.image_url,
      }))
      this.setState({
        carouselImages: [...imagesList],
        carouselStatus: apiConstants.success,
      })
    } else {
      this.setState({carouselStatus: apiConstants.failed})
    }
  }

  getRestaurantList = async () => {
    this.setState({restaurantListStatus: apiConstants.inProgress})
    const {selectedSortBy} = this.state
    const url = `https://apis.ccbp.in/restaurants-list?sort_by_rating=${selectedSortBy}`

    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const dataList = await data.restaurants.map(object => ({
        costForTwo: object.cost_for_two,
        cuisine: object.cuisine,
        groupByTime: object.group_by_time,
        hasOnlineDelivery: object.has_online_delivery,
        hasTableBooking: object.has_table_booking,
        id: object.id,
        imageUrl: object.image_url,
        isDeliveringNow: object.is_delivering_now,
        location: object.location,
        menuType: object.menu_type,
        name: object.name,
        opensAt: object.opens_at,
        userRating: {
          rating: object.user_rating.rating,
          ratingColor: object.user_rating.rating_color,
          ratingText: object.user_rating.rating_text,
          totalReviews: object.user_rating.total_reviews,
        },
      }))
      const totalItems = Math.ceil(dataList.length / 9)

      this.setState({
        restaurantListStatus: apiConstants.success,
        restaurantList: [...dataList],
        totalPages: totalItems,
      })
    } else {
      this.setState({restaurantListStatus: apiConstants.failed})
    }
  }

  carouselDisplaySuccess = () => {
    const {carouselImages} = this.state
    console.log(carouselImages)

    const settings = {
      dots: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      fade: true,
      arrows: false,
      autoplaySpeed: 4000,
    }

    return (
      <div className='carousel-img-box'>
        <Slide {...settings}>
          {carouselImages.map(eachImage => (
            <img
              src={eachImage.imageUrl}
              key={eachImage.id}
              alt={eachImage.id}
              className='carousel-image'
            />
          ))}
        </Slide>
      </div>
    )
  }

  onChangeSort = e => {
    this.setState({selectedSortBy: e.target.value}, this.getRestaurantList)
  }

  getPopularRestaurant = () => {
    const {selectedSortBy} = this.state

    return (
      <div className='popular-container'>
        <h1 className='popular-heading'>Popular Restaurants</h1>
        <div className='popular-description-cont'>
          <p className='popular-description'>
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>

          <div className='filter-container'>
            <BsFilterLeft className='filter-icon' />
            <label htmlFor='sortBy' className='sort-by-label'>
              Sort By
            </label>
            <select
              id='sortBy'
              value={selectedSortBy}
              onChange={this.onChangeSort}
              className='select-element'
            >
              <option id='lowest'>Lowest</option>
              <option id='highest'>Highest</option>
            </select>
          </div>
        </div>
        <hr className='hr-line' />
      </div>
    )
  }

  renderRestaurant = () => {
    const {currentPage, restaurantList} = this.state
    const offset = (currentPage - 1) * 9
    const limit = currentPage * 9

    const displayList = restaurantList.slice(offset, limit)
    console.log(displayList)
    return (
      <ul className='restaurant-list-cont'>
        {displayList.map(eachItem => (
          <RestaurantItem key={eachItem.id} restaurantItem={eachItem} />
        ))}
      </ul>
    )
  }

  carouselDisplayLoading = () => (
    <div testid='restaurants-list-loader' className='carousel-loader-cont'>
      <Loader type='ThreeDots' color='#0b69ff' height='50' width='50' />
    </div>
  )

  renderCarouselView = () => {
    const {carouselStatus} = this.state
    switch (carouselStatus) {
      case apiConstants.success:
        return this.carouselDisplaySuccess()
      case apiConstants.inProgress:
        return this.carouselDisplayLoading()
      default:
        return null
    }
  }

  renderAllRestaurantsView = () => {
    const {restaurantListStatus} = this.state
    switch (restaurantListStatus) {
      case apiConstants.inProgress:
        return this.carouselDisplayLoading()
      case apiConstants.success:
        return this.renderRestaurant()
      default:
        return null
    }
  }

  handleNextPage = () => {
    this.setState(
      prevState => ({currentPage: prevState.currentPage + 1}),
      this.renderRestaurant,
    )
  }

  handlePrevPage = () => {
    this.setState(
      prevState => ({currentPage: prevState.currentPage - 1}),
      this.renderRestaurant,
    )
  }

  render() {
    const {totalPages, currentPage} = this.state
    return (
      <div className='home-container'>
        <Header />
        {this.renderCarouselView()}
        {this.getPopularRestaurant()}
        {this.renderAllRestaurantsView()}
        <div className='buttons-container'>
          <button
            type='button'
            testid='pagination-left-button'
            onClick={this.handlePrevPage}
            disabled={currentPage === 1}
            className='btn'
          >
            <IoIosArrowBack />
          </button>
          <p className='count'>
            {currentPage} of {totalPages}
          </p>
          <button
            type='button'
            testid='pagination-right-button'
            onClick={this.handleNextPage}
            disabled={currentPage === totalPages}
            className='btn'
          >
            <IoIosArrowForward />
          </button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
