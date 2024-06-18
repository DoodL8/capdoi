
// Example array of card names (assuming these are the filenames without extension)
let cards = ['2_of_clubs', '3_of_clubs', '4_of_clubs', '5_of_clubs', '6_of_clubs', '7_of_clubs', '8_of_clubs', '9_of_clubs', '10_of_clubs', 'jack_of_clubs2', 'queen_of_clubs2', 'king_of_clubs2', 'ace_of_clubs', 'black_joker'];

// Function to render card images dynamically
function renderCardImages() {
    let cardsContainer = document.getElementById('cards');
    let html = '';

    // Loop through each card name and create <img> tags
    cards.forEach(card => {
        let imagePath = `images/${card}.png`; // Construct the image path
        html += `<img src="${imagePath}" alt="${card}">`;
    });

    // Insert generated HTML into the cards container
    cardsContainer.innerHTML = html;
}

// Call the renderCardImages function to populate the cards container
renderCardImages();

// Game variables
let player = {name: "Player", cards: [], score: 0};
let dealer = {name: "Dealer", cards: [], score: 0};
let npcs = [
    {name: "Michael", cards: [], score: 0},
    {name: "Franklin", cards: [], score: 0},
    {name: "Trevor", cards: [], score: 0}
];

// Initialize deck
let deck = [
    {value: 2, name: '2'}, {value: 3, name: '3'}, {value: 4, name: '4'}, {value: 5, name: '5'},
    {value: 6, name: '6'}, {value: 7, name: '7'}, {value: 8, name: '8'}, {value: 9, name: '9'},
    {value: 10, name: '10'}, {value: 10, name: 'J'}, {value: 10, name: 'Q'}, {value: 10, name: 'K'},
    {value: 1, altValue: 11, name: 'A'}, {value: 1, altValue: 11, name: 'A'},
    {value: 'joker', name: 'joker'}, {value: 'joker', name: 'joker'}
];

// Function to shuffle the deck
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle the deck at the start of the game
deck = shuffle(deck);

// Function to deal cards to players
function dealCards() {
    // Deal two cards to each player
    for (let i = 0; i < 2; i++) {
        player.cards.push(deck.pop());
        dealer.cards.push(deck.pop());
        npcs.forEach(npc => npc.cards.push(deck.pop()));
    }

    // Display the cards and scores
    updateDisplay();
}

// Function to calculate the score
function calculateScore(hand) {
    let score = 0;
    let hasAce = false;
    let jokerCount = 0;

    hand.forEach(card => {
        if (card.name === 'joker') {
            jokerCount++;
        } else if (card.name === 'A') {
            hasAce = true;
            score += card.value;
        } else {
            score += card.value;
        }
    });

    // Check joker conditions
    if (jokerCount === 1) {
        return 'lose';
    } else if (jokerCount === 2) {
        return 'win';
    }

    // Adjust score if hand contains an ace and the total score is low
    if (hasAce && score <= 11) {
        score += 10; // Making ace worth 11
    }

    return score;
}

// Function to update the display
function updateDisplay() {
    // Update player display
    document.getElementById('cards').innerHTML = '';
    player.cards.forEach(card => {
        let imagePath = `Playing Cards/${card.name}.png`;
        document.getElementById('cards').innerHTML += `<img src="${imagePath}" alt="${card.name}">`;
    });

    player.score = calculateScore(player.cards);
    document.getElementById('cards').innerHTML += `<p>Player score: ${player.score}</p>`;

    // Handle ace warning
    if (player.cards[0].name === 'ace_of_clubs') {
        alert('WHAT ARE YOU DOING!');
    }
}

// Start the game by dealing cards
dealCards();
