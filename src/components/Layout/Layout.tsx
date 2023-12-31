import styles from './Layout.module.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { useEffect } from 'react';

export interface ILayoutProps {
  children: string | JSX.Element | JSX.Element[];
}

export function Layout(props: ILayoutProps) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>{props.children}</div>
      <Footer />
    </div>
  );
}
