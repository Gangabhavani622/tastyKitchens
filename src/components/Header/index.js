import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {RiMenuLine} from 'react-icons/ri'
import {IoIosCloseCircle} from 'react-icons/io'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {menuOption: false}

  onClickToggleMenu = () => {
    this.setState(prevState => ({menuOption: !prevState.menuOption}))
  }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  render() {
    const {menuOption} = this.state
    return (
      <div className="main-cont">
        <nav className="header-cont">
          <Link to="/" className="logo-container">
            <img
              src="https://res.cloudinary.com/doofdbsu7/image/upload/v1691676186/logo_ojjh0e.svg"
              className="logo"
              alt="website logo"
            />
            <h1 className="app-title">Tasty Kitchens</h1>
          </Link>
          <ul className="routes-menu">
            <li key="home">
              <Link to="/" className="link-element">
                Home
              </Link>
            </li>
            <li key="cart">
              <Link to="/cart" className="link-element">
                Cart
              </Link>
            </li>
            <li key="logout">
              <Popup
                modal
                trigger={
                  <button className="logout-btn" type="button">
                    Logout
                  </button>
                }
                className="popup-content"
              >
                {close => (
                  <div className="popup-content popup-container">
                    <h1 className="popup-description">
                      Are you sure you want to logout?
                    </h1>
                    <div className="buttons-box">
                      <button
                        className="btn"
                        type="button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={this.onLogout}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </li>
          </ul>
          <RiMenuLine
            className="hamburger-icon"
            onClick={this.onClickToggleMenu}
          />
        </nav>
        {menuOption && (
          <div className="menu-mob">
            <ul className="routes-menu-mob">
              <li key="home">
                <Link to="/" className="link-element">
                  Home
                </Link>
              </li>
              <li key="cart">
                <Link to="/cart" className="link-element">
                  Cart
                </Link>
              </li>
              <li key="logout">
                <Popup
                  modal
                  trigger={
                    <button className="logout-btn" type="button">
                      Logout
                    </button>
                  }
                  className="popup-content"
                >
                  {close => (
                    <div className="popup-content popup-container">
                      <h1 className="popup-description">
                        Are you sure you want to logout?
                      </h1>
                      <div className="buttons-box">
                        <button
                          className="btn"
                          type="button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn"
                          type="button"
                          onClick={this.onLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </li>
            </ul>
            <IoIosCloseCircle
              onClick={this.onClickToggleMenu}
              className="close-menu-icon"
            />
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Header)
