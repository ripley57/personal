
			// Our colours array.
			// Colour picker, giving you the '#nnnnnn' value: https://html-color-codes.info/
			// Enter the '#nnnnnn' value and see the colour: https://www.w3schools.com/colors/colors_hexadecimal.asp
			var colors = [];
			colors.push('#EFFBEF'); 	// Pale blue.
			colors.push('#F8E0E6'); 	// Pale purple.
			colors.push('#D8D8D8'); 	// Gray.
			colors.push('#E0F8E0');		// Pale green.
				
			var paused = false;
			function makeDiv() {
				// Creating varying size of div.
				// Sensible min 350x120
				// Sensible max 450x160
				// H max/min diff = 40
				// W max/win diff = 100
				var divsizeH = ((Math.random()*40)  + 120).toFixed();
				var divsizeW = ((Math.random()*100) + 350).toFixed();
		
				// Center the div.
				var posy = $(window).height()/2 - divsizeH/2 - 40; // Up a bit more.
				var posx = $(window).width()/2 - divsizeW/2;

				var color = colors[Math.floor(Math.random() * colors.length)]; // Pick a colour.
											
				if (paused == false) {
					// Create a new div.
					$newdiv = $('<div/>').css({
						'width'            	: divsizeW+'px',
						'height'           	: divsizeH+'px',
						'borderRadius'     	: '1em',
						'background-color' 	: color,
						'border'           	: '1px solid black',
						'box-shadow'       	: '5px 5px grey',
						'position'			: 'absolute',
						'left'     			: posx+'px',
						'top'      			: posy+'px',
						'display'  			: 'none',
						'text-align'		: 'center', 
						'font-family'		: 'arial, sans-serif, "times roman"',
						'font-size'			: 'small',
						'padding'     		: '20px 20px 20px 20px'
					}).appendTo('body').append(getDivText()).fadeIn(1000);
								
					// Auto-remove this new div after a delay, then create the next one.
					$newdiv.delay(10000).fadeOut(1000, function() {
						$(this).remove();
						makeDiv();
					});
				}
			}
			
			// Get some random text to display in the div.
			function getDivText()
			{
				var txt = "Contrary to popular belief, Lorem Ipsum is not simply random text. " +
					  "It has roots in a piece of classical Latin literature from 45 BC, " +
					  "making it over 2000 years old.";
				return txt;
			}
			
			function onDivsBtn()
			{
				var txt = $('#divs_btn').text();
				if (txt == "Pause") {
					// Pause drawing divs and change button text to "Start.
					pauseDivs();
					$('#divs_btn').text("Resume");
				}
				else {
					// Button text must be "Resume". 
					// Resume drawing divs and change button text to "Pause".
					startDivs();
					$('#divs_btn').text("Pause");
				}

			}

			function pauseDivs()
			{
				// Stop any in-progress fadeOut/fadeIn. We want to prevent a div
				// from fading-out if the user has pressed the "Pause" button.
				//
				// 1st boolean arg : clear the event queue for this element.
				// 2nd boolean arg : skip to the end of the current fadeIn/fadeOut for this element.
				$("div").last().stop(true,false);	

				paused = true;
			}
			
			function startDivs()
			{
				clearDivs();
				paused = false;
				makeDiv();
			}
			
			function clearDivs()
			{
				$('div').remove(); // Remove all divs.
			}
