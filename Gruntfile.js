module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			options: {
				separator: ';\n;'
			},
			dist: {
				src: ['bower_components/jquery/dist/jquery.min.js', 'app/js/main.js'],
				dest: 'public_html/assets/app.js'
			}
		},
		watch: {
			files: ['app/**/*'],
			tasks: ['default']
		},
		less: {
			development: {
				options: {},
				files: {
					"public_html/assets/app.css": "app/less/main.less"
				}
			}
		},
		connect: {
			server: {
				options: {
					keepalive: true,
					port: 9000,
					hostname: '*',
					base: 'public_html'
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['less', 'concat']);
};