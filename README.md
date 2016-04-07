### Webpack loader for loading partner theme specific files

#### When you have this folder structure:
- components
  - Header
    - partners
      - vodafone
        - Header.js
        - Header.scss
    - Header.js
    - Header.scss


When trying to load the JavaScript file `require('components/Header/Header.js')`
- If `process.env.PARTNER` is `nothing` it will load `components/Header/Header.js`
- If `process.env.PARTNER` is `vodafone` it will load `components/partners/vodafone/Header/Header.js`

When trying to load the SASS file `require('components/Header/Header.scss')`
- If `process.env.PARTNER` is `nothing` it will load `components/Header/Header.scss`
- If `process.env.PARTNER` is `vodafone` it will load `components/partners/vodafone/Header/Header.scss`

Usage:
```
loaders: [
  { 
    test: /\.js$/, 
    exclude: /node_modules/, 
    loaders: [
      'babel?' + JSON.stringify(babelLoaderQuery),
      'eslint-loader',
      'partner-loader'
    ]
  },
  { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap!partner-loader' },
]
```
