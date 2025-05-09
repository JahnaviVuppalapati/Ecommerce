import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginSignupImage from "../assest/login-animation.gif";
import { BiHide } from "@react-icons/all-files/bi/BiHide";
import { BiShow } from "@react-icons/all-files/bi/BiShow";
import { ImagetoBase64 } from "../utility/ImagetoBase64"
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image : ""
  });
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
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
  const handleUploadProfileImage = async(e)=>{   
    const data = await ImagetoBase64(e.target.files[0])
    console.log(data)

    setData((preve)=>{
        return{
            ...preve,
            image : data
        }
    })


  }
  console.log(process.env.REACT_APP_SERVER_DOMIN)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
  
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json" // Corrected header key
            },
            body: JSON.stringify(data)
          });
  
          if (!fetchData.ok) {
            throw new Error(`HTTP error! status: ${fetchData.status}`);
          }
  
          const dataRes = await fetchData.json();
          console.log(dataRes);
          // alert(dataRes.message)
          toast(dataRes.message)
          if(dataRes.alert){
            navigate("/login")
          }

          
        } catch (error) {
          console.error('Request failed:', error);
          alert('An error occurred during the request.');
        }
      } else {
        alert("password and confirm password not equal");
      }
    } else {
      alert("enter all fields");
    }
  };
  
  console.log(data)
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-md bg-white m-auto flex  flex-col p-4">
         {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1>
          */}
          <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative cursor-pointer">
          <img src={data.image ? data.image : loginSignupImage} className="w-full h-full" />
          <label htmlFor="profileImage">
          <div className="absolute bottom-0 h-1/3 bg-slate-500 w-full text-center cursor-pointer">
            <p className="text-sm p-1 text-white">Upload</p>
          </div>
          <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage} />

        </label> 
          </div>

          <form className="w-full py-3 flex flex-col" 
          onSubmit={handleSubmit}
          >
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.firstName}
            onChange={handleOnChange}
          ></input>

          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleOnChange}
          ></input>

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

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              className="mt-1 w-full bg-slate-200 border-none outline-none rounded "
              value={data.confirmPassword}
              onChange={handleOnChange}
            ></input>
            <span className="flex text-xl" onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button type="submit" className=" w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign Up
          </button>
        </form>
        <p className="text-left text-sm">Already have an account? <Link to={"/login"} className="text-red-600 underline">Login</Link></p>
      </div>
    </div>  
  )
}

export default Signup
