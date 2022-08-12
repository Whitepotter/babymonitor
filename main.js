sound = "";
objects = [];
status_ = "";

function preload(){
  sound = loadSound("alarm.mp3");
}

function setup() {
  canvas = createCanvas(380,380);
  canvas.center();

  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();

  
}

function start(){
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status_ = true;
  objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380,380);
  for(i = 0;i <= objects.length;i++){
    if(objects[0].label == "person"){
      document.getElementById("status").innerHTML= "Baby detected";
      sound.stop();
    }
    else{
      document.getElementById("status").innerHTML = "Baby not detected";
      sound.play();
    }
    if(objects.length < 0){
      document.getElementById("status").innerHTML = "Nothing deteted";
      sound.play();
    }
  }
      
}
