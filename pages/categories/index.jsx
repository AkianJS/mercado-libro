import { useContext } from "react";
import CategoryAddCard from "../../components/CategoryAddCard";
import CategoryCard from "../../components/CategoryCard";
import Layout from "../../components/layout/Layout";
import AppContext from "../../context/AppContext";
import styles from "../../styles/ThemeGrid.module.css";
import { getThemes } from "../../utils/getThemes";

const ThemeGrid = ({ getTemas }) => {
  const { temas } = getTemas;
  const {
    state: { login },
  } = useContext(AppContext);

  return (
    <Layout title="Books Categories">
      <section className={`p-8 max-w-screen-xl m-auto ${styles.grid}`}>
        {login.usuario?.admin && <CategoryAddCard />}
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
    revalidate: 10,
  };
}

export default ThemeGrid;
