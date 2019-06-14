<app>

<ul>
    <card></card>
    <card each={ user in this.users } user={ user }></card>
</ul>

<script>
    this.serviceAjax = riot.mixin('serviceAjax').service;
    this.urlAPI = this.serviceAjax.url + '?page=1&results=6&nat=fr';
    this.users = [];


    this.serviceAjax.request( 'GET', this.urlAPI )
        .then( res => {
            const users = res.results;
            this.users = users;
            this.update();
        } )
        .catch( error => {
            alert( error );
        } );

</script>

</app>