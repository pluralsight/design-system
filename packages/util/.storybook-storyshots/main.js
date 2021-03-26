module.exports = {
  stories: ['../src/**/*.story.@(js|ts|tsx)'],
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript'
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.mjs$/,
      type: 'javascript/auto'
    })
    return config
  }
}