namespace $ {

	export class $bog_build2_package_slice_node extends $bog_build2_package_slice {

		filter( file: $bog_build2_file ) {
			if( !super.filter( file ) ) return false
			if( /\.web\./.test( file.name() ) ) return false
			return true
		}

		prefix() {
			return 'node'
		}

	}

	export class $bog_build2_package_slice_node_prod extends $bog_build2_package_slice_node {

		filter( file: $bog_build2_file ) {
			if( !super.filter( file ) ) return false
			if( /\.(test|dev)\./.test( file.name() ) ) return false
			return true
		}
		
	}

	export class $bog_build2_package_slice_node_test extends $bog_build2_package_slice_node {

		prefix() {
			return 'node.test'
		}

		filter( file: $bog_build2_file ) {
			if( !super.filter( file ) ) return false
			// if( /\.test\./.test( file.name() ) ) return false
			return true
		}

		bundle_classes() {
			return this.root().bundle_test_classes()
		}

	}

}
