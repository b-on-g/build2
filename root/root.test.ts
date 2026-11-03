namespace $ {

	class $bog_build2_root_test_hello extends $bog_build2_convert {

		static match( file: $bog_build2_file ) {
			return /\.hello$/.test( file.name() )
		}

		@ $mol_mem
		generated_sources() {
			const source = this.source()
			const script = source.parent().resolve( `-hello/${ source.name() }.ts` )
			const greeting = JSON.stringify( `Hello, ${ source.text().trim() }` )
			script.text( `namespace $ { export const $${''}bog_build2_fixture_plugin_hello = ${ greeting } }\n` )
			return [ script ]
		}

	}

	$bog_build2_root.plugin( $bog_build2_root_test_hello )

	$mol_test({

		'plugin generates sources for the bundle'() {
			const root = new $bog_build2_root
			const ensure = new $bog_build2_root_ensure
			ensure.ensure = ()=> false
			root.ensure = $mol_const( ensure )
			const pack = root.pack( root.dir().resolve( 'bog/build2/fixture/plugin' ) )
			const script = root.bundle( $bog_build2_bundle_js ).artifacts( pack.slice( $bog_build2_package_slice_node_prod ) ).find( file => file.name() === 'node.js' )
			const context = $node.vm.createContext({ module: {}, require, console, process })
			$node.vm.runInContext( script?.text() ?? '', context )
			$mol_assert_equal( context[ '$' + 'bog_build2_fixture_plugin' ](), 'Hello, World' )
		},

	})

}
