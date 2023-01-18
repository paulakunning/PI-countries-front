import React from "react";
import p from "../Pagination/Pagination.module.css"

export default function Pagination({countriesPerPage, countries, pagination, currentPage}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(countries / countriesPerPage); i++) {
        pageNumbers.push(i)
    }
    
    function handlePrevious(){
       pagination(currentPage-1)
    }

    function handleNext(){
        pagination(currentPage+1)
    }

    return (
        <div className={p.pagContainer}>
            <button className={p.prevBtn} disabled={currentPage === 1 ? true : false} onClick={()=>handlePrevious()} >  {"< Prev"} </button>
                {pageNumbers && pageNumbers.map( n => (
                <button className={currentPage === n ? `${p.isActive}` : `${p.pageBtn}`} key={n} onClick={()=> pagination(n)} > {n} </button>))}
            <button className={p.backBtn} disabled={currentPage === pageNumbers.length ? true : false} onClick={()=>handleNext()} > {"Next >"} </button>
        </div>
    )
}