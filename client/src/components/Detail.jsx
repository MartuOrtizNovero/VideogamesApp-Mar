import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, resetDetails } from '../redux/action/index';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import './Detail.css'
import loading from './images/cargador.png.gif'

export default function Detail() {
    const dispatch = useDispatch();
    const params = useParams();// accedo a los parametros de la ruta actual
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDetails(params.id))
    }, [params.id, dispatch]);

    const vgDetails = useSelector((state) => state.details);

    function cleanSubmit(e) {
        e.preventDefault();
        dispatch(resetDetails())
        navigate('/home')
    }
    function cleanText(text) {
        let cleanString = /[<^/>]p*/g;
        return text.replace(cleanString, '')
    }

    return (
        <div className="containerDetail">


            <br />
            {
                Object.keys(vgDetails).length ?
                    <div className='todoDetail'>
                        <div className="left">
                            <Link to='/home'>
                                <button onClick={(e) => cleanSubmit(e)} className='boton_home'>Return to Home</button>
                            </Link>
                            <h1 className="name1">NAME <br /> {vgDetails.name.toUpperCase()}</h1>
                            <img className="img2" src={vgDetails.img} alt="videogame" height={190} weight={180} />
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="right">
                            <h4>Genres: {vgDetails.genres.map(t => t.name ? t.name + " " : t + ' ')}</h4>
                            <h4>Release Date: {vgDetails.releaseDate}</h4>
                            <h4>Rating: {vgDetails.rating}</h4>
                            <h4>Platforms: {vgDetails.platforms.map(e => e + ' ')}</h4>
                            <h5 className="descript">Description: {cleanText(vgDetails.description)}</h5>
                        </div>
                        <div >
                            <br />

                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>

                    </div>
                    :
                    <div>

                        <img src={loading} className='loadingImg' height={450} width={500} alt="loading please wait" />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />

                    </div>
            }

        </div>
    )
}
