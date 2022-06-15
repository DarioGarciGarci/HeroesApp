import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

//https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2022/02/5-ocasiones-en-las-que-la-Bruja-Escarlata-se-transformo-n-una-villana-en-os-comi-de-arvel.jpg?resize=1280%2C1524&quality=80&ssl=1
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
