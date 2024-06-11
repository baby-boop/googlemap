import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {


    const [location, setLocation] = useState([])
    const {id} = useParams()

    useEffect(()=>{
        loadLocations();
    },[]);

    const loadLocations=async()=>{
        const result=await axios.get("http://localhost:8080/locations");
        setLocation(result.data);
    }

    const deleteLocation=async(id)=>{
        await axios.delete(`http://localhost:8080/location/${id}`)
        loadLocations()
    }

  return (
    <div className='container'>
        <div className='py-4'>
            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Нэр</th>
                        <th scope="col">Хаяг</th>
                        <th scope="col">Өргөрөг</th>
                        <th scope="col">Уртраг</th>
                        <th scope="col">Комманд</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        location.map((location,index)=>(
                            <tr>
                                <th scope="row" key={index}>{index+1}</th>
                                <td>{location.name}</td>
                                <td>{location.address}</td>
                                <td>{location.latitude}</td>
                                <td>{location.longitude}</td>
                                <td>
                                    
                                    {/*<Link className='btn btn-primary mx-2' to={`/viewlocation/${location.id}`}>Харах</Link>
                                    <Link className='btn btn-outline-primary mx-2' to={`/editlocation/${location.id}`}>Засах</Link>*/}
                                    <button className='btn btn-danger mx-2' onClick={()=>deleteLocation(location.id)}>Устгах</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                
            

 
            
            </table>
            <div class="d-grid gap-2 d-md-block">
                <Link className='btn btn-secondary sm-lg bg-success' to="/location">
                    Байршил нэмэх
                </Link>
                <Link className='btn btn-secondary sm-lg bg-primary' to="/addArc">
                    ARCgis нэмэх
                </Link>
            </div>
        </div>
    </div>
  )
}
