//Seteando el tamaño de lo que hay en el canvas.
var canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 500;

//Tamaño del canvas
canvas.style.width = 1000 + "px";
canvas.style.height = 450 + "px"; 

//Variable necesaria para dibujar las imagenes en el canvas
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

//Arreglos a usar para las cartas para todos los grupos de cartas.
var Cartas_Jugador = [];
var Cartas_Crupier = [];
var Cartas_del_Maso = [];
const grupos = ["C", "S", "D", "H"];
const Cartas_especiales =  ["Q", "J", "K", "A"];
var Indice_Cartas = 0;


//Contador para elegir un indice random de las cartas especiales, utilizado en la funcion Mostrar.
var contador = Math.floor(Math.random()*4);


//Ciclo for para generar el valor y el grupo de las cartas
for (i = 0; i < 4; i++){//Grupo de las cartas

    //Valor de las cartas
    for (j = 2; j <= 10; j++){
        Cartas_del_Maso.push(new cartas(j, grupos[i]));
    }

    //Cartas especiales (A, J, Q, K)
    for(x = 0; x < 4; x++){
        Cartas_del_Maso.push(new cartas(Cartas_especiales[x], grupos[i]))
    }
}

//Ciclo for para barajar las cartas
for (i = 0; i < 100; i++){

    Cartas_del_Maso.splice(Math.random() * 52, 0, Cartas_del_Maso[0]);
    Cartas_del_Maso.shift();
}

//Funcion para simular las cartas al reves del crupier
function CartaDeReves(Carta_Crupier){

    cartas.x = 300
    cartas.y = 20
    Carta_Crupier.image.onload = () => {

        ctx.drawImage(Carta_Crupier.image, cartas.x, cartas.y, 160, 220);
        cartas.x += 30
    };

    Carta_Crupier.image.src = "assets/images/cartavolteada.png"
}

//Funcion para dibujar las cartas del crupier
function ColocarCartaCrupier(Carta_Crupier){

    //Coordenadas de las cartas del crupier en el canvas
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
function CartasReves(){

    puntos_del_crupier = 0;

    for (i in Cartas_Crupier){

        if(Cartas_Crupier[i].valor == "J" || Cartas_Crupier[i].valor == "Q" || Cartas_Crupier[i].valor == "K"){
            
            Cartas_Crupier[i].valor = 10;
            
        }
        if(Cartas_Crupier[i].valor == "A"){

            Cartas_Crupier[i].valor = 11;
        }
        
    }

    //Colocando las cartas del crupier
    while(puntos_del_crupier < 17){

        Cartas_Crupier.push(Cartas_del_Maso[Indice_Cartas]);

        for (i in Cartas_Crupier){

            CartaDeReves(Cartas_Crupier[i]);

            if(Cartas_Crupier[i].valor == "A"){
                Cartas_Crupier[i].valor = 11;
            }
            
            if(Cartas_Crupier[i].valor == "J" || Cartas_Crupier[i].valor == "Q" || Cartas_Crupier[i].valor == "K"){
                
                Cartas_Crupier[i].valor = 10;
        
            }
        }
        puntos_del_crupier += Cartas_del_Maso[Indice_Cartas].valor;
        Indice_Cartas++;
    }
}

CartasReves();

//Funcion para repartir las cartas
function Repartir(){    
    //Calculando los puntos del jugador
    puntos_del_jugador = 0;


    // // i in Cartas_Jugador
    for (i in Cartas_Jugador){

        if(Cartas_Jugador[i].valor == "J" || Cartas_Jugador[i].valor == "Q" || Cartas_Jugador[i].valor == "K"){
            console.log("Vale 10 porque es una especial");
            Cartas_Jugador[i].valor = 10;
            console.log(Cartas_Jugador[i].valor, "Este es el especial actualizado");
        }
        if(Cartas_Jugador[i].valor == "A"){
            Cartas_Jugador[i].valor = 11;
        }
        puntos_del_jugador += Cartas_Jugador[i].valor;
    }

    //Colocando las cartas del jugador en la mesa
    if(puntos_del_jugador < 22){
        let Carta_Jugador = Cartas_del_Maso[Indice_Cartas];
        Cartas_Jugador.push(Carta_Jugador);
        ColocarCarta(Carta_Jugador);
        Indice_Cartas++;
        console.log(Carta_Jugador);
    }

    console.log(Cartas_Jugador.valor);
}

//Funcion para mostrar el resultado (Finalizar el juego).
function Mostrar(){

    //Botones mostrar y repartir desactivados despues de mostrar las cartas.
    const btnMostrar = document.getElementById("mostrar");
    btnMostrar.disabled = true;

    const btnRepartir = document.getElementById("repartir");
    btnRepartir.disabled = true;

    let puntos_del_jugador = 0;
    let puntos_del_crupier = 0;
    let resultado = document.getElementById("resultado");

    //Puntos crupier
    for(x in Cartas_Crupier){
        if(Cartas_Crupier[x].valor == "J" || Cartas_Crupier[x].valor == "Q" || Cartas_Crupier[x].valor == "K"){
            console.log("Vale 10 porque es una especial");
            Cartas_Crupier[i].valor = 10;
            console.log(Cartas_Crupier[i].valor, "Este es el especial actualizado");
        }
        if(Cartas_Crupier[i].valor == "A"){
            Cartas_Crupier[i].valor = 11;
        }
    }

    for(i in Cartas_Crupier){

        puntos_del_crupier += Cartas_Crupier[i].valor;

    }

    //Devolver el valor de la carta a una letra.
    for (i in Cartas_Crupier){

        if(Cartas_Crupier[i].valor == 11){
            Cartas_Crupier[i].valor = "A";
        }

        for(x = 0; x < Cartas_especiales.length; x++){


            if(Cartas_Crupier[i].valor == 10){

                Cartas_Crupier[i].valor = Cartas_especiales[contador]; 
            }
    
        }

        ColocarCartaCrupier(Cartas_Crupier[i]);
        
    }

    //Contar puntos jugador
    for (i in Cartas_Jugador){

         if(Cartas_Jugador[i].valor == "J" || Cartas_Jugador[i].valor == "Q" || Cartas_Jugador[i].valor == "K"){

            Cartas_Jugador[i].valor = 10;
            
        }

        if(Cartas_Jugador[i].valor == "A"){

            Cartas_Jugador[i].valor = 11;

        }

        puntos_del_jugador += Cartas_Jugador[i].valor;
        console.log(puntos_del_jugador);
    }

    //Mostrando los puntos de los jugadores 
    document.getElementById("puntos_jugador").innerHTML = puntos_del_jugador;
    document.getElementById("puntos_crupier").innerHTML = puntos_del_crupier;

    //Resultado del juego
    if(puntos_del_jugador > 21 && puntos_del_crupier <= 21 ){

        resultado.innerHTML = "Perdiste, te pasaste de puntos.";
    
    }else if(puntos_del_crupier > 21 && puntos_del_jugador < puntos_del_crupier){

        resultado.innerHTML = "Ganaste, el Crupier se pasó de puntos.";

    }else if(puntos_del_jugador > puntos_del_crupier && puntos_del_jugador <= 21){

        resultado.innerHTML = "Ganaste";

    }else if(puntos_del_jugador == puntos_del_crupier){
        resultado.innerHTML = "EMPATE";

    }else if(puntos_del_crupier > puntos_del_jugador && puntos_del_crupier <= 21){

        resultado.innerHTML = "Perdiste";

    }
}

//Funcion para iniciar el juego.
function Iniciar(){
    location.reload();
}