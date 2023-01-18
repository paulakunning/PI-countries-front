import axios from 'axios'
export const GET_COUNTRIES = 'GET_COUNTRIES'
export const ERROR = 'ERROR'
export const GET_DETAIL = 'GET_DETAIL'
export const GET_COUNTRIES_BY_NAME = 'GET_COUNTRIES_BY_NAME'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY'
export const RESET_FILTERS = 'RESET_FILTERS'
export const SORT_COUNTRIES = 'SORT_COUNTRIES'
export const RESET_DETAIL = 'RESET_DETAIL'
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'

export function getCountries(){
    return async function(dispatch){
        try {
            const json = await axios.get('/countries')
            return dispatch({
                type: GET_COUNTRIES,
                payload: json.data
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: 'Oops! Something went wrong.'
            })
        }
    }
}

export function getActivities(){
    return async function(dispatch){
        try {
            const json = await axios.get('/activities')
            return dispatch({
                type: GET_ACTIVITIES,
                payload: json.data
            })
        } catch (error) {
            dispatch({
                type: ERROR, 
                payload: error
            })
        }
    }
}

export function getCountriesByName(name){
    return async function(dispatch){
        try {
            var json = await axios.get('/countries/?name='+ name)
            return dispatch({
                type: GET_COUNTRIES_BY_NAME,
                payload: json.data
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: 'Oops! There is no country with that name. Please try something else'
            })
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get('/countries/:'+ id)
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        } catch (error) {
            dispatch({
                type:ERROR,
                payload: error
            })
        }
    }
}

export function createActivity(payload){
    return async function (){
        try {
            const response = await axios.post('/activities', payload)
            return response
        } catch(error){
            return 'Ocurrió un error al crear la actividad'
        }
    }
}

export function filterByContinent(payload){
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
}

export function filterByActivity(payload){
    return {
        type: FILTER_BY_ACTIVITY,
        payload
    }
}

export function sortCountries(payload){
    return {
        type: SORT_COUNTRIES,
        payload
    }
}

export function clearFilters(){
    return {
        type: RESET_FILTERS
    }
}

export function clearDetail(){
    return {
        type: RESET_DETAIL
    }
}
