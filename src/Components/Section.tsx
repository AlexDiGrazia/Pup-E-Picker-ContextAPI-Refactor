import { ReactNode, useContext } from "react";
import { SectionButton } from "./SectionButton";
import { AppContext } from "../Providers/AppProvider";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { display, toggleDisplay, total } = useContext(AppContext);
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <SectionButton
            isActive={display === "favorited"}
            onClick={() => toggleDisplay("favorited")}
            label={`favorited ( ${total.favorites} )`}
          />
          <SectionButton
            isActive={display === "unFavorited"}
            onClick={() => toggleDisplay("unFavorited")}
            label={`unfavorited ( ${total.unFavorites} )`}
          />
          <SectionButton
            isActive={display === "createDog"}
            onClick={() => toggleDisplay("createDog")}
            label={"create dog"}
          />
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
