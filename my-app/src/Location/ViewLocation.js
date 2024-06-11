import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ViewLocation() {


    const [location, setLocation] = useState({
        name: "",
        address: "",
        latitude: "",
        longitude: ""
    });

    const {id} = useParams();
    useEffect(()=>{
        loadLocations();
    },[])

    const loadLocations=async()=>{
        const result = await axios.get(`http://localhost:8080/location/${id}`)
        setLocation(result.data)
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 off-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Байршил харах</h2>
                    <div className='card'>
                        <div className='card-header'>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Нэр: </b>
                                    {location.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Хаяг: </b>
                                    {location.address}
                                </li>
                                <li className='list-group-item'>
                                    <b>Өргөрөг: </b>
                                    {location.latitude}
                                </li>
                                <li className='list-group-item'>
                                    <b>Уртраг: </b>
                                    {location.longitude}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={"/"}>Буцах</Link>
                </div>
            </div>
        </div>
    )
}
