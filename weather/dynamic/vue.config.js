module.exports = {
	configureWebpack: {
		devtool: 'source-map'
	},
	devServer: {
		proxy: {
			'^/api': {
				target: 'http://localhost:5000/',
			},
		}
	},
	pwa: {
		name: 'AF Weather',
		themeColor: '#424242',
		msTileColor: '#004c8c'
	}
}