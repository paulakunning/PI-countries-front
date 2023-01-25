import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByContinent, getActivities, filterByActivity, clearFilters, getCountries, sortCountries } from "../../redux/actions/actions";
import fi from '../Filters/Filters.module.css'

export default function Filters({setCurrentPage, setOrder}){
    const dispatch = useDispatch()
    const allActivities = useSelector((state)=> state.activities)
    const continentOptions = ['All', 'Africa', 'Antarctica', 'Asia', 'Europe', 'South America', 'North America', 'Oceania']

    useEffect(()=> {
        dispatch(getActivities())
    }, [dispatch])

    function handleFilterByContinent(e){
        e.preventDefault()
        dispatch(filterByContinent(e.target.value))
    }

    function handleFilterByActivities(e){
        e.preventDefault()
        dispatch(filterByActivity(e.target.value))
    }

    function handleSort(e){
        e.preventDefault()
        dispatch(sortCountries(e.target.value))
        setCurrentPage(1)
        setOrder('Ordenado'+ e.target.value)
    }

    function handleClearFilters(e){
        dispatch(clearFilters())
        dispatch(getCountries())
    }

    return (
        <div className={fi.filtersContainer}>
            <div className={fi.filters}>
                <select onChange={(e)=>handleFilterByContinent(e)} >
                <option hidden > Filter by continent </option>
                {continentOptions.map(c => (<option key={c} value={c} >{c}</option>))}
                </select>
                <select onChange={(e)=> handleFilterByActivities(e)}>
                <option hidden > Filter by activity </option>
                    <option value='all' key='all'> All </option>
                    {allActivities?.map(act => (<option key={act.id} value={act.name} >{act.name}</option>))}
                </select>
                <select onChange={(e)=> handleSort(e)}>
                    <option hidden > Sort countries </option>
                    <option value='asc' key='asc'> Name: A - Z </option>
                    <option value='desc' key='desc'> Name: Z - A </option>
                    <option value='popAsc' key='popAsc'> Population 🡩 </option>
                    <option value='popDesc' key='popDesc'> Population 🡫 </option>
                </select>
            </div>
            <div className={fi.clearBtnContainer}>
                <button className={fi.clearBtn} onClick={(e)=> handleClearFilters(e)}> Clear filters </button>
            </div>
        </div>
    )
}