import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function AddLocation() {
    const [location, setLocation] = useState({
        name: "",
        address: "",
        latitude: "",
        longitude: ""
    });

    let navigate = useNavigate();
    let map;
    let marker;
  
    // map tohiruulah
    useEffect(() => {
        if (!window.google) {
            // API
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCAbeIOIYyKZeIo8WGupB8aGIn3WStQYQY&libraries=places`;
            script.onload = initMap;
            document.head.appendChild(script);
        } else {
            initMap();
        }
    }, []);

    const initMap = () => {
        map = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 47.9109801, lng: 106.8728637 },
            zoom: 12,
        });
        // markin position awah
        map.addListener("click", (e) => {
            setLocation({
                ...location,
                latitude: e.latLng.lat(),
                longitude: e.latLng.lng()
            });
            setMarkerPosition(e.latLng.lat(), e.latLng.lng());
        });
    };

    const setMarkerPosition = (latitude, longitude) => {
        if (marker) {
            marker.setMap(null);
        }
        marker = new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,   
        });
    };

    const onInputChange = (e) => {
        setLocation({ ...location, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/location", location);
        navigate("/");
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 off-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Байршил нэмэх</h2>
                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                                Нэр
                            </label>
                            <input type='text' name='name' className='form-control' placeholder=' нэр оруулна уу' value={location.name} onChange={onInputChange} />

                            <label htmlFor='Address' className='form-label'>
                                Байршил
                            </label>
                            <input type='text' name='address' className='form-control' placeholder='Хаяг оруулна уу' value={location.address} onChange={onInputChange} />

                            <label htmlFor='Longitude' className='form-label '>
                                Уртраг
                            </label>
                            <input type='hidden' name='longitude' className='form-control ' placeholder=' Уртраг оруулна уу' value={location.longitude} onChange={onInputChange} />

                            <label htmlFor='Latitude' className='form-label '>
                                Өргөрөг
                            </label>
                            <input type='hidden' name='latitude' className='form-control ' placeholder=' Өргөрөг оруулна уу' value={location.latitude} onChange={onInputChange} />
                        </div>
                        <div id="map" style={{ width: '100%', height: '400px', marginBottom: '20px' }}></div>
                        <button type='submit' className='btn btn-outline-primary'>Нэмэх</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2' to="/">Буцах</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
