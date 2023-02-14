import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Container, Space } from "../components/toolbox";
import {
  Appbar,
  Button,
  Checkbox,
  Colors,
  Divider,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as images from "../constans/images";
import { kargoDelete, kargoUpdate } from "../database/model/kargoModel";
import RNPickerSelect from "react-native-picker-select";
import { firmaGetAll } from "../database/model/firmaModel";

type FormData = {
  cargoName?: string;
  cargoTrackNo?: string;
  tamamlandiMi?: 0 | 1;
  companyId: number;
};

const CargoUpdate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      cargoName: "",
      cargoTrackNo: "",
      tamamlandiMi: 0,
    },
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [companyList, setCompanyList] = useState<
    { label: string; value: any }[]
  >([]);
  const navigation = useNavigation();
  const { params } = useRoute<any>();
  const selectedCargo: kargoGetResponse = params?.selectedCargo;
  const { colors } = useTheme();

  useEffect(() => {
    setValue("cargoName", selectedCargo.kargoAd);
    setValue("cargoTrackNo", selectedCargo.kargoTakipNo);
    setValue("tamamlandiMi", selectedCargo.tamamlandiMi);
    setValue("companyId", selectedCargo.firmaId || 0);

    firmaGetAll().then((res) => {
      const data: any[] = [];
      res.map((item) => {
        data.push({
          label: item.firmaAd,
          value: item.id,
        });
      });
      setCompanyList(data);
    });
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setUpdateLoading(true);
      await kargoUpdate({
        id: selectedCargo.id,
        firmaId: data.companyId,
        kargoAd: data.cargoName,
        kargoTakipNo: data.cargoTrackNo,
        tamamlandiMi: data.tamamlandiMi,
      });
      reset();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const remove = async () => {
    try {
      setDeleteLoading(true);
      await kargoDelete(selectedCargo.id);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Container>
        <Appbar>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Kargo Düzenle" />
        </Appbar>
        <Space />
        <Image
          source={images.companyLogo[selectedCargo.firmaKod]}
          style={styles.logo}
        />
        <Space />
        <View style={styles.content}>
          <Controller
            name="companyId"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <RNPickerSelect
                onValueChange={(value) => onChange(value)}
                items={companyList}
                style={{
                  inputAndroid: {
                    backgroundColor: colors.surface,
                    color: colors.text,
                    paddingLeft: 8,
                  },
                  placeholder: {
                    color: errors.companyId
                      ? Colors.pinkA200
                      : colors.placeholder,
                  },
                }}
                value={value}
                placeholder={{ label: "Firma Seçiniz" }}
                useNativeAndroidPickerStyle={false}
                Icon={() => (
                  <IconButton
                    icon="chevron-down"
                    size={18}
                    style={{ marginRight: 6, justifyContent: "flex-end" }}
                    color={colors.placeholder}
                  />
                )}
              />
            )}
          />
          <Divider />
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
          <Space h="6" />
          <Controller
            name="tamamlandiMi"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={styles.row}
                onPress={() => (value == 0 ? onChange(1) : onChange(0))}
                activeOpacity={1}
              >
                <Checkbox status={value == 0 ? "unchecked" : "checked"} />
                <Text>Tamamlandı</Text>
              </TouchableOpacity>
            )}
          />

          <Space h="24" />
          <Button
            mode="contained"
            icon={"pencil"}
            onPress={handleSubmit(onSubmit)}
            loading={updateLoading}
          >
            Güncelle
          </Button>
          <Space h="16" />
          <Button
            mode="contained"
            icon={"delete"}
            onPress={() =>
              Alert.alert(
                "Uyarı",
                "Kargo kalıcı olarak silinecektir. Onaylıyormusunuz?",
                [{ text: "Tamam", onPress: remove }, { text: "İptal" }]
              )
            }
            loading={deleteLoading}
            style={{ backgroundColor: colors.accent }}
          >
            Sil
          </Button>
        </View>
      </Container>
      <Space h="48" />
    </ScrollView>
  );
};

export default CargoUpdate;

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
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
