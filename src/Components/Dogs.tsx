import { useContext } from "react";
import { DogCard } from "./DogCard";
import { AppContext } from "../Providers/AppProvider";

export const Dogs = () => {
  const { collection, deleteDog, toggleFavoriteStatus, isLoading } =
    useContext(AppContext);
  return (
    <>
      {collection.map((dog) => (
        <DogCard
          dog={{ ...dog }}
          key={dog.id}
          onTrashIconClick={() => {
            deleteDog(dog, dog.id);
          }}
          onHeartClick={() => {
            toggleFavoriteStatus(dog, dog.id);
          }}
          onEmptyHeartClick={() => {
            toggleFavoriteStatus(dog, dog.id);
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
