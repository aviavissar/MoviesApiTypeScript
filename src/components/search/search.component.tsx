import React, { useState, useEffect } from "react";
import { fetchMoviesArr } from "../../services/fetch";
import useDebounce from "../../hooks/useDebounce";
import styles from "./search.module.scss";
import { useStore } from "../../store/App.store";

export interface ISearchProps {
  searchIsON: (bool: boolean) => void;
  loaderIsON: (bool: boolean) => void;
}

const Search: React.FC<ISearchProps> = ({
  searchIsON,
  loaderIsON,
}: ISearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [selectedDisplay, setSelectedDisplay] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { setItemsArray } = useStore();

  useEffect(() => {
    if (debouncedSearchTerm) {
      const doAsyncFetch = async () => {
        const response = await fetchMoviesArr(debouncedSearchTerm);
        checkSearchTerm(response);
      };
      doAsyncFetch();
      searchIsON(true);
    } else {
      searchIsON(false);
      setItemsArray([]);
      setErrorMsg("");
      loaderIsON(false);
    }
  }, [debouncedSearchTerm]);

  const checkSearchTerm = (response: any) => {
    if (response === null) {
      setItemsArray([]);
      setErrorMsg("you must put more than two letters");
      return;
    }
    if (response === "space") {
      setItemsArray([]);
      setErrorMsg("you must put only one word");
      return;
    }
    if (response.Response == "False") {
      setItemsArray([]);
      setErrorMsg("Movie not found!");
      loaderIsON(false);
      return;
    }
    if (response !== undefined && response.Search !== undefined) {
      setItemsArray(response.Search);
      if (response.Search.length > 0) {
        setErrorMsg("");
        loaderIsON(false);
        return;
      }
    } else {
      loaderIsON(true);
    }
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        autoComplete="off"
        placeholder="Find your Movie..."
        id="search"
        name="search"
        value={selectedDisplay}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSelectedDisplay(e.target.value);
        }}
      />
      <div className={styles.errorMsg}>{errorMsg}</div>
    </div>
  );
};

export default Search;
