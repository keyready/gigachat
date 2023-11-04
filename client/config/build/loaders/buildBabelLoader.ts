import { BuildOptions } from '../config/types';
import babelRemoveNodePlugin from '../../babel/babelRemoveNodePlugin';

interface BuildBabelLoaderProps extends BuildOptions {
    isTsx?: boolean;
}

export function buildBabelLoader({ isTsx }: BuildBabelLoaderProps) {
    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        '@babel/plugin-transform-typescript',
                        {
                            isTsx,
                        },
                    ],
                    '@babel/plugin-transform-runtime',
                    isTsx && [babelRemoveNodePlugin(), { props: ['data-testid'] }],
                ].filter(Boolean),
            },
        },
    };
}
