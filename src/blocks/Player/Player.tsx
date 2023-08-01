import styles from './Player.module.scss';
import { Projects } from '../Projects/Projects';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { ModalStatus } from '../../components/ModalStatus/ModalStatus';
import { IPlayer } from '../../types/IPlayer';

export function Player() {
  const [searchParams] = useSearchParams();
  const [player, setPlayer] = useState<IPlayer>({
    nickname: '',
    isInRegistry: false,
  });
  const [status, setStatus] = useState('initial');

  useEffect(() => {
    setStatus('loading');
    fetch(
      `${process.env.REACT_APP_API_URL}/api/players?nickname=${searchParams.get(
        'nickname'
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 'error' && data.data) {
          setStatus('success');
          setPlayer(data.data);
        } else {
          setStatus('error');
        }
      })
      .catch((error) => {
        console.log(error);
        setStatus('error');
      });
  }, [searchParams]);

  return (
    <>
      {status === 'success' ? (
        <div className={styles.container}>
          <div className={styles.player}>
            <img
              src={`https://mc-heads.net/body/${player.nickname}`}
              alt='Скин игрока'
              className={styles.player__image}
            />
            <div className={styles.player__info}>
              <div className={styles.nickname}>{player.nickname}</div>
              {player.isInRegistry ? (
                <div className={styles.registry + ' ' + styles.registry_red}>
                  Находится в реестре
                </div>
              ) : (
                <div className={styles.registry + ' ' + styles.registry_green}>
                  Не находится в реестре
                </div>
              )}
            </div>
          </div>
          <Projects />
        </div>
      ) : status === 'loading' ? (
        <Loader />
      ) : status === 'error' ? (
        <ModalStatus status='error' />
      ) : (
        ''
      )}
    </>
  );
}
