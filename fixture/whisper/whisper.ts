namespace $ {

	export class $bog_build2_fixture_whisper extends $bog_build2_convert {

		static match( file: $bog_build2_file ) {
			return /\.whisper$/.test( file.name() )
		}

		@ $mol_mem
		generated_sources() {
			const source = this.source()
			const name = '$' + source.parent().relate( this.root().dir() ).replace( /\//g, '_' ) + '_' + source.name().replace( /\.\w+$/, '' )
			const script = source.parent().resolve( `-whisper/${ source.name() }.ts` )
			script.text( `namespace $ { export const ${ name } = ${ JSON.stringify( source.text().trim().toLowerCase() ) } }\n` )
			return [ script ]
		}

	}

	$bog_build2_root.plugin( $bog_build2_fixture_whisper )

}
