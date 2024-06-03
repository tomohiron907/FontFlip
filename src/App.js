import React, { useState, useEffect } from 'react';
import './index.css'; 

var font_list = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Georgia",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
  "Lucida Sans Unicode",
  "Tahoma",
  "Segoe UI",
];

const cards = [];
const selectedFonts = [];
while (selectedFonts.length < 6) {
  const randomIndex = Math.floor(Math.random() * font_list.length);
  const randomFont = font_list[randomIndex];
  if (!selectedFonts.includes(randomFont)) {
    selectedFonts.push(randomFont);
    cards.push({ id: cards.length + 1, value: randomFont });
    cards.push({ id: cards.length + 1, value: randomFont });
  }
}
const cards_list = shuffleArray(cards);

function FontDisplay(){
  return(
    <div>
      <div className="font-display">
        <h2>Fonts</h2>
        {selectedFonts.map((font) => (
          <h4 style={{ fontFamily: font }}>{font}</h4>
        ))}
        </div>
    </div>
  )
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Card({ card, isFlipped, onClick }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    if (isFlipped) {
      setShowDetails(!showDetails);
    }
    else{
      setShowDetails(false);
    }
    onClick();
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back" style={{ fontFamily: card.value }}>
          {!showDetails && ('The quick brown fox jumps over the lazy dog.')}
          {showDetails && (
            <div className="card-details" style={{ fontFamily: card.value }}>
              {"Font: " + card.value}
              <p>{card.details}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default function Board() {
  
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.value === secondCard.value) {
        setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  function handleCardClick(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card.id)) {
      setFlippedCards((prev) => [...prev, card]);
    }
  }

  return (
    <>
    <h1>Font Flip</h1>
    <div className="container">
      
      <div>
        <div className="game-board">
          {cards_list.map((card) => (
            <Card
              key={card.id}
              card={card}
              isFlipped={flippedCards.includes(card) || matchedCards.includes(card.id)}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </div>
      
    </div>
    
      <div className="font-display">
        <FontDisplay />
      </div>
    
    </>
  );
}
