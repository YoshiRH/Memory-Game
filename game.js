const cardsColor = ["red", "red", "blue","blue", "yellow", "yellow",
"green", "green", "violet", "violet", "brown", "brown", "gray", "gray",
"orange", "orange", "lightblue", "lightblue"];

let cards = document.querySelectorAll("div");
cards = [...cards];

const gameStart = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length/2;
let gameResult = 0;


const clickOnCard = function(){
    activeCard = this;

    if(activeCard == activeCards[0]) return;

    this.classList.remove("hidden");
    

    if(activeCards.length === 0){
    activeCards[0] = activeCard;
    return;
    }

    else{
        cards.forEach(card => card.removeEventListener("click", clickOnCard))
        activeCards[1] = activeCard;

        setTimeout(function(){
        if(activeCards[0].className === activeCards[1].className){
            activeCards.forEach( card => card.classList.add("off"));
            gameResult++;
            cards = cards.filter(card => !card.classList.contains("off"));
            if(gameResult == gamePairs){
                const gameEnd = new Date().getTime();
                const gameTime = (endTime - startTime)/1000;
                alert(`Wygrana! Czas gry: ${gameTime} sekund`)
                location.reload();
            } 
        }
        else{
            activeCards.forEach( card => card.classList.add("hidden"));
        }
        activeCard = "";
        activeCards.length = 0;
        cards.forEach(card => card.addEventListener("click", clickOnCard))
        }, 500);
        
    }

}


const init = function(){
    cards.forEach(card => {
        const position = Math.floor(Math.random()*cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1);
    })

    setTimeout(function(){
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickOnCard)
        })
    }, 1000)
}



init()
