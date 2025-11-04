module.exports = function(api) {
  api.cache(true);

  // When building with Next.js for Vercel we'll set NEXT_ON_VERCEL=1 in the
  // environment so babel does not apply the `babel-preset-expo` transformations
  // that conflict with Next's internal modules. In that environment return a
  // minimal config.
  if (process.env.NEXT_ON_VERCEL || process.env.NEXT_BUILD) {
    return {
      presets: [],
      plugins: [],
    };
  }

  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
