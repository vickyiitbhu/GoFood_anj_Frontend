import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import "../App.css"
import { json } from 'react-router-dom';
export default function MyOrder() {

    const [orderData, setorderData] = useState({})
    const [canReturn, setCanReturn] = useState(false);
    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("https://gofood-anj-backend.onrender.com/api/myorderdata", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response.orderArr)
            // console.log(response);
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchMyOrder();
            setCanReturn(true);
        }
        fetchData();
    }, [])
    //   console.log(canreturn);
    // console.log("printing")
    // console.log(orderData);

    if (canReturn)
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                {console.log("in return")}
                {console.log(orderData)}
                <div className='container'>
                    <div className='row'>
                        {(() => {
                            const jsxElements = []; // Array to hold JSX elements
                            if(orderData.length==0){
                                jsxElements.push(
                                    <h1>No orders Placed</h1>
                                )
                            }
                            for (let i = 0; i < orderData.length; i++) {
                                let totalprice=0;
                                for(let k=1;k<orderData[i].length;k++)
                                {
                                    totalprice+=orderData[i][k].price;
                                }
                                jsxElements.push(
                                    <div key={`row-${i}`} className='col-12 col-md-6 col-lg-3'>
                                        <div className="card mt-3" style={{ width: "16rem"}}>
                                            <div className="card-body">
                                                <p className="m-1 heading">{orderData[i][0].Order_date}</p>
                                                <p className="m-1 heading rightheading">{totalprice}/-</p>
                                                <hr></hr>
                                                {(() => {
                                                    const jsxElements1 = [];
                                                    for (let j = 1; j < orderData[i].length; j++) {
                                                        jsxElements1.push(
                                                            <div key={`item-${i}-${j}`} className='particular_item'>
                                                                <div className='particular_item_image'>
                                                                <img src={orderData[i][j].img} alt={orderData[i][j].name} width="100%" height="100%"/>
                                                                </div>
                                                                <div className='particular_item_data'>
                                                                    <h5>{orderData[i][j].name}</h5>
                                                                    <p className='qty_size'>{orderData[i][j].qty}|{orderData[i][j].size}|Rs:{orderData[i][j].price}/-</p>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                    return jsxElements1; // Return the array of JSX elements for inner loop
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return jsxElements; // Return the array of JSX elements for outer loop
                        })()}
                    </div>
                </div>


                <Footer />
            </div>
        )
}
// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}
