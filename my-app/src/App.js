
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddLocation from './Location/AddLocation';
import EditLocation from './Location/EditLocation';
import ViewLocation from './Location/ViewLocation';
import Map from './Location/Map';
import ARC from './Location/ARC';
import ADDARC from './Location/addArc';
import TEST from './Location/test';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/location' element={<AddLocation/>}/>
            <Route exact path='/editlocation/:id' element={<EditLocation/>}/>
            <Route exact path='/viewlocation/:id' element={<ViewLocation/>}/>
            <Route exact path='/map' element={<Map/>}/>
            <Route exact path='/arcgis' element={<ARC/>}/>
            <Route exact path='/addarc' element={<ADDARC/>}/>
            <Route exact path='/test' element={<TEST/>}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
