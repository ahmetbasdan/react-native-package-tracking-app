import React from "react";
import { Container } from "../components/toolbox";
import { CargoList } from "../components/cargo";

const ComplatedList = () => {
  return (
    <Container>
      <CargoList tamamlandiMi={1} />
    </Container>
  );
};

export default ComplatedList;
