import { useCallback, useEffect, useState } from "react";
import CardList from "./components/CardList/CardList";
import images from "./helpers/import-images";
import styled from "styled-components";

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 5rem;
  text-align: center;
`;

const StyledButton = styled.button`
  padding: 1rem;
  font-family: inherit;
  background-color: #ff7171;
  border: none;
  margin-top: 1rem;
  font-weight: bold;
  border-radius: 0.25rem;
`;

function App() {
  const [cardList, setCardList] = useState<
    { img: string; clicked: boolean; index: number }[]
  >(images.map((item, index) => ({ img: item, clicked: false, index: index })));

  const [displayedCards, setDisplayedCards] = useState<
    { img: string; clicked: boolean; index: number }[]
  >([]);

  const [currentScore, setCurrentScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  //And this is what’s happening in our useEffect dependency array.
  //The randomizeCardDisplay function is recreated on each component render and
  //therefore will always be different than the randomizeCardDisplay function
  //created during the previous render.

  //What this does is returns a memoized function whose reference will
  //only change if something in the hook’s dependency array changes.

  const randomizeCardDisplay = useCallback(() => {
    // Select 9 random cards
    // Randomizer - choose 1 card after another, if the card selected already exists in the group of 9
    // randomize again

    const tempCardList: { img: string; clicked: boolean; index: number }[] = [];

    function getRandomCard() {
      return cardList[Math.floor(Math.random() * cardList.length)];
    }

    function randomizedCards() {
      let randomCard = getRandomCard();
      if (tempCardList && tempCardList.some((e) => e?.img === randomCard.img)) {
        randomizedCards();
      }

      if (tempCardList.length < 9) {
        tempCardList.push(randomCard);
        randomizedCards();
      }
    }

    randomizedCards();
    setDisplayedCards(tempCardList);
  }, [cardList]);

  const resetGame = () => {
    setCurrentScore(0);
    setCardList(
      images.map((item, index) => ({ img: item, clicked: false, index: index }))
    );
  };

  const checkGameFinish = (
    game: { img: string; index: number; clicked: boolean }[]
  ) => {
    if (game.every((e) => e.clicked)) {
      resetGame();
    }
  };

  const checkHighScore = (current: number) => {
    if (current > highScore) {
      setHighScore(current);
    }
  };

  useEffect(() => {
    randomizeCardDisplay();
  }, [randomizeCardDisplay]);

  const selectCardHandler = (index: number) => {
    if (cardList[index].clicked) {
      resetGame();
    } else {
      setCurrentScore((prevState) => {
        checkHighScore(prevState + 1);
        return prevState + 1;
      });
      setCardList((prevState) => {
        const current = prevState;
        current[index].clicked = true;
        checkGameFinish(current);
        return current;
      });
    }

    randomizeCardDisplay();
  };

  return (
    <StyledApp>
      <h1>One Piece Memory Game</h1>
      <h2>High Score: {highScore}</h2>
      <h2>Current Score: {currentScore}</h2>
      <p style={{ margin: "1rem 0" }}>
        Select a character you haven't selected yet to gain points! Aim for high
        score or game completion. Click randomize if you have seen all the
        characters displayed.
      </p>
      <div>
        <CardList cardList={displayedCards} selectCard={selectCardHandler} />
      </div>
      <StyledButton onClick={randomizeCardDisplay}>Randomize</StyledButton>
    </StyledApp>
  );
}

export default App;
