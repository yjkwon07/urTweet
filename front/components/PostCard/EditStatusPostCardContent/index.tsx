import { Image as IImage } from '@modules/post/@types';

import EditPostCardContent from '../EditPostCardContent';
import PostCardContent from '../PostCardContent';

export interface IProps {
  postId: number;
  postContent: string;
  imageList: IImage[];
  editMode?: boolean;
  onCancelEditMode: () => void;
}

const EditStatusPostCardContent = ({ postId, postContent, imageList, editMode = false, onCancelEditMode }: IProps) => {
  return (
    <div>
      {editMode ? (
        <EditPostCardContent
          postId={postId}
          postContent={postContent}
          imageList={imageList}
          onCancel={onCancelEditMode}
        />
      ) : (
        <PostCardContent postContent={postContent} imageList={imageList} />
      )}
    </div>
  );
};

export default EditStatusPostCardContent;
