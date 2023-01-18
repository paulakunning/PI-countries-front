import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getDetail } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import cd from '../CardDetail/CardDetail.module.css'
import area from './detailIcons/area.png'
import capital from './detailIcons/capital.png'
import subregion from './detailIcons/subregion.png'
import continent from './detailIcons/continent.png'
import population from './detailIcons/population.png'

export default function Detail(props){
    const dispatch = useDispatch()
    const country = useSelector((state) => state.detail)
    const id = props.match.params.id

    function handleDif(dif){
      if(dif === "1") return "Begginer"
      if(dif === "2") return "Amateur"
      if(dif === "3") return "Normal"
      if(dif === "4") return "Professional"
      if(dif === "5") return "Expert"
    }

    useEffect(()=> {
        dispatch(getDetail(id))
        return () => {dispatch(clearDetail())}
    }, [dispatch, id])
    

  if (typeof country === 'string') 
  {return (
    <div>
      <Link to="/countries">
        <div className={cd.modalContainer}>
          <div className={cd.modalContent}>
            <div className={cd.modalText}>
              <h3>{country}</h3>
            </div>
            <div className={cd.modalBtn}>
              <button className={cd.backBtn}> Back to home </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )}
   else if (country) 
   { return (
      <div className={cd.detail} >
        <div className={cd.btnContainer}>
          <Link to="/countries">
            <button className={cd.backBtn}> Back to home </button>
          </Link>
        </div>
        <div className={cd.info} >
          <div className={cd.detailContainer}>
            <div className={cd.title}>
              <img src={country.flag} alt="country flag" />
              <h1>
                {country.name} ({country.id})
              </h1>
            </div>
            <div className={cd.detailIcons}>
              <img src={continent} alt="continentIcon" /> 
              <p> Continent: {country.continent}</p>
            </div>
            <div className={cd.detailIcons}>
              <img src={capital} alt="capitalIcon" />
              <p> Capital: {country.capital}</p>
            </div>
            <div className={cd.detailIcons}>
              <img src={subregion} alt="subregionIcon" />
              <p> Subregion : {country.subregion}</p>
            </div>
            <div className={cd.detailIcons}>
              <img src={area} alt="areaIcon" />
              <p> Area: {new Intl.NumberFormat().format(country.area)} km² </p>
            </div>
            <div className={cd.detailIcons}>
              <img src={population} alt="populationIcon" />
              <p>
                Population: {new Intl.NumberFormat().format(country.population)}
              </p>
            </div>
          </div>
          <div className={cd.actContainer}>
            <p className={cd.actTitle}> Activities : </p>
            {country.hasOwnProperty("activities") &&
            country.activities.length ? (
              country.activities.map((act) => (
                <div key={act.id} className={cd.actContainer}>
                  <p>Name : {act.name}</p>
                  <p>Duration : {act.duration} hours. </p>
                  <p>Season : {act.season} </p>
                  <p>Difficulty : {handleDif(act.difficulty)} </p>
                </div>
              ))
            ) : (
              <p>There is no activities for this country</p>
            )}
          </div>
        </div>
      </div>
    )}
    else {
      return (
          <div className={cd.loader}>
              <h1>Loading...</h1>
          </div>
      )}
}