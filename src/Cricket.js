import Circle from './geometries/Circle';
import { loadImage } from "./loaderAssets";

export default class Cricket extends Circle {

	constructor(x, y, size, speed = 10, imgUrl, FRAMES) {
		super(x, y, size, speed);
    this.imgUrl = imgUrl;
    
    loadImage(imgUrl).then(img=>{
      this.img = img;
      this.cellWidth = img.naturalWidth / 2;
        this.cellHeight = img.naturalHeight/1;
    });

  this.cellX = 0;

  this.animeSprite(FRAMES);

	}
  draw(ctx) {
  ctx.drawImage(
    this.img,
    this.cellX * this.cellWidth,
    0,
    this.cellWidth,
    this.cellHeight,
    this.x + this.size*2,
    this.y + this.size*2,
    this.size * 4,
    this.size * 4
  );
}

animeSprite(FRAMES){ //Controla a animacao do sprite
  setInterval(() => {
    this.cellX = this.cellX < 1 ? this.cellX + 1 : 0;
  }, 1000 / (FRAMES/8))
}
	
}