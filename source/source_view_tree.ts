namespace $ {

	export class $bog_build2_source_view_tree extends $bog_build2_source {

		static match( file: $mol_file2 ): boolean {
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
