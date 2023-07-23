import styles from './Projects.module.scss';
import { Project } from '../../components/Project/Project';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IProject } from '../../types/IProject';
import { ButtonLink } from '../../components/ButtonLink/ButtonLink';
import { Loader } from '../../components/Loader/Loader';
import { ModalStatus } from '../../components/ModalStatus/ModalStatus';

export function Projects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [filteredProjects, setFilteredProjects] =
    useState<IProject[]>(projects);

  const [status, setStatus] = useState('initial');

  useEffect(() => {
    setStatus('loading');
    fetch(`${process.env.REACT_APP_API_URL}/api/projects`)
      .then((response) => response.json())
      .then((data) => {
        setStatus('success');
        setProjects(data);
        setFilteredProjects(
          data.sort(function (a: IProject, b: IProject) {
            return (
              new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
            );
          })
        );
      })
      .catch((err) => {
        setStatus('error');
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredProjects(
      projects.filter(
        (project) =>
          project.name.includes(search) ||
          project.description.includes(search) ||
          project.creators.join(', ').includes(search)
      )
    );
  }, [projects, search]);

  useEffect(() => {
    if (searchParams.get('nickname') !== null) {
      setFilteredProjects(
        projects.filter((project) =>
          project.creators.includes(searchParams.get('nickname') || '')
        )
      );
    }
  }, [projects, searchParams]);

  return (
    <>
      {status === 'loading' ? (
        <Loader />
      ) : status === 'error' ? (
        <ModalStatus status='error' />
      ) : (
        <div className={styles.projects}>
          <div className={styles.projects__menu}>
            <ButtonLink to='/projects/new'>Создать проект</ButtonLink>
            <input
              type='text'
              placeholder='🔎 Поиск'
              className={styles.search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Project key={project._id} project={project} />
            ))
          ) : (
            <div className={styles.notfound}>Проекты не найдены :(</div>
          )}
        </div>
      )}
    </>
  );
}
