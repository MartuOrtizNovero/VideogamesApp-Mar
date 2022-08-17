import React from "react";
import { Link } from "react-router-dom";
import './Cards.css'

export default function Cards({ id, name, img, genres,rating }) {

    return (

        <div className="cards2">
            <img className="image" src={img} alt='img not found' width='350px' height='230px' />
            <div className="containerr">
                <h1 className="title">{name}</h1>
                <h3 className="genres">Genres: {genres.map(g => g.name ? g.name + ' ' : g + ' ')}</h3>
                <h1 className="title">{rating}</h1>
                <Link className="read" to={`/videogames/${id}`}> READ MORE</Link>
                <br />
            </div>
        </div>

    )
}

