import { HomeOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import Link from 'next/link';

import CenterInfoLayout from '@layouts/CenterInfoLayout';
import { PASS_HREF } from '@utils/urls';
import { PostListReadPageFilter } from '@views/Post/ListRead/utils';
import errorImg from 'public/assets/img/404.png';

import { content, homeButton, info, StyledRow, title } from './styles';

const Custom404View = () => {
  return (
    <CenterInfoLayout>
      <StyledRow>
        <Card css={content}>
          <img src={errorImg} alt="ErrorImg" />
          <h1 css={title}>404 - Page Not Found</h1>
          <p css={info}>조회하신 페이지를 찾을 수 없습니다.</p>
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

export default Custom404View;
