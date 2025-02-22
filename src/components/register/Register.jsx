import React from 'react'
import './Register.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import googleOneAccount from '../../assets/googleOneAccount.png'
import { Link } from 'react-router-dom';

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
                label='First Name*'
                variant="outlined"
                className='register-input-fields-custom-class'
                InputLabelProps={{
                  style: {
                    fontSize: '0.8rem',
                    top: '-5px'
                  }
                }}
              />
              <TextField
                id="outlined-basic"
                label='Last Name*'
                variant="outlined"
                className='register-input-fields-custom-class'
                InputLabelProps={{
                  style: {
                    fontSize: '0.8rem',
                    top: '-5px'
                  }
                }}
              />
            </div>

            <div className='register-input-fields'>
              <TextField
                id="outlined-basic"
                label='Username*'
                variant="outlined"
                className='register-input-fields-custom-class'
                InputLabelProps={{
                  style: {
                    fontSize: '0.8rem',
                    top: '-5px'
                  }
                }}
              />
              <p>You can use letters, numbers & periods</p>
            </div>

            <div className='register-input-fields'>
              <div className='register-input-fields-password'>
                <TextField
                  id="outlined-basic"
                  label='Password*'
                  variant="outlined"
                  className='register-input-fields-custom-class'
                  InputLabelProps={{
                    style: {
                      fontSize: '0.8rem',
                      top: '-5px'
                    }
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label='Confirm*'
                  variant="outlined"
                  className='register-input-fields-custom-class'
                  InputLabelProps={{
                    style: {
                      fontSize: '0.8rem',
                      top: '-5px'
                    }
                  }}
                />
              </div>
              <p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
            </div>

          </form>

          <div className='register-sub-container-buttons'>
            <Link to={'/'}>
              <p>Sign in instead</p>
            </Link>
            <Button variant="contained">Register</Button>
          </div>
        </div>

        <div className='register-sub-container-image-div'>
          <img src={googleOneAccount} width={200}></img>
          <div className='register-sub-container-image-div-content'>
            <p>One account. All of Fundo</p>
            <p>working for you</p>
          </div>
        </div>
      </div>
      <div className='register-form-additional-options'>
        <div>
          <p>English (United States)</p>
        </div>
        <div>
          <p>Help</p>
          <p>Privacy</p>
          <p>Terms</p>
        </div>
      </div>
    </div>
  )
}

export default Register
