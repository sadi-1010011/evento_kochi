// import projectThumbnail from "../../img/project-thumbnail.png"
import FavPinkIcon from "../../img/fav_pink.png";
import FavTranspIcon from "../../img/fav_transparent.png";
import HostIcon_Dark from "../../img/host_dark.png";
import LocationIcon from '../../img/location-pin.png';
import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import ImgCarousel from "../ImgCarousel/ImgCarousel";
import moment from "moment";
import './ProjectCard.css';

import project1 from "../../img/project1.png";
import project2 from "../../img/project2.jpg";
import project3 from "../../img/project3.png";

function ProjectCard({ id, name, timestamp, location, progressbar, pic = '', favourite = Math.random() < 0.5 }) {

    const [favEvent, setFavEvent] = useState(favourite);
    const progressref = useRef(null);
    const progress = Number(progressbar);
    const momentTimestamp = moment(timestamp).format('LL');

    // const [imageSrc, setImageSrc] = useState(null);
    // useEffect(() => {
    //     const loadImage = async () => {
    //         try {
    //             const image = await import(`./posters/${pic}.jpeg`);
    //             setImageSrc(image.default);
    //         } catch (err) {
    //             console.error('Error loading image:', err);
    //         }
    //     };

    //     loadImage();
    // }, [pic]);

    useEffect(() => {
        // PROGRESS IN %
        progressref.current.style.width = '0%';
        progressref.current.style.width = `${progress}%`;
    }, [progressbar, progress]);

    function showProgressPercent() {
        // soon..
        // progressref.current.textContent = progress;
    }

    function hideProgressPercent() {
        // soon..
        // progressref.current.textContent = '';
    }

    function setFavoriteEvent() {
        setFavEvent(prevState => {
            setFavEvent(!favEvent)
        });
        
        // Now updagte in the server 
        // ...
    }

    return (

        <div className="product-card">

            <ImgCarousel gallery={ [pic, project1, project2, project3] } />
            
            <span className="project-timestamp">{ momentTimestamp }</span>
            
            <span className="project-favorite">
                <img className="favicon_img" src={ favEvent ? FavPinkIcon : FavTranspIcon } alt="favicon" onClick={ setFavoriteEvent } />
            </span>

            <div className="progress-bar" onMouseEnter={ showProgressPercent } onMouseLeave={ hideProgressPercent }>
                <div ref={ progressref } className="progress-percent"></div>
            </div>

            <h3 className="product-title">{ name }</h3>

            <div className="event-host">
                <img className="hosticon_img" src={ HostIcon_Dark } alt="host_icon" />
                <span className="host-name">host name</span>
            </div>

            <div className="locationwrapper">
                <img src={ LocationIcon } className='locationicon' alt="location" />
                <span>{ location || 'kochi' }</span>
            </div>

            <Link to={`/projects/${ id }`}>
                <button className="buy-btn">
                    explore
                </button>
            </Link>
		</div>
    );
}

export default ProjectCard;