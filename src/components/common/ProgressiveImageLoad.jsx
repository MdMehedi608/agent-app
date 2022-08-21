import React from "react";
import ProgressiveImage from "react-progressive-graceful-image";

const ProgressiveImageLoad = ({
  elementClass,
  image,
  placeholderSrc,
  bookName,
}) => {
  return (
    <ProgressiveImage src={image} placeholder={placeholderSrc}>
      {(src, loading) => (
        <img className={elementClass} src={src} alt={bookName} title={bookName} />
      )}
    </ProgressiveImage>
  );
};

export default ProgressiveImageLoad;
