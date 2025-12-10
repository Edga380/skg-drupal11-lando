import "./base.scss";

import footer from "./components/footer";
import navigationBar from "./components/navigation-bar";
import headerSlideshow from "./components/header-slideshow";
import gamePage from "./components/game-page";

const runComponents = () => {
  footer();
  navigationBar();
  headerSlideshow();
  gamePage();
};

document.addEventListener("DOMContentLoaded", () => {
  runComponents();
});
