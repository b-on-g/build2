namespace $ {

	/** Building MAM package */
	export class $bog_build2_package extends $mol_object2 {

		root(): $bog_build2_root {
			return $mol_fail( new Error( 'root is not set' ) )
		}

		dir(): $bog_build2_file {
			return $mol_fail( new Error( 'dir is not set' ) )
		}

		@ $mol_mem
		output() {
			return this.dir().resolve( '-' )
		}

		slice_classes() {
			return this.root().slice_classes()
		}

		@ $mol_mem_key
		slice< Slice extends typeof $bog_build2_package_slice >( Slice: Slice ) {
			const slice = new Slice
			slice.pack = $mol_const( this )
			return slice as InstanceType< Slice >
		}

		@ $mol_mem
		slices() {
			return this.slice_classes().map( ctor => this.slice( ctor ) )
		}

		@ $mol_mem
		plugins(): $bog_build2_plugin[] {
			const script = this.slice( this.$.$bog_build2_package_slice_build ).script()
			return script ? $bog_build2_root.plugins_load( script ) : []
		}

		@ $mol_mem
		plugin_scopes(): Map< Function, $bog_build2_file[] > {
			return this.slice( this.$.$bog_build2_package_slice_build ).scopes( this.plugins() )
		}

		@ $mol_mem
		bundles_generated() {
			const files = new Set< $bog_build2_file >()

			for (const slice of this.slices()) {

				for (const file of slice.bundles_generated()) {
					files.add( file )
				}
				
			}

			return files
		}

		@ $mol_mem
		meta() {
			const decls = [] as $mol_tree2[]

			for( const file of this.dir().sub() ) {

				const tree = this.root().source([ this.$.$bog_build2_source_meta_tree, file ])?.tree()
				if( tree ) decls.push( ... tree.kids )

			}

			return $mol_tree2.list( decls )
		}

		@ $mol_mem
		ensure() {
			return this.root().ensure().ensure( this.dir().path() )
		}

	}

}
