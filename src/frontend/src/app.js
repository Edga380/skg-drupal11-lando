import "./base.scss";

import footer from "./components/footer";
import navigationBar from "./components/navigation-bar";
import headerSlideshow from "./components/header-slideshow";

const runComponents = () => {
  footer();
  navigationBar();
  headerSlideshow();
};

document.addEventListener("DOMContentLoaded", () => {
  runComponents();
});
