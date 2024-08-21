import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/global'
import styled from 'styled-components'

function Game() {
  const {randomAnime, getRandomAnime} = useGlobalContext();

  const handleButtonClick = (action) => {
    action();
  };

  
  useEffect(() => {
    getRandomAnime();
  }, [])

  return (
    <Container>
    {randomAnime.length === 2 && (
      <>
        <LeftAnimeCard>
          <CardImageWrapper>
            <img src={randomAnime[0].images.jpg.large_image_url} alt={randomAnime[0].title} />
            <div className="title-overlay">{randomAnime[0].title}</div>
            <div className="rank-overlay">{randomAnime[0].rank}</div>
          </CardImageWrapper>
        </LeftAnimeCard>
        <RightAnimeCard>
          <CardImageWrapper>
            <img src={randomAnime[1].images.jpg.large_image_url} alt={randomAnime[1].title} />
            <div className="title-overlay">{randomAnime[1].title}</div>
          </CardImageWrapper>
        </RightAnimeCard>
      </>
    )}
  </Container>
  )
}

const Container = styled.div`
  padding: 1rem 1rem;
  background-color: #001B3A;
  display: flex;
  justify-content: space-between;
  width: 100vw; 
  box-sizing: border-box;
  overflow: hidden; 
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

  .title-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff; 
    font-size: 1.5rem; 
    z-index: 1; 
    background: rgba(0, 0, 0, 0.5); 
    padding: 0.5rem; 
    border-radius: 5px; 
  }
  .rank-overlay {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff; 
    font-size: 1.5rem; 
    z-index: 1; 
    background: rgba(0, 0, 0, 0.5); 
    padding: 0.5rem; 
    border-radius: 5px; 
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
`;
export default Game