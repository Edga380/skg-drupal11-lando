import './button.scss';

export default button = () => {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log(`Button clicked: ${button.textContent}`);
        });
    });
}
