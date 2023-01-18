import { GET_COUNTRIES, ERROR, GET_DETAIL, GET_COUNTRIES_BY_NAME, GET_ACTIVITIES, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITY, SORT_COUNTRIES, RESET_FILTERS, RESET_DETAIL, CREATE_ACTIVITY } from "../actions/actions";

const initialState = {
    countries: [],
    allCountries:[],
    formCountries: [],
    detail: [],
    activities: [],
    filtered: [],
    error: ""
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_DETAIL: 
            return {
                ...state,
                detail: action.payload
            }
        case GET_COUNTRIES_BY_NAME: {
            return {
                ...state,
                countries: action.payload,
                filtered: action.payload
            }
        }
        case CREATE_ACTIVITY: {
            return {
                ...state,
            }
        }
        case FILTER_BY_CONTINENT: {
            const countries = state.allCountries
            const filter = countries.filter(c => c.continent === action.payload)
            return {
                ...state,
                countries: action.payload === 'All' ? countries : filter,
                filtered: action.payload === 'All' ? countries : filter
            }
        }
        case FILTER_BY_ACTIVITY: {
            const countries = state.allCountries
            const filter = countries.filter(c => c.activities.find((el)=> el.name === action.payload))
            return {
                ...state,
                countries : action.payload === 'all' ? countries : filter,
                filtered: action.payload === 'all' ? countries : filter
            }
        }
        case SORT_COUNTRIES: {
            const allCountries = state.countries
            const sorted = state.filtered.length? state.filtered : allCountries
            if(action.payload === 'asc') sorted.sort(function(a,b){
                if(a.name > b.name) return 1
                if(b.name > a.name) return -1
                return 0 })
            if(action.payload === 'desc') sorted.sort(function(a,b){
                if(a.name > b.name) return -1
                if(b.name > a.name) return 1
                return 0 })
            if(action.payload === 'popAsc') sorted.sort(function(a,b){return a.population - b.population})
            if(action.payload === 'popDesc') sorted.sort(function(a,b){return b.population - a.population})
            return {
                ...state,
                countries: sorted, 
                filtered: sorted
            }
        }
        case RESET_FILTERS: {
            return {
                ...state,
                filtered: [], 
                countries: []
            }
        }
        case RESET_DETAIL: {
            return {
                ...state,
                detail: []
            }
        }   
        default:
            return {...state}
    }
}

export default rootReducer