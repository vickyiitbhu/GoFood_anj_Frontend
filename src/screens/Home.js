import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

import BackGround1 from '../Images/BackGround1.jpg';
import BackGround2 from '../Images/BackGround2.jpg';
import BackGround3 from '../Images/BackGround3.jpg';

export default function Home() {

  const [search, setSearch] = useState('');
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfooditem] = useState([]);
  
  const loadData = async () => {
    console.log("I am here")
    let response = await fetch("https://gofood-anj-backend.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // console.log(response);
    response = await response.json()
    console.log(response);
    // console.log(" am printing"+response);
    setfooditem(response[0]);
    setfoodCat(response[1]);
    // console.log(response[0],response[1]);

  }
  useEffect(() => {
    loadData()
  }, [])
console.log("HELLO HOME");
  return (
    <>
      <div><Navbar /></div>
      <div><div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ "objectFit": "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption d-block" style={{ "zIndex": "10", "objectFit": "contain !important" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src={BackGround1} className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
            </div>
              <div className="carousel-item">
              <img src={BackGround2} className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={BackGround3} className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div></div>
      <div className='container'>
        {          
          foodCat 
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {
                    foodItem
                      ?
                      foodItem.filter((item) => (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                        .map(filterItems => {
                          return (
                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                              <Card foodItem={filterItems}
                                options={filterItems.options[0]}>
                              </Card>
                            </div>
                          )
                        }) : <div> No Such data Found </div>
                  }

                </div>

              )
            })
            : <div>"""""""</div>

        }
      </div>
      {/* <div><Footer/></div> */}
    </>
  )
}
