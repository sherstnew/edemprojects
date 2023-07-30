import * as React from 'react';
import styles from './Project.module.scss';
import { IProject } from '../../types/IProject';
import { Creator } from '../Creator/Creator';
import arrowLeftIcon from '../../static/icons/arrow-left.svg';
import arrowRightIcon from '../../static/icons/arrow-right.svg';
import { useState } from 'react';

export interface IProjectProps {
  project: IProject;
}

export function Project(props: IProjectProps) {
  const { project } = props;
  console.log(styles);

  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className={styles.project}>
      <div className={styles.gallery}>
        <img
          src={arrowLeftIcon}
          alt=''
          className={
            currentImage - 1 < 0
              ? styles.arrow + ' ' + styles.left + ' ' + styles.arrow_inactive
              : styles.arrow + ' ' + styles.left
          }
          onClick={() =>
            currentImage - 1 < 0 ? '' : setCurrentImage(currentImage - 1)
          }
        />
        <img
          src={project.images[currentImage]}
          alt='Изображения не найдены :('
          className={styles.project__image}
        />
        <img
          src={arrowRightIcon}
          alt=''
          className={
            currentImage + 1 >= project.images.length
              ? styles.arrow + ' ' + styles.right + ' ' + styles.arrow_inactive
              : styles.arrow + ' ' + styles.right
          }
          onClick={() =>
            currentImage + 1 >= project.images.length
              ? ''
              : setCurrentImage(currentImage + 1)
          }
        />
      </div>
      <div className={styles.project__name}>{project.name}</div>
      <div className={styles.project__creators}>
        {project.creators.map((nickname, index) => (
          <Creator key={index} nickname={nickname} blank={false} />
        ))}
      </div>
      <div className={styles.project__description}>{project.description}</div>
      {project.resources.length > 0 ? (
        <div className={styles.project__resources}>
          <div className={styles.resources__title}>Ресурсы:</div>
          {project.resources.map((resource, index) => (
            <div key={index} className={styles.resource}>
              {resource.name} x{resource.count}
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
      <div className={styles.project__coordinates}>
        X: {project.coordinates.x} Z: {project.coordinates.z}
      </div>
    </div>
  );
}
