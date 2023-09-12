import { useContext } from "react";
import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { CreateDogForm } from "./Components/CreateDogForm";
import { AppContext } from "./Providers/AppProvider";

export function App() {
  const { display } = useContext(AppContext);
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        {display !== "createDog" && <Dogs />}
        {display === "createDog" && <CreateDogForm />}
      </Section>
    </div>
  );
}
