document.getElementById("b1").addEventListener("click", e1);
document.getElementById("cleaner").addEventListener("click", cleaner);

var buttonCounter = 0;
var elCont = 0;

if (claro > 0) {
	var container = document.getElementById("cont");
	container.className = "cont2";
}

const cleaner = () => { 
	buttonCounter = 0;
}

function e1() {
	if (buttonCounter == 0) {
		buttonCounter++;
		var canvas2 = document.getElementById("micanvasB");
		var contexto2 = canvas2.getContext("2d");
		contexto2.fillStyle = "#fff";
		contexto2.fillRect(0, 0, 700, 30);

		var unid = document.getElementById("unid").value;
		document.getElementById("kosys").innerHTML = unid;

		var claro = parseInt(document.getElementById("claro").value);

		if (claro > 0) {
			var container = document.getElementById("cont");
			container.className = "cont2";
		}
		if (unid == "Sistema Internacional") {
			document.getElementById("claroR").innerHTML = claro + "m";
		} else {
			document.getElementById("claroR").innerHTML = claro + "ft";
		}

		var sup = document.getElementById("kos").value;
		document.getElementById("kosR").innerHTML = sup;

		var cha = parseInt(document.getElementById("cargas").value);
		document.getElementById("cargasR").innerHTML = cha;

		if (sup == "Soporte simple" && claro > 0) {
			document.getElementById("diagram1").className = "diagram2";
			if (unid == "Sistema Internacional") {
				document.getElementById("data").innerHTML = "L = " + claro + "m." + "<br>Cargas = " + cha + ".";
			} else {
				document.getElementById("data").innerHTML = "L = " + claro + "ft." + "<br>Cargas = " + cha + ".";
			}

			switch (cha) {
				case 1:
					if (elCont == 0) {
						//ESPECIFIQUE EL VALOR DE LA CARGA1
						var elemento = document.createElement("h2"),
							contenido = document.createTextNode("4) Especifique el valor de la carga 1:");
						elemento.appendChild(contenido);
						var padre = document.getElementById("cleaner").parentNode;
						padre.appendChild(elemento);

						//JUMPER
						var jump = document.createElement("br");
						elemento.appendChild(jump);

						//CUADRO PARA VALOR DE CARGA1
						var cuadro = document.createElement("input");
						cuadro.id = "chaval"; //Para obtener valor
						elemento.appendChild(cuadro);

						//SECTIONER
						var sec1 = document.createElement("hr");
						elemento.appendChild(sec1);

						/*ESPECIFIQUE LA DISTANCIA DE LA CARGA1 RESPECTO AL INICIO DE LA VIGA*/
						var elementoh2 = document.createElement("h2"),
							contenidoh2 = document.createTextNode("4.1) Especifique la distancia de la carga 1 respecto al inicio de la viga:");
						elementoh2.appendChild(contenidoh2);
						elementoh2.className = "elementoh2";
						padre.appendChild(elementoh2);

						//JUMPER2
						var jump2 = document.createElement("br");
						elementoh2.appendChild(jump2);

						//CUADRO PARA LA DISTANCIA DE CARGA 1
						var cuadroh2 = document.createElement("input");
						cuadroh2.id = "chadis"; //Para obtener valor
						cuadroh2.type = "range";
						cuadroh2.min = "0";
						cuadroh2.max = claro;
						elementoh2.appendChild(cuadroh2);
						elCont++;
					}
					cuadroh2.addEventListener("change", e2);
					//--------------------------------------------------------SEGUNDO EVENTO
					function e2() {
						var chaval = parseInt(document.getElementById("chaval").value);
						if (chaval >= 0 || chaval <= 0) {
							var canvas2 = document.getElementById("micanvasB");
							var contexto2 = canvas2.getContext("2d");
							contexto2.fillStyle = "#fff";
							contexto2.fillRect(0, 0, 700, 30);
							var c = 0;
							while (c == 0) {
								var x = 0;
								while (x <= 1) {
									//CREA VARIABLES PARA LOS CALCULOS
									var cha1 = document.getElementById("cha1");
									var chadis = parseInt(document.getElementById("chadis").value);
									chaval = parseInt(document.getElementById("chaval").value);

									//----------------------------------------------FLECHA_DE_CARGA
									var z = 0;
									while (z == 0) {
										var l = (673 / claro);
										var x = chadis + 1;
										contexto2.beginPath();
										contexto2.fillStyle = "red";
										contexto2.moveTo((x * l), 20);
										contexto2.lineTo((x * l), 0);
										contexto2.lineTo(((x * l) + 5), 0);
										contexto2.lineTo(((x * l) + 5), 20);
										contexto2.lineTo(((x * l) - 5), 20);
										contexto2.lineTo(((x * l) + 2.5), 29);
										contexto2.lineTo(((x * l) + 10), 20);
										contexto2.lineTo(((x * l) + 5), 20);
										contexto2.fill();
										z++;
									}

									//------------------------------------------FLECHA_DE_CARGA_END

									//DESPLIEGUE DE CALCULOS Y RESULTADOS

									var ra = (chaval * (claro - chadis)) / claro;
									var rb = (chaval * chadis) / claro;
									var v1 = (chaval * (claro - chadis)) / claro;
									var m1 = (chaval * (claro - chadis) * 0) / claro;
									var m2 = (chaval * chadis * (claro - chadis)) / claro;
									var v2 = ((-1) * chaval * chadis) / claro;
									var m3 = (chaval * chadis * (claro - chadis)) / claro;
									var m4 = (chaval * chadis * (claro - claro)) / claro;

									//____________________________________________________________GRAFICA_MF

									var canvas = document.getElementById("miCanvas"); //GRAFICO
									canvas.className = "miCanvas2";
									var contexto = canvas.getContext("2d");
									contexto.fillStyle = "#fff";
									contexto.fillRect(0, 0, 250, 250);

									//-------------------------------------EJEY
									var j = (250 / claro);
									contexto.beginPath();
									contexto.moveTo(0, 0);
									contexto.lineTo(0, (claro * j));
									contexto.stroke();

									//-------------------------------------EJEX

									contexto.beginPath();
									contexto.moveTo(0, ((claro * j) / 2));
									contexto.lineTo((claro * j), ((claro * j) / 2));
									contexto.stroke();

									//-------------------------MOMENTO FLECTOR

									if (chaval > 0) {
										contexto.beginPath();
										contexto.moveTo(0, ((claro * j) / 2));//punto(0,0)
										contexto.lineTo(chadis * j, (((claro * j) / 2) - (m2 / 10)));
										contexto.stroke();

										contexto.beginPath();
										contexto.moveTo(chadis * j, (((claro * j) / 2) - (m2 / 10)));
										contexto.lineTo((claro * j), ((claro * j) / 2));
										contexto.stroke();
									} else if (chaval < 0) {
										contexto.beginPath();
										contexto.moveTo(0, ((claro * j) / 2));//punto(0,0)
										contexto.lineTo(chadis * j, (((-1) * (m2 / 10)) + ((claro * j) / 2)));
										contexto.stroke();

										contexto.beginPath();
										contexto.moveTo(chadis * j, (((-1) * (m2 / 10)) + ((claro * j) / 2)));
										contexto.lineTo((claro * j), ((claro * j) / 2));
										contexto.stroke();
									}


									//________________________________________________________GRAFICA_MF_FIN

									//____________________________________________________________GRAFICA_EC

									var canvasv = document.getElementById("miCanvasV"); //GRAFICO
									canvasv.className = "miCanvas2V";
									var contextoV = canvasv.getContext("2d");
									contextoV.fillStyle = "#fff";
									contextoV.fillRect(0, 0, 250, 250);

									//-------------------------------------EJEY
									var j = (250 / claro)
									contextoV.beginPath();
									contextoV.moveTo(0, 0);
									contextoV.lineTo(0, (claro * j));
									contextoV.stroke();

									//-------------------------------------EJEX

									contextoV.beginPath();
									contextoV.moveTo(0, ((claro * j) / 2));
									contextoV.lineTo((claro * j), ((claro * j) / 2));
									contextoV.stroke();

									//-----------------------ESFUERZO CORTANTE

									contextoV.beginPath();
									contextoV.moveTo(0, ((claro * j) / 2));
									contextoV.lineTo(0, (((claro * j) / 2) - (v1 / 2)));
									contextoV.lineTo(chadis * j, (((claro * j) / 2) - (v1 / 2)));
									contextoV.lineTo(chadis * j, ((-1) * (v2 / 2)) + ((claro * j) / 2));
									contextoV.lineTo((claro * j), ((-1) * (v2 / 2)) + ((claro * j) / 2));
									contextoV.lineTo((claro * j), ((claro * j) / 2));
									contextoV.stroke();

									//________________________________________________________GRAFICA_EC_FIN

									if (unid == "Sistema Internacional") {
										document.getElementById("data").innerHTML = "L = " + claro + "m." + "<br>Cargas = " + cha + "." + "<br>X = " + chadis + "m." + "<br>Reaccion en A = " + ra + " KN." + "<br>Reaccion en B = " + rb + " KN." + "<br>V1 = " + v1 + "KN." + "<br>V2 = " + v2 + "KN." + "<br>M1 (" + 0 + "m) = " + m1 + "KNm." + "<br>M2 (" + chadis + "m) = " + m2 + "KNm." + "<br>M3 (" + chadis + "m) = " + m3 + "KNm." + "<br>M4 (" + claro + "m) = " + m4 + "KNm.";
									} else {
										document.getElementById("data").innerHTML = "L = " + claro + "ft." + "<br>Cargas = " + cha + "." + "<br>X = " + chadis + "ft." + "<br>Reaccion en A = " + ra + " kips." + "<br>Reaccion en B = " + rb + " kips." + "<br>V1 = " + v1 + "kips." + "<br>V2 = " + v2 + "kips." + "<br>M1 (" + 0 + "ft) = " + m1 + "kips.ft." + "<br>M2 (" + chadis + "ft) = " + m2 + "kips.ft." + "<br>M3 (" + chadis + "ft) = " + m3 + "kips.ft." + "<br>M4 (" + claro + "ft) = " + m4 + "kips.ft.";
									}

									x++;
								}
								c++;
							}
						} else {
							alert("Especifique un valor para la carga 1.");
						}
					}

					break;
				//______________________________________________________________2CHARGES				 
				case 2:
					if (cha == 2) {
						if (elCont == 0) {
							elCont++;
							document.getElementById("data").className = "dataB";
							//ESPECIFIQUE EL VALOR DE LA CARGA1
							var elemento = document.createElement("h2"),
								contenido = document.createTextNode("4) Especifique el valor de la carga 1:");
							elemento.appendChild(contenido);
							var padre = document.getElementById("cleaner").parentNode;
							padre.appendChild(elemento);

							//JUMPER
							var jump = document.createElement("br");
							elemento.appendChild(jump);

							//CUADRO PARA VALOR DE CARGA1
							var cuadro = document.createElement("input");
							cuadro.id = "chaval"; //Para obtener valor
							elemento.appendChild(cuadro);

							//SECTIONER
							var sec1 = document.createElement("hr");
							cuadro.appendChild(sec1);

							/*ESPECIFIQUE LA DISTANCIA DE LA CARGA1 RESPECTO AL INICIO DE LA VIGA*/
							var elementoh2 = document.createElement("h2"),
								contenidoh2 = document.createTextNode("4.1) Especifique la distancia de la carga 1 respecto al inicio de la viga:");
							elementoh2.appendChild(contenidoh2);
							elementoh2.className = "elementoh2";
							padre.appendChild(elementoh2);

							//JUMPER2
							var jump2 = document.createElement("br");
							elementoh2.appendChild(jump2);

							//CUADRO PARA LA DISTANCIA DE CARGA 1
							var cuadroh2 = document.createElement("input");
							cuadroh2.id = "chadis"; //Para obtener valor
							cuadroh2.type = "range";
							cuadroh2.min = "0";
							cuadroh2.max = claro;
							elementoh2.appendChild(cuadroh2);

							//SECTIONER
							var sec2 = document.createElement("hr");
							cuadroh2.appendChild(sec1);

							//ESPECIFIQUE EL VALOR DE LA CARGA2
							var elemento2 = document.createElement("h2"),
								contenido2 = document.createTextNode("5) Especifique el valor de la carga 2:");
							elemento2.appendChild(contenido2);
							padre.appendChild(elemento2);

							//JUMPER3
							var jump3 = document.createElement("br");
							elemento2.appendChild(jump3);

							//CUADRO PARA VALOR DE CARGA2
							var cuadro2 = document.createElement("input");
							cuadro.id = "chaval2"; //Para obtener valor
							chaval2 = parseInt(cuadro2.value);
							elemento2.appendChild(cuadro2);

							/*ESPECIFIQUE LA DISTANCIA DE LA CARGA2 RESPECTO AL INICIO DE LA VIGA*/
							var elemento3 = document.createElement("h2"),
								contenido3 = document.createTextNode("5.1) Especifique la distancia de la carga 2 respecto al inicio de la viga:");
							elemento3.appendChild(contenido3);
							elemento3.className = "elementoh2";
							padre.appendChild(elemento3);

							//JUMPER4
							var jump4 = document.createElement("br");
							elemento3.appendChild(jump4);

							//CUADRO PARA LA DISTANCIA DE CARGA 2
							var cuadro3 = document.createElement("input");
							cuadro3.id = "chadis2"; //Para obtener valor
							cuadro3.type = "range";
							cuadro3.min = "0";
							cuadro3.max = claro;
							elemento3.appendChild(cuadro3);
						}
						cuadroh2.addEventListener("change", e2);
						cuadro3.addEventListener("change", e2);
						//________________________________________________________________EVENTO
						function e2() {
							var c = 0;
							while (c == 0) {
								var chaval = parseInt(cuadro.value);
								var chaval2 = parseInt(cuadro2.value);
								var chadis = parseInt(cuadroh2.value);
								var chadis2 = parseInt(cuadro3.value);
								if ((chaval >= 0 || chaval <= 0) && (chaval2 >= 0 || chaval2 <= 0)) {

									var canvas2 = document.getElementById("micanvasB");//FLECHA DE CARGA(CAJA)
									var contexto2 = canvas2.getContext("2d");
									contexto2.fillStyle = "#fff";
									contexto2.fillRect(0, 0, 700, 30);
									var c = 0;

									//--------------------------FLECHA_DE_CARGA

									var z = 0;
									while (z == 0) {
										var l = (673 / claro);
										var x = chadis + 1;
										contexto2.beginPath();
										contexto2.fillStyle = "red";
										contexto2.moveTo((x * l), 20);
										contexto2.lineTo((x * l), 0);
										contexto2.lineTo(((x * l) + 5), 0);
										contexto2.lineTo(((x * l) + 5), 20);
										contexto2.lineTo(((x * l) - 5), 20);
										contexto2.lineTo(((x * l) + 2.5), 29);
										contexto2.lineTo(((x * l) + 10), 20);
										contexto2.lineTo(((x * l) + 5), 20);
										contexto2.fill();

										var x2 = chadis2 + 1;
										contexto2.beginPath();
										contexto2.fillStyle = "red";
										contexto2.moveTo((x2 * l), 20);
										contexto2.lineTo((x2 * l), 0);
										contexto2.lineTo(((x2 * l) + 5), 0);
										contexto2.lineTo(((x2 * l) + 5), 20);
										contexto2.lineTo(((x2 * l) - 5), 20);
										contexto2.lineTo(((x2 * l) + 2.5), 29);
										contexto2.lineTo(((x2 * l) + 10), 20);
										contexto2.lineTo(((x2 * l) + 5), 20);
										contexto2.fill();
										z++;
									}
									//----------------------FLECHA_DE_CARGA_END

									//DESPLIEGUE DE CALCULOS Y RESULTADOS
									if (chadis <= chadis2) {
										var ra = ((chaval * (claro - chadis)) + (chaval2 * (claro - chadis2))) / claro;
										var rb = ((chaval * chadis) + (chaval2 * (claro - (claro - chadis2)))) / claro;
										var v1 = ra;
										var v2 = ra - chaval;
										var v3 = ra - chaval - chaval2;
										var m1 = ra * 0;
										var m2 = ra * chadis;
										var m3 = ra * chadis;
										var m4 = ((ra * chadis2) - (chaval * (chadis2 - chadis)));
										var m5 = ((ra * chadis2) - (chaval * (chadis2 - chadis)));
										var m6 = ((ra * claro) - (chaval * (claro - chadis)) - (chaval2 * (claro - chadis2))) * 0;
									} else if (chadis > chadis2) {
										var ra = ((chaval * (claro - chadis)) + (chaval2 * (claro - chadis2))) / claro;
										var rb = ((chaval * chadis) + (chaval2 * (claro - (claro - chadis2)))) / claro;
										var v1 = ra;
										var v2 = ra - chaval2;
										var v3 = ra - chaval2 - chaval;
										var m1 = ra * 0;
										var m2 = ra * chadis2;
										var m3 = ra * chadis2;
										var m4 = ((ra * chadis) - (chaval2 * (chadis - chadis2)));
										var m5 = ((ra * chadis) - (chaval2 * (chadis - chadis2)));
										var m6 = ((ra * claro) - (chaval2 * (claro - chadis2)) - (chaval * (claro - chadis))) * 0;
									}

									//____________________________________________________________GRAFICA_MF

									var canvas = document.getElementById("miCanvas"); //GRAFICO
									canvas.className = "miCanvas2";
									var contexto = canvas.getContext("2d");
									contexto.fillStyle = "#fff";
									contexto.fillRect(0, 0, 250, 250);

									//-------------------------------------EJEY
									var j = (250 / claro);
									contexto.beginPath();
									contexto.moveTo(0, 0);
									contexto.lineTo(0, (claro * j));
									contexto.stroke();

									//-------------------------------------EJEX

									contexto.beginPath();
									contexto.moveTo(0, ((claro * j) / 2));
									contexto.lineTo((claro * j), ((claro * j) / 2));
									contexto.stroke();

									//-------------------------MOMENTO FLECTOR
									if (chaval > 0 && chaval2 > 0) {
										if (chadis2 >= chadis) {
											contexto.beginPath();
											contexto.moveTo(0, ((claro * j) / 2));//punto(0,0)
											contexto.lineTo(chadis * j, (((claro * j) / 2) - (m2 / 50)));
											contexto.stroke();

											contexto.beginPath();
											contexto.moveTo(chadis * j, (((claro * j) / 2) - (m2 / 50)));
											contexto.lineTo(chadis2 * j, (((claro * j) / 2) - (m4 / 50)));
											contexto.stroke();

											contexto.beginPath();
											contexto.moveTo(chadis2 * j, (((claro * j) / 2) - (m4 / 50)));
											contexto.lineTo((claro * j), (claro * j) / 2);
											contexto.stroke();
										} else if (chadis2 <= chadis) {
											contexto.beginPath();
											contexto.moveTo(0, ((claro * j) / 2));//punto(0,0)
											contexto.lineTo(chadis2 * j, (((claro * j) / 2) - (m2 / 50)));
											contexto.stroke();

											contexto.beginPath();
											contexto.moveTo(chadis2 * j, (((claro * j) / 2) - (m2 / 50)));
											contexto.lineTo(chadis * j, (((claro * j) / 2) - (m4 / 50)));
											contexto.stroke();

											contexto.beginPath();
											contexto.moveTo(chadis * j, (((claro * j) / 2) - (m4 / 50)));
											contexto.lineTo((claro * j), (claro * j) / 2);
											contexto.stroke();
										}
									}


									//________________________________________________________GRAFICA_MF_FIN
									//____________________________________________________________GRAFICA_EC

									var canvasv = document.getElementById("miCanvasV"); //GRAFICO
									canvasv.className = "miCanvas2V";
									var contextoV = canvasv.getContext("2d");
									contextoV.fillStyle = "#fff";
									contextoV.fillRect(0, 0, 250, 250);

									//-------------------------------------EJEY
									var j = (250 / claro);
									contextoV.beginPath();
									contextoV.moveTo(0, 0);
									contextoV.lineTo(0, (claro * j));
									contextoV.stroke();

									//-------------------------------------EJEX

									contextoV.beginPath();
									contextoV.moveTo(0, ((claro * j) / 2));
									contextoV.lineTo((claro * j), ((claro * j) / 2));
									contextoV.stroke();

									//-----------------------ESFUERZO CORTANTE
									if (chadis2 >= chadis) {
										contextoV.beginPath();
										contextoV.moveTo(0, ((claro * j) / 2));
										contextoV.lineTo(0, (((claro * j) / 2) - (v1 / 5)));
										contextoV.lineTo(chadis * j, (((claro * j) / 2) - (v1 / 5)));
										contextoV.lineTo(chadis * j, ((-1) * (v2 / 5)) + ((claro * j) / 2));
										contextoV.lineTo(chadis2 * j, ((-1) * (v2 / 5)) + ((claro * j) / 2));
										contextoV.lineTo(chadis2 * j, ((-1) * (v3 / 5)) + ((claro * j) / 2));
										contextoV.lineTo((claro * j), ((-1) * (v3 / 5)) + ((claro * j) / 2));
										contextoV.lineTo((claro * j), (claro * j) / 2);
										contextoV.stroke();
									} else if (chadis >= chadis2) {
										contextoV.beginPath();
										contextoV.moveTo(0, ((claro * j) / 2));
										contextoV.lineTo(0, (((claro * j) / 2) - (v1 / 5)));
										contextoV.lineTo(chadis2 * j, (((claro * j) / 2) - (v1 / 5)));
										contextoV.lineTo(chadis2 * j, ((-1) * (v2 / 5)) + ((claro * j) / 2));
										contextoV.lineTo(chadis * j, ((-1) * (v2 / 5)) + ((claro * j) / 2));
										contextoV.lineTo(chadis * j, ((-1) * (v3 / 5)) + ((claro * j) / 2));
										contextoV.lineTo((claro * j), ((-1) * (v3 / 5)) + ((claro * j) / 2));
										contextoV.lineTo((claro * j), (claro * j) / 2);
										contextoV.stroke();
									}
									//_______________________________________________________GRAFICA_EC_FIN


									if (unid == "Sistema Internacional") {
										document.getElementById("data").innerHTML = "L = " + claro + "m." + "<br>Cargas = " + cha + "." + "<br>X1 = " + chadis + "m." + "<br>X2 = " + chadis2 + "m." + "<br>Reaccion en A = " + ra + " KN." + "<br>Reaccion en B = " + rb + " KN." + "<br>V1 = " + v1 + "KN." + "<br>V2 = " + v2 + "KN." + "<br> V3 = " + v3 + "KN." + "<br>M1 (" + 0 + "m) = " + m1 + "KNm." + "<br>M2 (" + chadis + "m) = " + m2 + "KNm." + "<br>M3 (" + chadis + "m) = " + m3 + "KNm." + "<br>M4 (" + chadis2 + "m) = " + m4 + "KNm." + "<br>M5 (" + chadis2 + "m) = " + m5 + "KNm." + "<br>M6 (" + claro + "m) = " + m6 + "KNm.";
									} else {
										document.getElementById("data").innerHTML = "L = " + claro + "ft." + "<br>Cargas = " + cha + "." + "<br>X1 = " + chadis + "ft." + "<br>X2 = " + chadis2 + "ft." + "<br>Reaccion en A = " + ra + " kips." + "<br>Reaccion en B = " + rb + " kips." + "<br>V1 = " + v1 + "kips." + "<br>V2 = " + v2 + "kips." + "<br> V3 = " + v3 + "kips." + "<br>M1 (" + 0 + "ft) = " + m1 + "kips.ft." + "<br>M2 (" + chadis + "ft) = " + m2 + "kips.ft." + "<br>M3 (" + chadis + "ft) = " + m3 + "kips.ft." + "<br>M4 (" + chadis2 + "ft) = " + m4 + "kips.ft." + "<br>M5 (" + chadis2 + "ft) = " + m5 + "kips.ft." + "<br>M6 (" + claro + "ft) = " + m6 + "kips.ft.";
									}

								} else {
									alert("Especifique valor para todas las cargas.");
								}
								c++;
							}
						}
					}
					//___________________________________________________________EVENTO_FIN
					break;


			}

			/*
			unid: sistema de unidades
			sup: tipo de soporte
			claro: longitud de viga
			cha: numero de cargas
			chaval: valor de la carga
			chadis: distancia de la carga
			*/
		}
	} else {
		alert("Refresque la pagina para modificar los items 1, 2 y 3.");
	}
}
