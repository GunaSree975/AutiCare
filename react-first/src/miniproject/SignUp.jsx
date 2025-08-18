import React from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {Link} from 'react-router-dom'
import loginpage from '../assets/loginpage.jpg'

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const navigate=useNavigate();
const [err,setErr]=useState(null)


  function handleFormSubmit(newUser) {
    // Clear any existing error
    if (err) setErr(null);

    fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
     
      })
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          throw new Error(data.error || 'Signup failed');
        });
      }
      return res.json();
    })
    .then(data => {
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        navigate('/activities');
      } else {
        setErr({ message: data.error || 'Signup failed' });
      }
    })
    .catch(error => setErr({ message: error.message || 'An error occurred during signup' }));
  }

  return (
   
  
  <div className="flex-1  flex justify-center items-center" style={ {backgroundImage: `url(${loginpage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>
          
   <div >
        
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className=" p-8 rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center" style={{paddingTop:"100px"}}>Sign Up</h2>
  
          
          <div style={{textAllign:"center"}}>
         <label htmlFor="username" style={{paddingTop:"40px",fontSize:"20px",paddingRight:"10px",marginLeft:"75px"}}>Username:</label>
         <input id="username" {...register("username", { required: true, minLength: 3 })} style={{borderRadius:"25%",padding:"10px"}}/>
         {errors.username && <span className="text-danger">{errors.username.type === 'minLength' ? 'Username must be at least 3 characters' : 'Username is required'}</span>}
       </div>
  
       <div>
         <label htmlFor="email" style={{paddingTop:"40px",fontSize:"20px",paddingRight:"10px",marginLeft:"75px"}}>Email:</label>
         <input id="email" type="email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/ })} style={{borderRadius:"25%",padding:"10px",marginLeft:"42px"}}/>
         {errors.email && <span className="text-danger">{errors.email.type === 'pattern' ? 'Please enter a valid Gmail address' : 'Email is required'}</span>}
       </div>
  
          <div>
         <label htmlFor="password" style={{paddingTop:"30px",fontSize:"20px",paddingRight:"10px",marginLeft:"75px"}}>Password:</label>
         <input id="password" type="password" {...register("password", { required: true, minLength: 6 })} style={{borderRadius:"25%",padding:"10px"}} />
         {errors.password && <span className="text-danger">{errors.password.type === 'minLength' ? 'Password must be at least 6 characters' : 'Password is required'}</span>}
       </div>

  
          {/* Submit Button */}
          {err && <div className="text-danger text-center mt-3">{err.message}</div>}
          <button
            type="submit"
            className="btn btn-primary"
            style={{marginTop:"30px",padding:"10px 20px",borderRadius:"20%",textAllign:"center",marginLeft:"195px"}}
          >
            Sign Up
          </button>
        </form>
        <div className="d-flex">
          <h4 style={{marginLeft:"50px",paddingTop:"20px"}}>__________Already a user?_______</h4>
         <Link to="/login" className='nav-link text-dark fw-bold fs-3 ' style={{marginLeft:"10px",paddingTop:"20px"}}>Login</Link>
      </div>
      
      
      </div>
      </div>
   
    
  );
};

export default SignupForm;
