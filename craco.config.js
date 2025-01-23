const path = require('path');

module.exports = {
    webpack: {
        alias: {
            "@components": path.resolve(__dirname, "src/Components/index.ts"),
            "@model": path.resolve(__dirname, "src/model/index.ts"),
            "@helper": path.resolve(__dirname, "src/Common/index.ts"),
        }
    },
    devServer: {
        devMiddleware: {
            writeToDisk: true,
        },
    },
}