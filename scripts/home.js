const allGuide = document.querySelectorAll('.group');
const sound = new Audio("../sounds/mixkit-arcade-mechanical-bling-210.wav");

function playFirstTwoSeconds() {
    sound.currentTime = 0;
    sound.play();
    setTimeout(() => {
        sound.pause();
    }, 1000);
}


allGuide.forEach(guide => {
    guide.addEventListener('mouseenter', playFirstTwoSeconds)
});
