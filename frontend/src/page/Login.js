import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginSignupImage from "../assest/login-animation.gif";
import { BiHide } from "@react-icons/all-files/bi/BiHide";
import { BiShow } from "@react-icons/all-files/bi/BiShow";
import {toast} from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
    
    const [data, setData] = useState({

      email: "",
      password: "",

    });
    const navigate = useNavigate() 

    const userData = useSelector(state => state)


    const dispatch = useDispatch()
    const handleShowPassword = () => {
      setShowPassword((preve) => !preve);
    };
    
    const handleOnChange = (e)=>{
      const {name,value} = e.target
      setData((preve)=>{
          return{
              ...preve,
              [name] : value,
          }
      })
    }
    const handleSubmit = async(e)=>{
      e.preventDefault()
      const {email,password} = data
      if( email && password ){
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json" // Corrected header key
          },
          body: JSON.stringify(data)
        });

        if (!fetchData.ok) {
          throw new Error(`HTTP error! status: ${fetchData.status}`);
        }
              
        const dataRes = await fetchData.json()
      console.log(dataRes)
      
      
      toast( dataRes.message)
      if(dataRes.alert){
        dispatch(loginRedux(dataRes))
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }

      console.log(userData)
          }
          
      
      else{
          alert("enter all fields")
      }
    }
    // console.log(data)
  return (
    <div className="p-3 md:p-4">
          <div className="w-full max-w-md bg-white m-auto flex  flex-col p-4">
             {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1>
              */}
              <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative cursor-pointer">
              <img src={loginSignupImage} className="w-full h-full" />
              </div>
    
              <form className="w-full py-3 flex flex-col" 
              onSubmit={handleSubmit}
              >
              
    
              <label htmlFor="email">Email</label>
              <input
                type={"email"}
                id="email"
                name="email"
                className="mt-1 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                value={data.email}
                onChange={handleOnChange}
              ></input>
    
              <label htmlFor="password">Password</label>
              <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="mt-1 w-full bg-slate-200 border-none outline-none "
                  value={data.password}
                  onChange={handleOnChange}
                ></input>
                <span className="flex text-xl" onClick={handleShowPassword}>
                  {showPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>
    
              
                
    
              <button type="submit" className=" w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-xl font-medium text-center py-1 rounded-full mt-4">
                Login
              </button>
            </form>
            <p className="text-left text-sm">Dont have an account? <Link to={"/signup"} className="text-red-600 underline">Signup</Link></p>
          </div>
        </div>  
  )
}

export default Login
