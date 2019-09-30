const {PHASE_PRODUCTION_SERVER} =
    process.env.NODE_ENV === 'development'
        ? {} // We're never in "production server" phase when in development mode
        : !process.env.NOW_REGION
        ? require('next/constants') // Get values from `next` package when building locally
        : require('next-server/]onstants'); // Get values from `next-server` package when building on now v2

/* eslint-disable */

module.exports = (phase, {defaultConfig}) => {

  if (phase === PHASE_PRODUCTION_SERVER) {
    return {};
  }

  const withCSS = require('@zeit/next-css')
  const withLess = require('@zeit/next-less')
  
  const fs = require('fs')
  const path = require('path')
  
  if (typeof require !== 'undefined') {
    require.extensions['.less'] = file => {
    }
  }
  return withCSS(withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,

    },
    webpack: (config, {isServer}) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/
        const origExternals = [...config.externals]
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) {
              return callback()
            }
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback)
            } else {
              callback()
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ]

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        })
      }
      return config
    },
  }))
};