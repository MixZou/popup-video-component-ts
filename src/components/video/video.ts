let styles = require("./video.css");

import { Ivideo, Icomponent } from "../interfaces";

function video(options: Ivideo) {
  return new Video(options);
}

class Video implements Icomponent {
  tempContainer: HTMLElement;
  constructor(private settings: Ivideo) {
    this.settings = Object.assign(
      {
        width: "100%",
        height: "100%",
        autoplay: false
      },
      this.settings
    );
    this.init();
  }
  init() {
    this.template();
    this.handle();
  }
  template() {
    this.tempContainer = document.createElement("div");
    this.tempContainer.className = styles.default.video;
    this.tempContainer.style.width = this.settings.width;
    this.tempContainer.style.height = this.settings.height;
    this.tempContainer.innerHTML = `
      <video class="${styles.default["video-content"]}" src="${this.settings.url}"></video>
      <div class="${styles.default["video-controls"]}">
        <div class="${styles.default["video-progress"]}">
          <div class="${styles.default["video-progress-now"]}"></div>
          <div class="${styles.default["video-progress-suc"]}"></div>
          <div class="${styles.default["video-progress-bar"]}"></div>
        </div>
        <div class="${styles.default["video-play"]}">
          <i><svg t="1666665982426" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="830" width="16" height="16"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#1296db" p-id="831"></path></svg></i>
        </div>
        <div class="${styles.default["video-time"]}">
          <span>00:00</span> / <span>00:00</span>
        </div>
        <div class="${styles.default["video-full"]}">
          <i><svg t="1666666190998" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1069" width="25" height="25"><path d="M285.866667 810.666667H384v42.666666H213.333333v-170.666666h42.666667v98.133333l128-128 29.866667 29.866667-128 128z m494.933333 0l-128-128 29.866667-29.866667 128 128V682.666667h42.666666v170.666666h-170.666666v-42.666666h98.133333zM285.866667 256l128 128-29.866667 29.866667-128-128V384H213.333333V213.333333h170.666667v42.666667H285.866667z m494.933333 0H682.666667V213.333333h170.666666v170.666667h-42.666666V285.866667l-128 128-29.866667-29.866667 128-128z" fill="#1296db" p-id="1070"></path></svg></i>
        </div>
        <div class="${styles.default["video-volume"]}">
          <i><svg t="1666666252598" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1308" width="25" height="25"><path d="M128 420.576v200.864h149.12l175.456 140.064V284.288l-169.792 136.288H128z m132.256-64l204.288-163.968a32 32 0 0 1 52.032 24.96v610.432a32 32 0 0 1-51.968 24.992l-209.92-167.552H96a32 32 0 0 1-32-32v-264.864a32 32 0 0 1 32-32h164.256zM670.784 720.128a32 32 0 0 1-44.832-45.664 214.08 214.08 0 0 0 64.32-153.312 213.92 213.92 0 0 0-55.776-144.448 32 32 0 1 1 47.36-43.04 277.92 277.92 0 0 1 72.416 187.488 278.08 278.08 0 0 1-83.488 198.976zM822.912 858.88a32 32 0 1 1-45.888-44.608A419.008 419.008 0 0 0 896 521.152c0-108.704-41.376-210.848-114.432-288.384a32 32 0 0 1 46.592-43.872c84.16 89.28 131.84 207.04 131.84 332.256 0 127.84-49.76 247.904-137.088 337.728z" p-id="1309" fill="#1296db"></path></svg></i>
          <div class="${styles.default["video-vol-progress"]}">
            <div class="${styles.default["video-vol-progress-now"]}"></div>
            <div class="${styles.default["video-vol-progress-bar"]}"></div>
          </div>
        </div>
      </div>
    `;
    if (typeof this.settings.elem === "object") {
      this.settings.elem.appendChild(this.tempContainer);
    } else {
      document
        .querySelector(`${this.settings.elem}`)
        .appendChild(this.tempContainer);
    }
  }
  handle() {
    let videoContent = this.tempContainer.querySelector(
      `.${styles.default["video-content"]}`
    ) as HTMLVideoElement;
    let videoControls = this.tempContainer.querySelector(
      `.${styles.default["video-controls"]}`
    ) as HTMLVideoElement;
    let videoPlay = this.tempContainer.querySelector(
      `.${styles.default["video-controls"]} i`
    );
    let videoTimes = this.tempContainer.querySelectorAll(
      `.${styles.default["video-time"]} span`
    );
    let videoFull = this.tempContainer.querySelector(
      `.${styles.default["video-full"]} i`
    );
    let videoProgress = this.tempContainer.querySelectorAll(
      `.${styles.default["video-progress"]} div`
    );
    let videoVolProgress = this.tempContainer.querySelectorAll(
      `.${styles.default["video-vol-progress"]} div`
    );

    let videoVolBar = this.tempContainer.querySelector(
      `.${styles.default["video-volume"]} i`
    );

    let timer;

    videoContent.volume = 0.3;

    if (this.settings.autoplay) {
      timer = setInterval(playing, 1000);
      videoContent.play();
    }

    this.tempContainer.addEventListener("mouseenter", function () {
      videoControls.style.bottom = `0`;
    });
    this.tempContainer.addEventListener("mouseleave", function () {
      videoControls.style.bottom = `-50px`;
    });

    //视频是否加载完毕
    videoContent.addEventListener("canplay", () => {
      // console.log("canplay");
      videoTimes[1].innerHTML = formatTime(videoContent.duration);
    });

    videoContent.addEventListener("play", () => {
      videoPlay.innerHTML = `<svg t="1666681305294" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1607" width="16" height="16"><path d="M268.97201558 114.31784297c73.21218086 0 132.56071902 59.34853814 132.56071901 132.560719v530.24287606c0 73.21218086-59.34853814 132.56071902-132.56071901 132.560719s-132.56071902-59.34853814-132.56071901-132.560719V246.87856197c0-73.21218086 59.34853814-132.56071902 132.56071901-132.560719z m486.05596884 0c73.21218086 0 132.56071902 59.34853814 132.56071901 132.560719v530.24287606c0 73.21218086-59.34853814 132.56071902-132.56071901 132.560719s-132.56071902-59.34853814-132.56071901-132.560719V246.87856197c0-73.21218086 59.34853814-132.56071902 132.56071901-132.560719z" p-id="1608" fill="#1296db"></path></svg>`;

      timer = setInterval(playing, 1000);
    });

    videoContent.addEventListener("pause", () => {
      videoPlay.innerHTML = `<svg t="1666681337293" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1890" width="16" height="16"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#1296db" p-id="1891"></path></svg>`;
      clearInterval(timer);
    });

    videoPlay.addEventListener("click", () => {
      if (videoContent.paused) {
        videoContent.play();
      } else {
        videoContent.pause();
      }
    });

    videoFull.addEventListener("click", () => {
      videoContent.requestFullscreen();
    });

    //进度条拖拽
    videoProgress[2].addEventListener(
      "mousedown",
      function (event: MouseEvent) {
        let downX = event.pageX;
        let downL = this.offsetLeft;
        document.onmousemove = (ev: MouseEvent) => {
          let scale =
            (ev.pageX - downX + downL + 8) / this.parentNode.offsetWidth;
          if (scale < 0) {
            scale = 0;
          } else if (scale > 1) {
            scale = 1;
          }
          (videoProgress[0] as HTMLDivElement).style.width = scale * 100 + "%";
          (videoProgress[1] as HTMLDivElement).style.width = scale * 100 + "%";
          this.style.left = scale * 100 + "%";
          videoContent.currentTime = scale * videoContent.duration;
        };
        document.onmouseup = () => {
          document.onmousemove = document.onmouseup = null;
        };
        event.preventDefault();
      }
    );

    videoVolProgress[1].addEventListener(
      "mousedown",
      function (event: MouseEvent) {
        let downX = event.pageX;
        let downL = this.offsetLeft;
        document.onmousemove = (ev: MouseEvent) => {
          let scale =
            (ev.pageX - downX + downL + 8) / this.parentNode.offsetWidth;
          if (scale < 0) {
            scale = 0;
          } else if (scale > 1) {
            scale = 1;
          }
          (videoVolProgress[0] as HTMLDivElement).style.width =
            scale * 100 + "%";

          this.style.left = scale * 100 + "%";
          videoContent.volume = scale;
        };
        document.onmouseup = () => {
          document.onmousemove = document.onmouseup = null;
        };
        event.preventDefault();
      }
    );
    videoVolBar.addEventListener("click", () => {
      if (videoContent.volume != 0) {
        videoContent.volume = 0;
      } else {
        videoContent.volume = 0.2;
      }
      (videoVolProgress[0] as HTMLDivElement).style.width =
        videoContent.volume * 100 + "%";
      (videoVolProgress[1] as HTMLDivElement).style.left =
        videoContent.volume * 100 + "%";
    });

    function playing() {
      let scale = videoContent.currentTime / videoContent.duration;
      let scaleSuc = videoContent.buffered.end(0) / videoContent.duration;
      videoTimes[0].innerHTML = formatTime(videoContent.currentTime);
      (videoProgress[0] as HTMLDivElement).style.width = scale * 100 + "%";
      (videoProgress[1] as HTMLDivElement).style.width = scaleSuc * 100 + "%";
      (videoProgress[2] as HTMLDivElement).style.left = scale * 100 + "%";
    }

    function formatTime(number: number): string {
      number = Math.round(number);
      let min = Math.floor(number / 60);
      let sec = number % 60;
      return setZero(min) + ":" + setZero(sec);
    }

    function setZero(number: number): string {
      if (number < 10) {
        return "0" + number;
      } else {
        return "" + number;
      }
    }
  }
}

export default video;
