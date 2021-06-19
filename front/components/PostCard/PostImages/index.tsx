import React, { useCallback, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';

import ImagesZoom from '@components/ImagesZoom';
import { IIMage } from '@modules/post/@types/db';
import { GET_IMAGE_URL } from '@utils/urls';

interface IProps {
  images: IIMage[];
}

const PostImages = ({ images }: IProps) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const handleZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <div>
        <img
          src={GET_IMAGE_URL(images[0].src)}
          alt={images[0].src}
          style={{ width: '100%', display: 'inline-block' }}
          role="presentation"
          onClick={handleZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={handleClose} />}
      </div>
    );
  }
  if (images.length === 2) {
    return (
      <div>
        <img
          src={GET_IMAGE_URL(images[0].src)}
          alt={images[0].src}
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          onClick={handleZoom}
        />
        <img
          src={GET_IMAGE_URL(images[1].src)}
          alt={images[1].src}
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          onClick={handleZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={handleClose} />}
      </div>
    );
  }
  return (
    <div style={{ position: 'relative' }}>
      <div>
        <img
          src={GET_IMAGE_URL(images[0].src)}
          alt={images[0].src}
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          onClick={handleZoom}
        />
        <img
          src={GET_IMAGE_URL(images[1].src)}
          alt={images[0].src}
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          onClick={handleZoom}
        />
        <div
          role="presentation"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 50%)',
            borderRadius: '.5em',
            padding: 10,
            textAlign: 'center',
            color: '#fff',
            lineHeight: '30px',
          }}
          onClick={handleZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 2}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={handleClose} />}
    </div>
  );
};

export default PostImages;
