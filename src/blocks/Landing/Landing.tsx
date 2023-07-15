import styles from './Landing.module.scss';
import cityImage from '../../static/images/city1.jpg';
import { ButtonLink } from '../../components/ButtonLink/ButtonLink';

export function Landing() {
  return (
    <div className={styles.landing}>
      <img src={cityImage} alt="Город" className={styles.banner} />
      <div className={styles.slogan}>
        <h2 className={styles.slogan__title}>Стройте Эдем вместе</h2>
        <h4 className={styles.slogan__subtitle}>а этот сайт поможет вам</h4>
      </div>
      <ButtonLink to='/projects/new'>
        Создать проект
      </ButtonLink>
    </div>
  );
}