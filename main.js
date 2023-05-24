derecha_x = 0;
derecha_y = 0;
izquierda_x = 0;
izquierda_y = 0;
puntuacion_izquierda = 0;
puntuacion_derecha = 0;
cancion = "";

function setup() {
    canvas = createCanvas(300, 300);
    background("green");
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();
    modelo = ml5.poseNet(video, modelo_cargado);
    modelo.on("pose", resultado_obtenido);
}

function preload() {
    cancion = loadSound("AllOfTheStars_EdSheeran.mp3");
}

function draw() {
    image(video, 0, 0, 300, 300);
    if (puntuacion_izquierda > 0.2) {
        if (izquierda_x < 100) {
            cancion.rate(4);
            document.getElementById("velocidad").innerHTML = "velocidad: 4"
        } else if (izquierda_x < 200) {
            cancion.rate(1);
            document.getElementById("velocidad").innerHTML = "velocidad 1"
        } else if (izquierda_x < 300) {
            cancion.rate(0.5);
            document.getElementById("velocidad").innerHTML = "velocidad 0.5"
        } 
        fill("black");
        circle(izquierda_x, izquierda_y, 25);
    }
    if (puntuacion_derecha > 0.2) {
        volumen = derecha_y / 300;
        volumen = 1 - volumen;
        volumen = Math.round(volumen * 100) / 100;
        cancion.setVolume(volumen);
        document.getElementById("volumen").innerHTML = "volumen:" + volumen;
        fill("blue");
        circle(derecha_x, derecha_y, 25);
    }


}

function modelo_cargado() {
    console.log("Modelo cargado");
}

function resultado_obtenido(respuesta) {
    if (respuesta.length > 0) {
        console.log(respuesta);
        izquierda_x = respuesta[0].pose.leftWrist.x;
        izquierda_y = respuesta[0].pose.leftWrist.y;
        derecha_x = respuesta[0].pose.rightWrist.x;
        derecha_y = respuesta[0].pose.rightWrist.y;
        puntuacion_izquierda = respuesta[0].pose.keypoints[9].score;
        puntuacion_derecha = respuesta[0].pose.keypoints[10].score;
    }
}

function reproducir() {
    if (!cancion.isPlaying()) {
        cancion.play();
        cancion.setVolume(0.1);
        cancion.rate(1);
    }
}

function detener() {
    cancion.stop();
}