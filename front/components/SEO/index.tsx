import React from 'react';

export interface IProps {
  title: string;
  url: string;
  description: string;
  name: string;
  keywords: string;
}

const SEO = ({ title, url, description, name, keywords }: IProps) => {
  return (
    <>
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="urTweet" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/favicon.ico" />
      <meta property="og:image:height" content="200" />
      <meta property="og:image:width" content="200" />
      <meta name="name" content={name} />
      <meta name="keywords" content={`urtweet ${keywords}`} />
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow,snippet,archive" />
      <link rel="image_src" href="/favicon.ico" />
    </>
  );
};

export default SEO;
