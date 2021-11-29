import { HomeOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import Link from 'next/link';

import CenterInfoLayout from '@layouts/CenterInfoLayout';
import { PASS_HREF } from '@utils/urls';
import { PostListReadPageFilter } from '@views/Post/ListRead/utils';
import errorImg from 'public/assets/img/500.png';

import { content, homeButton, info, StyledRow, title } from './styles';

const Custom500View = () => {
  return (
    <CenterInfoLayout>
      <StyledRow>
        <Card css={content}>
          <img src={errorImg} alt="ErrorImg" />
          <h1 css={title}>500 - Server Error</h1>
          <p css={info}>요청하신 페이지에 연결할 수 없습니다.</p>
          <Button css={homeButton}>
            <Link href={new PostListReadPageFilter().pathname} passHref>
              <a href={PASS_HREF}>
                <HomeOutlined /> Home으로 돌아가기
              </a>
            </Link>
          </Button>
        </Card>
      </StyledRow>
    </CenterInfoLayout>
  );
};

export default Custom500View;
