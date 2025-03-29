let player = {
    name: "You",
    chips: 500
}

let cards = []
let sum = 0
let chips = 500
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let aceContainer = document.getElementById("ace-container")
let cardsEl = document.getElementById("cards-el")
let sumEl = document.getElementById("sum-el")
let startGameBtn = document.getElementById("start-game-btn")
let newCardBtn = document.getElementById("new-card-btn")
let doubleBetBtn = document.getElementById("double-bet-btn")
let isDoubleBetBtnClicked = false
let aceOnDoubleBet = false
let playerEl = document.getElementById("player-el")

// ---------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------- //

newCardBtn.classList.add("new-card-btn-dark-mode")

playerEl.textContent = player.name + ": $" + player.chips

// ---------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------- //

let playerChoseAce = 0

function pickedNumberOne() {

    playerChoseAce = 1
    aceContainer.style.display = "none"
    newCardBtn.classList.remove("new-card-btn-dark-mode")
    
    sum += playerChoseAce
    cards.push(playerChoseAce)
    renderGame() 

    if (aceOnDoubleBet === true && sum === 21) {
        message = "You've got Blackjack!"
        messageEl.textContent = message

        chips += 200
        player.chips = chips
        playerEl.textContent = player.name + ": $" + player.chips
        doubleBetBtn.style.display = "none"

    } else if (aceOnDoubleBet === true && chips > 50) {
        message = "You're out of the game!"
        messageEl.textContent = message

        chips -= 100
        player.chips = chips
        playerEl.textContent = player.name + ": $" + player.chips

    } else if (aceOnDoubleBet === true && chips === 50) {
        chips = 0
        player.chips = chips
        playerEl.textContent = player.name + ": $" + player.chips
    }

    if (chips <= 0 || sum === 21 || cards.length >= 4) {
        doubleBetBtn.style.display = "none"

    } else {
        doubleBetBtn.style.display = "block"
    } 

    if (isDoubleBetBtnClicked) {
        doubleBetBtn.style.display = "none" 
        isDoubleBetBtnClicked = false
        newCardBtn.classList.add("new-card-btn-dark-mode")
    } 

    return playerChoseAce

}

function pickedNumberEleven() {

    playerChoseAce = 11
    aceContainer.style.display = "none"
    newCardBtn.classList.remove("new-card-btn-dark-mode")

    sum += playerChoseAce
    cards.push(playerChoseAce)
    renderGame()

    if (aceOnDoubleBet === true && sum === 21) {
        message = "You've got Blackjack!"
        messageEl.textContent = message

        chips += 200
        player.chips = chips
        playerEl.textContent = player.name + ": $" + player.chips
        doubleBetBtn.style.display = "none"

    } else if (aceOnDoubleBet === true && chips > 50) {
        message = "You're out of the game!"
        messageEl.textContent = message

        chips -= 100
        player.chips = chips
        playerEl.textContent = player.name + ": $" + player.chips

    } else if (aceOnDoubleBet === true && chips === 50) {
        chips = 0
        player.chips = chips
        playerEl.textContent = player.name + ": $" + player.chips
    }

    if (chips <= 0 || sum === 21 || cards.length >= 4) {
        doubleBetBtn.style.display = "none"

    } else {
        doubleBetBtn.style.display = "block"
    } 

    if (isDoubleBetBtnClicked) {
        doubleBetBtn.style.display = "none" 
        isDoubleBetBtnClicked = false
        newCardBtn.classList.add("new-card-btn-dark-mode")
    } 

    return playerChoseAce

}

function getRandomCard() {

    let randomNumber = Math.floor( Math.random()* 13 ) + 1

    if (randomNumber > 10) {
        return 10

    } else if (randomNumber === 1) {
        aceContainer.style.display = "block"
        startGameBtn.classList.add("start-game-btn-dark-mode")
        newCardBtn.classList.add("new-card-btn-dark-mode")
        message = "You got an Ace! Choose 1 or 11.";
        messageEl.textContent = message;
        doubleBetBtn.style.display = "none"
        
        return ""

    } else {
        return randomNumber
    }

}

// ---------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------- //

