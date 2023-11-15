import { useNavigate,Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import './index.css';

const Home = ()=>{
    let navigate=useNavigate();

    const token=Cookies.get('jwt-token');
    
    useEffect(()=>{
        if(token === undefined){
            navigate("/");
        }
    })

    const [video, setVideo] = useState([]);
    const [trendingVideos, setTrendingVideos] = useState([]);
  const [gameVideos, setGameVideos] = useState([]);
  //const [videoById, setVideoById] = useState(null);
  

  const goToAuth =()=>{
    Cookies.remove('jwt_token')
    navigate("/login")
}


  useEffect(() => {
    // fetchVideo();
    fetchVideos();
    fetchTrendingVideos();
    fetchGamingVideos();
    //fetchVideoById();

  }, []);


  // const fetchVideo = async () => {
  //   try {
  //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTMwY2IyNTkwM2M2MTkxZGYxZWYzOCIsImlhdCI6MTcwMDAxNDQyMH0.D2Axhsg9j_5GlhTYX706kAthtHqilMaLYkECWZPLruA';  // Replace with your actual token
  //     const url = "http://localhost:4445/videos/65531891e5c8cb9c6a6bcd1e";
  //     const options = {
  //       headers: {
  //         Authorization:` Bearer ${token}`,
  //       },
  //       method: 'GET',
  //     };

  //     const response = await fetch(url, options);

  //     if (response.ok) { 
  //       const data = await response.json();
        
  //       setVideo(data);
  //       console.log('65531891e5c8cb9c6a6bcd1e:', data);
  //     } else {
        
  //       const errorData = await response.json();
  //       console.error('Error fetching video:', errorData);
  //       setVideo("Error");
  //     }

  //   } catch (error) {
  //     console.error('Error fetching video:', error);
  //     setVideo("Error");
  //   }
  // };
  

  const fetchVideos = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTMwY2IyNTkwM2M2MTkxZGYxZWYzOCIsImlhdCI6MTcwMDAxNDQyMH0.D2Axhsg9j_5GlhTYX706kAthtHqilMaLYkECWZPLruA';  // Replace with your actual token
      const url = "http://localhost:4445/videos";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      };

      const response = await fetch(url, options);

      if (response.ok) { 
        const data = await response.json();
        
        setVideo(data);
        console.log('Video data:', data);
      } else {
        
        const errorData = await response.json();
        console.error('Error fetching video:', errorData);
        setVideo("Error");
      }

    } catch (error) {
      console.error('Error fetching video:', error);
      setVideo("Error");
    }
  };

  const fetchTrendingVideos = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTMwY2IyNTkwM2M2MTkxZGYxZWYzOCIsImlhdCI6MTcwMDAxNDQyMH0.D2Axhsg9j_5GlhTYX706kAthtHqilMaLYkECWZPLruA';  // Replace with your actual token
      const url = "http://localhost:4445/videos/Trending";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      };

      const response = await fetch(url, options);

      if (response.ok) { 
        const data = await response.json();
        
        setTrendingVideos(data);
        console.log('Trending videos:', data);
      } else {
        
        const errorData = await response.json();
        console.error('Error fetching video:', errorData);
        setVideo("Error");
      }

    } catch (error) {
      console.error('Error fetching video:', error);
      setVideo("Error");
    }
  };

  const fetchGamingVideos = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTMwY2IyNTkwM2M2MTkxZGYxZWYzOCIsImlhdCI6MTcwMDAxNDQyMH0.D2Axhsg9j_5GlhTYX706kAthtHqilMaLYkECWZPLruA';  // Replace with your actual token
      const url = "http://localhost:4445/videos/gaming";
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      };

      const response = await fetch(url, options);

      if (response.ok) { 
        const data = await response.json();
        
        setGameVideos(data);
        console.log('Gaming videos:', data);
      } else {
        
        const errorData = await response.json();
        console.error('Error fetching video:', errorData);
        setVideo("Error");
      }

    } catch (error) {
      console.error('Error fetching video:', error);
      setVideo("Error");
    }
  };

  


    const goToVideos = ()=>{
        navigate('/videos')
     }

     
    return(
        <>
        
        <div className="home-container">
            <div className="responsive-container">
            
                
                <p className="video-desc">PFX Watch Videos</p>

                
                <button className="find-videos" onClick={goToVideos}>Get It Now</button>
            
            </div>
            <div className="sidebar">
              <div className="sidebar">
                <a href="#home">Home</a>
                <Link to ="/Trending"><a href="#">Trending</a></Link>
                <Link to ="/gaming"><a href="#">Gaming</a></Link>
                <Link to ="/saved videos"> <a href="#">Saved Videos</a></Link>
                <button className="logout-button" onClick={goToAuth}>logout</button>
              </div>
            </div>
        </div>
        
        </>
    )
}
export default Home;