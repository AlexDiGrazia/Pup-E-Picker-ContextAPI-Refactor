import { ReactNode, createContext, useEffect, useState } from "react";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";

type TAppContext = {
  display: ActiveTab;
  isLoading: boolean;
  toggleDisplay: (collection: ActiveTab) => void;
  toggleFavoriteStatus: (dog: Pick<Dog, "isFavorite">, dogId: number) => void;
  createDog: (newDog: Omit<Dog, "id">) => Promise<void>;
  deleteDog: (dog: Dog, dogId: number) => void;
  collection: Dog[];
  total: { favorites: number; unFavorites: number };
};

export const AppContext = createContext<TAppContext>({} as TAppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [display, setDisplay] = useState<ActiveTab>("allDogs");
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => Requests.getAllDogs().then(setAllDogs);

  const toggleDisplay = (collection: ActiveTab) => {
    const newDisplay = display === collection ? "allDogs" : collection;
    setDisplay(newDisplay);
  };

  const toggleFavoriteStatus = (
    dog: Pick<Dog, "isFavorite">,
    dogId: number
  ) => {
    const newStatus = dog.isFavorite === false ? true : false;
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: newStatus } : dog
      )
    );
    Requests.updateDog(dogId, { isFavorite: newStatus }).catch(
      (error: Error) => {
        setAllDogs(allDogs);
        return error;
      }
    );
  };

  const createDog = (newDog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(newDog)
      .then(() => fetchData())
      .finally(() => setIsLoading(false));
  };

  const deleteDog = (dog: Dog, dogId: number) => {
    setAllDogs(allDogs.filter((dog) => dog.id !== dogId));
    Requests.deleteDog(dog.id).catch((error: Error) => {
      setAllDogs(allDogs);
      return error;
    });
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
