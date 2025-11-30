import "./base.scss";

import footer from "./components/footer";
import navigationBar from "./components/navigation-bar";

const runComponents = () => {
  footer();
  navigationBar();
};

document.addEventListener("DOMContentLoaded", () => {
  runComponents();
});
