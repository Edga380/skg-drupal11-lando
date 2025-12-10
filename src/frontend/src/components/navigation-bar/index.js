import './navigation-bar.scss';

const navigationBar = () => {
    // Open/close subMenu
    const buttonsHasSubMenu = document.querySelectorAll('.navigation-bar__button.has-sub-menu');
    buttonsHasSubMenu.forEach((buttonHasSubMenu) => {
        buttonHasSubMenu.addEventListener('click', (event) => {
            event.preventDefault();
            const subMenu = buttonHasSubMenu.nextElementSibling;
            buttonHasSubMenu.classList.toggle('open');
            subMenu.classList.toggle('open');
            if(buttonHasSubMenu.classList.contains('open')) {
                subMenu.setAttribute('aria-expanded', 'true');
                subMenu.removeAttribute('inert');
            } else {
                subMenu.setAttribute('aria-expanded', 'false');
                subMenu.setAttribute('inert', '');
            }

            // Close other subMenus if opening a different subMenu
            buttonsHasSubMenu.forEach((buttonSubMenu) => {
                if(buttonSubMenu !== buttonHasSubMenu) {
                    const subMenuClose = buttonSubMenu.nextElementSibling;
                    buttonSubMenu.classList.remove('open');
                    subMenuClose.classList.remove('open');
                    subMenuClose.setAttribute('aria-expanded', 'false');
                    subMenuClose.setAttribute('inert', '');
                }
            });
        });
    });

    // Close any open submenu if focus leave navigationBar
    const navigationBar = document.querySelector('.navigation-bar');
    navigationBar.addEventListener('focusout', (event) => {
        if(event.relatedTarget && !navigationBar.contains(event.relatedTarget)){
            const hasSubMenuButtons = document.querySelectorAll('.navigation-bar__button');
            const subMenus = document.querySelectorAll('.navigation-bar__item__sub-menu');
            hasSubMenuButtons.forEach((hasSubMenuButton) => {
                hasSubMenuButton.classList.remove('open');
            });           
            subMenus.forEach((subMenu) => {
                subMenu.classList.remove('open');
                subMenu.setAttribute('inert', '');
            });
        }
    });

    // Close subMenus if clicked outside navigationBar
    document.addEventListener('click', (event) => {
        if(event.target.classList.value.match('navigation-bar') === null){
            closeSubMenus();
        }
    });
};

const closeSubMenus = () => {
    const hasSubMenuButtons = document.querySelectorAll('.navigation-bar__button');
    const subMenus = document.querySelectorAll('.navigation-bar__item__sub-menu');
    hasSubMenuButtons.forEach((hasSubMenuButton) => {
        hasSubMenuButton.classList.remove('open');
    });           
    subMenus.forEach((subMenu) => {
        subMenu.classList.remove('open');
        subMenu.setAttribute('inert', '');
    });
};

export default navigationBar;