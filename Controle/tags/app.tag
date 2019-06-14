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
		deactivate={ letter.isDeativated}>
			{ letter.value }
		</button> 
	</div>

</div>




<script>
	const BASE_URL = "./images";

	this.serviceAjax = riot.mixin( 'serviceAjax' );

	this.setup = () => {
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
			this.inGame = true;
			this.serviceAjax.request( this.serviceAjax.initURL )
				.then( res => {
					console.log( res );
				} )
				.catch( error => {

				} );
		}
	}


</script>

</app>