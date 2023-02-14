import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Container, ScreenLoading } from "../components/toolbox";
import { Appbar } from "react-native-paper";

const CargoDetail = () => {
  const [webViewLoading, setWebViewLoading] = useState(false);
  const navigaiton = useNavigation();
  const { params } = useRoute<any>();
  const selectedCargo: kargoGetResponse = params.selectedCargo;

  const [url, setUrl] = useState("");

  useEffect(() => {
    urlOlustur();
  }, []);

  const urlOlustur = () => {
    const { kargoTakipNo, url } = selectedCargo;
    const takipNo = url.replace("#takipNo#", kargoTakipNo || "");
    setUrl(takipNo);
  };

  return (
    <Container>
      <Appbar>
        <Appbar.BackAction onPress={() => navigaiton.goBack()} />
        <Appbar.Content title="Kargo Detay" />
      </Appbar>
      <WebView
        source={{
          uri: url,
        }}
        onLoadStart={() => setWebViewLoading(true)}
        onLoadEnd={() => setWebViewLoading(false)}
      />
      <ScreenLoading loading={webViewLoading} />
    </Container>
  );
};

export default CargoDetail;
