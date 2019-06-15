<app>

	<h3><center>Nombre d'enfants</center></h3>
	<form>
		<label>Nombre d'enfants</label>
		<input name="children" type="number" ref="children" />

		<button onclick="{ this.actions.submit }">Envoyer</button>
	</form>

	<card each={ child, index in this.children } childrenNumber={ index + 1 }></card>

<script>
	this.children = [];
	this.actions = {
		submit: ( event ) => {
			event.preventDefault();
			const childrenInput = this.refs.children;
			if( childrenInput.value ) {
				const wantedChildren = parseInt( childrenInput.value );
				this.children = new Array( wantedChildren );
			}
		}
	}
</script>

</app>