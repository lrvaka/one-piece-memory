function importAll(r: __WebpackModuleApi.RequireContext) {
  let images: any = [];

  // keys is a function that returns an array of all possible requests that the context module can handle.
  r.keys().map((item, index) => {
    return images.push(r(item));
  });

  return images;
}

const images: Array<string> = importAll(
  require.context("../images/cardImages", false, /\.(png|jpe?g|svg)$/)
);

export default images;
