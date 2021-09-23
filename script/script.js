const FRONT = "card_front";
const BACK =  "card_back";
const CARD = "card"
const ICON = "icon"
const FLIP = "flip"

startGame();

//INICIALIZAR O GAME
function startGame(){

    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards){
    let gameBoard = document.getElementById("gameBoard");

    gameBoard.innerHTML = "";
    game.cards.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createcardContent(card, cardElement)

        cardElement.addEventListener("click", flipCard)
        gameBoard.appendChild(cardElement);
    })
}
//FINAL: INICIALIZAR O GAME

// CRIAR CARDS EM TELA
function createcardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element){
    let cardElementFace = document.createElement("div");
    cardElementFace.classList.add(face);

    if(face === FRONT){
        let iconElement = document.createElement("img");
        iconElement.classList.add(ICON);
        iconElement.src = "./img/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement)
    } else{
        cardElementFace.innerHTML = "&lt/&gt"
    }
    element.appendChild(cardElementFace);
}
// FINAL: CRIAR CARDS EM TELA

//VIRAR CARDS NA TELA
function flipCard(){

    if(game.setCard(this.id)){

        this.classList.add(FLIP);
        if(game.secondcard){
            if(game.checkMatch()){
                game.clearCards();
                if(game.checkGameOver()){
                    let gameOverlayer = document.getElementById("gameOver");
                    gameOverlayer.style.display = "flex";
                }
            }else{
                setTimeout(()=>{
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondcard.id);

                    firstCardView.classList.remove(FLIP);
                    secondCardView.classList.remove(FLIP);
                    game.unFlippercard();
                }, 1000)
            }
        }
    }
}

//RESTART GAME

function restart(){
    game.clearCards();
   startGame();
   let gameOverlayer = document.getElementById("gameOver");
   gameOverlayer.style.display = "none";
}