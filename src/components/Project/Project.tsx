import * as React from 'react';
import styles from './Project.module.scss';
import { IProject } from '../../types/IProject';
import { Link } from 'react-router-dom';

export interface IProjectProps {
  project: IProject,
}

export function Project (props: IProjectProps) {

  const { project } = props;

  return (
    <div className={styles.project}>
      <img src={project.images[0]} alt="Изображения не найдены :(" className={styles.project__image} />
      <div className={styles.project__name}>{project.name}</div>
      <div className={styles.project__creators}>
        {
          project.creators.map((nickname, index) => (
            <Link to={`/projects?nickname=${nickname}`} key={index} className={styles.creator}>
              <img src={`https://mineskin.eu/helm/${nickname}`} alt="Аватарка" className={styles.creator__avatar} />
              <div className={styles.creator__nickname}>{nickname}</div>
            </Link>
          ))
        }
      </div>
      <div className={styles.project__description}>{project.description}</div>
      <div className={styles.project__resources}>
        <div className={styles.resources__title}>Ресурсы:</div>
        {
          project.resources.map((resource, index) => (
            <div key={index} className={styles.resource}>
              {resource.name} x{resource.count}
            </div>
          ))
        }
      </div>
      <div className={styles.project__coordinates}>X: {project.coordinates.x} Z: {project.coordinates.z}</div>
    </div>
  );
}
