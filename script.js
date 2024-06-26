const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
const gameBoard = document.getElementById('game-board')

let flippedCards = []
let matchedCards = []
let canFlip = true

function matchCard() {
    const [card1,card2] = flippedCards;
    setTimeout(() => {
        if(card1.dataset.number===card2.dataset.number){
            matchedCards.push(card1,card2)
            if(matchedCards.length===numbers.length){
                confirm("Congratulations! You won!")
                initGame()
            }
        }else{
            card1.classList.remove('flip')  
            card2.classList.remove('flip')
            card1.textContent='?'
            card2.textContent='?'
        }
        flippedCards=[]
        canFlip=true
    }, 700);
}

function flipCard (e) {
    const card = e.target;
    if(!canFlip || flippedCards.length>=2 || card.classList.contains('flip')) return;
    card.classList.add('flip')
    card.textContent = card.dataset.number
    flippedCards.push(card)
    if(flippedCards.length==2){
        canFlip=false
        matchCard()
    }
}

function createCard(number){
    const card = document.createElement('div')
    card.textContent = '?'
    card.dataset.number = number
    card.classList.add("card")
    card.addEventListener('click',flipCard)
    return card;
}

function initGame(){
    numbers.sort(()=> Math.random()-0.5)
    gameBoard.innerHTML=''
    numbers.forEach((number)=>{
        const card = createCard(number)
        gameBoard.appendChild(card)
    })
}
initGame()