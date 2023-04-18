import React, { useState } from 'react';
import './Carousel.css'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

function Carousel(props) {
    const [current, setCurrent] = useState(0);
    const length = props.CarouselData.length;

    const nextslide = ()=>{
        setCurrent (current === length-1 ? 0 : current + 1);
    }

    const prevSlide = ()=>{
        setCurrent (current === 0 ? length-1 : current-1 )
    }

    if (!Array.isArray (props.CarouselData) || length <= 0) {
        return null;
    }

    return (
      <div className={props.CarouselStyle}>
        {props.CarouselData.map((Slide, Index) => {
          return (
            <div
              className={Index === current ? "ActiveSlide" : "Slide"}
              key={Index}
            >
              {Index === current && (
                <img src={Slide.image} className="CarouselSlideImage" />
              )}
            </div>
          );
        })}

        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextslide} />
      </div>
    );
}

export default Carousel;