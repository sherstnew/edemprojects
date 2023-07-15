import * as React from 'react';
import styles from './Layout.module.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export interface ILayoutProps {
  children: string | JSX.Element | JSX.Element[];
}

export function Layout(props: ILayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>{props.children}</div>
      <Footer />
    </div>
  );
}
