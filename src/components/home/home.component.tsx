import {  useState } from "react";
import Header from "../header/header.component";
import Search from "../search/search.component";
import Movies from "../movies/movies.component";
import styles from "./home.module.scss";
import { useStore } from "../../App.store";

const Home = () => {
  const { itemsArray } = useStore();
  const [searchON, setSearchON] = useState<boolean>(false);
  const [loaderON, setLoaderON] = useState<boolean>(false);

  const searchIsON = (bool: boolean) => {
    setSearchON(bool);
  };

  const loaderIsON = (bool: boolean) => {
    setLoaderON(bool);
  };

  return (
    <div className={styles.wrapContent}>
      <Header />
      <div>
        <section
          className={`${styles.wrapSearch} ${
            searchON ? styles.searchIsWork : ""
          }`}
        >
          <Search searchIsON={searchIsON} loaderIsON={loaderIsON} />
        </section>
        <section>
          {loaderON ? (
            <div className={styles.loader}></div>
          ) : (
            <Movies itemsArray={itemsArray} />
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
