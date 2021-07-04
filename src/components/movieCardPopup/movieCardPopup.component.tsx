import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import styles from "./movieCardPopup.module.scss";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Title from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { fetchMovie } from "../../services/fetch";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface IMovieCardPopup {
  imdbID: string;
  isOpen: boolean;
  closeOpenComponent: () => void;
}
export interface IPopupObj {
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
}

const MovieCardPopup: React.FC<IMovieCardPopup> = ({
  imdbID,
  isOpen,
  closeOpenComponent,
}: IMovieCardPopup) => {
  const [open, setOpen] = useState<boolean>(true);
  const [pop, setPop] = useState<IPopupObj | null>(null);
  const [isFullPlot, setIsFullPlot] = useState<boolean>(false);

  useEffect(() => {
    setOpen(isOpen);
    doAsyncFetchMovie();
  }, [isOpen]);

  useEffect(() => {
    console.log(pop);
  }, [pop]);

  const doAsyncFetchMovie = async (plot = "short") => {
    setPop(await fetchMovie(imdbID, plot));
  };

  const handleClose = () => {
    closeOpenComponent();
  };

  const handleClick = () => {
    doAsyncFetchMovie(isFullPlot ? "short" : "full");
    setIsFullPlot(!isFullPlot);
  };

  return (
    <div className={styles.popup}>
      {pop ? (
        <Dialog
          className={styles.popDialog}
          open={open}
          TransitionComponent={Transition}
          keepMounted={false}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <Card className={styles.root}>
            <CardHeader
              className={styles.CardHeader}
              title={<Title className={styles.popTitle}>{pop.Title}</Title>}
              subheader={<Title className={styles.subTitle}>{pop.Year}</Title>}
            />
            <CardContent className={styles.CardContent}>
              
              <Typography
                variant="body1"
                color="textSecondary"
                component="article"
                className={styles.CardArticle}
              >
                {pop.Plot}
                <CardActions className={styles.cardActions}>
                  <button onClick={handleClick}>
                    {!isFullPlot ? `See More` : `See Less`}
                  </button>
                </CardActions>
              </Typography>
              <CardMedia
                className={styles.media}
                image={pop.Poster}
                title={pop.Title}
              />
            </CardContent>
          </Card>
        </Dialog>
      ) : null}
    </div>
  );
};
export default MovieCardPopup;
