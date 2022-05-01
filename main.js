Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    })
}
console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/mWY8FkEz1/model.json',modelLoaded);
function modelLoaded(){
    console.log('model loaded');
}
function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_object").innerHTML=results[0].label;
        gesture=results[0].label;
        toSpeak="";
        if(gesture=="thumbs up"){
            toSpeak="This looks like Thumbs Up sign";
            document.getElementById("result_gesture").innerHTML="&#128077";
        }
        if(gesture=="victory"){
            toSpeak="This looks like Victory sign";
            document.getElementById("result_gesture").innerHTML="&#9996";
        }
        if(gesture=="wow"){
            toSpeak="This looks like Wow sign";
            document.getElementById("result_gesture").innerHTML="&#128076";
        }
        speak();
    }
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data=toSpeak;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}