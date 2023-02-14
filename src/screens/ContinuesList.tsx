import React from "react";
import { CargoList } from "../components/cargo";
import { Container } from "../components/toolbox";

const ContinuesList = () => {
  return (
    <Container>
      <CargoList tamamlandiMi={0} />
    </Container>
  );
};

export default ContinuesList;
