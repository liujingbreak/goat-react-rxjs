const origWebpackConfig = require('react-scripts/config/webpack.config');

export = function(env: any) {
	const config = origWebpackConfig(env);
	// TODO: customizing webpack config
	return config; 
}
