import styles from './About.module.scss';
import sunImage from '../../static/images/sun.jpg';
import endhubImage from '../../static/images/endhub.jpg';
import { ButtonLink } from '../../components/ButtonLink/ButtonLink';

export function About () {
  return (
    <div className={styles.about}>
      <section className={styles.about__section}>
        <div className={styles.section__text}>
          <h3 className={styles.header}>Делитесь своими проектами!</h3>
          <div className={styles.text}>Вы можете загрузить существующий проект или создать новый. Каждый пользователь сайта сможет увидеть его и оценить, а может даже помочь со строительством проекта.</div>
        </div>
        <img src={sunImage} alt="" className={styles.section__image} />
      </section>
      <section className={styles.about__section}>
        <img src={endhubImage} alt="" className={styles.section__image} />
        <div className={styles.section__text}>
          <h3 className={styles.header}>Помогайте другим игрокам!</h3>
          <div className={styles.text}>Каждый игрок может попросить ресурсы для своего проекта, а вы - можете ему помочь. </div>
        </div>
      </section>
      <ButtonLink to='/projects'>
        Посмотреть проекты
      </ButtonLink>
    </div>
  );
}
