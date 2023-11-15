import React, { useState } from 'react';

const VideoComponent = () => {
  const [videos, setVideos] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [gameVideos, setGameVideos] = useState([]);
  const [videoById, setVideoById] = useState(null);

  const fetchAllVideos = async () => {
    try {
      const response = await fetch('http://localhost:4445/videos');
      const data = await response.json();
      setVideos(data);
      console.log('All Videos:', data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const fetchTrendingVideos = async () => {
    try {
      const response = await fetch('http://localhost:4445/videos/Trending');
      const data = await response.json();
      setTrendingVideos(data);
      console.log('Trending Videos:', data);
    } catch (error) {
      console.error('Error fetching trending videos:', error);
    }
  };

  const fetchGameVideos = async () => {
    try {
      const response = await fetch('http://localhost:4445/videos/gaming');
      const data = await response.json();
      setGameVideos(data);
      console.log('Game Videos:', data);
    } catch (error) {
      console.error('Error fetching game videos:', error);
    }
  };

  const fetchVideoById = async (videoId, jwtToken) => {
    try {
      const response = await fetch(`http://localhost:4445/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include your JWT token here
        },
      });
      const data = await response.json();
      setVideoById(data);
      console.log('Video by ID:', data);
    } catch (error) {
      console.error('Error fetching video by ID:', error);
    }
  };

  // Example usage with a video ID and JWT token
  const handleFetchById = () => {
    const videoId = 'your_video_id'; // Replace with an actual video ID
    const jwtToken = 'jwt_token'; // Replace with your JWT token
    fetchVideoById(videoId, jwtToken);
  };

  return (
    <div>
      <button onClick={fetchAllVideos}>Get All Videos</button>
      <button onClick={fetchTrendingVideos}>Get Trending Videos</button>
      <button onClick={fetchGameVideos}>Get Game Videos</button>

      <h2>All Videos</h2>
      <ul>
        {videos.map((video) => (
          <li key={video._id}>{video.title}</li>
        ))}
      </ul>

      <h2>Trending Videos</h2>
      <ul>
        {trendingVideos.map((video) => (
          <li key={video._id}>{video.title}</li>
        ))}
      </ul>

      <h2>Game Videos</h2>
      <ul>
        {gameVideos.map((video) => (
          <li key={video._id}>{video.title}</li>
        ))}
      </ul>

      <h2>Video by ID</h2>
      {videoById && (
        <div>
          <p>ID: {videoById._id}</p>
          <p>Title: {videoById.title}</p>
          {/* Add other properties as needed */}
        </div>
      )}

      <button onClick={handleFetchById}>Get Video by ID</button>
    </div>
  );
};

export default VideoComponent;
