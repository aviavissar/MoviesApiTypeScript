import React, { useState, createContext, useContext, useEffect } from "react";
import { useStorage, StorageType } from "./hooks/useStorage";
import history from "./services/history";
import { IMovieCard } from "./components/movieCard/movieCard.component";

interface IProfile {
  name: string;
  isConnected: boolean;
}

interface IContext {
  userProfile: IProfile;
  itemsArray: IMovieCard[];
  setUserProfile: React.Dispatch<React.SetStateAction<IProfile>>;
  setItemsArray: React.Dispatch<React.SetStateAction<IMovieCard[]>>;
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
  const [userProfile, setUserProfile] = useStorage(
    "ZeekituserProfile",
    {},
    StorageType.SessionStorage
  );

  useEffect(() => {
    if (userProfile.isConnected) {
      history.push("/home");
    }
  }, [userProfile]);

  const state = {
    userProfile,
    itemsArray,
  };

  const actions = {
    setUserProfile,
    setItemsArray,
  };

  return <Provider value={{ ...state, ...actions }}>{children}</Provider>;
};

export { AppProvider, useStore };
