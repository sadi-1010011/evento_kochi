import React from "react";
import Slider from "react-slick";
import projectThumbnail from "../../img/project-thumbnail.png"


export default function ImgCarousel({ gallery }) {

    if (!gallery.length) gallery = [projectThumbnail];

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    waitForAnimate: false
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {
            gallery.map(pic => <img src={ pic || projectThumbnail } className="product-image" alt="projectPic" />)
        }
      </Slider>
    </div>
  );
}