import React from 'react'
import ReactOwlCarousel from 'react-owl-carousel'

const OwlCarousel = ({children, id, className, options}) => {
  return (
    <ReactOwlCarousel
      id={`${id}`}
      className={`${className} owl-theme`}
      {...options}
    >
        {children}
    </ReactOwlCarousel>
  )
}

export default OwlCarousel