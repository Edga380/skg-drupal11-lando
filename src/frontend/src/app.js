import './base.scss';

import button from "./components/button";
import footer from "./components/footer";
import imageTextSection from "./components/image-text-section";
import navigationBar from "./components/navigation-bar";

const runComponents = () => {
    button();
    footer();
    imageTextSection();
    navigationBar();
}

document.addEventListener('DOMContentLoaded', () => {
    runComponents();
});