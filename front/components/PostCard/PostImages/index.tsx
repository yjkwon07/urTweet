import React, { useCallback, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';

import ImageListZoom from '@components/ImageListZoom';
import { IIMage } from '@modules/post/@types/db';
import { GET_IMAGE_URL } from '@utils/urls';

interface IProps {
  imageList: IIMage[];
}

const PostImages = ({ imageList }: IProps) => {
  const [showImageListZoom, setShowImageListZoom] = useState(false);

  const handleZoom = useCallback(() => {
    setShowImageListZoom(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowImageListZoom(false);
  }, []);

  if (imageList.length === 1) {
    return (
      <div>
        <img
          src={GET_IMAGE_URL(imageList[0].src)}
          alt={imageList[0].src}
          style={{ width: '100%', display: 'inline-block' }}
          role="presentation"
          onClick={handleZoom}
        />
        {showImageListZoom && <ImageListZoom imageList={imageList} onClose={handleClose} />}
      </div>
    );
  }
  if (imageList.length === 2) {
    return (
      <div>
        <img
          src={GET_IMAGE_URL(imageList[0].src)}
          alt={imageList[0].src}
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          onClick={handleZoom}
        />
        <img
          src={GET_IMAGE_URL(imageList[1].src)}
          alt={imageList[1].src}
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          onClick={handleZoom}
        />
        {showImageListZoom && <ImageListZoom imageList={imageList} onClose={handleClose} />}
      </div>
    );
  }
  return (
    <div style={{ position: 'relative' }}>
      <div>
        <img
          src={GET_IMAGE_URL(imageList[0].src)}
          alt={imageList[0].src}
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          onClick={handleZoom}
        />
        <img
          src={GET_IMAGE_URL(imageList[1].src)}
          alt={imageList[0].src}
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
          {imageList.length - 2}
          개의 사진 더보기
        </div>
      </div>
      {showImageListZoom && <ImageListZoom imageList={imageList} onClose={handleClose} />}
    </div>
  );
};

export default PostImages;
