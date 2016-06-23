$('document').ready(function() {

	$('form.findPrice').on('submit',function(e){

		e.preventDefault();
		address = $(this).serializeArray();
		origin = address[0].value;
		destination = address[1].value;

		console.log(origin)

		// mapCoordinates(origin, destination);

		// $('.findPrice').trigger('reset');

	});

})