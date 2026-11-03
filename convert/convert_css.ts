namespace $ {

	export class $bog_build2_convert_css extends $bog_build2_convert {

		static match( file: $bog_build2_file ): boolean {
			return /css?$/.test( file.ext() )
		}

		@ $mol_mem
		generated_sources() {
			const source = this.source()

			const name = source.name()
			const script = source.parent().resolve( `-css/${ name }.ts` )
			
			const id = source.relate( this.root().dir() )
			const styles = source.text()
			const code = 'namespace $ { $'+`mol_style_attach( ${ JSON.stringify( id ) },\n ${ JSON.stringify( styles ) }\n) }`
			script.text( code )
			
			return [ script ]
		}

	}

}
