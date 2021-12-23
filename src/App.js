import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import heart from "./assets/png/heart.png";
// import share from "./assets/svg/share.svg";
import add from "./assets/svg/add.svg";
import shuffle from "./assets/png/shuffle.png";
import repeat from "./assets/png/repeat.png";
import left from "./assets/png/left.png";
import right from "./assets/png/right.png";
import pause from "./assets/png/pause.png";
import setting from "./assets/png/setting.png";
import audio from "./assets/audio/audio.mp3";
import playButton from "./assets/png/play-button-arrowhead.png";
import share from "./assets/png/share.png";
import playlist from "./assets/png/playlist.png";

function App() {
  const [play, setPlay] = useState(false);
  const [music, setMusic] = useState(new Audio(audio));
  const ref = useRef();
  const seekPointer = useRef();
  const [currentTime, setcurrentTime] = useState(0);
  const [durationTime, setDurationTime] = useState();

  const handleMusic = () => {
    setPlay((prevPlay) => !prevPlay);
    !play ? music.play() : music.pause();
  };

  useEffect(() => {
    music.addEventListener("timeupdate", (event) => {
      const { currentTime, duration } = event.srcElement;
      const time = (currentTime / duration) * 100;
      ref.current.style.width = `${time}%`;
      seekPointer.current.style.left = `80%`;
      const minDuration = Math.floor(duration / 60);
      const secDuration = Math.floor(duration % 60);
      const currentMin = Math.floor(currentTime / 60);
      const currentSec = Math.floor(currentTime % 60);
      setDurationTime(`${minDuration}:${secDuration}`);
      setcurrentTime(`${currentMin}:${currentSec}`);
    });
  });
  return (
    <div className="bg-purple-300 flex items-center justify-center p-12">
      <div className="w-[30em] h-56 z-10 shadow-xl rounded-[30px] bg-[#f2f2f2] top-div p-6 ">
        <div className="flex ">
          <section>
            <div class="image-bg rounded-xl w-40 p-3">
              <img
                src="https://coinbino.com/wp-content/uploads/2021/09/Purple-Haze-Jimi-Hendrix.jpg"
                className="w-40 rounded-[12px] img-boxshadow"
              />
            </div>
          </section>

          <div className="">
            <div>
              <label className="text-gray-500 text-xs">Now playing</label>
            </div>
            <div className="mt-5">
              <div className="text-[22px] font-extrabold text-[#a97494]">
                Purple Haze
              </div>
              <div className="text-[#a97494b3] text-md mt-[2px]">
                Jimi Hindrix
              </div>
              <div className="text-[#a97494b3] text-xs mt-[2px]">
                Woodstocks
              </div>
            </div>
            <div className="flex space-x-4 mt-2">
              <div className="circle w-8 h-8 p-1 flex justify-center items-center">
                <img src={heart} className="icon w-4" />
              </div>
              <div className="circle w-8 h-8 p-1 flex justify-center items-center">
                <img src={playlist} className="icon  w-4" />
              </div>
              <div className="circle w-8 h-8 p-1 flex justify-center items-center">
                <img src={share} className="icon  w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[50rem] h-48 bg-[#fafafa] -ml-1 rounded-tr-[30px] rounded-br-[30px] flex justify-center p-4 items-center flex-col boxShadow">
        <div className="flex items-center w-9/12 justify-around">
          <div className="flex items-center justify-around w-1/4">
            <img src={shuffle} className="w-5 h-5" />
            <img src={repeat} className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-center w-1/2">
            <audio src="./assets/audio/audio.mp3"></audio>
            <div className="nextprev w-12 h-12 rounded-full flex items-center justify-center">
              <div className="color-circle w-8 h-8 rounded-full flex items-center justify-center">
                <img src={left} className="w-4 h-4" />
              </div>
            </div>
            <div className="nextprev w-16 h-16 rounded-full flex items-center justify-center ml-5 mr-5">
              <div
                className="color-circle w-12 h-12 rounded-full flex items-center justify-center"
                onClick={handleMusic}
              >
                <img src={play ? pause : playButton} className="w-5 h-5" />
              </div>
            </div>

            <div className="nextprev w-12 h-12 rounded-full flex items-center justify-center">
              <div className="color-circle w-8 h-8 rounded-full flex items-center justify-center">
                <img src={right} className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around w-1/4">
            <img src={repeat} className="w-5 h-5" />
            <img src={setting} className="w-5 h-5" />
          </div>
        </div>
        <div className="w-9/12 ">
          <div>
            <div className="progress-div pl-[2px] pr-[2px]">
              <div className="inner-progress-div">
                <div className="progress" id="progress" ref={ref}>
                  <div
                    className="nextprev absolute w-10 h-10 rounded-full flex items-center justify-center"
                    ref={seekPointer}
                  >
                    <div
                      className="color-circle w-6 h-6 rounded-full flex items-center justify-center"
                      onClick={handleMusic}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full mt-3">
            <div>{currentTime}</div>
            <div>{durationTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
