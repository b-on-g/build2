namespace $ {

	$mol_test({

		'server waits pull shorter than cli'() {
			const $ = $mol_ambient({ $mol_env: ()=> ({}) })

			const server = new $bog_build2_server
			server.$ = $
			const root = new $bog_build2_root
			root.$ = $

			$mol_assert_equal( server.builder().ensure().pull_timeout(), 5000 )
			$mol_assert_equal( root.ensure().pull_timeout(), 120000 )
		},

	})

}
