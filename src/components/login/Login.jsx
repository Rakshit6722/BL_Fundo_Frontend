import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.scss'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Link, NavLink } from 'react-router-dom';
import { login } from '../../api';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const[emailError, setEmailError] = useState(false)
    const[passwordError, setPasswordError] = useState(false)
    const[emailValidError, setEmailValidError] = useState(false)

    const handleLogin = async () => {
        try {
        
            setEmailError(false);
            setPasswordError(false);
            setEmailValidError(false);
    
            if (!email) return setEmailError(true);
            if (!password) return setPasswordError(true);
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) 
                return setEmailValidError(true);
    
         
            const data = await login({ email, password });
            if(data){
                console.log(data);
                localStorage.setItem('token', data.id);
            }
    
            setEmail('');
            setPassword('');
        } catch (err) {
            console.error(err.message);
        }
    };
    

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
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            {emailError && <span className='login-main-form-input-error'>Email is required</span>}
                            {emailValidError && <span className='login-main-form-input-email-valid-error'>Email is not valid</span>}
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
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            {passwordError && <span className='login-main-form-input-error'>password is required</span>}
                        </div>
                        <div className='login-main-form-forgetpassword'>
                            <p>Forgot password</p>
                        </div>
                    </div>

                    <div className='login-main-form-login-section'>
                        <Link to={'/register'}>
                            <p>Create account</p>
                        </Link>
                        <Button 
                        variant="contained"
                        onClick={handleLogin}
                        >Login</Button>
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
