import React, { useState, useCallback } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import CargoListItem from "./CargoListItem";
import moment from "moment";
import { kargoCount, kargoGet } from "../../database/model/kargoModel";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, Searchbar, Text, useTheme } from "react-native-paper";
import { Container, ScreenLoading, Space } from "../toolbox";

interface IProps {
  tamamlandiMi: 0 | 1;
}

const CargoList: React.FC<IProps> = ({ tamamlandiMi }) => {
  const [data, setData] = useState<kargoGetResponse[]>([]);
  const [dataCount, setDataCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      getCargo();
    }, [])
  );

  const getCargo = async () => {
    try {
      setLoading(true);
      setData(await kargoGet({ tamamlandiMi: tamamlandiMi }));
      setDataCount(await kargoCount(tamamlandiMi));
      setPageNumber(1);
      setSearchText("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getMoreData = async () => {
    try {
      const nextPageNumber = pageNumber + 1;
      const response = await kargoGet({
        tamamlandiMi: tamamlandiMi,
        pageNumber: nextPageNumber,
        searchText: searchText,
      });
      setPageNumber(nextPageNumber);
      setData([...data, ...response]);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearch = async () => {
    try {
      const nextPageNumber = 1;
      const response = await kargoGet({
        tamamlandiMi: tamamlandiMi,
        pageNumber: nextPageNumber,
        searchText: searchText,
      });
      setPageNumber(nextPageNumber);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (dataCount == 0 && loading == false) {
    return (
      <Container>
        <View
          style={{
            ...styles.searchbarContainer,
            backgroundColor: colors.primary,
          }}
        >
          <Searchbar
            value={searchText}
            onChangeText={(value) => setSearchText(value)}
            onSubmitEditing={getSearch}
            placeholder="Arama yap..."
            style={styles.searchbar}
            inputStyle={styles.searchbarInputStyle}
          />
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={{ ...styles.notFoundText, color: colors.placeholder }}>
            Kargo Bulunamadı
          </Text>
        </View>
      </Container>
    );
  }

  return (
      <Container>
        <View
          style={{
            ...styles.searchbarContainer,
            backgroundColor: colors.primary,
          }}
        >
          <Searchbar
            value={searchText}
            onChangeText={(value) => {
              setSearchText(value);
              if (!value) {
                getCargo();
              }
            }}
            onSubmitEditing={getSearch}
            placeholder="Arama yap..."
            style={styles.searchbar}
            inputStyle={styles.searchbarInputStyle}
          />
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <CargoListItem
              cargoCompanyName={item.firmaKod}
              cargoDate={moment(item.kayitTarihi)}
              cargoName={item.kargoAd}
              cargoNumber={item.kargoTakipNo}
              onLongPress={() =>
                navigation.navigate("cargoUpdate", { selectedCargo: item })
              }
              onPress={() =>
                navigation.navigate("cargoDetail", { selectedCargo: item })
              }
            />
          )}
          refreshing={false}
          onRefresh={getCargo}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            <>
              {data.length < dataCount && searchText == "" && loading == false && (
                <View style={styles.footerContainer}>
                  <Button
                    onPress={getMoreData}
                    style={styles.moreDataButton}
                    mode="outlined"
                  >
                    Daha Fazla Yükle
                  </Button>
                </View>
              )}
              <Space />
            </>
          }
        />
        <ScreenLoading loading={loading} />
      </Container>
  );
};

export default CargoList;

const styles = StyleSheet.create({
  notFoundContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  notFoundText: {
    fontSize: 15,
  },
  activityIndicator: {
    marginVertical: 16,
  },
  footerContainer: {
    padding: 16,
  },
  moreDataButton: {
    borderRadius: 16,
  },
  searchbarContainer: {
    padding: 8,
  },
  searchbar: {
    height: 40,
  },
  searchbarInputStyle: {
    padding: 0,
  },
});
