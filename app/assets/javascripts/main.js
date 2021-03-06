/*
	Photon by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1141px',  '1680px' ],
			large:    [ '981px',   '1140px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '321px',   '480px'  ],
			xxsmall:  [ null,      '320px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// = Scrolly.
		$('.scrolly').scrolly();

})(jQuery);

let translations = 0;
let translateAmount = 0;

document.addEventListener('DOMContentLoaded', () => {

	let aboutNav = document.getElementById('about-nav');
	let projectsNav = document.getElementById('projects-nav');
	let contactNav = document.getElementById('contact-nav');

	
	aboutNav.addEventListener('click', () => {
		document.getElementById('one').scrollIntoView({ behavior: 'smooth', block: 'start' })
	});

	projectsNav.addEventListener('click', () => {
		document.getElementById("two").scrollIntoView({ behavior: 'smooth', block: 'start' });
	});

	contactNav.addEventListener('click', () => {
		document.getElementById("four").scrollIntoView({ behavior: 'smooth', block: 'start' });
	});

	document.getElementById('email-form').addEventListener('submit', (e) => {
		e.preventDefault();
		let nameField = document.getElementById('name-field');
		let emailField = document.getElementById('email-field');
		let messageField = document.getElementById('message-field');

		let message = {
			name: 								nameField.value,
			email: 								emailField.value,
			message:							messageField.value
		};

		$.ajax({
			url: 'messages',
			method: 'POST',
			data: { message },
			headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') }
		}).then(response => {
			let submitAndResponse = document.getElementById('submit-and-response');
			let submitButton = document.getElementById('submit-email');
			let emailResponse = document.createElement('SPAN');
			emailResponse.innerText = response[0];
			emailResponse.id = 'email-response'

			submitAndResponse.insertBefore(emailResponse, submitButton);
			nameField.value = '';
			emailField.value = '';
			messageField.value = '';

			setTimeout(() => {
				emailResponse.remove();
			}, 10000)
		});
	});


	setInterval(() => {
		skillsAnimation();		
	}, 3000)
});

function skillsAnimation() {
	const skillsList = document.getElementById('skills-list');

	if (window.innerWidth > 1140) {
		translateAmount = -15;
	} else if (window.innerWidth > 980) {
		translateAmount = -16;
	} else if (window.innerWidth > 420) {
		translateAmount = -14;
	} else {
		translateAmount = -20;
	}

	if (translations < (skillsList.childElementCount - 5)) {
		translations += 1;
	} else {
		translations = 0;
	}

	skillsList.style.transform = `translateX(${translateAmount * translations}em)`;
}