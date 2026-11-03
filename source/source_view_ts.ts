namespace $ {

	export class $bog_build2_source_view_ts extends $bog_build2_source {

		static match( file: $bog_build2_file ): boolean {
			return /\.view(?:\.css)?\.tsx?$/.test( file.name() )
		}
		
		@ $mol_mem
		deps() {
			const deps = super.deps()
			
			const file = this.file()
			
			const tree = this.$.$bog_build2_file.absolute( file.path().replace( /(?:\.css)?\.tsx?$/ , '\.tree' ) )
			deps.set( tree, 0 )

			return deps
		}

	}

}
