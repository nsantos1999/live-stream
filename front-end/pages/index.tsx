import type { NextPage } from "next";
import { useEffect, useRef } from "react";
// import flv from "flv.js";
// import { ReactFlvPlayer } from "react-flv-player";
import videojs from "video.js";

const Home: NextPage = () => {
  const playerRef = useRef<HTMLMediaElement>();

  useEffect(() => {
    const id = "xbadmovies";
    if (playerRef.current) {
      const player = videojs(
        playerRef.current,
        {
          autoplay: false,
          controls: true,
          sources: [
            {
              src: "http://localhost:8000/live/xbadmovies/index.m3u8",
              type: "application/x-mpegURL",
            },
          ],
          fluid: true,
        },
        function onPlayerReady() {
          console.log("onPlayerReady", this);
        }
      );
      // player.attachMediaElement(playerRef.current);
      // player.load();
    }
  }, [playerRef]);
  return (
    <div>
      <h1>Hello viewer</h1>
      {/* <ReactFlvPlayer
        url="http://localhost:8000/live/xbadmovies.flv"
        heigh="800px"
        width="800px"
        isMuted={true}
      /> */}
      <video
        ref={playerRef as any}
        className="video-js vjs-big-play-centered"
      />
    </div>
  );
};

export default Home;
