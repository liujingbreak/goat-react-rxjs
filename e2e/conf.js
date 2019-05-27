const { SpecReporter } = require('jasmine-spec-reporter');
/**
 * https://github.com/angular/protractor/blob/master/lib/config.ts
 */
exports.config = {
	allScriptsTimeout: 15000,
	specs: [
		'./src/**/*.e2e-spec.ts'
	],
	capabilities: {
		browserName: 'chrome'
	},
	directConnect: true,
	framework: 'jasmine',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
		print() {}
	},
	onPrepare() {
		require('ts-node').register({
			project: require('path').join(__dirname, './tsconfig.e2e.json')
		});
		jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
	}
};
