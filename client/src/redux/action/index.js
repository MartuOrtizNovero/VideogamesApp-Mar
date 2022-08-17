import axios from 'axios';


export function getGames() {

    return function (dispatch) { //http://localhost:3001
        axios.get('/videogames')
            .then(json => {
                return dispatch({
                    type: 'GET_GAMES',
                    payload: json.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function getGenres() {

    return function (dispatch) {
        axios.get('/genres')
            .then(json => {
                return dispatch({
                    type: 'GET_GENRES',
                    payload: json.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function getPlatforms() {

    return function (dispatch) {
        axios.get('/videogames/platforms')
            .then(json => {
                return dispatch({
                    type: 'GET_PLATFORMS',
                    payload: json.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

}


export function getVideogameByName(payload) {

    return function (dispatch) {
        axios.get('/videogames?name=' + payload)
            .then(json => {
                return dispatch({
                    type: 'GET_GAMES_BY_NAME',
                    payload: json.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function getDetails(id) {

    return async function (dispatch) {
        await axios.get(`/videogames/${id}`)
            .then((game) => {
                dispatch({
                    type: 'GET_GAMES_DETAILS',
                    payload: game.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function postGame(payload) {

    return function (dispatch) {
        axios.post('/videogames', payload)
            .then((info) => {
                return dispatch({
                    type: 'POST_GAME',
                    payload: info
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export function filterBySource(payload) {
    return {
        type: 'FILTER_BY_SOURCE',
        payload
    }
};

export function filterByGenres(payload) {
    return {
        type: 'FILTER_BY_GENRES',
        payload
    }
};

/* export function filterByAge(payload){
    return{
        type: 'FILTER_BY_AGE',
        payload
    }
}
 */
export function sortByName(payload) {
    return {
        type: 'SORT_BY_NAME',
        payload
    }
};

export function sortByRating(payload) {
    return {
        type: "SORT_BY_RATING",
        payload,
    };
};

export function resetDetails() {
    return ({
        type: 'RESET_DETAILS'
    })
}


