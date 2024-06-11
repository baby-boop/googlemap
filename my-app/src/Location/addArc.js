import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { loadModules } from 'esri-loader';
import axios from 'axios';

export default function AddLocation() {
    const [location, setLocation] = useState({
        name: "",
        address: "",
        latitude: "",
        longitude: ""
    });

    let navigate = useNavigate();
    let mapView;
    let graphicsLayer;

    useEffect(() => {
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/GraphicsLayer'])
            .then(([ArcGISMap, MapView, GraphicsLayer]) => {
                const map = new ArcGISMap({
                    basemap: 'streets-navigation-vector'
                });
                mapView = new MapView({
                    container: 'map',
                    map: map,
                    center: [106.8728637, 47.9109801], // Mongolia coordinates
                    zoom: 12
                });
                graphicsLayer = new GraphicsLayer();
                mapView.map.add(graphicsLayer);

                mapView.on("click", (event) => {
                    setLocation({
                        ...location,
                        latitude: event.mapPoint.latitude,
                        longitude: event.mapPoint.longitude
                    });
                    addMarker(event.mapPoint.latitude, event.mapPoint.longitude);
                });
            })
            .catch((err) => console.error(err));
    }, []);

    const addMarker = (latitude, longitude) => {
        const point = {
            type: "point",
            longitude: longitude,
            latitude: latitude
        };
        const markerSymbol = {
            type: "simple-marker",
            color: [45, 42, 241],
            outline: {
                color: [45, 42, 241],
                width: 2
            }
        };
        const pointGraphic = {
            geometry: point,
            symbol: markerSymbol
        };
        graphicsLayer.removeAll();
        graphicsLayer.add(pointGraphic);
    };

    const onInputChange = (e) => {
        setLocation({ ...location, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post("http://localhost:8080/location", location);
            console.log("Амжилттай хадгалагдлаа:", response.data);
            navigate("/");
        } catch (error) {
            console.error("Алдаа гарлаа:", error);
        }

    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 off-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>ARC test</h2>
                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Нэр
                            </label>
                            <input type='text' name='name' className='form-control' placeholder='Нэр ...' value={location.name} onChange={onInputChange} />

                            <label htmlFor='Address' className='form-label'>
                                Хаяг
                            </label>
                            <input type='text' name='address' className='form-control' placeholder='Хаяг ...' value={location.address} onChange={onInputChange} />

                            <label htmlFor='Latitude' className='form-label'></label>
                            <input type='number' name='latitude' className='form-control' placeholder='Өргөрөг ...' value={location.latitude} onChange={onInputChange} />

                            <label htmlFor='Longitude' className='form-label'> </label>
                            <input type='number' name='longitude' className='form-control' placeholder='Уртгар ...' value={location.longitude} onChange={onInputChange} />
                        </div>
                        <div id="map" style={{ width: '100%', height: '400px', marginBottom: '20px' }}></div>
                        <button type='submit' className='btn btn-outline-primary'>Хадгалах</button>
                        <Link type='submit' className='btn btn-outline-danger mx-2' to="/">Буцах</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
