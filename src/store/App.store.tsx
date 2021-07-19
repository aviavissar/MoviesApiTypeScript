import React, { useState, createContext, useContext, useEffect } from "react";
import history from "../services/history";
import { setLocalStorage, getLocalStorage } from "../services/storage";
import { IMovieCard } from "../components/movieCard/movieCard.component";

export interface IProfile {
  name: string;
  isConnected: boolean;
  favorites: IFavorites;
}

export interface IFavorites {
  [index: number]: IMovieCard;
}

interface IContext {
  userProfile: IProfile;
  itemsArray: IMovieCard[];
  favorites: IMovieCard[];
  setUserProfile: React.Dispatch<React.SetStateAction<IProfile>>;
  setItemsArray: React.Dispatch<React.SetStateAction<IMovieCard[]>>;
  setFavorites: React.Dispatch<React.SetStateAction<IMovieCard[]>>;
}

type Props = {
  children: JSX.Element;
};

const AppStore = createContext<IContext>({} as IContext);
const { Provider } = AppStore;
const useStore = () => {
  const context = useContext(AppStore);
  if (!context) {
    throw new Error(`useStore must be used within a Provider`);
  }
  return context;
};

const AppProvider = ({ children }: Props) => {
  const [itemsArray, setItemsArray] = useState<IMovieCard[]>([]);
  const [favorites, setFavorites] = useState<IMovieCard[]>([]);
  const [userProfile, setUserProfile] = useState<IProfile>({
    name: "",
    isConnected: false,
    favorites: [],
  });

  useEffect(() => {
    const storageObj = getLocalStorage(`moviesApp-connectedProfile`);
    if (storageObj.isConnected) {
      const userLocalStorage = getLocalStorage(`moviesApp-${storageObj.name}`);
      setUserProfile(userLocalStorage);
      setFavorites(userLocalStorage.favorites);
      history.push("/home");
    }
  }, []);

  useEffect(() => {
    if (userProfile.isConnected) {
      setLocalStorage(`moviesApp-${userProfile.name}`, {
        ...userProfile,
        favorites,
      });
      setLocalStorage(`moviesApp-connectedProfile`, userProfile);
    }
  }, [userProfile, favorites]);

  const state = {
    userProfile,
    itemsArray,
    favorites,
  };

  const actions = {
    setUserProfile,
    setItemsArray,
    setFavorites,
  };

  return <Provider value={{ ...state, ...actions }}>{children}</Provider>;
};

export { AppProvider, useStore };
