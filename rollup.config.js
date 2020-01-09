import json from "@rollup/plugin-json";

export default {
    input: "build/src/main.js",
    output: {
        dir: "dist",
        // format: "cjs",
        sourcemap: "inline",
    },
    plugins: [
        json(),
    ],
};
