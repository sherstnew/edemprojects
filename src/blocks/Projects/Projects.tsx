import styles from './Projects.module.scss';
import { projects } from '../../projects';
import { Project } from '../../components/Project/Project';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IProject } from '../../types/IProject';
import { ButtonLink } from '../../components/ButtonLink/ButtonLink';

export function Projects () {

  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>(projects);

  useEffect(() => {
    setFilteredProjects(projects.filter(project => project.name.includes(search) || project.description.includes(search) || project.creators.join(', ').includes(search)));
  }, [search]);

  useEffect(() => {
    if (searchParams.get('nickname') !== null) {
      setFilteredProjects(projects.filter(project => project.creators.includes(searchParams.get('nickname') || '')));
    };
  }, [searchParams]);

  return (
    <div className={styles.projects}>
      <div className={styles.projects__menu}>
        <ButtonLink to='/projects/new'>
          Создать проект
        </ButtonLink>
        <input type="text" placeholder='🔎 Поиск' className={styles.search} onChange={(event) => setSearch(event.target.value)} />
      </div>
      {
        filteredProjects.length > 0
        ?
        filteredProjects.map(project => <Project key={project._id} project={project} />)
        :
        <div className={styles.notfound}>Проекты не найдены :(</div>
      }
    </div>
  );
}
