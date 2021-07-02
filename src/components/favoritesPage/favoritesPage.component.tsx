import styles from "./favoritesPage.module.scss";
import Header from "../header/header.component";
import { useStore } from "../../App.store";
import Card from "../movieCard/movieCard.component";
import Grid from "@material-ui/core/Grid";
import { useStorage, StorageType } from "../../hooks/useStorage";
import { IMovieCard } from "../movieCard/movieCard.component";

const FavoritesPage = () => {
  const { userProfile } = useStore();
  const [favorites, setFavorites] = useStorage(
    "zeekitAppFavorites_" + userProfile.name,
    [],
    StorageType.LocalStorage
  );

  const removeFavorites = (id: string) => {
    const temp = favorites.filter(({ imdbID }: IMovieCard) => id !== imdbID);
    setFavorites(temp);
  };

  return (
    <div className={styles.favorites}>
      <div>
        <Header />
      </div>
      <div className="row">
        <h1>My Favorites</h1>
        <Grid container className={styles.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="flex-start" spacing={2}>
              {favorites
                ? favorites.map(({ Title, Year, Poster, imdbID }: IMovieCard, index:number) => {
                    return (
                      <Grid key={`${imdbID}#${index + 1}`} item>
                        <Card
                          removeFavorites={removeFavorites}
                          Title={Title}
                          Year={Year}
                          Poster={Poster}
                          imdbID={imdbID}
                          isFavoritesList={true}
                        />
                      </Grid>
                    );
                  })
                : ""}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default FavoritesPage;
