import Blade from './Blade.js'

export default class Iris {
  constructor(svg){
    this.blades = [];
    this.n_blades = 0;
    this.svg = svg;
  }

  init(startblades){
    if(startblades){
      this.n_blades = startblades;
    }
    
    for (let i = 0; i<this.n_blades; i++){
      this.blades[i] = new Blade(i,this.n_blades, this.svg);
    }
  }

  update(a){
    for (let i = 0; i<this.n_blades; i++){
      this.blades[i].update(a);
    }
  }

  clear(){
    for (let i = 0; i<this.n_blades; i++){
      this.blades[i].clear();
      this.blades[i] = null;
    }
    this.blades = [];
  }

  changeblades(i){
    this.n_blades = this.n_blades+i;
    if (this.n_blades < 3){
      this.n_blades = 3;
    }
  }
}
