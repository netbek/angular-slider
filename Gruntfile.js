module.exports = function (grunt) {

	var moduleName = 'ui.slider';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: ['/*',
				' * <%= pkg.name %>',
				' * <%= pkg.homepage %>',
				' *',
				' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>',
				' * @copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>',
				' * @license <%= pkg.license.url %> <%= pkg.license.type %>',
				' */\n'].join('\n')
		},
		clean: {
			init: ['build', 'dist', 'tmp'],
			exit: ['build', 'tmp']
		},
		coffee: {
			compile: {
				files: {
					'build/js/slider.js': 'slider.coffee',
				}
			}
		},
		html2js: {
			dist: {
				options: {
					module: moduleName + '.templates',
					base: '',
				},
				files: [{
						src: ['ui.slider.html'],
						dest: 'build/js/' + moduleName + '-templates.js',
					}]
			}
		},
		concat: {
			distCss: {
				src: ['slider.css'],
				dest: 'dist/css/' + moduleName + '.css'
			},
			distJs: {
				src: ['build/js/*.js'],
				dest: 'dist/js/' + moduleName + '.js'
			}
		},
		cssmin: {
			options: {
				banner: '<%= meta.banner %>'
			},
			dist: {
				files: [{
						src: ['slider.css'],
						dest: 'dist/css/' + moduleName + '.min.css'
					}]
			}
		},
		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			dist: {
				src: ['dist/js/' + moduleName + '.js'],
				dest: 'dist/js/' + moduleName + '.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-html2js');

	grunt.registerTask('default', [
		'clean:init',
		'coffee',
		'html2js',
		'concat',
		'cssmin',
		'uglify',
		'clean:exit'
	]);

};