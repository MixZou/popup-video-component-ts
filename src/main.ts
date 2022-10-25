import "./style.css";
import video from "./components/video/video";
import popup from "./components/popup/popup";

let listItems = document.querySelectorAll("#list li");

for (let i = 0; i < listItems.length; i++) {
  listItems[i].addEventListener("click", function () {
    let url = this.dataset.url;
    popup({
      width: "880px",
      height: "556px",
      title: this.dataset.title,
      content(elem) {
        video({
          url,
          elem,
          autoplay: false
        });
      }
    });
  });
}
