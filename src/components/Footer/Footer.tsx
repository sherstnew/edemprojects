import styles from './Footer.module.scss';

export function Footer () {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <a href="https://shop.edemmine.ru" target='_blank' rel="noreferrer">EdemMine</a>
      </div>
      <div className={styles.copyright}>
        <a href="https://github.com/sherstnew" target='_blank' rel="noreferrer">by sherstnew</a>
      </div>
    </footer>
  );
}
