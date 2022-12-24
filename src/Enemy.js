import Circle from "./geometries/Circle";
import { loadImage } from "./loaderAssets";


export default class Enemy extends Circle{
	constructor(x, y, size, speed = 10, imgUrl, FRAMES) {
		super(x,y,size,speed)
		this.line = 1
		
		loadImage(imgUrl).then(img=>{
				this.img = img;
				this.cellWidth = img.naturalWidth / 3;
		  		this.cellHeight = img.naturalHeight/4;
			});
	
		this.cellX = 0;
	
		this.animeSprite(FRAMES);
		// console.log('enemy',this) 
	}

	draw(ctx) {
    

		ctx.drawImage(
				this.img,
				this.cellX * this.cellWidth,
				0,
				this.cellWidth,
				this.cellHeight,
				this.x - this.size*2,
				this.y - this.size*2,
				this.size * 4,
				this.size * 4
			);
	  }
	
	  animeSprite(FRAMES){ //Controla a animacao do sprite
			setInterval(() => {
				this.cellX = this.cellX < 2 ? this.cellX + 1 : 0;
			}, 1000 / (FRAMES/8))
		}

	move(limits){
		this.y +=this.speed
		this.limits(limits)
	}

	limits(limits){

		if(this.y - this.size > limits.height ){
			this.y = -2*this.size
			this.x = Math.random()*limits.width;
		}
	}
}







