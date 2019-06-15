<app>

	<ul>
		<card each={ link in this.links } link={ link }></card>
	</ul>

<script>
	this.links = opts.links;
</script>

</app>