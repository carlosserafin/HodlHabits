import { useState } from "react";
import { Button, Input, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import HeaderVideoSearch from "./Discover/HeaderVideoSearch";
import VideoCard from "./Discover/VideoCard";

const TEST_DATA = [
  {
      "title": "@property Is One Of The Coolest New CSS Features",
      "channel": "Web Dev Simplified",
      "duration": "10:41",
      "thumbnailUrl": "https://i.ytimg.com/vi/sd34qnxSeoU/hqdefault.jpg",
      "videoId": "sd34qnxSeoU"
  },
  {
      "title": "Glass Effect Sidebar #css #coding #Sidebar #Navbar #Website",
      "channel": "code with muhilan",
      "duration": "14 sec",
      "thumbnailUrl": "https://i.ytimg.com/vi/r8w3fi8E93U/hqdefault.jpg",
      "videoId": "r8w3fi8E93U"
  },
  {
      "title": "Master HTML Input Types! #html #inputtypes #webdevelopment #frontend #coding",
      "channel": "DeCodeDev",
      "duration": "8 sec",
      "thumbnailUrl": "https://i.ytimg.com/vi/wd2pmrFI1U8/hqdefault.jpg",
      "videoId": "wd2pmrFI1U8"
  },
  {
      "title": "The 7 AWS Services You NEED to Know as a Web Dev",
      "channel": "Kodaps Academy",
      "duration": "8:59",
      "thumbnailUrl": "https://i.ytimg.com/vi/Js3zZyC-bS8/hqdefault.jpg",
      "videoId": "Js3zZyC-bS8"
  },
  {
      "title": "Junior Vs Senior |Noob Vs Pro| frontend developer  😂#programming #webdevelopment #coding #html #css",
      "channel": "DIVINE CLASSES AN INSTITUTION Of EDUCATION.",
      "duration": "13 sec",
      "thumbnailUrl": "https://i.ytimg.com/vi/Q50KNs2MwrA/hqdefault.jpg",
      "videoId": "Q50KNs2MwrA"
  },
  {
      "title": "Must Have Tailwind Plugin For Responsive Design",
      "channel": "Web Dev Simplified",
      "duration": "59 sec",
      "thumbnailUrl": "https://i.ytimg.com/vi/PHXdLe2f9rs/hqdefault.jpg",
      "videoId": "PHXdLe2f9rs"
  },
  {
      "title": "This is how I brainstorm new feature ideas",
      "channel": "Web Dev Cody",
      "duration": "14:49",
      "thumbnailUrl": "https://i.ytimg.com/vi/jAJZtT_TSdY/hqdefault.jpg",
      "videoId": "jAJZtT_TSdY"
  },
  {
      "title": "Web Developer Series Part 15 : What is Web Accessibility.",
      "channel": "CodeWithJarry",
      "duration": "3 sec",
      "thumbnailUrl": "https://i.ytimg.com/vi/eSNN_MFuOZk/hqdefault.jpg",
      "videoId": "eSNN_MFuOZk"
  },
  {
      "title": "Inspiration websites for Web Developers 🤯 #webdevelopment  #webdesign #webdesigninspiration",
      "channel": "HackerBhai",
      "duration": "27 sec",
      "thumbnailUrl": "https://i.ytimg.com/vi/6pwvu2Hp_jc/hqdefault.jpg",
      "videoId": "6pwvu2Hp_jc"
  },
  {
      "title": "Web Developers: The 3 Things You MUST Focus On",
      "channel": "truemiller",
      "duration": "31 sec",
      "thumbnailUrl": "https://i.ytimg.com/vi/OQ_I9HrFZbM/hqdefault.jpg",
      "videoId": "OQ_I9HrFZbM"
  }
]

const DiscoverTab = () => {
  const isTest = false;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const clearVideos = () => {
    setVideos([]);
  }

  // Function to call the API
  const searchVideos = async (query) => {
    setLoading(true);
    try {
      if (isTest) {
        setVideos(TEST_DATA);
        return;
      }
      const response = await fetch(`/api/videos?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (videoId) => {
    setCurrentVideoId(videoId); // Update the main video player with the clicked video
  };

  return (
    <section className="flex flex-col min-h-[calc(100dvh-20rem)]">
      <HeaderVideoSearch searchVideos={searchVideos} clearVideos={clearVideos} />
      <div className="flex flex-col items-center justify-center w-full h-full">
        {loading ? (
          <Spinner color="white" />
        ) : videos.length > 0 && (
          <div className="container mx-auto">
            <div className="block p-4 m-2 bg-black text-white">
              {currentVideoId ? (
                <iframe
                  className="w-full h-64"
                  src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
                  title="Main Video Player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-64 flex items-center justify-center text-lg">
                  Select a video to play
                </div>
              )}
            </div>

            <div className="h-96 overflow-y-scroll p-4 bg-gray-100">
              <h1 className="text-2xl font-bold mb-6">Video Grid</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <VideoCard 
                    key={index} 
                    video={video} 
                    onClick={handleVideoClick} 
                    currentVideoId={currentVideoId}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DiscoverTab;
