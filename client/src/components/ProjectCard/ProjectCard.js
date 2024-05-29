import projectThumbnail from '../../img/project-thumbnail-cropped.png';
import LocationIcon from '../../img/location-pin.png';
import PosterImg from './posters/poster1.jpeg';
import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import './ProjectCard.css';

function ProjectCard({ id, name, description, progressbar, pic }) {
    
    const progressref = useRef(null);
    const progress = Number(progressbar);

    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const image = await import(`./posters/${pic}.jpeg`);
                setImageSrc(image.default);
            } catch (err) {
                console.error('Error loading image:', err);
            }
        };

        loadImage();
    }, [pic]);

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


    // let posterlocation = `./posters/${pic}`s;
    // let icon = require(`./posters/${pic}`).default; // for dynamic fetching img

    return (
        <div className="product-card">
            <img src={ imageSrc || PosterImg } className="product-image" alt="projectPic" />
            <div className="progress-bar" onMouseEnter={ showProgressPercent } onMouseLeave={ hideProgressPercent }>
                <div ref={ progressref } className="progress-percent"></div>
            </div>
            <h3 className="product-title">{ name }</h3>
            <p className="product-description">{ description }</p>
            <div className="locationwrapper">
                <img src={ LocationIcon } className='locationicon' alt="location" />
                <span>kochi</span>
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