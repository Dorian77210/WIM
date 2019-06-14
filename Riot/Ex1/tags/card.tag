<card>

	<style>



	</style>

	<div>
		<img src="{this.user.picture.medium}" />
		<h3>
			{ this.user.name.first + " " + this.user.name.last } 
		</h3>
		<p>
			{ this.user.location.street }<br />
			{ this.user.location.timezone.description }
		</p>

		<a href="mailto:{this.user.email}">{ this.user.email }</a>
	</div>

<script>
	// configuration
	this.user = opts.user;
</script>

</card>