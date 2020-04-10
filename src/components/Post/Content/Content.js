// @flow strict
import React from 'react';
import moment from 'moment';
import styles from './Content.module.scss';

type Props = {
  body: string,
  title: string,
  readingTime: Object,
  date: Object
};

const countCoffee = (minutes) => {
  const cups = Math.ceil(minutes / 5);
  console.log(cups)
  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E))
      .fill('🍱')
      .join('')}`;
  }
  return `${new Array(cups || 1).fill('☕️').join('')}`;
};

const Content = ({ body, title, readingTime, date }: Props) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>
    <div className={styles['content__title__read__time']}>{moment(date).format('MMMM DD,YYYY')} • {countCoffee(readingTime.minutes)} {readingTime.text}</div>
    <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default Content;
