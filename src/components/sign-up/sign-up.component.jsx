import React, { Component } from 'react'

import './sign-up.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomBtton from '../custom-button/custom-button.component'
import {auth, createUserProfileDocument} from '../../firebase/firebase.util'

class SignUp extends Component {
  constructor(){
    super()

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  }

  handleSubmit = async(event) => {
    event.preventDefault()

    const {displayName, email, password, confirmPassword} = this.state

  if (password !== confirmPassword) {
    alert("Passwords don't match")
    return
  }

  try {
    const {user} = await auth.createUserWithEmailAndPassword(email, password)
    console.log("CRESTED USER(SIGN UP): ", user);
    await createUserProfileDocument(user, {displayName})

    this.setState({
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    })

  } catch (error) {
    console.log(error);
  }

  }

  handleChange = (event) => {
    const {name, value} = event.target
    // const {name, value} = target
    this.setState({
      [name]: value
    })
  }

  render(){
    const {displayName, email, password, confirmPassword} = this.state
    return (
      <div className="sign-up">
        <h2 className="title">
          I do not have an account
        </h2>
        <span>Sign up with your email and password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
        </form>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
        </form>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
        </form>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />

          <CustomBtton type="submit">SIGN UP</CustomBtton> 
        </form>
      </div>

    )
  }
}

export default SignUp