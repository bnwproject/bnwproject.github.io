		// Set up the canvas context
		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');


		// variable
		let squareSize = 50;
		let x = Math.floor(canvas.width / 2) - Math.floor(squareSize / 2);
		let y = Math.floor(canvas.height / 2) - Math.floor(squareSize / 2);
		let speed = 10;
		let somaX = Math.random() * (canvas.width*0.9);
		let somaY = Math.random() * (canvas.height*0.9);
		let soma = 100;
		let somaCollected = 0; //for tracking when to make difficulty harder
		let somaLossAmount = 1;
		let die = false;


		// Set up the game loop
		let lastTimestamp = 0;
		const interval = 100;
		let direction = '';
		document.addEventListener('keydown', (event) => {
			if (event.code === 'ArrowUp') {
				direction = 'up';
			} else if (event.code === 'ArrowDown') {
				direction = 'down';
			} else if (event.code === 'ArrowLeft') {
				direction = 'left';
			} else if (event.code === 'ArrowRight') {
				direction = 'right';
			}
		});
		const update = (timestamp) => {
			if (timestamp - lastTimestamp >= interval && die == false) {
				lastTimestamp = timestamp;

				// Move the square
				if (direction === 'up') {
					y -= speed;
				} else if (direction === 'down') {
					y += speed;
				} else if (direction === 'left') {
					x -= speed;
				} else if (direction === 'right') {
					x += speed;
				}

				// Draw the square
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = 'blue';
				ctx.fillRect(x, y, squareSize, squareSize);
				
				// soma
				let img = new Image();
				img.src = 'https://bnwproject.github.io/soma.png';
				ctx.drawImage(img, somaX, somaY, 50, 50);
				
				//soma please do not do that
				soma = Math.round(soma);
				
				// timers
				ctx.font = "18px Arial";
				ctx.strokeText("Soma timer: " + soma, 10, 20);
				// timer color
				if (soma > 69) {
					ctx.fillStyle = 'green';
				} else if (soma > 49) {
					ctx.fillStyle = 'yellowgreen';
				} else if (soma > 34) {
					ctx.fillStyle = 'yellow';
				} else if (soma > 19) {
					ctx.fillStyle = 'orange';
				} else if (soma > 9) {
					ctx.fillStyle = '#FF5349';
				} else if (soma < 10) {
					ctx.fillStyle = 'red';
				}
				ctx.fillRect(10, 25, soma*3.7, 20);
				
				
				if ((x > somaX-50 && x < somaX+50)&&(y > somaY-50 && y < somaY+50)) {
					makeSoma();
				}
				//timer go down
				soma -= somaLossAmount;
				
				//check to make harder
				if (somaCollected > 25) {
					somaLossAmount = 2;
					ctx.strokeText("Soma addiction: +100%", 5, canvas.height-5);
				} else if (somaCollected > 20) {
					somaLossAmount = 1.8;
					ctx.strokeText("Soma addiction: +80%", 5, canvas.height-5);
				} else if (somaCollected > 15) {
					somaLossAmount = 1.6;
					ctx.strokeText("Soma addiction: +60%", 5, canvas.height-5);
				} else if (somaCollected > 10) {
					somaLossAmount = 1.4;
					ctx.strokeText("Soma addiction: +40%", 5, canvas.height-5);
				} else if (somaCollected > 5) {
					somaLossAmount = 1.2;
					ctx.strokeText("Soma addiction: +20%", 5, canvas.height-5);
				}
					
				//check if die
				if (soma < 0) {
					die = true;
					ctx.strokeText("You ran out of soma", canvas.width/2, canvas.height/2);
				}
			}

			// Request the next animation frame
			window.requestAnimationFrame(update);
		};
		
		
		
		// this will work
		function makeSoma() {
			somaX = Math.random() * (canvas.width*0.9);
		    somaY = Math.random() * (canvas.height*0.9);
			soma = 100;
			somaCollected++;
		}
		
		window.requestAnimationFrame(update);
