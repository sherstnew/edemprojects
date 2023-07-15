import * as React from 'react';
import styles from './ButtonLink.module.scss';
import { Link } from 'react-router-dom';

export interface IButtonLinkProps {
  children: string,
  to: string,
}

export function ButtonLink (props: IButtonLinkProps) {
  return (
    <Link to={props.to} className={styles.button}>
      {
        props.children
      }
    </Link>
  );
}
