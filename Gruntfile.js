module.exports = function(grunt) {
	var inJsBootstrap = [ '<%= inDirBootstrap %>dist/js/bootstrap.js' ];
	var inJsJQuery = [ '<%= inDirJQuery %>dist/jquery.js' ];
	var inJsJQueryUI = [ '<%= inDirJQueryUI %>jquery-ui.js' ];
	var inJsLess = [ '<%= inDirLess %>dist/less-1.7.3.js' ];
	
	var jsLinkerDev = [];
	jsLinkerDev = jsLinkerDev.concat(inJsJQuery);
	jsLinkerDev = jsLinkerDev.concat(inJsJQueryUI);
	jsLinkerDev = jsLinkerDev.concat(inJsBootstrap);
	jsLinkerDev = jsLinkerDev.concat(inJsLess);

	var finalJsProd = "<%= buildDir %>js/<%= pkg.name %>.js";
	var jsLinkerProd = [ finalJsProd ]

	// Project configuration.
	grunt
			.initConfig({
				pkg : grunt.file.readJSON('package.json'),
				buildDir : "build/",

				inDirBootstrap : "bower_components/bootstrap/",
				inDirJQuery : "bower_components/jquery/",
				inDirJQueryUI : "bower_components/jqueryui/",
				inDirLess : "bower_components/less/",
				inLess : "src/less/build.less",
				
				outCss : "<%= buildDir %>css/<%= pkg.name %>.css",
				outJs : "<%= buildDir %>js/<%= pkg.name %>.js",
				outJsMin : "<%= buildDir %>js/<%= pkg.name %>.min.js",

				clean : {
					build : [ "build/*" ]
				},
				concat : {
					options : {
						separator : ';',
					},
					jquery : {
						src : inJsJQuery,
						dest : '<%= buildDir %>js/jquery.js'
					},
					jqueryui : {
						src : inJsJQueryUI,
						dest : '<%= buildDir %>js/jqueryui.js'
					},
					bootstrap : {
						src : inJsBootstrap,
						dest : '<%= buildDir %>js/bootstrap.js'
					},
					mainsite : {
						src : [ 'src/js/main.js' ],
						dest : '<%= buildDir %>js/site.js',
					},
					join : {
						src : [ '<%= buildDir %>js/jquery.js',
						        '<%= buildDir %>js/jqueryui.js',
						        '<%= buildDir %>js/bootstrap.js',
								'<%= buildDir %>js/site.js' ],
						dest : '<%= outJs %>',
					}
				},
				copy : {
					html : {
						expand : true,
						cwd : './',
						src : 'src/**/*.html',
						dest : '<%= buildDir %>/',
						flatten : true,
						filter : 'isFile',
					}
				},
				uglify : {
					options : {
						banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
					},
					build : {
						src : '<%= outJs %>',
						dest : '<%= outJsMin %>'
					}
				},
				less : {
					prod : {
						options : {
							cleancss : true
						},
						files : {
							"<%= outCss %>" : "<%= inLess %>"
						}
					}
				},
				scriptlinker : {
					dev : {
						options : {
							startTag : '<!--SCRIPTS-->',
							endTag : '<!--SCRIPTS END-->',
							fileTmpl : '<script src="../%s"></script>\n',
							appRoot : 'src/'
						},
						files : {
							// Target-specific file lists and/or options go
							// here.
							'src/index.html' : jsLinkerDev
						},
					},
					prod : {
						options : {
							startTag : '<!--SCRIPTS-->',
							endTag : '<!--SCRIPTS END-->',
							fileTmpl : '<script src="../%s"></script>\n',
							appRoot : '<%= buildDir %>'
						},
						files : {
							// Target-specific file lists and/or options go
							// here.
							'src/index.html' : jsLinkerProd
						},
					}
				}
			});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-scriptlinker');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s).
	grunt.registerTask('default', [ 'scriptlinker:dev' ]);
	grunt.registerTask('prod', [ 'clean', 'scriptlinker:prod', 'concat', 'uglify', 'less:prod', 'copy:html' ]);

};