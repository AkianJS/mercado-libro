import CategoryCard from "../../components/CategoryCard";
import Layout from "../../components/layout/Layout";
import styles from "../../styles/ThemeGrid.module.css"
import { getThemes } from "../../utils/getThemes";

const ThemeGrid = ({ getTemas }) => {
  const { temas } = getTemas;

  return (
    <Layout title="Books Categories">
      <section className={`p-8 max-w-screen-xl m-auto ${styles.grid}`}>
        {temas.map((item) => (
          <CategoryCard key={item.id} theme={item} />
        ))}
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await getThemes();
  const {
    data: { getTemas },
  } = res;

  return {
    props: {
      getTemas,
    },
  };
}

export default ThemeGrid;
