const { withExpo } = require('@expo/next-adapter');
const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = withExpo({
  transpilePackages: [
    'react-native',
    'react-native-web',
    'expo',
    'expo-router',
    '@expo/vector-icons',
    '@react-navigation/native',
    'react-native-reanimated',
    'react-native-safe-area-context',
    'react-native-gesture-handler',
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      '@': path.resolve(__dirname),
    };
    return config;
  },
});
