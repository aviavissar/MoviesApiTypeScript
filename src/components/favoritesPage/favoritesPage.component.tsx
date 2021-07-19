import styles from "./favoritesPage.module.scss";
import Header from "../header/header.component";
import { useStore } from "../../store/App.store";
import Card from "../movieCard/movieCard.component";
import Grid from "@material-ui/core/Grid";
import { IMovieCard } from "../movieCard/movieCard.component";

const FavoritesPage: React.FC = () => {
  const { favorites } = useStore();

  return (
    <div className={styles.favorites}>
      <div>
        <Header />
      </div>
      <div className={styles.content}>
        <h1>My Favorites</h1>
        <Grid container className={styles.root}>
          <Grid item xs={12}>
            <Grid container justify="flex-start">
              {favorites.length> 0
                ? favorites.map(
                    (
                      { Title, Year, Poster, imdbID }: IMovieCard,
                      index: number
                    ) => {
                      return (
                        <Grid key={`${imdbID}#${index + 1}`} item>
                          <Card
                            Title={Title}
                            Year={Year}
                            Poster={Poster}
                            imdbID={imdbID}
                            isFavoritesList={true}
                          />
                        </Grid>
                      );
                    }
                  )
                :<div className={styles.noFavorites}> No Favorites</div>}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default FavoritesPage;
