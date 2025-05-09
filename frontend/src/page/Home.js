import React from 'react'
import bikeimg from "../assest/bikeicon.png"
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";

const Home = () => {
  const productData = useSelector((state) => state.product.productList)
  console.log(productData)
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable",
    []
  );
  console.log(homeProductCartListVegetables)
  const loadingArray = new Array(4).fill(null);
  // const loadingArrayFeature = new Array(10).fill(null);

  // const slideProductRef = useRef();
  // const nextProduct = () => {
  //   slideProductRef.current.scrollLeft += 200;
  // };
  // const preveProduct = () => {
  //   slideProductRef.current.scrollLeft -= 200;
  // }; 
  
  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-7 py-2 m-3">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img src={bikeimg}
              
               className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fasted Delivery in{" "}
            <span className="text-red-600 text-">Your Home</span>
          </h2>
          <p className="py-3 text-base ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries

            It is a long established fact that a reader will be distracted by the
             readable content of a page when looking at its layout. The point
              of using Lorem Ipsum is that it has a more-or-less normal 
              distribution of letters, as opposed to using 'Content here, 
              content here', making it look like readable English.
          </p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
            Order Now
          </button>
        </div>

        
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    // id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard key={index+"loadging"} loading={"Loading..."} />;
              })}
        </div>
      </div>

      <div className="">
        <div 
        className="flex w-full items-center p-1 "
        >
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"><GrPrevious /></button>
            <button className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"><GrNext /></button>
          </div>
          </div>  
          <div className='flex gap-5 overflow-scroll'>
            {
              homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                  key={el._id}
                    
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                )})
            }
            
          </div>
          {/* <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <GrNext />
            </button>
          </div> */}
        </div>
        {/* <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        > */}
          {/* {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id+"vegetable"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el,index) => (
                <CardFeature loading="Loading..." key={index+"cartLoading"} />
              ))} */}
        {/* </div> */}
      
      
      {/* <AllProduct heading={"Your Product"}/> */}
    </div>
  )
}

export default Home
