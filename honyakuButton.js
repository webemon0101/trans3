
const startBtn=document.querySelector('#start-btn');
const repBtn = document.querySelector('#rep-btn');
const transBtn = document.querySelector('#trans-btn');
const reverseBtn = document.querySelector('#reverse-btn');

const resultDiv = document.querySelector('#result-div');
const japaneseDiv = document.querySelector('#input-div');

const inputselector = document.getElementById('inputtag');
const outputselector = document.getElementById('outputtag');

var inputTag = document.getElementById('inputtag2').jap.value;
var outputTag = document.getElementById('outputtag2').eng.value;
var translatedSentense = '';
var originalSentense = '';

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
var recognition = new SpeechRecognition();
recognition.lang = inputTag;
recognition.interimResults = true;
recognition.continuous = false;

function translate(scripttext){
    let urladd='https://script.google.com/macros/s/AKfycbxn85uDVijnIBFqQEeP13_4I5DrwivCHZq7BaZRPjSxlhiS3r52USbL0MpNxDBDRPon/exec?text='
    let urlsequence=urladd+scripttext+'&souce='+inputTag+'&target='+outputTag;
    fetch(urlsequence)
    .then(rresponse=>{
        return rresponse.text();
    })
    .then(ttext=>{
        resultDiv.innerHTML=ttext;
        speechSynthesis.cancel();
        translatedSentense = ttext;
        multispeaknow(translatedSentense,outputTag);
        recognition.stop();
    });
}

document.getElementById('inputtag2').onchange = function(){
    inputTag=document.getElementById('inputtag2').jap.value;
    recognition.lang = inputTag;
}

document.getElementById('outputtag2').onchange = function(){
    outputTag=document.getElementById('outputtag2').eng.value;
}

recognition.onresult = (event) => {
    speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
    }
    if(event.results[0].isFinal){
        originalSentense=event.results[0][0].transcript;
        japaneseDiv.innerHTML=originalSentense;
        //document.forms["input"].elements["elem"].value=originalSentense;
        translate(originalSentense);
    }
}

startBtn.onclick = () => {
    recognition.stop();
    recognition.lang = inputTag;
    speechSynthesis.cancel();
    recognition.start();
}

repBtn.onclick = () => {
    speechSynthesis.cancel();
    multispeaknow(translatedSentense,outputTag);
}

transBtn.onclick =() =>{
    translate(originalSentense);
}

reverseBtn.onclick =() =>{
    var option_states = document.querySelectorAll("select[name=jap] option");
    for (var state of option_states){
        if(state.value===outputTag){
            state.selected = true;
        }else{
            state.selected = false;
        }
    }
    var option_states2 = document.querySelectorAll("select[name=eng] option");
    for (var state of option_states2){
        if(state.value===inputTag){
            state.selected = true;
        }else{
            state.selected = false;
        }
    }
    inputTag=document.getElementById('inputtag2').jap.value;
    outputTag=document.getElementById('outputtag2').eng.value;
    recognition.stop();
    recognition.lang = inputTag;
    speechSynthesis.cancel();
    recognition.start();

}
