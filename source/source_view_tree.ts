namespace $ {

	export class $bog_build2_source_view_tree extends $bog_build2_source {

		static match( file: $bog_build2_file ): boolean {
			return /\.view\.tree$/.test( file.name() )
		}

		@ $mol_mem
		deps() {
			const deps = super.deps()
			deps.set( this.lookup( 'mol/type/enforce' ), 0 )
			return deps
		}

	}

}
