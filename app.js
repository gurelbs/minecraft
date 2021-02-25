const $ = x => document.querySelector(x);

let landingPage = $('.game-landing-page');
let startGameBtn = $('.start-game-btn');
let mainGame = $('.main-game');

startGameBtn.addEventListener('click', () => {
    landingPage.remove()
});

