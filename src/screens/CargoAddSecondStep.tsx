import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Container, Space } from "../components/toolbox";
import {
  Appbar,
  Button,
  Colors,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as images from "../constans/images";
import { kargoAdd } from "../database/model/kargoModel";

type FormData = {
  cargoName: string;
  cargoTrackNo: string;
};

const CargoAddSecondStep = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      cargoName: "",
      cargoTrackNo: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { params } = useRoute<any>();
  const selectedCompany: firmaModel = params?.selectedCompany;
  const { colors } = useTheme();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await kargoAdd({
        firmaId: selectedCompany.id,
        kargoAd: data.cargoName,
        kargoTakipNo: data.cargoTrackNo,
      });
      reset();
      navigation.reset({
        index: 0,
        routes: [{ name: "home" }],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Container>
        <Appbar>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Kargo Ekle" />
        </Appbar>
        <Space />
        <Image
          source={images.companyLogo[selectedCompany.firmaKod]}
          style={styles.logo}
        />
        <Space />
        <View style={styles.content}>
          <Controller
            name="cargoName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                label={"Kargo Adı"}
                error={errors.cargoName ? true : false}
                style={{ backgroundColor: colors.surface }}
              />
            )}
          />
          <Controller
            name="cargoTrackNo"
            control={control}
            rules={{ required: true }}
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                label={"Takip No"}
                error={errors.cargoTrackNo ? true : false}
                style={{ backgroundColor: colors.surface }}
              />
            )}
          />
          <Space h="24" />
          <Button
            mode="contained"
            icon={"content-save"}
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          >
            KAYDET
          </Button>
        </View>
      </Container>
      <Space h="48" />
    </ScrollView>
  );
};

export default CargoAddSecondStep;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  logo: {
    height: 85,
    width: 85,
    alignSelf: "center",
  },
  content: {
    paddingHorizontal: 8,
  },
  errorText: {
    color: Colors.red900,
  },
});
