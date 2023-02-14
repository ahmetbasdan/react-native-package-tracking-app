import React, { useEffect, useState } from "react";
import { Container, Space } from "../components/toolbox";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "../components/cargoAddFirstItem";
import { firmaGetAll } from "../database/model/firmaModel";
import { FlatList } from "react-native";

const CargoAddFirstStep = () => {
  const [data, setData] = useState<firmaModel[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    try {
      const response = await firmaGetAll();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const goCargoSecondStep = (selectedCompany: firmaModel) => {
    navigation.navigate("cargoAddSecondStep", { selectedCompany });
  };

  return (
    <Container>
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Kargo Firması Seçimi" />
      </Appbar>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListItem
            key={item.id}
            onPress={() => goCargoSecondStep(item)}
            companyName={item.firmaKod}
            title={item.firmaAd}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<Space />}
      />
    </Container>
  );
};

export default CargoAddFirstStep;
