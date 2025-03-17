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
    service: "advance"
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const validate = () => {
    let isValid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: ''
    };

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (!/^[A-Za-z0-9.]+$/.test(formData.username)) {
      newErrors.username = 'Only letters, numbers, and periods allowed';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(formData.password)) {
      newErrors.password = 'Include letters, numbers & symbols';
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    });
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }

  const handleSignup = () => {
    if (!validate()) {
      return;
    }

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.username,
      password: formData.password,
      service: "advance"
    }

    signup(payload)
      .then((res) => {
        alert("Signup success!")
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        alert(`Signup failed! ${err.message}`)
      });

    setFormData((prev) => {
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
              <div style={{ width: '100%' }}>
                <TextField
                  id="firstName"
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
                  error={!!errors.firstName}
                  fullWidth
                />
                {errors.firstName && <p className="error-message" style={{ color: 'red', fontSize: '12px', margin: '4px 0 0 4px' }}>{errors.firstName}</p>}
              </div>
              <div style={{ width: '100%' }}>
                <TextField
                  id="lastName"
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
                  onChange={(e) => handleChange(e)}
                  error={!!errors.lastName}
                  fullWidth
                />
                {errors.lastName && <p className="error-message" style={{ color: 'red', fontSize: '12px', margin: '4px 0 0 4px' }}>{errors.lastName}</p>}
              </div>
            </div>

            <div className='register-input-fields'>
              <TextField
                id="username"
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
                onChange={(e) => handleChange(e)}
                error={!!errors.username}
                fullWidth
              />
              {errors.username ? (
                <p className="error-message" style={{ color: 'red', fontSize: '12px', margin: '4px 0 0 4px' }}>{errors.username}</p>
              ) : (
                <p>You can use letters, numbers & periods</p>
              )}
            </div>

            <div className='register-input-fields'>
              <div className='register-input-fields-password'>
                <div style={{ width: '100%' }}>
                  <TextField
                    id="password"
                    label='Password*'
                    variant="outlined"
                    type="password"
                    className='register-input-fields-custom-class'
                    InputLabelProps={{
                      style: {
                        fontSize: '0.8rem',
                        top: '-5px'
                      }
                    }}
                    name='password'
                    value={formData.password}
                    onChange={(e) => handleChange(e)}
                    error={!!errors.password}
                    fullWidth
                  />
                  {errors.password && <p className="error-message" style={{ color: 'red', fontSize: '12px', margin: '4px 0 0 4px' }}>{errors.password}</p>}
                </div>
                <div style={{ width: '100%' }}>
                  <TextField
                    id="confirmPassword"
                    label='Confirm*'
                    variant="outlined"
                    type="password"
                    className='register-input-fields-custom-class'
                    InputLabelProps={{
                      style: {
                        fontSize: '0.8rem',
                        top: '-5px'
                      }
                    }}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange(e)}
                    error={!!errors.confirmPassword}
                    fullWidth
                  />
                  {errors.confirmPassword && <p className="error-message" style={{ color: 'red', fontSize: '12px', margin: '4px 0 0 4px' }}>{errors.confirmPassword}</p>}
                </div>
              </div>
              {!errors.password && !errors.confirmPassword && (
                <p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
              )}
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