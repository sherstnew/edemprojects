import * as React from 'react';
import styles from './Button.module.scss';

export interface IButtonProps {
  children: string,
  callback: (event: any) => void,
  submit: boolean
}

export function Button (props: IButtonProps) {
  return (
    <button type={props.submit ? 'submit' : 'button'} className={styles.button} onClick={props.callback}>
      {
        props.children
      }
    </button>
  );
}
