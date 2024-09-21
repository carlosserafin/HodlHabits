import { useEffect, useState } from "react";
import VideoPickerCard from "./VideoPickerCard";
import SelectedVideoCard from "./SelectedVideoCard";
import { ScrollShadow, Spinner } from "@nextui-org/react";
import HeaderVideoSearch from "@/components/Dashboard/Tabs/Discover/HeaderVideoSearch";

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

const VideoSelector = ({ addChallengeVideo, removeChallengeVideo, challengeVideos }) => {
    const isTest = false;
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [selectedVideos, setSelectedVideos] = useState(challengeVideos);

    const handleAddVideo = (video) => {
      setSelectedVideos((prev) => [...prev, video]);
      addChallengeVideo(video);
    }

    const handleRemoveVideo = (videoId) => {
      setSelectedVideos((prev) => prev.filter((video) => video.videoId !== videoId));
      removeChallengeVideo(videoId);
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
        setCurrentVideoId(videoId);
    };

  return (
    <section className="flex flex-col">
      <div className="text-3xl font-bold leading-9 text-default-foreground">
        Video Selector
      </div>
      <div className="py-4 text-default-500">
        Select videos for your challenge.
      </div>
      <HeaderVideoSearch searchVideos={searchVideos} />
      <div className="flex flex-col items-center justify-center w-full">
        {loading ? (
          <Spinner color="white" />
        ) : videos.length > 0 && (
          <div className="flex flex-col lg:flex-row container mx-auto p-4">
            {/* Video Player */}
            <div className="lg:w-2/3 w-full mb-6 lg:mb-0">
              <div className="bg-black text-white rounded-lg overflow-hidden">
                {currentVideoId ? (
                  <iframe
                    className="w-full h-64 lg:h-96"
                    src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
                    title="Main Video Player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="w-full h-64 lg:h-96 flex items-center justify-center text-lg">
                    Select a video to play
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold mt-4">Selected Videos</h3>
                <div className="flex flex-wrap gap-4">
                  {selectedVideos.map((video, index) => (
                    <SelectedVideoCard key={index} video={video} onClick={handleRemoveVideo} />
                  ))}
                </div>
              </div>
            </div>

            {/* Video List */}
            <div className="lg:w-1/3 w-full lg:pl-6 overflow-y-auto">
              <ScrollShadow orientation="vertical" className="max-h-[70dvh]">
                {videos.map((video, index) => (
                  <VideoPickerCard 
                    key={index} 
                    video={video} 
                    onClick={handleVideoClick} 
                    addChallengeVideo={handleAddVideo}
                    selectedVideos={selectedVideos}
                  />
                ))}
              </ScrollShadow>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default VideoSelector