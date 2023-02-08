//
// get sources for images
let cardNumbers = [];
for(let i=1; i<14; i++) cardNumbers.push(i);
let cardVariant = ['C', 'D', 'H', 'S'];

//
// deals one card for dealer and one for player
function deal() {
    // initial card for dealer
    let dealerCard = getRandomCard();
    let dealerCardOne = document.getElementById('dealer_card_one');
    dealerCardOne.setAttribute('src', dealerCard.imageSrc);
    dealerScore(dealerCard.cardNumber);

    // initial card for player
    let playerCard = getRandomCard();
    let playerCardOne = document.getElementById('player_card_one');
    playerCardOne.setAttribute('src', playerCard.imageSrc);
    playerScore(playerCard.cardNumber);

    // enable and disable button
    let dealButton = document.getElementById('deal_button');
    dealButton.setAttribute('disabled', "0");
    let hitButton = document.getElementById('hit_button');
    hitButton.removeAttribute('disabled');
}

//
// deals one card for player
function hit() {
    // add one card to the document
    let randomCard = getRandomCard();
    let newCard = document.createElement('img');
    newCard.setAttribute('src', randomCard.imageSrc);
    let playerContainer = document.getElementById('player_container');
    playerContainer.appendChild(newCard);

    // update the score
    let pScore = playerScore(randomCard.cardNumber);
    if(pScore > 21) {
        restart(0);
        document.getElementById('hit_button').setAttribute('disabled', '0');
        document.getElementById('stand_button').setAttribute('disabled', '0');
    }
    else if(pScore === 21) stand();
    else document.getElementById('stand_button').removeAttribute('disabled');
}

//
// deals final cards for dealer
function stand() {
    // disables the hit button
    document.getElementById('hit_button').setAttribute('disabled', '0');

    // deal until dealer has a minimum score of 17
    let pScore = playerScore(0);
    let dScore;
    do {
        // deals card for dealer
        let randomCard = getRandomCard();
        let newCard = document.createElement('img');
        newCard.setAttribute('src', randomCard.imageSrc);
        let dealerContainer = document.getElementById('dealer_container');
        dealerContainer.appendChild(newCard);

        // update the score
        dScore = dealerScore(randomCard.cardNumber);
    } while(dScore < 17 || (dScore < pScore && dScore < 22));

    // disable stand button
    document.getElementById('stand_button').setAttribute('disabled', '0');

    // find the winner
    if(pScore === dScore) restart(2);
    else if(dScore === 21) restart(0);
    else if(pScore === 21) restart(1);
    else if(dScore > 21) restart(1);
    else if(dScore > pScore) restart(0);
    else if(dScore < pScore) restart(1);
}

//
// generates a random card and score
function getRandomCard() {
    // create image source from the random card picked
    let variantRand = Math.floor(Math.random() * cardVariant.length);
    let numberRand = Math.floor(Math.random() * cardNumbers.length);
    return {
        imageSrc: "images/" + cardNumbers[numberRand] + cardVariant[variantRand] + ".svg",
        cardNumber: (numberRand+1)>10 ? 10 : (numberRand+1)
    };
}

//
// updates the score for the dealer
function dealerScore(score) {
    let scoreElement = document.getElementById('dealer_score').innerText;
    score += parseInt(scoreElement);
    document.getElementById('dealer_score').innerText = score;
    return score;
}

//
// updates the score for the player
function playerScore(score) {
    let scoreElement = document.getElementById('player_score').innerText;
    score += parseInt(scoreElement);
    document.getElementById('player_score').innerText = score;
    return score;
}

//
// decides who won the game
function restart(winner) {
    let element = document.getElementById('winner');
    switch(winner) {
        case(0):
            element.innerText = "Dealer wins!";
            break;
        case(1):
            element.innerText = "You win!"
            break;
        case(2):
            element.innerText = "Tie";
            break;
    }
}
