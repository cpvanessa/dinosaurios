const cards = document.querySelectorAll('.memory-card');
// console.log(cards);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = [];

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        // console.log({hasFlippedCard, firstCard})
        // console.log(firstCard.dataset.framework);
        return;
    }
    // else {
    //     //second click
    hasFlippedCard = false;
    secondCard = this;
    //     // console.log({hasFlippedCard, secondCard})

    //     //do cards match?
    //     // console.log(secondCard.dataset.framework);

    // }
    checkForMatch();

}

function checkForMatch() {

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    console.log(isMatch);


    isMatch ? (disableCards(), audioMatch()) : (unflipCards(), audioWrong());

    // if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //     //it's a match
    //     disableCards();
    //     itsAmatch();
    // }
    // // console.log('Function was executed');
    // else {
    //     //not a match
    //     unflipCards();

    // }


    if (isMatch) {

        matchedCards.push(isMatch);

        console.log(matchedCards);
    }
    else {
        console.log('no match');
    }
    if (matchedCards.length === cards.length / 2) {

        let text = document.querySelector('.win');
        text.innerHTML = "Ganaste!";
        audioWin();

        // setInterval(function() {
        //     text.style.display = (text.style.display == 'none' ? '' : 'none');
        // }, 500);
        let gif = document.getElementById("gif");
        gif.innerHTML = "<img src ='assets/images/dinotie.gif'/>";

    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);



    }

    function unflipCards() {
        lockBoard = true


        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            lockBoard = false;
        }, 1500)

    }


}

function audioMatch() {

    let audio = new Audio('assets/audio/dinosound.mp3');
    audio.play();

}
function audioWrong() {

    let audio = new Audio('assets/audio/wrongmusic.wav');
    audio.play();

}
function audioWin() {

    let audio = new Audio('assets/audio/victory.wav');
    audio.play();

}


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();



function startGame() {

    window.location.reload();



};

cards.forEach(card => card.addEventListener('click', flipCard))

