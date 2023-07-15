import { Layout } from '../components/Layout/Layout';
import { Landing } from '../blocks/Landing/Landing';
import { About } from '../blocks/About/About';

export function HomePage() {
  return (
    <Layout>
      <Landing />
      <About />
    </Layout>
  );
};