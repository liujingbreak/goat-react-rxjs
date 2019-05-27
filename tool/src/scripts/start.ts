require('source-map-support/register');
import Injector from 'require-injector';

const ij = new Injector();

ij.fromDir('node_modules/react-scripts').alias('..\/config\/webpack.config', 
	require.resolve('../webpack.config'));

require('react-scripts/scripts/start');

