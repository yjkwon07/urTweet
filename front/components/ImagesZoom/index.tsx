import React, { useState } from 'react';

import { Global } from '@emotion/react';
import Slick from 'react-slick';

import { IIMage } from '@modules/post/@types/db';
import { GET_IMAGE_URL } from '@utils/urls';

import { Overlay, Header, CloseBtn, ImgWrapper, Indicator, SlickWrapper, globalStyles } from './styles';

export interface IProps {
  images: IIMage[];
  onClose: () => void;
}

const ImagesZoom = ({ images, onClose }: IProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global styles={globalStyles} />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((image) => (
              <ImgWrapper key={image.src}>
                <img src={GET_IMAGE_URL(image.src, true)} alt={image.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

export default ImagesZoom;
