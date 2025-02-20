import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.scss'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Login = () => {
    return (
        <div className='login-container'>
            <div className='login-main-form'>
                <div className='login-main-form-header'>
                    <p>Fundo</p>
                    <p>Sign in</p>
                    <p>Use your fundo account</p>
                </div>
                <form>
                    <div>
                        <div className='login-main-form-input-fields'>
                            <TextField
                                id="outlined-basic"
                                label='Email or phone*'
                                variant="outlined"
                                className='login-form-custom-class'
                                InputLabelProps={{
                                    style: {
                                        fontSize: '0.8rem',
                                    
                                    }
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label='password*'
                                variant="outlined"
                                className='login-form-custom-class'
                                InputLabelProps={{
                                    style: {
                                        fontSize: '0.8rem',
                        
                                    }
                                }}
                            />
                        </div>
                        <div className='login-main-form-forgetpassword'>
                            <p>Forgot password</p>
                        </div>
                    </div>

                    <div className='login-main-form-login-section'>
                        <p>Create account</p>
                        <Button variant="contained">Login</Button>
                    </div>
                </form>
            </div>

            <div className='login-form-additional-options'>
                <div>
                    <p>English (United Kingdom)</p>
                </div>
                <div className='login-form-additional-options-footer'>
                    <p>Help</p>
                    <p>Privacy</p>
                    <p>Terms</p>
                </div>
            </div>
        </div>
    )
}

export default Login
