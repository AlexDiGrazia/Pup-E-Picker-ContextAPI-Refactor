/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ReactNode } from "react";

type SectionButtonProps = {
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  label: ReactNode;
};

export const SectionButton = ({
  isActive,
  onClick,
  label,
}: SectionButtonProps) => {
  return (
    <div className={`selector ${isActive && "active"}`} onClick={onClick}>
      {label}
    </div>
  );
};
