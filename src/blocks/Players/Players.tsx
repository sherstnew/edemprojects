import { Creator } from '../../components/Creator/Creator';
import { Loader } from '../../components/Loader/Loader';
import { ModalStatus } from '../../components/ModalStatus/ModalStatus';
import { IPlayer } from '../../types/IPlayer';
import styles from './Players.module.scss';
import { useState, useEffect } from 'react';

export function Players() {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [status, setStatus] = useState('initial');

  useEffect(() => {
    setStatus('loading');
    fetch(`${process.env.REACT_APP_API_URL}/api/players`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'ok' && data.data) {
        setStatus('success');
        setPlayers(data.data);
      } else {
        setStatus('error');
      }
    })
    .catch((err) => {
        setStatus('error');
        console.log(err);
      });
  }, []);

  return (
    <>
      {status === 'loading' ? (
        <Loader />
      ) : status === 'error' ? (
        <ModalStatus status='error' />
      ) : (
        <div className={styles.players}>
          {players.length > 0
            ? players.map((player, index) => (
                <Creator key={index} player={player} blank={false} />
              ))
            : <div className={styles.notfound}>Игроки не найдены :(</div>}
        </div>
      )}
    </>
  );
}
