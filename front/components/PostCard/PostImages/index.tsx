import { useCallback, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';

import ImageListZoom from '@components/ImageListZoom';
import imageDownloadLink from '@modules/file/utils/imageDownloadLink';
import { Image } from '@modules/post/@types/db';

import { StyledImage } from './styles';

interface IProps {
  imageList: Image[];
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
      <StyledImage>
        <img
          className="one-image"
          role="presentation"
          src={imageDownloadLink(imageList[0].src)}
          alt={imageList[0].src}
          onClick={handleZoom}
        />
        {showImageListZoom && <ImageListZoom imageList={imageList} onClose={handleClose} />}
      </StyledImage>
    );
  }
  if (imageList.length === 2) {
    return (
      <StyledImage>
        <img
          className="two-image"
          role="presentation"
          src={imageDownloadLink(imageList[0].src)}
          alt={imageList[0].src}
          onClick={handleZoom}
        />
        <img
          className="two-image"
          role="presentation"
          src={imageDownloadLink(imageList[1].src)}
          alt={imageList[1].src}
          onClick={handleZoom}
        />
        {showImageListZoom && <ImageListZoom imageList={imageList} onClose={handleClose} />}
      </StyledImage>
    );
  }
  return (
    <StyledImage className="more-view">
      <div>
        <img
          className="two-image"
          role="presentation"
          src={imageDownloadLink(imageList[0].src)}
          alt={imageList[0].src}
          onClick={handleZoom}
        />
        <img
          className="two-image"
          role="presentation"
          src={imageDownloadLink(imageList[1].src)}
          alt={imageList[0].src}
          onClick={handleZoom}
        />
        <div className="more-image" role="presentation" onClick={handleZoom}>
          <PlusOutlined />
          <br />
          {imageList.length - 2}
          개의 사진 더보기
        </div>
      </div>
      {showImageListZoom && <ImageListZoom imageList={imageList} onClose={handleClose} />}
    </StyledImage>
  );
};

export default PostImages;
