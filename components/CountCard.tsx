import React, { ReactNode } from "react";

const CountCard = ({
  path,
  name,
  icon,
}: {
  path?: string;
  name?: string;
  icon?: ReactNode;
}) => {
  return (
    <div>
      {icon}
      <h1>{name}</h1>
      <p>{path}</p>
    </div>
  );
};

export default CountCard;
