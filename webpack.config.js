const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  title: 'Heat Map',
  inject: 'body'
})

module.exports = {
  entry: __dirname + '/app/index.js',
  output: {
  	path: __dirname + '/dist',
  	filename: 'bundle.js'
  },
  resolve: { extensions: ['.json', '.js', '.jsx'] },
  module: {
  	rules: [
  	  {
  	  	test: /\.jsx?$/,
  	  	exclude: /node_modules/,
  	  	loader: 'babel-loader?presets[]=es2015'
  	  }
  	]
  },
  plugins: [ htmlPlugin ]
}