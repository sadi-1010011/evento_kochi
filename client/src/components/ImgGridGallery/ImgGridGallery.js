import React from "react";
import './ImgGridGallery.css';
import img1 from '../../img/project1.png';
import img2 from '../../img/project2.jpg';
import img3 from '../../img/project3.png';
// import deleteIcon from '../../img/delete.png';
// import editIcon from '../../img/edit.png';

export default function ImgGridGallery() {
    return (

        // DUMMY IMAGE DATA USED !

        <section className="grid-gallery">
            <div className="grid-column1">
                <img src={ img1 } alt="img" />
                <img src="https://loremflickr.com/640/520/butterfly?random=1" alt="butterfly" />
                <img src="https://loremflickr.com/640/520/butterfly?random=3" alt="butterfly" />
                <img src={ img2 } alt="img" />
                <img src="https://loremflickr.com/640/520/butterfly?random=8" alt="butterfly" />
                <img src="https://loremflickr.com/640/520/butterfly?random=10" alt="butterfly" />
                <img src={ img3 } alt="img" />
            </div>
            <div className="grid-column2">
                <img src="https://loremflickr.com/640/520/butterfly?random=11" alt="butterfly" />
                <img src="https://loremflickr.com/640/520/butterfly?random=13" alt="butterfly" />
                <img src={ img2 } alt="img" />
                <img src="https://loremflickr.com/640/520/butterfly?random=4" alt="butterfly" />
                <img src="https://loremflickr.com/640/520/butterfly?random=6" alt="butterfly" />
                <img src={ img1 } alt="img" />
            </div>
            <div className="grid-column1">
                <img src={ img1 } alt="img" />
                <img src="https://loremflickr.com/640/520/butterfly?random=1" alt="butterfly" />
                <img src="https://loremflickr.com/640/520/butterfly?random=3" alt="butterfly" />
                <img src={ img2 } alt="img" />
                <img src="https://loremflickr.com/640/520/butterfly?random=8" alt="butterfly" />
                <img src="https://loremflickr.com/640/520/butterfly?random=10" alt="butterfly" />
            </div>
            <div className="grid-column2">
                <img src="https://loremflickr.com/640/520/butterfly?random=13" alt="butterfly" />
                <img src={ img2 } alt="img" />
                <img src="https://loremflickr.com/640/520/butterfly?random=4" alt="butterfly" />
                <img src="https://loremflickr.com/640/520/butterfly?random=6" alt="butterfly" />
                <img src={ img1 } alt="img" />
            </div>
        </section>

    );
}