<app>

	<style>
		img:hover {
			cursor: pointer;
		}

		.img-selected {
			background-color: red;
		}
	</style>



	<h3><center>Choisissez votre coup</center></h3>
	<br>
	<img each={ image, i in this.availableImages } src="{ image }" id={ i } onclick="{ this.actions.imageClick }" />

	<p>Count of computer's win : { this.computerWin } </p>
	<p>Count of me's win : { this.meWin } </p>

	<div>
		<div>
			You : <img if={ this.meLastShot } src="{ this.availableImages[this.meLastShot] }" />
		</div>

		<div>
			Computer : <img ig={ this.computerLastShot } src="{ this.availableImages[this.computerLastShot] }" />
		</div>
	</div>

	<br>
	<div>
		<p if={ this.message }>{ this.message }</p>
	</div>

<script>
	this.selectedClass = "img-selected";
	// setup the component
	this.availableImages = [ './images/ciseaux.png', './images/feuille.png', './images/pierre.png' ];
	
	// default values for the count of win for me and the computer
	this.computerWin = 0;
	this.meWin = 0;		

	// shots part1
	this.computerLastShot = null;
	this.meLastShot = null;

	// message for the win/loose
	this.message = null;

	// handler for events
	this.actions = {
		imageClick: ( event ) => {
			const image = event.target;
			this.meLastShot = parseInt( image.id );
			this.computerLastShot = this.utils.generateRandomNumber();

			if( this.meLastShot == 0 ) {
				// ciseaux for me
				if( this.computerLastShot == 1 ) {
					this.meWin++;
					this.message = "Win";
				} else if( this.computerLastShot == 2 ) {
					this.computerWin++;
					this.message = "Loose";
				}
			} else if( this.meLastShot == 1 ) {
				// feuille for me
				if( this.computerLastShot == 0 ) {
					this.computerWin++;
					this.message = "Loose";
				} else if( this.computerLastShot == 2 ) {
					this.meWin++;
					this.message = "Win";
				}
			} else {
				// pierre for me
				if( this.computerLastShot == 0 ) {
					this.meWin++;
					this.message = "Win";
				} else if( this.computerLastShot == 1) {
					this.computerWin++;
					this.message = "Loose";
				}
			}
		},
	};

	this.utils = {
		generateRandomNumber: () => {
			const min = 0;
    		max = 2;
    		return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	};


</script>

</app>