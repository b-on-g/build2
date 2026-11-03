namespace $ {

	function pack( name: string ) {
		const root = new $bog_build2_root
		const ensure = new $bog_build2_root_ensure
		ensure.ensure = ()=> false
		root.ensure = $mol_const( ensure )
		return root.pack( root.dir().resolve( `bog/build2/fixture/${ name }` ) )
	}

	function run( name: string ) {
		const slice = pack( name ).slice( $bog_build2_package_slice_node_prod )
		const script = slice.root().bundle( $bog_build2_bundle_js ).artifacts( slice ).find( file => file.name() === 'node.js' )
		const context = $node.vm.createContext({ module: {}, require, console, process })
		$node.vm.runInContext( script?.text() ?? '', context )
		return context[ '$' + 'bog_build2_fixture_' + name ]()
	}

	$mol_test({

		'build files are taken by graph'() {
			const files = pack( 'plugged' ).slice( $bog_build2_package_slice_build_scan ).build_files()
			$mol_assert_equal( files.map( file => file.name() ), [ 'plugged.build.ts' ] )
		},

		'pack without build files has no plugins'() {
			$mol_assert_equal( pack( 'leaf' ).plugins(), [] )
		},

		'build files stay out of bundles'() {
			const files = [ ... pack( 'plugged' ).slice( $bog_build2_package_slice_node_prod ).files() ]
			$mol_assert_equal( files.some( file => /\.build\./.test( file.name() ) ), false )
		},

		'builder modules stay out of build bundle'() {
			const script = pack( 'plugged' ).slice( $bog_build2_package_slice_build ).script()!
			$mol_assert_equal( /class \$bog_build2_convert\b/.test( script.text() ), false )
			$mol_assert_equal( new RegExp( 'class \\$' + 'bog_build2_fixture_shout\\b' ).test( script.text() ), true )
		},

		'plugin from build file converts pack sources'() {
			$mol_assert_equal( run( 'plugged' ), 'HI' )
		},

		'plugin from build file is pack local'() {
			$mol_assert_equal( pack( 'plugged' ).slice( $bog_build2_package_slice_node_prod ).convert_classes().some( Convert => Convert.name === '$' + 'bog_build2_fixture_shout' ), true )
			$mol_assert_equal( pack( 'leaf' ).slice( $bog_build2_package_slice_node_prod ).convert_classes().some( Convert => Convert.name === '$' + 'bog_build2_fixture_shout' ), false )
		},

		'plugin from library build file sees only library files'() {
			const slice = pack( 'scoped' ).slice( $bog_build2_package_slice_node_prod )
			const dir = slice.pack().dir()
			$mol_assert_equal( slice.converts( dir.resolve( 'lib/hi.shout' ) ).length, 1 )
			$mol_assert_equal( slice.converts( dir.resolve( 'own.shout' ) ).length, 0 )
			$mol_assert_equal( run( 'scoped' ), 'HI' )
		},

		'plugin nested in pack does not load the pack'() {
			const script = pack( 'nested' ).slice( $bog_build2_package_slice_build ).script()!
			$mol_assert_equal( script.text().includes( 'bog_build2_fixture_nested = ' ), false )
			$mol_assert_equal( run( 'nested' ), 'HI' )
		},

		'plugins matching one file fail the build'() {
			$mol_assert_fail(
				()=> run( 'clash' ),
				'Plugins conflict on bog/build2/fixture/clash/clash.whisper: $' + 'bog_build2_fixture_shout, $' + 'bog_build2_fixture_whisper',
			)
		},

	})

}
