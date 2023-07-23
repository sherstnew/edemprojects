import { Creator } from '../../components/Creator/Creator';
import styles from './Players.module.scss';
import { useState, useEffect } from 'react';

export function Players() {
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/players`)
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.players}>
      {players.length > 0
        ? players.map((player, index) => (
            <Creator key={index} nickname={player} blank={false} />
          ))
        : 'Игроки не найдены :('}
    </div>
  );
}
