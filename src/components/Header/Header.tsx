import styles from './Header.module.scss';
import cubeIcon from '../../static/icons/cube.svg';
import { Link } from 'react-router-dom';

export function Header () {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        <img src={cubeIcon} alt="Куб" className={styles.cube} />
        <div className={styles.logo__name}>Эдем: Проекты</div>
      </Link>
      <nav className={styles.menu}>
        <Link to='/' className={styles.menu__link}>Главная</Link>
        <Link to='/projects' className={styles.menu__link}>Проекты</Link>
        <Link to='/players' className={styles.menu__link}>Игроки</Link>
      </nav>
    </header>
  );
}