import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function EditLocation() {

    let navigate = useNavigate()

    const {id} = useParams()

    const [location, setLocation] = useState({
        name: "",
        address: "",
        latitude: "",
        longitude: ""
    });

    const onInputChange = (e) => {
        setLocation({ ...location, [e.target.name]: e.target.value });
    }

    useEffect(()=>{
        loadLocations()
    },[])

    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/location/${id}`, location)
        navigate("/")
    }

    const loadLocations= async (e) =>{
        const result = await axios.get(`http://localhost:8080/location/${id}`)
        setLocation(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 off-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Байршил засах</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Нэр
                        </label>
                        <input type='text' name='name' className='form-control' placeholder=' нэр оруулна уу' value={location.name} onChange={onInputChange} />

                        <label htmlFor='Address' className='form-label'>
                            Байршил
                        </label>
                        <input type='text' name='address' className='form-control' placeholder='Хаяг оруулна уу' value={location.address} onChange={onInputChange} />

                        <label htmlFor='Longitude' className='form-label'>
                            Уртраг
                        </label>
                        <input type='number' name='longitude' className='form-control' placeholder=' Уртраг оруулна уу' value={location.longitude} onChange={onInputChange} />

                        <label htmlFor='Latitude' className='form-label'>
                            Өргөрөг
                        </label>
                        <input type='number' name='latitude' className='form-control' placeholder=' Өргөрөг оруулна уу' value={location.latitude} onChange={onInputChange} />

                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Засах</button>
                    <Link type='submit' className='btn btn-outline-danger mx-2' to="/">Буцах</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
