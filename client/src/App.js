import React,{useState,useEffect} from 'react'
import "./App.css"
import dayjs from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios'





const App = () => {
  const [carList, setCarList] = useState([]);
  const [specific, setSpecific] = useState("");
  const [search,setSearch]=useState(null)
const[car_name,set_carName]=useState("")
const[car_price,set_carPrice]=useState(0)
const[car_model,set_carModel]=useState("")
const [date, setdate] = React.useState(dayjs(new Date()));

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post('http://localhost:8001/api/v1/cars', {
    car_name:   car_name,
      price:car_price,
    model_no:  car_model,
    date_of_sale: date
    });
    console.log('Car details posted successfully:', response.data);
    // Reset form fields
    set_carName('');
    set_carPrice('');
    set_carModel('');
    setdate(dayjs(new Date()));
    
  } catch (error) {

    console.log('Error while posting car details:', error);
   
  }
};

useEffect(() => {
  fetchData();
}, [carList])


const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8001/api/v1/cars');
    setCarList(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};


const findCar = async () => {

  try {
    console.log(typeof specific)
    const res=await axios.post(`http://localhost:8001/api/v1/findcar`,  { model_no: specific } );
  //  const response = await axios.get('http://localhost:8001/api/v1/findcar',  { model_no: specific } );
    console.log(res)
     // Assuming the server returns the car 
     setSearch(res.data);
  } catch (error) {
    console.error('Error searching for car:',error.message);
     // Rethrow the error for the caller to handle
  }
};
  return (
    <div className="container">
      <div className="left">
                

        <div className="top">
                    
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={['DatePicker']}> */}
        {/* <DatePicker label="Uncontrolled picker" defaultdate={dayjs('2022-04-17')} /> */}
        <DatePicker
          label="Date of Sales"
          value={date}
          onChange={(newdate) => setdate(newdate)}
        />
      {/* </DemoContainer> */}
    </LocalizationProvider>

     <input type="text" placeholder="Car Name" value={car_name} onChange={(e)=>set_carName(e.target.value)}/>
     <input type="number" placeholder="Car Price in INR" value={car_price} onChange={(e)=>set_carPrice(e.target.value)}/>
      <input type="text" placeholder="Car Model" value={car_model} onChange={(e)=>set_carModel(e.target.value)}/>
  <button onClick={handleSubmit}>Submit</button>

        </div>
            <div className="bottom">
            <input type="text" placeholder="Search Car" value={specific} onChange={(e)=>setSpecific(e.target.value)}/>
            <button onClick={findCar}>Search</button>
            <p>Car Name: {search?.car_name}</p>
            <p>Model: {search?.model_no}</p>
            <p>Price: Rs {search?.price}</p>
            <p>Date: {search?dayjs(search?.date_of_sale).format('YYYY-MM-DD'):''}</p>

            </div>
      </div>
      
      <div className="right">
      
      <ul>
        {carList.map((car, index) => (
          <div key={index} className="id">
            <p>Car Name: {car.car_name}</p>
            <p>Model: {car.model_no}</p>
            <p>Price:Rs {car.price}</p>
            <p>Date: {dayjs(car.date_of_sales).format('YYYY-MM-DD')}</p>
          </div>
        ))}
      </ul>
      </div>

      
    </div>
  )
}

export default App
