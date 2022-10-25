//全局CSS操作
// import "./popup.css";

import { Ipopup, Icomponent } from "../interfaces";
let styles = require("./popup.css");

// interface Ipopup {
//   width?: string;
//   height?: string;
//   title?: string;
//   position?: string;
//   mask?: boolean;
//   content?: (content: HTMLElement) => void;
// }
// interface Icomponent {
//   tempContainer: HTMLElement;
//   init: () => void;
//   template: () => void;
//   handle: () => void;
// }

function popUp(options: Ipopup) {
  return new Popup(options);
}

class Popup implements Icomponent {
  tempContainer;
  mask;
  constructor(private settings: Ipopup) {
    //默认值
    this.settings = Object.assign(
      {
        width: "100%",
        height: "100%",
        title: "",
        position: "center",
        mask: "true",
        content: function () {}
      },
      this.settings
    );
    this.init();
  }
  init() {
    this.template();
    console.log(styles);
    this.settings.mask && this.createMask();
    this.handle();
    this.contentCallback();
  }
  template() {
    this.tempContainer = document.createElement("div") as HTMLElement;
    this.tempContainer.style.width = this.settings.width;
    this.tempContainer.style.height = this.settings.height;
    this.tempContainer.className = styles.default.popup;
    this.tempContainer.innerHTML = `
    <div class='${styles.default["popup-title"]}'>
      <h3>${this.settings.title}</h3>
      <i><svg t="1666607057292" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="697" width="16" height="16"><path d="M557.311759 513.248864l265.280473-263.904314c12.54369-12.480043 12.607338-32.704421 0.127295-45.248112-12.512727-12.576374-32.704421-12.607338-45.248112-0.127295L512.127295 467.904421 249.088241 204.063755c-12.447359-12.480043-32.704421-12.54369-45.248112-0.063647-12.512727 12.480043-12.54369 32.735385-0.063647 45.280796l262.975407 263.775299-265.151458 263.744335c-12.54369 12.480043-12.607338 32.704421-0.127295 45.248112 6.239161 6.271845 14.463432 9.440452 22.687703 9.440452 8.160624 0 16.319527-3.103239 22.560409-9.311437l265.216826-263.807983 265.440452 266.240344c6.239161 6.271845 14.432469 9.407768 22.65674 9.407768 8.191587 0 16.352211-3.135923 22.591372-9.34412 12.512727-12.480043 12.54369-32.704421 0.063647-45.248112L557.311759 513.248864z" p-id="698"></path></svg></i>
    </div>
    <div class="${styles.default["popup-content"]}"></div>`;
    document.body.appendChild(this.tempContainer);
    console.log(this.tempContainer + "innerheight");

    if (this.settings.position === "left") {
      this.tempContainer.style.left = 0;
      this.tempContainer.style.top =
        window.innerHeight - this.tempContainer.offsetHeight + "px";
    } else if (this.settings.position === "right") {
      this.tempContainer.style.right = 0;
      this.tempContainer.style.top =
        window.innerHeight - this.tempContainer.offsetHeight + "px";
    } else {
      this.tempContainer.style.left =
        (window.innerWidth - this.tempContainer.offsetWidth) / 2 + "px";
      this.tempContainer.style.top =
        (window.innerHeight - this.tempContainer.offsetHeight) / 2 + "px";
    }
  }

  handle() {
    let popupClose = this.tempContainer.querySelector(
      `.${styles.default["popup-title"]} i`
    );
    popupClose.addEventListener("click", () => {
      document.body.removeChild(this.tempContainer);
      this.settings.mask && document.body.removeChild(this.mask);
    });
  }
  createMask() {
    this.mask = document.createElement("div");
    this.mask.className = styles.default.mask;
    this.mask.style.width = "100%";
    this.mask.style.height = document.body.offsetHeight + "px";
    document.body.appendChild(this.mask);
  }
  contentCallback() {
    let popupContent = this.tempContainer.querySelector(
      `.${styles.default["popup-content"]}`
    );
    this.settings.content(popupContent);
  }
}
export default popUp;
