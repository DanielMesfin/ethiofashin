import React, { useState, useRef, useEffect, Children } from 'react'
import { Play, Pause, Heart, MessageCircle, Share2, User } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Input } from "../components/ui/input"

interface Video {
  id: number;
  url: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
}

const videos: Video[] = [
  {
    id: 1,
    url: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4",
    username: "neon_lover",
    description: "Check out this cool neon sign!",
    likes: 1234,
    comments: 123,
    shares: 45
  },
  {
    id: 2,
    url: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
    username: "nature_enthusiast",
    description: "Spring is here! 🌼",
    likes: 2345,
    comments: 234,
    shares: 56
  },
  {
    id: 3,
    url: "https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4",
    username: "happy_family",
    description: "Sweet moments with my little one ❤️",
    likes: 3456,
    comments: 345,
    shares: 67
  }
]

const VideoPlayer: React.FC<{ video: Video; isActive: boolean }> = ({ video, isActive }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [liked, setLiked] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [isActive])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleLike = () => {
    setLiked(!liked)
  }

  return (
    <div className="relative h-full w-full snap-start">
      <video
        ref={videoRef}
        src={video.url}
        className="h-full w-full object-cover"
        loop
        playsInline
        onClick={togglePlay}
      />
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        <div>
          <h3 className="text-white font-bold">{video.username}</h3>
          <p className="text-white text-sm">{video.description}</p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Button variant="ghost" size="icon" onClick={toggleLike}>
            <Heart className={`h-6 w-6 ${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
          </Button>
          <span className="text-white text-xs">{video.likes}</span>
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
          <span className="text-white text-xs">{video.comments}</span>
          <Button variant="ghost" size="icon">
            <Share2 className="h-6 w-6 text-white" />
          </Button>
          <span className="text-white text-xs">{video.shares}</span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Pause className="h-12 w-12 text-white opacity-50" />
        ) : (
          <Play className="h-12 w-12 text-white opacity-50" />
        )}
      </Button>
    </div>
  )
}

const TikTokClone: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const handleScroll = () => {
        const scrollPosition = container.scrollTop
        const videoHeight = container.clientHeight
        const newIndex = Math.round(scrollPosition / videoHeight)
        setCurrentVideoIndex(newIndex)
      }

      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">TikTok Clone</h1>
        <Button variant="ghost" size="icon">
          <User className="h-6 w-6" />
        </Button>
      </header>
      <main 
        ref={containerRef}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory"
      >
        {videos.map((video, index) => (
          <VideoPlayer key={video.id} video={video} isActive={index === currentVideoIndex} />
        ))}
      </main>
      <footer className="bg-black text-white p-4 flex items-center">
        <Input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 mr-2 bg-gray-800 text-white"
        />
        <Button >Post</Button>
      </footer>
    </div>
  )
}

export default TikTokClone