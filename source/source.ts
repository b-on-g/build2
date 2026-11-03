namespace $ {

	/** Source file dependencies extractor. */
	export class $bog_build2_source extends $mol_object2 {

		static match( _file: $bog_build2_file ): boolean {
			return false
		}

		root(): $bog_build2_root {
			return $mol_fail( new Error( 'root is not set' ) )
		}

		file(): $bog_build2_file {
			return $mol_fail( new Error( 'file is not set' ) )
		}

		deps() {
			return new Map< $bog_build2_file, number >()
		}

		priority( line: string ) {
			const indent = /^([\s\t]*)/.exec( line )!
			return - indent[ 0 ].replace( /\t/g, '    ' ).length / 4
		}

		dep_add( deps: Map< $bog_build2_file, number >, dep: $bog_build2_file, priority: number ) {
			const existed = deps.get( dep )
			if( existed === undefined || existed < priority ) deps.set( dep, priority )
		}

		fqn_add( deps: Map< $bog_build2_file, number >, fqn: string, priority: number ) {
			const path = fqn === 'npm' ? 'bog/build2/npm' : fqn.replace( /[._]/g, '/' )
			this.dep_add( deps, this.lookup( path ), priority )
		}

		registry_add( deps: Map< $bog_build2_file, number >, priority: number ) {
			this.dep_add( deps, this.lookup( 'node' ), priority )
		}

		path_resolve( path: string ) {
			if( $node_internal_check( path ) ) return null
			if( path[0] !== '.' ) return this.root().dir().resolve( path )
			return this.path_module( path ) ?? this.file().parent().resolve( path )
		}

		path_module( path: string ) {
			const dir = this.file().parent()
			const variants = [
				path,
				path + '.ts',
				path + '.tsx',
				path + '.js',
				path.replace( /\.js$/, '.ts' ),
				path + '/index.ts',
				path + '/index.js',
			]
			return variants.map( variant => dir.resolve( variant ) ).find( file => file.type() === 'file' ) ?? null
		}

		lookup( path: string ): $bog_build2_file {

			const target = path + '/' + path.replace( /.*\//, '' )
			let dep = this.root().dir().resolve( target )

			while( !dep.exists() ) {
				if( this.root().pack( dep ).ensure() ) return dep

				const parent = dep.parent()
				if( parent.type() === 'dir' ) parent.sub()
				if( parent === this.root().dir() ) {
					throw new Error( `Absent dependency: ${ dep.relate() }, (${ path })` )
				}
				dep = parent
			}

			this.root().ensure().ensure( dep.path() )

			return dep
		}

	}

}
