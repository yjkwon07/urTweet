import React, { useCallback, useRef, useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Form, Input } from 'antd';

const imagePaths = ['1'];
const PostForm = () => {
  const imageInput = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');

  const handleChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);
  const handleSubmit = useCallback(() => {}, []);
  const handleClickImageUpload = useCallback(() => {
    if (imageInput.current) imageInput.current.click();
  }, []);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={handleSubmit}>
      <Form.Item name="content">
        <Input.TextArea
          value={text}
          onChange={handleChangeText}
          id="content"
          name="content"
          maxLength={140}
          placeholder="어떤 신기한 일이 있었나요?"
        />
      </Form.Item>
      <Form.Item name="image">
        <input type="file" name="image" multiple hidden ref={imageInput} />
      </Form.Item>
      <div style={{ position: 'relative', margin: 0 }}>
        <Button style={{ position: 'absolute', right: 80, bottom: '-15px' }} onClick={handleClickImageUpload}>
          <UploadOutlined /> Images Upload
        </Button>
        <Button type="primary" htmlType="submit" style={{ position: 'absolute', right: 0, bottom: '-15px' }}>
          올리기
        </Button>
      </div>
      <Space size={8}>
        {imagePaths.map((v) => (
          <div key={v} style={{ margin: '5px 0 5px 0' }}>
            <img src={v} alt={v} />
            <div style={{ marginTop: '5px' }}>
              <Button type="dashed">제거</Button>
            </div>
          </div>
        ))}
      </Space>
    </Form>
  );
};

export default PostForm;
