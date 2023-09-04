import '../Login/login.css';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { getUserByEmail } from '../../services/userService';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function LoginScreen() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(null);

    const onSubmit = (data) => {
        const { email, password } = data;
        const user = getUserByEmail(email);
        console.log(data, user);
        //save login data in context
        login(user)
        
        if (user && user.password === password) {
            console.log(`Logged in as ${user.type}`);
            if(user.type === 'admin'){
                navigate('/admin')
            }else {
                navigate('/home')
            }
        } else {
            setLoginError('Invalid email or password');
        }
    };

    return (
        <div className="login-root">
            <h1>Welcome Back!</h1>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', { 
                        required: 'This field is required',
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                            message: 'Invalid email address',
                        }, 
                    })}
                />
                {errors.email && <span className="error">{errors.email.message}</span>}

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    {...register('password', { 
                        required: 'This field is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters long',
                        }, 
                    })}
                />
                {errors.password && <span className="error">{errors.password.message}</span>}

                {loginError && <p className="error">{loginError}</p>}
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LoginScreen;