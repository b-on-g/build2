namespace $ {

	/** Source file transpiler. */
	export class $bog_build2_convert extends $mol_object2 {

		static match( _file: $bog_build2_file ): boolean {
			return false
		}

		root(): $bog_build2_root {
			return $mol_fail( new Error( 'root is not set' ) )
		}

		source(): $bog_build2_file {
			return $mol_fail( new Error( 'source is not set' ) )
		}

		@ $mol_mem
		generated_artifacts(): $bog_build2_file[] {
			return []
		}

		/** Will be included in further processing (converting, deps searching) */
		@ $mol_mem
		generated_sources(): $bog_build2_file[] {
			return []
		}

		artifacts_for( _slice: $bog_build2_package_slice ): $bog_build2_file[] {
			return this.generated_artifacts()
		}

	}

}
