import React, { useState } from 'react'
import './Register.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import googleOneAccount from '../../assets/googleOneAccount.png'
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../api';

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    service:"advance"
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev)=>{
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSignup = () => {

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.username,
      password: formData.password,
      service: "advance"
    }


    console.log(formData)

    signup(payload)
      .then((res)=>{
        alert("Signup success!")
        navigate('/')
      })
      .catch((err)=>{
        console.log(err)
        alert(`Signup failed! ${err.message}`)
      });

      setFormData((prev)=>{
        return {
          ...prev,
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          confirmPassword: ''
        }
      })

  }


  

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
                name='firstName'
                value={formData.firstName}
                onChange={(e) => handleChange(e)}
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
                name='lastName'
                value={formData.lastName}
                onChange={(e) =>handleChange(e)}
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
                name='username'
                value={formData.username}
                onChange={(e) =>handleChange(e)}
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
                  name='password'
                  value={formData.password}
                  onChange={(e) =>handleChange(e)}
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
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={(e) =>handleChange(e)}
                />
              </div>
              <p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
            </div>

          </form>

          <div className='register-sub-container-buttons'>
            <Link to={'/'}>
              <p>Sign in instead</p>
            </Link>
            <Button
              variant="contained"
              onClick={handleSignup}
            >Register
            </Button>
          </div>
        </div>

        <div className='register-sub-container-image-div'>
          <img src={googleOneAccount} alt='register' width={200}></img>
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
