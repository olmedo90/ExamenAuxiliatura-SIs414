class IndexController {
  constructor() {}
  //services
  index(request, response) {
    response.status(200).json({ msn: "HOLA MUNDO DESDE REST" });
  }
  plus(request, response) {
    var params = request.body;
    if (params.a == null) {
      response.status(300).json({ msn: "Es necesario el parametro a" });
      return;
    }
    if (params.b == null) {
      response.status(300).json({ msn: "Es necesario el parametro b" });
      return;
    }
    let c = parseInt(params.a) + parseInt(params.b);
    response.status(200).json({ msn: c });
  }
  ecuationSolve(request, response) {
    var params = request.body;
    if (params.a == null) {
      response.status(300).json({ msn: "Es necesario el parametro a" });
      return;
    }
    if (params.b == null) {
      response.status(300).json({ msn: "Es necesario el parametro b" });
      return;
    }
    if (params.c == null) {
      response.status(300).json({ msn: "Es necesario el parametro c" });
      return;
    }
    params.a = params.a.trim();
    params.b = params.b.trim();
    params.c = params.c.trim();
    if (params.a.match(/^\-{0,1}\d*\.{0,1}\d+$/g) == null) {
      response
        .status(300)
        .json({ msn: "El parametro a es incorrecto ddd.ddd" });
      return;
    }
    if (params.b.match(/^\-{0,1}\d*\.{0,1}\d+$/g) == null) {
      response.status(300).json({ msn: "El parametro b es incorrecto" });
      return;
    }
    if (params.c.match(/^\-{0,1}\d*\.{0,1}\d+$/g) == null) {
      response.status(300).json({ msn: "El parametro c es incorrecto" });
      return;
    }
    const a = parseFloat(params.a);
    const b = parseFloat(params.b);
    const c = parseFloat(params.c);
    var root = Math.pow(b, 2) - 4 * a * c;
    if (root < 0) {
      response.status(200).json({ msn: "Resultado Imaginario" });
      return;
    }
    if (root == 0) {
      var x = (-b / 2) * a;
      response.status(200).json({ x: x });
      return;
    }
    var x1 = ((-b + Math.sqrt(root)) / 2) * a;
    var x2 = ((-b - Math.sqrt(root)) / 2) * a;
    //x_{1} = \frac{-b + {\sqrt{b^2 - 4ac}}}{2a} = r
    response.status(200).json({ x1: x1, x2: x2 });
  }
  ecuationSolveImg(request, response) {
    var params = request.body;
    if (params.a == null) {
      response.status(300).json({ msn: "Es necesario el parametro a" });
      return;
    }
    if (params.b == null) {
      response.status(300).json({ msn: "Es necesario el parametro b" });
      return;
    }
    if (params.c == null) {
      response.status(300).json({ msn: "Es necesario el parametro c" });
      return;
    }
    params.a = params.a.trim();
    params.b = params.b.trim();
    params.c = params.c.trim();
    if (params.a.match(/^\-{0,1}\d*\.{0,1}\d+$/g) == null) {
      response
        .status(300)
        .json({ msn: "El parametro a es incorrecto ddd.ddd" });
      return;
    }
    if (params.b.match(/^\-{0,1}\d*\.{0,1}\d+$/g) == null) {
      response.status(300).json({ msn: "El parametro b es incorrecto" });
      return;
    }
    if (params.c.match(/^\-{0,1}\d*\.{0,1}\d+$/g) == null) {
      response.status(300).json({ msn: "El parametro c es incorrecto" });
      return;
    }
    const a = parseFloat(params.a);
    const b = parseFloat(params.b);
    const c = parseFloat(params.c);
    var root = Math.pow(b, 2) - 4 * a * c;
    if (root < 0) {
      response.status(200).json({ msn: "Resultado Imaginario" });
      return;
    }
    if (root == 0) {
      var x = (-b / 2) * a;
      response.status(200).json({ x: x });
      return;
    }
    var x1 = ((-b + Math.sqrt(root)) / 2) * a;
    var x2 = ((-b - Math.sqrt(root)) / 2) * a;
    //x_{1} = \frac{-b + {\sqrt{b^2 - 4ac}}}{2a} = r
    //x_{1} = \frac{-(234) + \sqrt{234^2 - 4-145}}{3} = -0.1921499077476625

    var format1 = `x_{1} = \frac{-(${b}) + sqrt{${b}^2 - 4${a}${c}}}{2*${a}} = ${x1}`;
    var format2 = `x_{2} = \frac{-(${b}) - sqrt{${b}^2 - 4${a}${c}}}{2*${a}} = ${x2}`;
    var service = `https://latex.codecogs.com/gif.latex?${format1},${format2}`;
    //response.
    response.status(200).json({ img: service });
  }
}
export default IndexController;
