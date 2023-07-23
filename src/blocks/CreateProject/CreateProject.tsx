import styles from './CreateProject.module.scss';
import defaultImage from '../../static/images/default.png';
import plusIcon from '../../static/icons/plus.svg';
import arrowLeftIcon from '../../static/icons/arrow-left.svg';
import arrowRightIcon from '../../static/icons/arrow-right.svg';
import { useCallback, useState } from 'react';
import { Creator } from '../../components/Creator/Creator';
import { Button } from '../../components/Button/Button';
import {
  IProject,
  IProjectCoordinates,
  IProjectResource,
} from '../../types/IProject';
import { ModalStatus } from '../../components/ModalStatus/ModalStatus';
import { Loader } from '../../components/Loader/Loader';

export function CreateProject() {
  const [status, setStatus] = useState<string>('initial');

  const [nickname, setNickname] = useState<string>('');
  const [nicknames, setNicknames] = useState<IProject['creators']>([]);
  const [nicknameError, setNicknameError] = useState<boolean>(false);

  const [projectName, setProjectName] = useState<IProject['name']>('');
  const [projectDescription, setProjectDescription] =
    useState<IProject['description']>('');

  const [image, setImage] = useState<string>('');
  const [images, setImages] = useState<IProject['images']>([]);
  const [imageError, setImageError] = useState<boolean>(false);

  const [currentImage, setCurrentImage] = useState(0);

  const [resourceName, setResourceName] =
    useState<IProjectResource['name']>('');
  const [resourceCount, setResourceCount] =
    useState<IProjectResource['count']>(0);
  const [resources, setResources] = useState<IProjectResource[]>([]);
  const [resourceError, setResourceError] = useState<boolean>(false);

  const [xCoordinate, setXCoordinate] = useState<IProjectCoordinates['x']>(0);
  const [zCoordinate, setZCoordinate] = useState<IProjectCoordinates['z']>(0);

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

  const addResource = useCallback(() => {
    if (
      !resources.some((resource) => resource.name === resourceName) &&
      resourceName !== '' &&
      resourceCount
    ) {
      setResourceError(false);
      const newResource = {
        name: resourceName,
        count: resourceCount,
      };
      setResources([...resources, newResource]);
    } else {
      setResourceError(true);
    }
  }, [resourceCount, resourceName, resources]);

  // SUBMIT PROJECT

  const submitProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProject = {
      name: projectName,
      creators: nicknames,
      description: projectDescription,
      resources: resources,
      coordinates: { x: xCoordinate, z: zCoordinate },
      images: images,
    };

    setStatus('loading');

    fetch(`${process.env.REACT_APP_API_URL}/api/projects/new`, {
      method: 'POST',
      body: JSON.stringify(newProject),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.status === 'ok') {
          setStatus('success');
        } else {
          setStatus('error');
        }
      })
      .catch((error) => {
        console.log(error);
        setStatus('error');
      });
  };

  return (
    <>
      {status === 'success' ? (
        <ModalStatus status='success' />
      ) : status === 'error' ? (
        <ModalStatus status='error' />
      ) : status === 'loading' ? (
        <Loader />
      ) : (
        <form className={styles.form} onSubmit={submitProject}>
          <div className={styles.gallery}>
            <img
              src={arrowLeftIcon}
              alt=''
              className={
                currentImage - 1 < 0
                  ? styles.arrow + ' ' + styles.arrow_inactive
                  : styles.arrow
              }
              onClick={() =>
                currentImage - 1 < 0 ? '' : setCurrentImage(currentImage - 1)
              }
            />
            <img
              src={images[currentImage]}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = defaultImage;
              }}
              alt='Изображение проекта'
              className={styles.previewImage}
            />
            <img
              src={arrowRightIcon}
              alt=''
              className={
                currentImage + 1 >= images.length
                  ? styles.arrow + ' ' + styles.arrow_inactive
                  : styles.arrow
              }
              onClick={() =>
                currentImage + 1 >= images.length
                  ? ''
                  : setCurrentImage(currentImage + 1)
              }
            />
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
                onKeyDown={(event) =>
                  event.key === 'Enter' ? addNickname() : ''
                }
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
              required
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
              required
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
            <label htmlFor='resources' className={styles.label}>
              Введите необходимые ресурсы
            </label>
            <div className={styles.addContainer}>
              <input
                type='text'
                id='resources'
                className={
                  resourceError
                    ? styles.input + ' ' + styles.input_error
                    : styles.input
                }
                placeholder='Введите название ресурса'
                onChange={(event) => setResourceName(event.target.value)}
              />
              <input
                type='number'
                id='resources_count'
                className={
                  resourceError
                    ? styles.input +
                      ' ' +
                      styles.input_number +
                      ' ' +
                      styles.input_error
                    : styles.input + ' ' + styles.input_number
                }
                placeholder='Кол-во'
                onChange={(event) =>
                  setResourceCount(Number(event.target.value))
                }
                defaultValue={0}
              />
              <img
                src={plusIcon}
                alt='Добавить'
                className={styles.actionIcon}
                onClick={addResource}
              />
            </div>
            <div className={styles.resources}>
              {resources.map((resource, index) => (
                <div className={styles.resource} key={index}>
                  {resource.name} x{resource.count}
                </div>
              ))}
            </div>
            <label htmlFor='xCoordinate' className={styles.label}>
              Введите координаты проекта
            </label>
            <input
              type='number'
              id='xCoordinate'
              className={styles.input + ' ' + styles.input_number}
              placeholder='Введите X'
              onChange={(event) => setXCoordinate(Number(event.target.value))}
              defaultValue={0}
              required
            />
            <input
              type='number'
              id='zCoordinate'
              className={styles.input + ' ' + styles.input_number}
              placeholder='Введите Z'
              onChange={(event) => setZCoordinate(Number(event.target.value))}
              defaultValue={0}
              required
            />
            <Button callback={() => {}} submit={true}>Отправить проект</Button>
          </div>
        </form>
      )}
    </>
  );
}
