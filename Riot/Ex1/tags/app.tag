<app>

<form onsubmit="{this.actions.refresh}">
    <input type="submit" name="submit" value="Refresh users" />
</form>

<ul>
    <card each={ user in this.users } user={ user }></card>
</ul>

<script>
    this.serviceAjax = riot.mixin('serviceAjax').service;
    this.urlAPI = this.serviceAjax.url + '?page=1&results=6&nat=fr';
    this.users = [];

    this.actions = {
        refresh: (event = null) => {
            if(event) event.preventDefault();
            this.serviceAjax.request( 'GET', this.urlAPI )
                .then( res => {
                    const users = res.results;
                    this.users = users;
                    this.update();
                } )
                .catch( error => {
                    alert( error );
                } );
        }
    }

    this.actions.refresh();

</script>

</app>