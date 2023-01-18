import React from "react";
import c from '../Card/Card.module.css'

export default function Card({country}){
    return (
        <div className={c.card}>
            <h2>{country.name}</h2>
            <img src={country.flag} alt={country.name} />
            <p> Continent: {country.continent} </p>
        </div>
    )
}