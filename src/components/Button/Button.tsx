import * as React from 'react';
import styles from './Button.module.scss';

export interface IButtonProps {
  children: string,
  callback: () => void
}

export function Button (props: IButtonProps) {
  return (
    <div className={styles.button} onClick={props.callback}>
      {
        props.children
      }
    </div>
  );
}
