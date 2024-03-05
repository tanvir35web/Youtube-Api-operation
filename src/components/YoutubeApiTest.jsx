import React, { useState, useEffect } from 'react';

function YoutubeApiTest() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      // Replace 'YOUR_API_KEY' with your actual YouTube Data API key
      const apiKey = 'AIzaSyASFJW6eF3kXs9GhUja4RxOlNTPbvvQFT4';
      const baseUrl = 'https://www.googleapis.com/youtube/v3/search';
      const part = 'snippet';
      const maxResults = 5; // Adjust the number of results as needed

      const response = await fetch(
        `${baseUrl}?part=${part}&maxResults=${maxResults}&q=${searchTerm}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.items) {
        setVideos(data.items);
      } else {
        console.error('Error fetching videos:', data.error);
      }
    };

    fetchVideos();
  }, [searchTerm]); // Re-fetch videos when searchTerm changes

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="m-auto mt-20 flex flex-col items-center gap-10 ">
      <h1 className="text-5xl">Youtube</h1>
      <input
        className="w-full m-auto outline p-2 outline-2 rounded-md bg-gray-50"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search YouTube..."
      />
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId}>
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            >
              {video.snippet.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YoutubeApiTest;
