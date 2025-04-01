import logo from './logo.svg';
import './App.css';
import React from 'react'
import Header from './component/Header.js';
import { Outlet } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';
import { useEffect } from "react";

function App() {
  // const dispatch = useDispatch()
  // const productData = useSelector((state)=>state.product)
 
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
      const resData = await res.json()
      // dispatch(setDataProduct(resData))
      console.log(resData)
    })()
  },[])
  return (
    <>
      <Toaster />
      <div>
      <Header />
      <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet />
      </main>
      </div>
    
    </>
  );
}

export default App;
