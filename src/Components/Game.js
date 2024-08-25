import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/global'
import styled from 'styled-components'


function Game() {
  const {randomAnime, getRandomAnime, getOneRandomAnime} = useGlobalContext();
  const [showRank, setShowRank] = React.useState(false);
  const [showButtons, setShowButtons] = React.useState(true);
  const [showText, setShowText] = React.useState(true);
  const [rankToShow, setRankToShow] = React.useState(null);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [incorrectCount, setIncorrectCount] = React.useState(0);


  const handleHigherClick = async () => {
    setRankToShow(randomAnime[1].rank);
    setShowRank(true);
    setShowButtons(false);
    setShowText(false);
  
    if (randomAnime[1].rank < randomAnime[0].rank) {
      // Guess is correct
      setTimeout(async () => {
        await getOneRandomAnime();
        setCorrectCount(correctCount + 1);
        setShowRank(false); 
        setShowButtons(true);
        setShowText(true);
      }, 1000);
    } else {
      setTimeout(async () => {
        await getOneRandomAnime();
        setIncorrectCount(incorrectCount + 1);
        setShowRank(false); 
        setShowButtons(true);
        setShowText(true);

      }, 1000);
    }
  };
  
  const handleLowerClick = async () => {
    setRankToShow(randomAnime[1].rank);
    setShowRank(true);
    setShowButtons(false);
    setShowText(false);
    if (randomAnime[1].rank > randomAnime[0].rank) {
      // Guess is correct
      setTimeout(async () => {
        await getOneRandomAnime();
        setCorrectCount(correctCount + 1);
        setShowRank(false); 
        setShowButtons(true);
        setShowText(true);
      }, 1000);
    } else {
      setTimeout(async () => {
        await getOneRandomAnime();
        setIncorrectCount(incorrectCount + 1);
        setShowRank(false); 
        setShowButtons(true);
        setShowText(true);
      }, 1000);
    }

  };
  
  useEffect(() => {
    getRandomAnime();
  }, [])

  return (
    <GameStyle>
    {randomAnime.length === 2 && (
      <>
        <LeftAnimeCard>
          <CardImageWrapper>
            <img src={randomAnime[0]?.images.jpg.large_image_url} alt="" />
            <div className="title-overlay">{randomAnime[0]?.title}</div>
            <div className="text1-overlay">has </div>
            <div className="rank-overlay">Rank: {randomAnime[0]?.rank}</div>
          </CardImageWrapper>
        </LeftAnimeCard>
        <Counter>
          <CorrectCount>Correct: {correctCount}</CorrectCount>
          <IncorrectCount>Incorrect: {incorrectCount}</IncorrectCount>
       </Counter>
        <RightAnimeCard>
          <CardImageWrapper>
            <img src={randomAnime[1]?.images.jpg.large_image_url} alt="" />
            <div className="title-overlay">{randomAnime[1]?.title}</div>
            {showText && <div className="text1-overlay">has </div>}
            {showRank && <div className="rank-overlay">Rank: {rankToShow}</div>}
            {showText && <div className="text2-overlay">Rank than {randomAnime[0]?.title}</div>}
          </CardImageWrapper>
          {showButtons && (
              <ButtonContainer>
                <button onClick={handleHigherClick}>
                  Higher <i className="fas fa-arrow-up"></i>
                </button>
                <button onClick={handleLowerClick}>
                  Lower <i className="fas fa-arrow-down"></i>
                </button>
              </ButtonContainer>
            )}
        </RightAnimeCard>
      </>
    )}
  </GameStyle>
  )
}

const GameStyle = styled.div`
  padding: 1rem 1rem;
  background-color: #001B3A;
  display: flex;
  justify-content: space-between;
  width: 100vw; 
  box-sizing: border-box;
  overflow: hidden; 
`;
const Counter = styled.div`
  position: absolute;
  top: 10px;
  display: flex;
  left: 50.25%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
  z-index: 3; 
`;

const CorrectCount = styled.p`
  margin: 0;
  padding: 5px;
  border: 2px solid #fff;
  border-radius: 5px;
  color: #0f0; 
`;

const IncorrectCount = styled.p`
  margin: 0;
  padding: 5px;
  border: 2px solid #fff;
  border-radius: 5px;
  color: #f00; 
`;


const CardImageWrapper = styled.div`
  position: relative; 
  width: 100%;
  height: 1190px; 
  overflow: hidden; 
  
  img {
    display: block;
    width: 100%;
    height: 100%; 
    object-fit: cover; 
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3); 
    z-index: 1; 
  }
  .title-overlay {
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff; 
    font-size: 2rem;
    font-weight: bold; 
    z-index: 2; 
    padding: 0.5rem; 
    border-radius: 5px; 
  }
  .rank-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff989;
    font-size: 2.5rem; 
    font-weight: bold;
    z-index: 2; 
    padding: 0.5rem; 
    border-radius: 5px; 
  }

  .text1-overlay {
    position: absolute;
    top: 46.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff; 
    font-size: 1.25rem; 
    z-index: 2; 
    padding: 0.5rem; 
    border-radius: 5px; 
  }
  .text2-overlay {
    position: absolute;
    top: 63%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff; 
    font-size: 1.15rem; 
    z-index: 2; 
    padding: 0.5rem; 
    border-radius: 5px; 
  }
`;
const ButtonContainer = styled.div`
  position: absolute; 
  top: 49%;
  left: 75%;
  transform: translateX(-50%);
  flex-direction: column;
  display: flex;
  gap: .5rem;
  z-index: 3; 

  button {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff989;
    border: 2px solid #fff;
    border-radius: 10px;
    padding: 1.25rem 2.25rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #52016e;
    }
    i {
      margin-left: 1.5rem; 
    }
  }
`;

const LeftAnimeCard = styled.div`
  flex: 1;
  background-color: #00224B;
  border-radius: 20px;
  border: 5px solid #3E424B;
  padding: 1rem;
  text-align: center;
  box-sizing: border-box;
`;

const RightAnimeCard = styled.div`
  flex: 1;
  background-color: #002366;
  border-radius: 20px;
  border: 5px solid #3E424B;
  padding: 1rem;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;  
`;



export default Game