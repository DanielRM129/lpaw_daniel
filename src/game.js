import Enemy from "./Enemy"
import { keyPress, key } from "./keyboard"
import Hero from "./Hero"
import Cricket from "./Cricket"
import Score from "./Score"
import { loadAudio } from "./loaderAssets";


let CTX
let CANVAS
const FRAMES = 60

const qtdEnemies = 5
let points = 0;
let enemies = Array.from({length:qtdEnemies});

const orange = new Cricket((Math.random()*400) + 15,( Math.random()*350) + 15, 8, 0, 'img/cricket.png',FRAMES);
const hero = new Hero(310,100,20,5,82,89,'img/snake2.png',FRAMES)
const score = new Score(`Pontuação: ${points}`, 600);

let gameover = false
let anime;
let boundaries;

let gameOverSound;
let scoreSound;

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	
	boundaries = {
		width: CANVAS.width,
		height: CANVAS.height
	}

	enemies = enemies.map(i=>new Enemy(
			Math.random()*CANVAS.width,
			Math.random()*CANVAS.height,
			20, 5, 'img/eagle.png',FRAMES
		))

	gameOverSound = await loadAudio('sound/gameover.wav');
	scoreSound = await loadAudio('sound/eat.wav');
	  
	gameOverSound.volume = .5;
	scoreSound.volume = .5;
	
	keyPress(window)
	loop()
}

const loop = () => {
	setTimeout(() => {

		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
		score.draw(CTX)

		hero.move(boundaries, key)
		hero.draw(CTX)
		
		enemies.forEach(e =>{
			e.draw(CTX)
			e.move(boundaries, 0) 
			
			 //var = teste?verdadeiro:falso;
			 gameover = !gameover 
			 		? hero.colide(e)
					: true;
		})

		if(orange.colide(hero)) {
			scoreSound.play();
	  
			orange.x = (Math.random()*(CANVAS.width*.9 - orange.size)) + orange.size;
			orange.y = (Math.random()*(CANVAS.height*.9 - orange.size)) + orange.size;
	  
			points ++;
			score.text = `Pontuação: ${points}`;
			enemies.forEach(e =>{
				e.draw(CTX)
				e.move(boundaries, 0) 

			if(points%3 == 0) {
				e.speed +=5;	

			}})
		  }

		orange.draw(CTX);
	
		if (gameover) {
			gameOverSound.play();
			console.error('DEAD!!!')
			cancelAnimationFrame(anime)
		} else	anime = requestAnimationFrame(loop)

	}, 1000 / FRAMES)
}

export { init }