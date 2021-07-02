import React, { useState } from "react";
import styles from "./movieCard.module.scss";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MovieCardPopup from "../movieCardPopup/movieCardPopup.component";

export interface IMovieCard {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

export interface IMovieCardProps extends IMovieCard{
 
  isFavoritesList: boolean;
  addToFavorites?: (i: {}) => void;
  removeFavorites?: (s: string) => void;
}
const MovieCard : React.FC<IMovieCardProps>  = ({
  Title,
  Year,
  Poster,
  imdbID,
  isFavoritesList,
  addToFavorites,
  removeFavorites,
}: IMovieCardProps) => {
  const [display, setDisplay] = useState<boolean>(false);

  const openPopUP = () => {
    setDisplay(true);
  };

  const closeOpenComponent = () => {
    setDisplay(false);
  };

  const addRemoveFavorites = (isFavoritesList: boolean, imdbID: string) => {
    if (!isFavoritesList) {
      addToFavorites({ Title, Year, Poster, imdbID, isFavoritesList });
    } else {
      removeFavorites(imdbID);
    }
  };

  return (
    <Card className={styles.root}>
      <MovieCardPopup
        imdbID={imdbID}
        closeOpenComponent={closeOpenComponent}
        isOpen={display}
      />
      <CardActionArea onClick={openPopUP}>
        <CardMedia className={styles.media} image={Poster} title={Title} />
        <CardContent className={styles.CardContent}>
          <Typography gutterBottom className={styles.title}>
            {Title}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="h6">
            {Year}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => addRemoveFavorites(isFavoritesList, imdbID)}
        >
          {isFavoritesList ? `Remove from favorites` : `Add to favorites`}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
