import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    isError: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowPasswordStatus = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    this.setState({isError: false})
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, isError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showPassword, errorMsg, isError} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page">
        <div className="login-form-cont">
          <div className="bg-image">
            <h1 className="login-text-sm">Login</h1>
          </div>
          <form onSubmit={this.onSubmitForm} className="login-form">
            <img
              src="https://res.cloudinary.com/doofdbsu7/image/upload/v1691676186/logo_ojjh0e.svg"
              className="logo-img"
              alt="website logo"
            />
            <h1 className="logo-title">Tasty Kitchens</h1>
            <h1 className="login-text">Login</h1>
            <div className="input-container">
              <label htmlFor="Username" className="input-label">
                USERNAME
              </label>
              <input
                type="text"
                className="input-element"
                id="Username"
                onChange={this.onChangeUsername}
                value={username}
              />
              <label htmlFor="Password" className="input-label">
                PASSWORD
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-element"
                id="Password"
                onChange={this.onChangePassword}
                value={password}
              />
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  onChange={this.onChangeShowPasswordStatus}
                  id="ShowPassword"
                  className="input-checkbox"
                />
                <label htmlFor="ShowPassword" className="input-checkbox-label">
                  Show Password
                </label>
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
            {isError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/doofdbsu7/image/upload/v1691659676/TastyKitchenLgBg_abpikk.png"
          alt=""
          className="login-img"
        />
      </div>
    )
  }
}

export default LoginPage
