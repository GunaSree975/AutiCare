import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import loginpage from '../assets/loginpage.jpg';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [userLoginErr, setUserLoginErr] = useState(null);

  function onUserLogin({ username, password }) {
    fetch('http://localhost:5000/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username, // Using username field for email
        password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        console.log('Login successful');
        navigate('/activities');
      } else {
        setUserLoginErr({ message: 'User not found. Please register.' });
      }
    })
    .catch(err => setUserLoginErr({ message: 'An error occurred during login' }));
  }

  return (
    <div 
      className="flex-1 flex items-center justify-center  bg-cover bg-center"
      style={{ backgroundImage: `url(${loginpage})` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onUserLogin)} className="flex flex-col gap-4">
          <div>
            <label className="block font-medium">Email:</label>
            <input 
              {...register("username", { required: true })}
              className="w-full p-2 border rounded"
            />
            {errors.username && <span className="text-red-500 text-sm">Username is required</span>}
          </div>
          <div>
            <label className="block font-medium">Password:</label>
            <input 
              type="password" 
              {...register("password", { required: true })} 
              className="w-full p-2 border rounded"
            />
            {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
          </div>
          {userLoginErr && <span className="text-red-500">{userLoginErr.message}</span>}
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
