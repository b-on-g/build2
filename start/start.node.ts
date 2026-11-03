namespace $ {

	let $bog_build2_start_root = null as null | $bog_build2_root

	export function $bog_build2_start() {

		if( !$mol_rpc_worker.is_main() ) {
			new $mol_wire_atom( '$bog_build2_bundle_checker', ()=> $.$mol_one.$bog_build2_bundle_checker.start() ).fresh()
			return
		}

		try {

			const args = process.argv.slice( 2 )

			if( args.every( arg => /^[^=]+=/.test( arg ) ) ) {
				$.$bog_build2_server.serve()
				return
			}

			const root = $bog_build2_start_root ??= new $.$bog_build2_root

			for( const path of args ) {
				root.pack( root.dir().resolve( path ) ).bundles_generated()
			}

			process.exit(0)

		} catch( error ) {

			if( $mol_promise_like( error ) ) $mol_fail_hidden( error )

			$mol_ambient({}).$mol_log3_fail({
				place: 'bog/build2/start',
				message: ( error as Error ).stack ?? String( error ),
			})

			process.exit(1)

		}

	}

	setTimeout( ()=> $mol_wire_async( $ ).$bog_build2_start() )

}
