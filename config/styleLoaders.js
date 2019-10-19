'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');

module.exports = (webpackEnv) => (cssOptions, preProcessor) => {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

    const publicPath = isEnvProduction ? paths.servedPath : isEnvDevelopment && '/';
    const shouldUseRelativeAssetPaths = publicPath === './';

    const loaders = [
        isEnvDevelopment && require.resolve('style-loader'),
        isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
            options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
        },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                            flexbox: 'no-2009',
                        },
                        stage: 3,
                    }),
                    postcssNormalize(),
                ],
                sourceMap: isEnvProduction && shouldUseSourceMap,
            },
        },
    ].filter(Boolean);

    if (preProcessor) {
        loaders.push(
            {
                loader: require.resolve('resolve-url-loader'),
                options: {
                    sourceMap: isEnvProduction && shouldUseSourceMap,
                },
            },
            {
                loader: require.resolve(preProcessor),
                options: {
                    sourceMap: true,
                },
            }
        );
    }
    return loaders;
};
