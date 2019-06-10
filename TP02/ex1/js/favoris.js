const liens= [ 
	{
	nom:"Google"  ,
	url:"https://www.google.fr",
	img:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png"	
},
	{
		nom:"Le Monde",
		url:"https://www.google.fr",
		img:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Lemonde_fr_2005_logo.svg/200px-Lemonde_fr_2005_logo.svg.png?uselang=fr"

	},
	{
		nom:"L'Equipe",
		url:"https://www.lequipe.fr",
		img:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/L%27%C3%89quipe_wordmark.svg/200px-L%27%C3%89quipe_wordmark.svg.png"
	}
];

document.addEventListener( 'DOMContentLoaded', loadedEvent => {
	const ul = document.createElement( 'ul' );
	const body = document.body;

	liens.forEach( link => {
		const a = document.createElement( 'a' );
		const li = document.createElement( 'li' );
		const img = document.createElement( 'img' );
		const text = document.createTextNode( link.nom );

		img.setAttribute( 'src', link.img );
		a.setAttribute( 'href', link.url );
		a.appendChild( img );

		li.appendChild( text );
		li.appendChild( a );
		ul.appendChild( li );
	} );

	body.appendChild( ul );
} );