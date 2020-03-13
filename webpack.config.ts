import { createBaseLibConfig } from "./webpack/lib.webpack.config";

const webPackConfig = createBaseLibConfig({
  name: "@pgateway/common-services-api",
  dir: "./",
});

export default webPackConfig;
