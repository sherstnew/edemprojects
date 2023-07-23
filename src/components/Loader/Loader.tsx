import styles from './Loader.module.scss';
import { TailSpin } from 'react-loader-spinner';

export function Loader () {
  return (
    <div className={styles.loader}>
      <TailSpin
        height="80"
        width="80"
        color="#ffffff"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <div className={styles.loader__description}>Загрузка, подождите...</div>
    </div>
  );
}
