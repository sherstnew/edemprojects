import * as React from 'react';
import styles from './Creator.module.scss';
import { Link } from 'react-router-dom';

export interface ICreatorProps {
  nickname: string,
  blank: boolean,
}

export function Creator (props: ICreatorProps) {

  const { nickname, blank }  = props;

  return (
    <Link to={`/projects?nickname=${nickname}`} className={styles.creator} target={blank ? '_blank' : '_self'}>
      <img src={`https://mineskin.eu/helm/${nickname}`} alt="Аватарка" className={styles.creator__avatar} />
      <div className={styles.creator__nickname}>{nickname}</div>
    </Link>
  );
}
