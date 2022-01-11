// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
// import DarkModeToggle from '../DarkMode';
import Meta from './Meta';
import Tags from './Tags';
import styles from './Post.module.scss';
import type { Node } from '../../types';

const darkLogo = require("./logo_dark.png");
const whiteLogo = require("./logo_white.png");

type Props = {
  post: Node
};

const Post = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug, readingTime } = post.fields;
  const { tags, title, date } = post.frontmatter;

  return (
    <div className={styles['post']}>
      <Link id="white-logo" className={styles['post__home-button']} to="/"><span style={{ fontFamily: 'Sacramento', fontSize: 45 }}>Arunkumar<br/>Palaniappan</span></Link>
      <Link id="dark-logo" className={styles['post__home-button']} to="/"><span style={{ fontFamily: 'Sacramento', fontSize: 45 }}>Arunkumar<br/>Palaniappan</span></Link>
//       <br/><DarkModeToggle style={{ position: 'fixed',margin: 0,top: 130,left: 90}} /><br/>
        <div className={styles['post__content']}>
        <Content body={html} title={title} readingTime={readingTime} date={date} />
      </div>

      <div className={styles['post__footer']}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;
