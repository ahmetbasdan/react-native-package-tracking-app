module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins:['@babel/transform-flow-strip-types'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
