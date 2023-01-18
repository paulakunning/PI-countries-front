import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries } from "../../redux/actions/actions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import NavBar from "../NavBar/NavBar"
import Filters from "../Filters/Filters";
import h from "./Home.module.css"

export default function Home(){
    const dispatch = useDispatch()
    let countries = useSelector(state => state.countries)
    const filtrado = useSelector(state => state.filtered)
    // Conservamos el estado filtrado cuando volvemos al home
    filtrado.length ? countries = filtrado : countries = countries // eslint-disable-line
    const error = useSelector(state => state.error)
    const [ order, setOrder ] = useState('') // eslint-disable-line
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ countriesPerPage, setCountriesPerPage ] = useState(10) // eslint-disable-line
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = currentPage === 1 ? countries.slice(indexOfFirstCountry, 9) : countries.slice(indexOfFirstCountry, indexOfLastCountry)

    useEffect(()=>{
        dispatch(getCountries())
    }, [dispatch])

    const pagination = (pagenumber) => {
        setCurrentPage(pagenumber)
    }
    
    const refreshPage = ()=>{
        window.location.reload();
     }

    if(error){
        return (
          <div className={h.homeContainer}>
            <NavBar />
            <div className={h.errorContainer}>
              <div className={h.errorContent}>
                <h3>{error}</h3>
                <button className={h.errorBtn} onClick={refreshPage}>
                  Reload page 
                </button>
              </div>
            </div>
          </div>
        );
    } else if (countries.length){
        return (
          <div className={h.homeContainer}>
            <NavBar setCurrentPage={setCurrentPage} />
            <Filters
              setCurrentPage={setCurrentPage}
              setOrder={setOrder}
              currentPage={currentPage}
            />
            <div className={h.cardsContainer}>
              {currentCountries.map((country) => {
                return (
                  <div key={country.id}>
                    <Link to={"/countries/" + country.id}>
                      <Card country={country} />
                    </Link>
                  </div>
                );
              })}
            </div>
            <div>
              <Pagination
                countriesPerPage={countriesPerPage}
                currentPage={currentPage}
                countries={countries.length}
                pagination={pagination}
              />
            </div>
          </div>
        );
    } else {
        return (
            <div className={h.loader}>
                <h1>Loading...</h1>
            </div>
        )
    }
}