function startGame() {

    isAlive = true
    hasBlackJack = false
    aceOnDoubleBet = false
    isDoubleBetBtnClicked = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()

    if (firstCard === "" && secondCard === "") {
        firstCard = 1
        secondCard = 11
        aceContainer.style.display = "none"
    }
    
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()

    if (aceContainer.style.display === "block" && chips <= 0) {
        startGameBtn.classList.add("start-game-btn-dark-mode")
        newCardBtn.classList.add("new-card-btn-dark-mode")
        doubleBetBtn.style.display = "none"

    } else if (aceContainer.style.display === "block" && chips > 0) {
        startGameBtn.classList.add("start-game-btn-dark-mode")
        newCardBtn.classList.add("new-card-btn-dark-mode")
        doubleBetBtn.style.display = "none"

    } else if (chips > 0) {
        startGameBtn.classList.add("start-game-btn-dark-mode")
        newCardBtn.classList.remove("new-card-btn-dark-mode")
        doubleBetBtn.style.display = "block" 

    } else if (chips <= 0) {
        startGameBtn.classList.add("start-game-btn-dark-mode")
        newCardBtn.classList.remove("new-card-btn-dark-mode")
        doubleBetBtn.style.display = "none" 
    }

}

// ---------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------- //

function renderGame() {
    
    cardsEl.textContent = "Cards: "

    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    // Уверяваме се, че sum е число
    sum = Number(sum);  // Това ще принуди sum да бъде числов тип, ако е текст
    
    sumEl.textContent = "Sum: " + sum

    if (aceContainer.style.display === "block") {
        return;  // Не презаписвай съобщението, ако играчът избира асо
    }

    if (sum <= 20 && isDoubleBetBtnClicked === false) {
        message = "You need another card to go on!"

    } else if (sum === 21 && isDoubleBetBtnClicked === false) {
        startGameBtn.textContent = "PLAY AGAIN"
        message = "You've got Blackjack!"
        hasBlackJack = true
        chips += 100
        player.chips = chips
        playerEl.textContent = player.name + ": $" + player.chips
        doubleBetBtn.style.display = "none"

    } else {
        startGameBtn.textContent = "PLAY AGAIN"
        message = "You're out of the game!"
        isAlive = false

        if (chips >= 50 && isDoubleBetBtnClicked === false) {
            chips -= 50
            player.chips = chips
            playerEl.textContent = player.name + ": $" + player.chips

        } else if (chips < 50 && isDoubleBetBtnClicked === false) {
            chips = 0
            player.chips = chips
            playerEl.textContent = player.name + ": $" + player.chips
        }

        doubleBetBtn.style.display = "none"
    }

    messageEl.textContent = message

    if (!isAlive || hasBlackJack) {
        startGameBtn.classList.remove("start-game-btn-dark-mode");
        newCardBtn.classList.add("new-card-btn-dark-mode")
    }
    
}

// ---------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------- //

function newCard() {

    if (isAlive && !hasBlackJack && sum < 21) {
        doubleBetBtn.style.display = "none"
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }

}

// ---------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------- //

function doubleBet() {

    isDoubleBetBtnClicked = true
    newCard()

    if (aceContainer.style.display === "block") {
        aceOnDoubleBet = true
        return // Спираме тук, за да дадем шанс на играча да направи избор!
    }

    if ((sum < 21 || sum > 21) && isDoubleBetBtnClicked === true) {
        message = "You're out of the game!"
        isAlive = false

        if (chips > 50) {
            chips -= 100
            message = "You're out of the game!"
            messageEl.textContent = message
            player.chips = chips
            playerEl.textContent = player.name + ": $" + player.chips
            doubleBetBtn.style.display = "none"
            startGameBtn.classList.remove("start-game-btn-dark-mode")
            newCardBtn.classList.add("new-card-btn-dark-mode")
            
        } else {
            chips = 0
            player.chips = chips
            playerEl.textContent = player.name + ": $" + player.chips
        } 

    } else {
        startGameBtn.textContent = "PLAY AGAIN"
        message = "You've got Blackjack!"
        messageEl.textContent = message
        hasBlackJack = true
        chips += 200
        player.chips = chips
        playerEl.textContent = player.name + ": $" + player.chips
        doubleBetBtn.style.display = "none"
    }

}

// ---------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------- //