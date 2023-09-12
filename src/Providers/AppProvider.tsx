import { ReactNode, createContext, useEffect, useState } from "react";
import { Displays, Dog } from "../types";
import { Requests } from "../api";

type TAppContext = {
  display: Displays;
  isLoading: boolean;
  toggleDisplay: (collection: Displays) => void;
  toggleFavoriteStatus: (dog: Dog, dogId: number) => void;
  createDog: (newDog: Omit<Dog, "id">) => Promise<void>;
  deleteDog: (dog: Dog, dogId: number) => void;
  collection: Dog[];
  total: { favorites: number; unFavorites: number };
};

export const AppContext = createContext<TAppContext>({} as TAppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [display, setDisplay] = useState<Displays>("allDogs");
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => Requests.getAllDogs().then(setAllDogs);

  const loadingStateHandler = (apiCall: Promise<Dog>): Promise<void> => {
    setIsLoading(true);
    return apiCall.then(() => fetchData()).finally(() => setIsLoading(false));
  };

  const toggleDisplay = (collection: Displays) => {
    const newDisplay = display === collection ? "allDogs" : collection;
    setDisplay(newDisplay);
  };

  const toggleFavoriteStatus = (dog: Dog, dogId: number) => {
    const newStatus = dog.isFavorite === false ? true : false;
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: newStatus } : dog
      )
    );
    Requests.updateDog(dog.id, { isFavorite: newStatus })
      .then((response) => (!response.ok ? setAllDogs(allDogs) : null))
      .catch((error: Error) => error);
  };

  const createDog = (newDog: Omit<Dog, "id">) =>
    loadingStateHandler(Requests.postDog(newDog));

  const deleteDog = (dog: Dog, dogId: number) => {
    setAllDogs(allDogs.filter((dog) => dog.id !== dogId));
    Requests.deleteDog(dog.id)
      .then((response) => (!response.ok ? setAllDogs(allDogs) : null))
      .catch((error: Error) => error);
  };

  useEffect(() => {
    fetchData().catch((error: Error) => error);
  }, []);

  const collection = {
    allDogs,
    favorited: allDogs.filter((dog: Dog) => dog.isFavorite === true),
    unFavorited: allDogs.filter((dog: Dog) => dog.isFavorite === false),
    createDog: allDogs,
  };

  return (
    <AppContext.Provider
      value={{
        display,
        isLoading,
        toggleDisplay,
        toggleFavoriteStatus,
        createDog,
        deleteDog,
        collection: collection[display],
        total: {
          favorites: collection.favorited.length,
          unFavorites: collection.unFavorited.length,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
