import * as React from 'react';
import styles from './ModalStatus.module.scss';
import { Link } from 'react-router-dom';

import successIcon from '../../static/icons/success.svg';
import errorIcon from '../../static/icons/error.svg';
import questionIcon from '../../static/icons/question.svg';

export interface IModalStatusProps {
  status: string;
}

export function ModalStatus(props: IModalStatusProps) {
  return (
    <div className={styles.modal}>
      <img
        src={
          props.status === 'success'
            ? successIcon
            : props.status === 'error'
            ? errorIcon
            : questionIcon
        }
        alt='Иконка статуса'
        className={styles.modal__icon}
      />
      <div className={styles.modal__message}>
        {props.status === 'success'
          ? 'Проект отправлен успешно'
          : props.status === 'error'
          ? 'Произошла ошибка, попробуйте еще раз'
          : 'Неизвестный статус'}
      </div>
      <div className={styles.modal__menu}>
        <Link to='/'>
          На главную
        </Link>
        <Link to='/projects'>
          К проектам
        </Link>
      </div>
    </div>
  );
}
