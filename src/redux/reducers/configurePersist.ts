import storage from "@react-native-community/async-storage";

const configurePersist = {
  key: "root",
  storage,
  whitelist: ["themeReducer"],
};

export default configurePersist;
