namespace $ {

	export class $bog_build2_package_slice_web extends $bog_build2_package_slice {

		filter( file: $bog_build2_file ) {
			if( !super.filter( file ) ) return false
			if( /\.node\./.test( file.name() ) ) return false
			return true
		}

		prefix() {
			return 'web'
		}

		@ $mol_mem
		bundle_classes(): ( typeof $bog_build2_bundle )[] {
			return [
				...super.bundle_classes(),
				this.$.$bog_build2_bundle_css,
			]
		}

	}

	export class $bog_build2_package_slice_web_prod extends $bog_build2_package_slice_web {

		filter( file: $bog_build2_file ) {
			if( !super.filter( file ) ) return false
			if( /\.(test|dev)\./.test( file.name() ) ) return false
			return true
		}
		
	}

	export class $bog_build2_package_slice_web_test extends $bog_build2_package_slice_web {

		prefix() {
			return 'web.test'
		}

		bundle_classes() {
			return this.root().bundle_test_classes()
		}
		
		filter( file: $bog_build2_file ) {
			if( !super.filter( file ) ) return false
			return true
		}

	}

}
