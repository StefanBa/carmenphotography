export default class Blade {

  constructor(n, tot, svg) {
    this.n = n;
    this.theta = 2*Math.PI/tot;
    let startPoint = [Math.cos(this.theta/2), Math.sin(this.theta/2)];
    this.node = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this.node.setAttribute("points", "0,0 " + startPoint[0] + "," + startPoint[1] + " " + startPoint[0] + "," + (-startPoint[1]));
    this.node.setAttribute("style", "fill:white; opacity:0.6;" );
    this.svg = svg;
    this.svg.appendChild(this.node);
  }

  update(a) {
    a = 1.5*a;
    let translate = a*20-20;
    let rotate = a;
    let border = 0.05;
    this.node.style.transform = "rotate(" + rotate + "rad)  rotate(" + this.n*this.theta + "rad)  translate("+(border*20)+"%," + translate + "%) scale("+(1-border)+") ";
  };

  clear(){
    this.svg.removeChild(this.node);
  }

}