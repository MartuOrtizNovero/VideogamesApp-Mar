const initialState = {
    videogames: [],
    videogames2: [],
    genres: [],
    platforms: [],
    details: {}
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_GAMES':
            return {
                ...state,
                videogames: payload,
                videogames2: payload
            };

        case 'GET_GENRES':
            return {
                ...state,
                genres: payload
            }

        case 'GET_PLATFORMS':
            return {
                ...state,
                platforms: payload
            }

        case 'GET_GAMES_BY_NAME':
            return {
                ...state,
                videogames: payload
            }

        case 'GET_GAMES_DETAILS':
            return {
                ...state,
                details: payload
            }

        case 'FILTER_BY_SOURCE':
            const videogames2 = state.videogames2;
            const filterSource = payload === 'Created'
                ? videogames2.filter(el => el.createdInDb)
                : videogames2.filter(el => !el.createdInDb)
            return {
                ...state,
                videogames: payload === 'All'
                    ? state.videogames2 : filterSource
            };

        case 'FILTER_BY_GENRES':
            const filterByGenres = state.videogames2;
            const type = payload === "All"
                ? filterByGenres.filter((videogame) => videogame.genres.length > 0)
                : filterByGenres.filter(
                    (videogame) =>
                        videogame.genres &&
                        videogame.genres.map((genres) => genres.name ? genres.name : genres).includes(payload)
                );
            return {
                ...state,
                videogames: type
            };

        case 'SORT_BY_NAME':
            let sortedArray = payload === 'asc' ?
                state.videogames.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                videogames: sortedArray
            };

        case "SORT_BY_RATING":
            let sortByRating =
                payload === "higher-rating"
                    ? state.videogames.sort((a, b) => {
                        return b.rating - a.rating;
                    })
                    : state.videogames.sort((a, b) => {
                        return a.rating - b.rating;

                    });
            return {
                ...state,
                videogames: sortByRating,
            };

        case 'RESET_DETAILS':
            return {
                ...state,
                details: []
            }

        case 'POST_DOG':
            return {
                ...state
            }
       /*  case 'FILTER_BY_AGE':
            const filterByAge = state.details;
            const age = payload === "dieciocho"
            ?
            filterByAge.age.filter(i => i ) */
            
        


        default: return state
    }
}