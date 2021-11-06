import { useCallback, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';

import ImageListZoom from '@components/ImageListZoom';
import { fileDownloadLink } from '@modules/file';
import { Image } from '@modules/post/@types/db';

import { StyledImage } from './styles';

interface IProps {
  imageList: Image[];
}

const PostImages = ({ imageList }: IProps) => {
  const [showImageListZoom, setShowImageListZoom] = useState(false);
  const [isShowDetailImageBtn, setIsShowDetailImageBtn] = useState(false);

  const handleShowDetailImageBtn = useCallback(() => {
    setIsShowDetailImageBtn(true);
  }, []);

  const handleCloseDetailImageBtn = useCallback(() => {
    setIsShowDetailImageBtn(false);
  }, []);

  const handleZoom = useCallback(() => {
    setShowImageListZoom(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowImageListZoom(false);
  }, []);

  if (imageList.length === 1) {
    return (
      <StyledImage onMouseEnter={handleShowDetailImageBtn} onMouseLeave={handleCloseDetailImageBtn}>
        <img className="one-image" src={fileDownloadLink(imageList[0].src)} alt="" />
        {isShowDetailImageBtn && (
          <div className="detail-image" role="presentation" onClick={handleZoom}>
            <SearchOutlined /> 자세히 보기
          </div>
        )}
        {showImageListZoom && <ImageListZoom imageList={imageList} onClose={handleClose} />}
      </StyledImage>
    );
  }
  if (imageList.length === 2) {
    return (
      <StyledImage onMouseEnter={handleShowDetailImageBtn} onMouseLeave={handleCloseDetailImageBtn}>
        <img className="two-image-l" src={fileDownloadLink(imageList[0].src)} alt="" />
        <img className="two-image-r" src={fileDownloadLink(imageList[1].src)} alt={imageList[1].src} />
        {isShowDetailImageBtn && (
          <div className="detail-image" role="presentation" onClick={handleZoom}>
            <SearchOutlined /> 자세히 보기
          </div>
        )}
        {showImageListZoom && <ImageListZoom imageList={imageList} onClose={handleClose} />}
      </StyledImage>
    );
  }
  return (
    <StyledImage onMouseEnter={handleShowDetailImageBtn} onMouseLeave={handleCloseDetailImageBtn}>
      <img className="four-image-l-t" src={fileDownloadLink(imageList[0].src)} alt="" />
      <img className="four-image-r-t" src={fileDownloadLink(imageList[1].src)} alt="" />
      <img className="four-image-l-d" src={fileDownloadLink(imageList[2].src)} alt="" />
      <img className="four-image-r-d" src={fileDownloadLink(imageList[3].src)} alt="" />
      {isShowDetailImageBtn && (
        <div className="detail-image" role="presentation" onClick={handleZoom}>
          <SearchOutlined /> 자세히 보기
        </div>
      )}
      {showImageListZoom && <ImageListZoom imageList={imageList} onClose={handleClose} />}
    </StyledImage>
  );
};

export default PostImages;
