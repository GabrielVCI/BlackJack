//Seteando el tamaño del canvas.
var canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 500;
//Presentando el canvas.
canvas.style.width = 1000 + "px";
canvas.style.height = 500 + "px"; 

var ctx = canvas.getContext('2d');

//Clase para indicar los atributos de las cartas.
class cartas{

    //coordinadas de las cartas en el canvas
    static x = 50;
    static y = 250;
    
    //constructor para indicar el valor, el grupo y la imagen de cada carta.
    constructor(valor, grupo){

        this.image = new Image();
        this.valor = valor;
        this.grupo = grupo;
    }
}

//Variables a usar para las cartas, aqui estaran las cartas del crupier, 
//del maso, del jugador, a que grupo pertenece cada carta y los indices de cada carta.
var Cartas_Jugador = [];
var Cartas_Crupier = [];
var Cartas_del_Maso = [];
const grupos = ["C", "S", "D", "H"];
var Indice_Cartas = 0;

//Ciclo for para generar el valor y el grupo de las cartas
for (i = 0; i < 4; i++){//Grupo de las cartas

    //Valor de las cartas
    for (j = 2; j <= 14; j++){
        Cartas_del_Maso.push(new cartas(j, grupos[i]));
    }
}


//Ciclo for para barajar las cartas
for (i = 0; i < 100; i++){
    Cartas_del_Maso.splice(Math.random() * 52, 0, Cartas_del_Maso[0]);
    Cartas_del_Maso.shift();
}


//Funcion para dibujar las cartas del crupier
function ColocarCartaCrupier(Carta_Crupier){

    cartas.x = 300
    cartas.y = 20
    Carta_Crupier.image.onload = () => {

        ctx.drawImage(Carta_Crupier.image, cartas.x, cartas.y, 160, 220);
        cartas.x += 30
    };

    Carta_Crupier.image.src = "assets/images/cartas/" + Carta_Crupier.valor + Carta_Crupier.grupo + ".png";

}
 
//Funcion para dibujar las cartas del jugador
function ColocarCarta(Carta_Jugador){

    cartas.y = 250
    //cargando la imagen de la carta para colocarla como src 
    Carta_Jugador.image.onload = () => {
        ctx.drawImage(Carta_Jugador.image, cartas.x, cartas.y, 160, 220);
        cartas.x += 40
    };
    Carta_Jugador.image.src = "assets/images/cartas/" + Carta_Jugador.valor + Carta_Jugador.grupo + ".png";
}

//Funcion para repartir las cartas del crupier
function RepartirCrupier(){

    puntos_del_crupier = 0;

    while(puntos_del_crupier < 17){

        Cartas_Crupier.push(Cartas_del_Maso[Indice_Cartas]);
        puntos_del_crupier += Cartas_del_Maso[Indice_Cartas].valor
        Indice_Cartas++;

    }

    for (i in Cartas_Crupier){
        ColocarCartaCrupier(Cartas_Crupier[i]);
    }

    console.log(puntos_del_crupier)
    document.getElementById("puntos_crupier").innerHTML = puntos_del_crupier;
}

RepartirCrupier();

//Funcion para repartir las cartas
function Repartir(){

    //Calculando los puntos del jugador
    puntos_del_jugador = 0;
    for (i in Cartas_Jugador){
        puntos_del_jugador += Cartas_Jugador[i].valor;
        console.log(puntos_del_jugador);  
    }

    //Colocando las cartas del jugador en la mesa
    if(puntos_del_jugador < 20){
        let Carta_Jugador = Cartas_del_Maso[Indice_Cartas];
        Cartas_Jugador.push(Carta_Jugador);
        ColocarCarta(Carta_Jugador);
        Indice_Cartas++;
        console.log(Carta_Jugador);
    }
}

//Funcion para mostrar el resultado (Finalizar el juego).
function Mostrar(){

    const btnMostrar = document.getElementById("mostrar");
    btnMostrar.disabled = true;

    const btnRepartir = document.getElementById("repartir");
    btnRepartir.disabled = true;

    let puntos_del_jugador = 0;
    let resultado = document.getElementById("resultado");

    //Contar puntos jugador
    for (i in Cartas_Jugador){
        puntos_del_jugador += Cartas_Jugador[i].valor;
        console.log(puntos_del_jugador);
    }

    document.getElementById("puntos_jugador").innerHTML = puntos_del_jugador;

    //Resultado del juego
    if(puntos_del_jugador == 21 && puntos_del_crupier != 21){

        resultado.innerHTML = "Ganaste";

    }else if(puntos_del_jugador > 21){

        resultado.innerHTML = "Perdiste, te pasaste de puntos.";
    
    }else if(puntos_del_crupier > 21){

        resultado.innerHTML = "Ganaste, el Crupier se pasó de puntos.";

    }else if(puntos_del_jugador > puntos_del_crupier){

        resultado.innerHTML = "Ganaste";

    }else if(puntos_del_jugador == puntos_del_crupier){
        resultado.innerHTML = "EMPATE";
    }
}

//Funcion para iniciar el juego.
function Iniciar(){
    location.reload();
}