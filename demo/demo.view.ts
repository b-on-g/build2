namespace $.$$ {

	export class $bog_build2_demo extends $.$bog_build2_demo {

		@ $mol_mem
		source( next?: string ) {
			return next ?? $bog_build2_demo_text_intro
		}

		preview() {
			return $npm[ 'marked' ].parse( this.source(), { async: false } ) as string
		}

		@ $mol_mem
		stamp() {
			return `${ $bog_build2_demo_hello( 'MAM' ) } ${ $npm[ 'date-fns' ].format( new Date, 'dd.MM.yyyy HH:mm' ) }`
		}

	}

}
