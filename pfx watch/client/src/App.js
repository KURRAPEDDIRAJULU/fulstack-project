import {Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
// import TrendingVideos from './Components/TrendingVideos'
// import GamingVideos from './Components/GamingVideos'
//import SavedVideos from './Components/SavedVideos'
function App() {
  return (
    <div className="App">
     <Routes>
    <Route exact path = "/" element={<Home/>}/>
    <Route exact path = "/login" element={<Login/>}/>
    {/* <Route exact path="/trending" component={TrendingVideos} />
          <Route exact path="/gaming" component={GamingVideos} />  */}
          {/* <Route exact path="/saved-videos" component={SavedVideos} /> */}
    </Routes>
    </div>
  );
}

export default App;



