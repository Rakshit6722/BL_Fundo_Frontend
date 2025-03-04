import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api';

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [emailValidError, setEmailValidError] = useState(false)

    const handleLogin = () => {
        setEmailError(false);
        setPasswordError(false);
        setEmailValidError(false);

        if (!email) return setEmailError(true);
        if (!password) return setPasswordError(true);
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
            return setEmailValidError(true);

        const payload = {
            email,
            password
        }

        login(payload)
            .then((res) => {
                localStorage.setItem("token", res?.data?.id)
                localStorage.setItem("firstName", res?.data?.firstName)
                navigate('/dashboard/notes')
                // alert("Login success!")
            })
            .catch((err) => {
                console.log(err)
                alert(`Login failed! ${err.message}`)
            })

        setEmail('');
        setPassword('');
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
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
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
