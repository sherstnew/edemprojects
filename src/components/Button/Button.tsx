import * as React from 'react';
import styles from './Button.module.scss';

export interface IButtonProps {
  children: string,
  callback: (event: any) => void
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
