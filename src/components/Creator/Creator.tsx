import * as React from 'react';
import styles from './Creator.module.scss';
import { Link } from 'react-router-dom';
import { IPlayer } from '../../types/IPlayer';

export interface ICreatorProps {
  player: IPlayer,
  blank: boolean,
}

export function Creator (props: ICreatorProps) {

  const { player, blank }  = props;

  return (
    <Link to={`/player?nickname=${player.nickname}`} className={styles.creator} target={blank ? '_blank' : '_self'}>
      <img src={`https://mineskin.eu/helm/${player.nickname}`} alt="Аватарка" className={styles.creator__avatar} />
      <div className={player.isInRegistry ? styles.creator__nickname + ' ' + styles.creator__nickname_red : styles.creator__nickname}>{player.nickname}</div>
    </Link>
  );
}
