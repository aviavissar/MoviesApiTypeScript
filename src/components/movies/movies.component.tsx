import React from "react";
import styles from "./movies.module.scss";
import Card from "../movieCard/movieCard.component";
import { IMovieCard } from "../../components/movieCard/movieCard.component";
import Grid from "@material-ui/core/Grid";
import { useStorage, StorageType } from "../../hooks/useStorage";
import { useStore } from "../../store/App.store";

export interface IMovieProps {
  itemsArray: IMovieCard[];
}

const Movies: React.FC<IMovieProps> = ({ itemsArray }: IMovieProps) => {
  const { userProfile } = useStore();
  const [favorites, setFavorites] = useStorage(
    "zeekitAppFavorites_" + userProfile.name,
    [],
    StorageType.LocalStorage
  );

  const addToFavorites = (item: any) => {
    if (item) {
      setFavorites((prev: []) => [...prev, item]);
    }
  };

  return (
    <div className={styles.selectboxitems}>
      <Grid container className={styles.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={1}>
            {itemsArray.length > 0
              ? itemsArray.map(({ Title, Year, Poster, imdbID }, index) => {
                  return (
                    <Grid key={imdbID + index} item>
                      <Card
                        key={`${imdbID}#movieList${index + 1}`}
                        Title={Title}
                        Year={Year}
                        Poster={Poster}
                        imdbID={imdbID}
                        isFavoritesList={false}
                        addToFavorites={addToFavorites}
                      />
                    </Grid>
                  );
                })
              : ""}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Movies;
