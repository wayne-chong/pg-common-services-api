import { createBaseLibConfig } from "./webpack/lib.webpack.config";

const webPackConfig = createBaseLibConfig({
    name: "pg-common-services-api",
    dir: "./",
});

export default webPackConfig;
