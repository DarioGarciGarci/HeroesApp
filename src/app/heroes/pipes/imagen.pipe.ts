import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

//https://i.pinimg.com/736x/fa/c0/43/fac04382be00644bcdb7282ea127de09.jpg
//https://cloudfront-us-east-1.images.arcpublishing.com/infobae/NLXD7LVC7BDA3OFMVY4Z6HYJBU.jpg
//https://i.pinimg.com/originals/10/3f/11/103f119f037c88f308cbed5e452e5fdf.jpg

  transform(heroe: Heroe): string {
    if(!heroe.id && !heroe.alt_img){
      return 'assets/no-image.png';
    } else if(heroe.alt_img){
      return heroe.alt_img;
    } else {
      return "assets/heroes/" + heroe.id + ".jpg";
    }
    
  }

}
