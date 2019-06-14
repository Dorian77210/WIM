<app>

<style>
	.deactivated {
		background-color: red;
	}

</style>


<div>
	<h2>Le pendue</h2>
	<button disabled="{ this.inGame }" onclick={ this.actions.beginGame }>Jouer</button>

	<!-- IMG -->

	<img src="{ this.currentImage }" />

	<br>

		{ this.word }

	<br>

	<div>
		<button each={ letter in this.alphabet} 
		disabled="{ letter.isDeactivated && this.inGame }" onclick={ this.actions.playLetter } >
			{ letter.value }
		</button> 
	</div>

</div>




<script>
	String.prototype.replaceAt=function(index, replacement) {
    	return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
	}

	const word = "";
	const BASE_URL = "./images";
	const MAX_FAILS = 7;

	this.serviceAjax = riot.mixin( 'serviceAjax' );

	this.setup = () => {
		this.word = "";
		this.inGame = false; // default value
		this.alphabet = {}; // alphabet + deactivate state
			"abcdefghijklmnopqrstuvwxyz"
			.split("")
			.forEach( letter => {
				this.alphabet[ letter ] = {
					value: letter,
					isDeactivated: false
				};
			} );

		this.fails = 0;
		this.currentImage = BASE_URL + "/p" + this.fails + ".gif";
	}

	this.setup();	


	// handlers for the events
	this.actions = {
		beginGame: ( event ) => {
			this.serviceAjax.request( this.serviceAjax.initURL )
				.then( res => {
					this.inGame = true;
					const length = res.length;
					console.log( length );
					// fill the word with underscord characters
					const positions = res.positions;

					for( let i = 0; i < length; i++ ) {
						this.word += '_';
					}

					for(let position in positions) {
						const letter = positions[ position ];
						this.word = this.utils.replaceAt(this.word, position + 1, letter );
						this.alphabet[ letter.toLowerCase() ].isDeactivated = true;
					}

					this.idWord = res.id;

					this.update();
				} )
				.catch( error => {
					this.word = error;
				} );
		},
		playLetter: ( event ) => {
			if( this.inGame ) {
				const target = event.target;
				const letter = target.innerText;
				this.alphabet[ letter ].isDeactivated = true;

				// request the server to know if the letter is in the word
				this.serviceAjax.request( this.serviceAjax.isInURL + this.idWord + '/' + letter )
					.then( res => {
						const inWord = res.in;
						if( !inWord ) {
							this.fails++;
							this.currentImage = BASE_URL + '/p' + this.fails + '.gif';

							if( this.fails == MAX_FAILS ) {
								alert( 'Loose !' );
								this.setup();
							}
						} else {
							const positions = res.position;

							positions.forEach( position => {
								this.word = this.utils.replaceAt(this.word, position + 1, letter);
							} );

							if( this.utils.isWin() ) {
								alert( 'Win!' );
								this.setup();
							} 
						}

						this.update();
					} )
					.catch( error => {
						alert( error );
					} );
			}
		}
	}

	this.utils = {
		replaceAt: (s, n, t) => {
			return s.substring(0, n) + t + s.substring(n + 1, s.length );
		},
		isWin: () => {
			for(let i = 0; i < this.word.length; i++) {
				const letter = this.word.charAt( i );
				if( letter == '_' ) return false;
			}

			return true;
		}
	}


</script>

</app>