var lx_pow = function (base, exp) {
  return "" + base + "^{" + exp + "}";
};
var lx_antlog = function (n) {
  return " antlog(" + n + ")";
};
var lx_fraction = function (num, den, index) {
  if (index == null) {
    return "\\frac{" + num + "}{ " + den + " }";
  }
  return "\\frac{" + num + "}{" + den + "_{" + index + "}}";
};
var lx_sin = function (number) {
  return "sin(" + number + ")";
};
var lx_cos = function (number) {
  return "cos(" + number + ")";
};
var lx_cosec = function (exp) {
  return "cos^{-1}(" + exp + ")";
};
var lx_acos = function (number) {
  return "arccos(" + number + ")";
};
var lx_tan = function (number) {
  return "tan(" + number + ")";
};
var lx_atan = function (number) {
  return "arctan(" + number + ")";
};
var lx_sqrt = function (number) {
  return "\\sqrt{" + number + "}";
};
var lx_unidad = function (dato, unid) {
  return "\\left [ " + dato + " \\right ]_{" + unid + "}";
};
var lx_log = function (exp) {
  return "log_{10}(" + exp + ")";
};
var lx_index = function (x, i) {
  return "" + x + "_{" + i + "}";
};
var convert = function (n) {
  return (n * Math.PI) / 180;
};
var azimutangle = function (lat, ltgs, ltgt, decimal) {
  var latex_result = [];
  var deltal;
  var xdelta = Math.abs(Math.abs(ltgs) - Math.abs(ltgt));
  //xl = Math.abs(Math.abs(Logitudsatel) - Math.abs(longitudt));
  deltal = convert(Math.abs(Math.abs(ltgs) - Math.abs(ltgt)));
  /*if (ltgt < ltgs) {
    var xdelta = ltgs - Math.abs(ltgt);
    deltal = convert(ltgs - Math.abs(ltgt));
  } else {
    var xdelta = ltgs - ltgt;
    deltal = convert(ltgs - ltgt);
  }*/

  var result =
    (Math.atan(Math.tan(deltal) / Math.sin(convert(lat))) * 180) / Math.PI;
  var latex =
    lx_pow("phi", "'") +
    "=" +
    lx_atan(
      lx_fraction(lx_tan(xdelta.toFixed(decimal)), lx_sin(lat.toFixed(decimal)))
    ) +
    "=" +
    lx_pow(result.toFixed(decimal), "o");

  //azimut calc
  //hemisferio norte
  var anglez = 0;
  result = Math.abs(result);
  var latexazimut = "";
  if (lat > 0) {
    //Oeste
    if (ltgs < 0) {
      if (Math.abs(ltgt) > Math.abs(ltgs)) {
        anglez = 180 - result;
        latexazimut = ` \\phi = 180 - ${result.toFixed(
          decimal
        )} = ${anglez.toFixed(decimal)}`;
      } else {
        //Este
        anglez = 180 + result;
        latexazimut = ` \\phi = 180 + ${result.toFixed(
          decimal
        )} = ${anglez.toFixed(decimal)}`;
      }
    } else {
      if (Math.abs(ltgt) < Math.abs(ltgs)) {
        anglez = 180 - result;
        latexazimut = ` \\phi = 180 - ${result.toFixed(
          decimal
        )} = ${anglez.toFixed(decimal)}`;
      } else {
        //Este
        anglez = 180 + result;
        latexazimut = ` \\phi = 180 + ${result.toFixed(
          decimal
        )} = ${anglez.toFixed(decimal)}`;
      }
    }
  }
  //hemisferio sur
  else if (lat < 0) {
    //Oeste
    if (ltgs < 0) {
      if (Math.abs(ltgt) > Math.abs(ltgs)) {
        anglez = result;
        latexazimut = ` \\phi = ${result.toFixed(decimal)} = ${anglez.toFixed(
          decimal
        )}`;
      } else {
        //Este
        anglez = 360 - result;
        latexazimut = ` \\phi = 360 - ${result.toFixed(
          decimal
        )} = ${anglez.toFixed(decimal)}`;
      }
    } else {
      if (Math.abs(ltgt) < Math.abs(ltgs)) {
        anglez = result;
        latexazimut = ` \\phi = ${result.toFixed(decimal)} = ${anglez.toFixed(
          decimal
        )}`;
      } else {
        //Este
        anglez = 360 - result;
        latexazimut = ` \\phi = 360 - ${result.toFixed(
          decimal
        )} = ${anglez.toFixed(decimal)}`;
      }
    }
  }

  latex_result.push(latex);
  latex_result.push(latexazimut);
  return { latex: latex_result, rsult: anglez };
};
var distance = function (lat, lng, lngsat, decimal) {
  var a = 35786;
  var b = 1.4199;
  var c = 0.4199;
  var delta = convert(Math.abs(Math.abs(lng) - Math.abs(lngsat)));
  var angle = Math.acos(Math.cos(convert(lat)) * Math.cos(delta));
  var latex_result = [];
  var form1 = lx_cos(" \\Delta L");
  var form2 = lx_cos("l");
  var latex1 =
    " \\theta ^{'}=" + lx_acos(form2 + form1) + "=" + angle.toFixed(decimal);
  var latex3 =
    "\\S=" + a + lx_sqrt(b + " - " + c + lx_cos(angle.toFixed(decimal)));

  var result = a * Math.sqrt(b - c * Math.cos(angle));
  latex3 += "=" + result.toFixed(decimal) + "[KM]";
  latex_result.push(latex1);
  latex_result.push(latex3);
  return { latex: latex_result, rsult: result };
};
var elevationangle = function (latitud, Logitudsatel, longitudt, decimal) {
  var latex_result = [];

  var re = 6378;
  var h = 42164;
  var latex1 =
    ` \\theta =` +
    lx_atan(
      lx_fraction(
        lx_cos("l") + lx_cos("\\bigtriangleup L") + "-" + re + "/" + h,
        lx_sin(lx_acos(lx_cos("\\bigtriangleup L")))
      )
    );
  latex_result.push(latex1);
  var lat = convert(latitud);
  var deltal, xl;
  xl = Math.abs(Math.abs(Logitudsatel) - Math.abs(longitudt));
  deltal = convert(Math.abs(Math.abs(Logitudsatel) - Math.abs(longitudt)));
  /*if (longitudt < Logitudsatel) {
    xl = Logitudsatel - Math.abs(longitudt);
    deltal = convert(Logitudsatel - Math.abs(longitudt));
  } else {
    xl = Logitudsatel - longitudt;
    deltal = convert(Logitudsatel - longitudt);
  }*/
  var latex2 =
    " \\theta  = " +
    lx_atan(
      lx_fraction(
        lx_cos(latitud.toFixed(decimal)) +
          lx_cos(xl.toFixed(decimal)) +
          "-" +
          re +
          "/" +
          h,
        lx_sin(lx_acos(lx_cos(xl.toFixed(decimal))))
      )
    );
  latex_result.push(latex2);
  var cosdif = Math.cos(lat) * Math.cos(deltal);

  var den = Math.sin(Math.acos(cosdif));
  var result = (Math.atan((cosdif - re / h) / den) * 180) / Math.PI;
  var latex3 =
    " \\theta = " +
    lx_atan(
      lx_fraction((cosdif - re / h).toFixed(decimal), den.toFixed(decimal))
    ) +
    "=" +
    lx_pow(result.toFixed(decimal), "o");
  latex_result.push(latex3);
  return { latex: latex_result, rsult: result };
};
/* funciones auxiliares */
var interpolation = function (p1, p2, x) {
  return ((x - p1.x) * (p2.y - p1.y)) / (p2.x - p1.x) + p1.y;
};
var findInterval = function (numbers, n) {
  if (n < numbers[0]) {
    throw "Error2 Fuera del rango minimo posible " + numbers;
  }
  if (n > numbers[numbers.length - 1]) {
    throw "Error2 Fuera del rango maximo posible " + numbers;
  }
  for (var i = 0; i < numbers.length - 1; i++) {
    if (n >= numbers[i] && n <= numbers[i + 1]) {
      return [numbers[i], numbers[i + 1]];
    }
  }
  return false;
};
var atmosfericNoise = function (f, angle, decimal) {
  var latex_result = [];
  var data = {
    4: 0.0371,
    6: 0.0408,
    12: 0.0636,
    14: 0.0791,
    20: 0.2694,
    30: 0.2498,
  };
  var Lcenit = null;
  //Interpolacion
  if (data["" + f] == undefined) {
    var psuP = findInterval(Object.keys(data), f);
    var point1 = { x: psuP[0], y: data[psuP[0]] };
    var point2 = { x: psuP[1], y: data[psuP[1]] };
    Lcenit = interpolation(point1, point2, f);
  } else {
    Lcenit = data["" + f];
  }
  var result = Lcenit * (1 / Math.sin(convert(angle)));
  var latex =
    lx_unidad(lx_index("L", "a.a."), "dB") +
    "=" +
    Lcenit +
    lx_cosec(angle.toFixed(decimal)) +
    "=" +
    result.toFixed(decimal) +
    " dB";
  latex_result.push(latex);
  return { latex: latex_result, rsult: result };
};
var getPIRE = function (power, datacal, decimal) {
  var total = 0;
  var latex_result = [];
  var latex1 = lx_unidad("PIRE", "dBw") + "=";
  var params = "";
  for (var i = 0; i < datacal.length; i++) {
    total += datacal[i];
    params += "+" + lx_unidad(datacal[i], "dB");
  }

  var result = 10 * Math.log10(power) + total;
  latex1 +=
    "10" + lx_log(power) + params + "=" + result.toFixed(decimal) + "[dBw]";
  latex_result.push(latex1);
  return { latex: latex_result, rsult: result };
};
var atmosfericFreeSpace = function (r, f, decimal) {
  var total = 20 * Math.log10(r) + 20 * Math.log10(f) + 92.44;
  var latex =
    lx_index("L", "E.L.") +
    "=20 " +
    lx_log(r.toFixed(decimal)) +
    "+ 20" +
    lx_log(f.toFixed(decimal)) +
    "+ 92.44 =" +
    total.toFixed(decimal) +
    "[dB]";
  var l_r = [];
  l_r.push(latex);
  return { latex: l_r, rsult: total };
};
var getCarrierPort = function (data) {
  var total = 0;
  for (var i = 0; i < data.length; i++) {
    total += data[i];
  }
  return total;
};
var getTe = function (t0, t, g) {
  var latex = "";
  var latex_result = [];
  if (t.length - 1 == g.length) {
    var te = 0;
    for (var i = 0; i < t.length; i++) {
      var factor = t[i];
      var den = 1;
      for (var j = 0; j < i; j++) {
        den *= Math.pow(10, g[j] / 10);
      }
      if (i < t.length - 1) {
        latex += lx_fraction(factor, den) + "+";
      } else {
        latex += lx_fraction(factor, den);
      }
      factor = factor / den;
      te += factor;
    }
    if (t0 == 0) {
      latex = "\\te=" + latex;
    } else {
      latex = "\\te=" + t0 + " + " + latex;
    }
    var final = t0 + te;
    latex += "=" + final + "[k]";
    latex_result.push(latex);
    return { latex: latex_result, rsult: final };
  }
  console.log("Los parametros no son correctos");
  return false;
};
var getAtenuadorNoiseABR = function (tk, L, c, abr, type, decimal) {
  if (type == null) {
    type = "s";
  }
  var latex_result = [];
  var result =
    tk / Math.pow(10, L / 10) + c * (1 - 1 / Math.pow(10, L / 10)) + abr;
  var latex =
    lx_index("T", type) +
    "=" +
    lx_fraction(tk, Math.pow(10, L / 10).toFixed(decimal)) +
    "+" +
    c +
    "(" +
    "1-" +
    lx_fraction(1, Math.pow(10, L / 10).toFixed(decimal)) +
    ")+" +
    abr +
    " = " +
    result.toFixed(decimal) +
    "[k]";
  latex_result.push(latex);
  return { latex: latex_result, rsult: result };
};
var getAtenuadorNoise = function (tk, L, c, F, type, decimal) {
  if (type == null) {
    type = "s";
  }
  var latex_result = [];
  var result =
    tk / Math.pow(10, L / 10) +
    c * (1 - 1 / Math.pow(10, L / 10)) +
    c * (Math.pow(10, F / 10) - 1);
  var latex =
    lx_index("T", type) +
    "=" +
    lx_fraction(tk, Math.pow(10, L / 10).toFixed(decimal)) +
    "+" +
    c +
    "(" +
    "1-" +
    lx_fraction(1, Math.pow(10, L / 10).toFixed(decimal)) +
    ")+" +
    c +
    "*[(" +
    lx_antlog((F / 10).toFixed(decimal)) +
    ") - 1]" +
    "=" +
    result.toFixed(decimal) +
    "[k]";
  latex_result.push(latex);
  return { latex: latex_result, rsult: result };
};
var getQualityFactor = function (G, TS, CO, type, decimal) {
  var ltx = "";
  var TOTAL = 0;
  for (var i = 0; i < CO.length; i++) {
    TOTAL += CO[i];
    ltx += "-" + lx_index(CO[i], "db");
  }
  if (type == null) {
    type = "";
  }
  var result = G - 10 * Math.log10(TS) + TOTAL;
  var latex_result =
    lx_unidad(lx_fraction("G", "T"), type) +
    "=" +
    lx_index(" " + G, "dB") +
    "-10*" +
    lx_log(TS) +
    ltx +
    "=" +
    result.toFixed(decimal) +
    "[dB/k]";
  return { latex: [latex_result], rsult: result };
};
var getTotalSumLose = function (data, decimal) {
  var latex1 = lx_unidad("L", "total") + "=";
  var params = "";
  var total = 0;
  for (var i = 0; i < data.length; i++) {
    total += data[i];
    params += "+" + "[" + data[i].toFixed(decimal) + "]dB";
  }
  latex1 += params + "=" + "[" + total.toFixed(decimal) + "]dB";
  return { latex: [latex1], rsult: total };
};
var getCN = function (PIRE, L, FACTOR, type, decimal) {
  var cte = 10 * Math.log10(1.38 * Math.pow(10, -23));
  var result = PIRE - L + FACTOR - cte;
  cte = Math.abs(cte);
  var latex =
    lx_unidad(lx_fraction("C", "N", 0), type) +
    "=" +
    PIRE.toFixed(decimal) +
    "-" +
    L.toFixed(decimal) +
    "+" +
    FACTOR.toFixed(decimal) +
    " + " +
    cte.toFixed(decimal) +
    "=" +
    result.toFixed(decimal) +
    "[dBHz]";
  var latex_result = [];
  latex_result.push(latex);
  return { latex: latex_result, rsult: result };
};
var getCNTotal = function (cnup, cnd, cni, decimal) {
  var latex_result = [];
  var latex1 =
    lx_fraction(1, lx_unidad(lx_fraction("C", "N", 0), "t")) +
    "=" +
    lx_fraction(1, lx_unidad(lx_fraction("C", "N", 0), "s")) +
    "+" +
    lx_fraction(1, lx_unidad(lx_fraction("C", "N", 0), "i")) +
    "+" +
    lx_fraction(1, lx_unidad(lx_fraction("C", "N", 0), "b"));
  latex_result.push(latex1);
  var data1 = Math.pow(10, cnup / 10);
  var data2 = Math.pow(10, cnd / 10);
  var data3 = Math.pow(10, cni / 10);

  var t1 = parseInt(data1);
  var t2 = parseInt(data2);
  var t3 = parseInt(data3);

  var n1 = t1.toString().length - 1;
  var n2 = t2.toString().length - 1;
  var n3 = t3.toString().length - 1;

  var floatn1 = data1 / Math.pow(10, n1);
  var floatn2 = data2 / Math.pow(10, n2);
  var floatn3 = data3 / Math.pow(10, n3);
  var exp1 = Math.pow(10, -n1);
  var exp2 = Math.pow(10, -n1);
  var exp3 = Math.pow(10, -n1);

  var s1 = exp1 / floatn1;
  var s2 = exp2 / floatn2;
  var s3 = exp3 / floatn3;
  var total = s1 + s2;
  var final = total.toString();
  var nnum = null;
  var m = final.match(/\e[\-\d]+/);
  if (m != null) {
    var number = m[0].substr(2, m[0].length);
    nnum = parseInt(number);
  } else {
    nnum = parseInt(number);
  }

  console.log(nnum);
  var latex2 =
    lx_unidad(lx_fraction("C", "N", "0"), "total") +
    "=" +
    lx_fraction(lx_pow("10", -n1), floatn1.toFixed(decimal)) +
    " + " +
    lx_fraction(lx_pow("10", -n2), floatn2.toFixed(decimal)) +
    " + " +
    " = " +
    total;
  latex_result.push(latex2);
  //console.log(latex);
  final = final * Math.pow(10, nnum);
  var expresion1 = 10 * Math.log10(Math.pow(10, nnum));
  var expresion2 = 10 * Math.log10(final);
  var finalresult = expresion1 - expresion2;
  var latex3 =
    lx_unidad(lx_fraction("C", "N", "0"), "total") +
    "=" +
    "10" +
    lx_log(lx_fraction(lx_pow(10, nnum), final.toFixed(decimal))) +
    "=" +
    expresion1.toFixed(decimal) +
    "-" +
    expresion2.toFixed(decimal) +
    "=" +
    finalresult.toFixed(decimal) +
    " dBHZ";

  latex_result.push(latex3);
  //console.log("\\frac{C}{N_{total}} = " + " \\frac{%s}",exp1, exp2);
  return { latex: latex_result, rsult: finalresult };
};
var atenuationRaindb = function (h0, angle, f, p, lat, type, decimal) {
  var latex_result = [];
  var hr = 0;
  if (0 < Math.abs(lat) && Math.abs(lat) < 36) {
    hr = 3 + 0.028 * lat;
    console.log("-------- " + hr);
  } else {
    hr = 4 - 0.075 * (lat - 36);
    console.log("-------- " + hr);
  }
  //hr = 5.1;
  var dh = Math.abs(hr - h0);
  var sen = Math.sin(convert(angle));
  var d = dh / sen;
  var latex1 =
    "\\ d=" +
    lx_fraction(dh.toFixed(decimal), sen.toFixed(decimal)) +
    "=" +
    d.toFixed(decimal) +
    "[Km]";
  latex_result.push(latex1);

  var R001 = 95;
  var exp1 = 35 * Math.pow(Math.E, -0.015 * R001);
  var exp2 = Math.cos(convert(angle));
  var exp3 = (d / exp1) * exp2;
  var latex2 =
    lx_index("r", "0.01") +
    "=" +
    lx_fraction(
      "1",
      "1+" +
        lx_fraction(d, exp3.toFixed(decimal)) +
        "*" +
        lx_cos(angle.toFixed(decimal))
    ) +
    "=";

  //console.log(exp3);
  var r001 = 1 / (1 + exp3);
  latex2 += r001;
  latex_result.push(latex2);
  //table values

  var fr = {
    1: { ah: 0.0000387, av: 0.0000352, bh: 0.912, bv: 0.88 },
    2: { ah: 0.000154, av: 0.000138, bh: 0.963, bv: 0.923 },
    4: { ah: 0.00065, av: 0.000591, bh: 1.121, bv: 1.075 },
    6: { ah: 0.00175, av: 0.00155, bh: 1.308, bv: 1.265 },
    10: { ah: 0.0101, av: 0.00887, bh: 1.276, bv: 1.264 },
    12: { ah: 0.0188, av: 0.0168, bh: 1.217, bv: 1.2 },
    14: { ah: 0.02775, av: 0.02515, bh: 1.1855, bv: 1.164 },
    15: { ah: 0.0367, av: 0.0335, bh: 1.154, bv: 1.128 },
    20: { ah: 0.0751, av: 0.0691, bh: 1.099, bv: 1.065 },
    30: { ah: 0.187, av: 1.167, bh: 1.021, bv: 1.0 },
  };
  var frain = null;
  //Interpolacion de datos
  if (fr[f + ""] == undefined) {
    var interval = findInterval(Object.keys(fr), f);

    var p1ah = { x: interval[0], y: fr[interval[0] + ""].ah };
    var p2ah = { x: interval[1], y: fr[interval[1] + ""].ah };

    var p1av = { x: interval[0], y: fr[interval[0] + ""].av };
    var p2av = { x: interval[1], y: fr[interval[1] + ""].av };

    var p1bh = { x: interval[0], y: fr[interval[0] + ""].bh };
    var p2bh = { x: interval[1], y: fr[interval[1] + ""].bh };

    var p1bv = { x: interval[0], y: fr[interval[0] + ""].bv };
    var p2bv = { x: interval[1], y: fr[interval[1] + ""].bv };
    frain = {
      ah: interpolation(p1ah, p2ah, f),
      av: interpolation(p1av, p2av, f),
      bh: interpolation(p1bh, p2bh, f),
      bv: interpolation(p1bv, p2bv, f),
    };
  } else {
    frain = fr[f + ""];
  }
  if (type == "c") {
    var ac = (frain.ah + frain.av) / 2;
    var bc = (frain.ah * frain.bh + frain.av * frain.bv) / (2 * ac);
    var latex3 =
      "\\a = " +
      lx_fraction(frain.ah + "+" + frain.av, 2 + "*" + ac) +
      "=" +
      ac;
    var latex4 =
      "\\b = " +
      lx_fraction(
        frain.ah.toFixed(4) +
          "*" +
          frain.bh.toFixed(4) +
          "+" +
          frain.av.toFixed(4) +
          "*" +
          frain.bv.toFixed(4),
        2
      ) +
      "=" +
      bc;
    console.log(latex3);
    console.log(latex4);
    latex_result.push(latex3);
    latex_result.push(latex4);
  } else if (type == "h") {
    var ac = frain.ah;
    var bc = frain.bh;
    latex_result.push(lx_index("a", "h") + "=" + ac);
    latex_result.push(lx_index("b", "h") + "=" + bc);
  } else if (type == "v") {
    var ac = frain.av;
    var bc = frain.bv;
    latex_result.push(lx_index("a", "v") + "=" + ac);
    latex_result.push(lx_index("b", "v") + "=" + bc);
  }

  //calculamos la atenuacion por lluvia
  var gama = ac * Math.pow(R001, bc);
  var latex5 =
    "\\gamma =" +
    ac.toFixed(decimal) +
    "*" +
    lx_pow(R001, bc.toFixed(decimal)) +
    "=" +
    gama.toFixed(decimal);
  //CALULO DE ATENUACION LLUVIA 0.01;
  var LL = gama * d * r001;
  var Lfinal;
  var latex6 =
    lx_index("L", "lluvia 0.01") +
    "=" +
    gama.toFixed(decimal) +
    "*" +
    d.toFixed(decimal) +
    "*" +
    r001 +
    "=" +
    LL.toFixed(decimal) +
    "[dB]";
  //ATENUACION POR LLUVIA P
  Lfinal = 0.12 * Math.pow(p, -(0.546 + 0.043 * Math.log10(p))) * LL;
  var latex7 =
    lx_index("L", "lluvia p") +
    "=" +
    "(" +
    0.12 +
    "*" +
    lx_pow(p, "-(0.546+0.043" + lx_log(p)) +
    ")" +
    LL.toFixed(decimal) +
    "=" +
    Lfinal.toFixed(decimal) +
    "[dB]";

  latex_result.push(latex5);
  latex_result.push(latex6);
  latex_result.push(latex7);
  return { latex: latex_result, rsult: Lfinal };
  //console.log(r001);
};
export {
  lx_pow,
  lx_fraction,
  lx_sin,
  lx_cos,
  lx_cosec,
  lx_acos,
  lx_tan,
  lx_atan,
  lx_sqrt,
  lx_unidad,
  lx_log,
  lx_index,
  convert,
  azimutangle,
  distance,
  elevationangle,
  atmosfericNoise,
  getPIRE,
  atmosfericFreeSpace,
  getCarrierPort,
  getTe,
  getAtenuadorNoise,
  getQualityFactor,
  getTotalSumLose,
  getCN,
  getCNTotal,
  atenuationRaindb,
  getAtenuadorNoiseABR,
};
