// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import styles from './Author.module.scss';

type Props = {
  author: {
    name: string,
    bio: string,
    photo: string
  },
  isIndex: ?boolean
};

const Author = ({ author, isIndex }: Props) => (
  <div className={styles['author']}>
    {/* <Link to="/">
      <img
        src={withPrefix(author.photo)}
        className={styles['author__photo']}
        width="75"
        height="75"
        alt={author.name}
      />
    </Link> */}

    { isIndex === true ? (
      <h1 className={styles['author__title']}>
        <Link className={styles['author__title-link']} style={{ fontFamily: 'Sacramento', fontSize: 45, fontWeight: 100 }} to="/">{author.name}</Link>
      </h1>
    ) : (
      <h2 className={styles['author__title']}>
        <Link className={styles['author__title-link']} style={{ fontFamily: 'Sacramento', fontSize: 45, fontWeight: 100 }} to="/">{author.name}</Link>
      </h2>
    )}
    <p className={styles['author__subtitle']} style={{ fontFamily: 'KoHo', fontWeight: 'bold' }}>{author.bio}</p>
  </div>
);

export default Author;
