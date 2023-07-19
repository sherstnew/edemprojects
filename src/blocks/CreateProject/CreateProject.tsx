import styles from './CreateProject.module.scss';
import defaultImage from '../../static/images/default.png';
import plusIcon from '../../static/icons/plus.svg';
import arrowLeftIcon from '../../static/icons/arrow-left.svg';
import arrowRightIcon from '../../static/icons/arrow-right.svg';
import { useCallback, useState } from 'react';
import { Creator } from '../../components/Creator/Creator';
import { Button } from '../../components/Button/Button';

export function CreateProject() {
  const [nickname, setNickname] = useState('');
  const [nicknames, setNicknames] = useState<string[]>([]);
  const [nicknameError, setNicknameError] = useState(false);

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const [image, setImage] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imageError, setImageError] = useState(false);

  const [currentImage, setCurrentImage] = useState(0);

  const addNickname = useCallback(() => {
    if (!nicknames.includes(nickname) && nickname !== '') {
      setNicknameError(false);
      setNicknames([...nicknames, nickname]);
    } else {
      setNicknameError(true);
    }
  }, [nickname, nicknames]);

  const addImage = useCallback(() => {
    if (!images.includes(image) && image !== '') {
      setImageError(false);
      setImages([...images, image]);
    } else {
      setImageError(true);
    }
  }, [image, images]);

  return (
    <form className={styles.form}>
      <div className={styles.gallery}>
        <img src={arrowLeftIcon} alt='' className={currentImage - 1 < 0 ? styles.arrow + ' ' + styles.arrow_inactive : styles.arrow} onClick={() => currentImage - 1 < 0 ? '' : setCurrentImage(currentImage - 1)} />
        <img
          src={images[currentImage]}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = defaultImage;
          }}
          alt='Изображение проекта'
          className={styles.previewImage}
        />
        <img src={arrowRightIcon} alt='' className={currentImage + 1 >= images.length ? styles.arrow + ' ' + styles.arrow_inactive : styles.arrow} onClick={() => currentImage + 1 >= images.length ? '' : setCurrentImage(currentImage + 1)} />
      </div>

      <div className={styles.form__data}>
        <label htmlFor='nickname' className={styles.label}>
          Введите никнеймы создателей
        </label>
        <div className={styles.addContainer}>
          <input
            type='text'
            id='nickname'
            className={
              nicknameError
                ? styles.input + ' ' + styles.input_error
                : styles.input
            }
            placeholder='Введите никнейм'
            onChange={(event) => setNickname(event.target.value)}
            onKeyDown={(event) => (event.key === 'Enter' ? addNickname() : '')}
          />
          <img
            src={plusIcon}
            alt='Добавить'
            className={styles.actionIcon}
            onClick={addNickname}
          />
        </div>
        <div className={styles.creators}>
          {nicknames.map((nickname, index) => (
            <Creator key={index} nickname={nickname} blank={true} />
          ))}
        </div>
        <label htmlFor='projectname' className={styles.label}>
          Введите название проекта
        </label>
        <input
          type='text'
          id='projectname'
          className={styles.input}
          placeholder='Введите название'
          onChange={(event) => setProjectName(event.target.value)}
        />
        <label htmlFor='description' className={styles.label}>
          Опишите свой проект
        </label>
        <input
          type='text'
          id='description'
          className={styles.input}
          placeholder='Введите описание'
          onChange={(event) => setProjectDescription(event.target.value)}
        />
        <label htmlFor='images' className={styles.label}>
          Вставьте картинки (ссылкой)
        </label>
        <div className={styles.addContainer}>
          <input
            type='text'
            id='images'
            className={
              imageError
                ? styles.input + ' ' + styles.input_error
                : styles.input
            }
            placeholder='Введите ссылку на картинку'
            onChange={(event) => setImage(event.target.value)}
          />
          <img
            src={plusIcon}
            alt='Добавить'
            className={styles.actionIcon}
            onClick={addImage}
          />
        </div>
        {/* SUBMIT PROJECT */}
        <Button callback={() => {}}>
          Отправить проект
        </Button>
      </div>
    </form>
  );
}
