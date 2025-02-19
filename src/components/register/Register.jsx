import React from 'react'
import './Register.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import googleOneAccount from '../../assets/googleOneAccount.png'

const Register = () => {
  return (
    <div className='register-container'>
      <div className='reigster-sub-container'>
        <div className='register-sub-container-content'>
          <div className='register-sub-container-content-header'>
            <p>Fundo</p>
            <p>Create your Fundo Account</p>
          </div>

          <form>

            <div className='register-input-name-fields'>
              <TextField
                id="outlined-basic"
                placeholder='First Name*'
                variant="outlined"
                className='register-input-fields-custom-class'
              />
              <TextField
                id="outlined-basic"
                placeholder='Last Name*'
                variant="outlined"
                className='register-input-fields-custom-class'
              />
            </div>

            <div className='register-input-fields'>
              <TextField
                id="outlined-basic"
                placeholder='Username*'
                variant="outlined"
                className='register-input-fields-custom-class'
              />
              <p>You can use letters, numbers & periods</p>
            </div>

            <div className='register-input-fields'>
              <div className='register-input-fields-password'>
                <TextField
                  id="outlined-basic"
                  placeholder='Password*'
                  variant="outlined"
                  className='register-input-fields-custom-class'
                />
                <TextField
                  id="outlined-basic"
                  placeholder='Confirm*'
                  variant="outlined"
                  className='register-input-fields-custom-class'
                />
              </div>
              <p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
            </div>

          </form>

          <div className='register-sub-container-buttons'>
            <p>Sign in instead</p>
            <Button variant="contained">Register</Button>
          </div>
        </div>

        <div className='register-sub-container-image-div'>
          <img src={googleOneAccount} width={200}></img>
          <div>
            <p>One account. All of Fundo</p>
            <p>working for you</p>
          </div>
        </div>
      </div>
      <div className='register-form-additional-options'>
        <p>Help</p>
        <p>Privacy</p>
        <p>Terms</p>
      </div>
    </div>
  )
}

export default Register
