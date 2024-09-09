import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("https://gofood-anj-backend.onrender.com/api/myorderdata", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response.orderArr)
            console.log(response.orderArr);
        })

        // console.log(orderData);
        // await res.map((data)=>{
        //    console.log(data)
        // })


    }
    console.log("printing order data");
    console.log(orderData);
    // console.log(fetchMyOrder);
    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const res = await fetchMyOrder();
    //         const data = await res.json();
      
    //         // Handle the response data
    //         console.log('Data:', data);
      
    //         // Now you can do something with the response data,
    //         // like updating state or performing other operations.
    //         // For example:
    //         // setOrderData(data);
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //     };
      
    //     fetchData();
    //   }, []);      
    useEffect(() => {
      const fetchData =async()=>{
        await fetchMyOrder()
      }
        fetchData();
    }, [])
    return (
      <>
      {console.log("im in return")}
      {console.log(orderData[0])}
        {/* // orderData.map((item) => {
        //   console.log(item);
        //     return (
        //       <div key={item.id}>
        //         {console.log("hello")}
        //       </div>
        //     );
        //   }) */}
        </>
    )
}
// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}
