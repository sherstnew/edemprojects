import styles from './NotFound.module.scss';
import notFoundIcon from '../../static/icons/404.svg';

export function NotFound () {
  return (
    <div className={styles.notfound}>
      <img src={notFoundIcon} alt="404" className={styles.notfound__image} />
      <div className={styles.notfound__text}>Страница не найдена :(</div>
    </div>
  );
}
