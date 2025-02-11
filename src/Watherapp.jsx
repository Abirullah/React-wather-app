// import React from 'react'
import './App.css'
import axios from 'axios'
import { useState } from 'react'

function Watherapp() {
    const [Description , setDescription ] = useState('')
    const [Place, setPlace] = useState('');
    const [Heat, setHeat] = useState('');
    const [Wind, setWind] = useState('');
    const [Direction , setDirection] = useState('');
    const [HAlat, setHAlat] = useState('');
    const [Apikey, setApikey] = useState('8b166f673cee1210e7f90905df53451c');
    const getData = () => {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${Place}&appid=${Apikey}&units=metric`)
          .then((response) => {
            // handle success
            setHeat(response.data.main.temp);
            setHAlat(response.data.weather[0].icon)
            setDescription(response.data.weather[0].description)
            setWind(response.data.wind.speed)
            setDirection(response.data.wind.deg)
            console.log(response.data);
          })

          .catch(() => {
            alert('Please enter valid place');
          });
      };

      return (
        <div className='return'>
          <input type="text" value={Place} onChange={(e) => setPlace(e.target.value)} placeholder="Enter place" />
          <button onClick={getData}>Get Weather</button>
          <div className="data-get">
           <div className="data-main">
              <img src={`http://openweathermap.org/img/wn/${HAlat}.png`} alt="Weather icon" />
             <h2>{Description}</h2>
          </div>
          <div className="data-detail">
            <h2>Temprature : {Heat}°C</h2>
            <h2>Wind flow from {Direction}° with speed of {Wind}km/h</h2>
          </div>
          </div>
        </div>
      );
    }

export default Watherapp
