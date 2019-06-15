<app>

<div id="spinner" style="visibility:hidden" class="spinner" ref="spinner"></div>
<div grid>
	<div column>
		<h3 class="_bb1">Client</h3>
		<form id="form" onsubmit="{ this.actions.submit }">

		<label>Le message à envoyer</label>
			<input name="message" type="text" placeholder="Message" id="message">
				<button type="submit">Envoyer</button>
		</form>		  
	</div>
	<div column style="overflow:auto;height:500px" >
			<h3 class="_bb1" >Messages</h3>
			<ul id="listeMessages">
				<li each={ message in this.messages }>
					{ message.content } { message.time }ms
				</li>
			</ul>	
	</div>
</div>


<script>
	this.serviceAjax = riot.mixin( 'serviceAjax' );
	this.messages = [];

	this.actions = {
		submit: ( event ) => {
			event.preventDefault();
			const target = event.target;
			const message = {
				message: target.message.value
			};

			const spinner = this.refs.spinner;
			spinner.style.visibility = 'visible';

			const oldNow = Date.now();
			this.serviceAjax.request( this.serviceAjax.SERVER_URL, message )
				.then( res => {
					spinner.style.visibility = 'hidden';
					const now = Date.now();

					const message = {
						content: res.message,
						time: now - oldNow,
					};

					this.messages.push( message );
					this.update();
				} )	
				.catch( err => {
					spinner.style.visibility = 'hidden';
					alert( err );
				} );		
		}
	};

</script>

</app>