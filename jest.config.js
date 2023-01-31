module.exports = async () => {
  return {
    verbose: true,
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "^.+\\.(css|less|sass|scss)$": "<rootDir>/.jest/styleMock.js",
      "./(.*)$": "<rootDir>/src/$1",
    },
    transform: {
      "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/.jest/assetsTransformer.js",
      "^.+\\.(ts|tsx)$": "babel-jest",
    },
  };
};
