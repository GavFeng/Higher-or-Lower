import React from 'react'
import { createContext, useContext, useReducer } from 'react';

const IDS = [

    16498, 1535, 5114, 30276, 11757, 38000, 31964, 20, 11061, 22319, 32281, 40748, 9253, 1735, 19815, 35760, 21, 28851, 
    1575, 23273, 4224, 31240, 1, 11617, 43299, 47917, 28121, 30831, 39196, 48316, 43439, 58224, 52034, 49596, 20583, 
    32615, 20507, 22199, 6547, 24833, 10620, 33352, 9919, 28223, 2904, 38691, 37999, 37450, 6702, 18679, 34572, 14719, 35849, 28171,
    13601, 13601, 3588, 28999, 2001, 29803, 50265, 35790, 44511, 37521, 10087, 34933, 37430, 6746, 31478, 42897, 5081, 34599, 14741,
    39535, 9756, 42249, 7054, 6880, 33206, 37520, 813, 37349, 918, 5680, 33255, 17265, 889, 40221, 10165, 48926, 32995, 39195, 41457, 249, 42310, 32542, 37976,
    41226, 46102, 40586, 38472, 6675, 33926, 20057, 52701, 30016, 48849, 14349, 50416, 52741, 19647, 48753, 15809,
];

const GlobalContext = createContext();

const LOADING = "LOADING";
const GET_RANDOM_ANIME = "GET_RANDOM_ANIME";
const GET_ONE_RANDOM_ANIME = "GET_ONE_RANDOM_ANIME";


//reducer
const reducer = (state, action) => {
    switch(action.type){
        case LOADING:
            return{...state, loading: true}
        case GET_RANDOM_ANIME:
            return{...state, randomAnime: action.payload, loading: false}
        case GET_ONE_RANDOM_ANIME:
            return{...state, randomAnime: [state.randomAnime[1], action.payload], loading: false}
        default:
            return state;
    }
}

const previouslySelectedIds = new Set();

const getRandomAnimeIds = () => {

    const availableIds = IDS.filter(id => !previouslySelectedIds.has(id));

    const shuffledIds = availableIds.sort(() => 0.5 - Math.random());

    // Select the first two unique IDs from the shuffled array
    const [id1, id2] = shuffledIds.slice(0, 2);

    previouslySelectedIds.add(id1);
    previouslySelectedIds.add(id2);

    return [id1, id2];
};

const getOneRandomAnimeId = () => {
    const availableIds = IDS.filter(id => !previouslySelectedIds.has(id));

    if (availableIds.length === 0) {
        throw new Error('No more unique IDs available');
    }
 
    const randomId = availableIds[Math.floor(Math.random() * availableIds.length)];

    previouslySelectedIds.add(randomId);

    return randomId;
};

export const GlobalContextProvider = ({children}) => {
    const intialState = {
        randomAnime: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(reducer, intialState);

    const getRandomAnime = async () => {
        dispatch({ type: LOADING });

        const [id1, id2] = getRandomAnimeIds();

        try {
            const [response1, response2] = await Promise.all([
                fetch(`https://api.jikan.moe/v4/anime/${id1}`),
                fetch(`https://api.jikan.moe/v4/anime/${id2}`)
            ]);
            const data1 = await response1.json();
            const data2 = await response2.json();
    
            dispatch({ type: GET_RANDOM_ANIME, payload: [data1.data, data2.data] });
        } catch (error) {
            console.error('Failed to fetch anime data:', error);
        }
    };

    const getOneRandomAnime = async () => {
        dispatch({ type: LOADING });

        const id = getOneRandomAnimeId();

        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
            const data = await response.json();
            dispatch({ type: GET_ONE_RANDOM_ANIME, payload: data.data });
        } catch (error) {
            console.error('Failed to fetch anime data:', error);
        }
    };
    

    return(
        <GlobalContext.Provider value={{
            ...state,
            getRandomAnime,
            getOneRandomAnime,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}



export const useGlobalContext = () => {
    return useContext(GlobalContext);
}