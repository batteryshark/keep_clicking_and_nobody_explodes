$(document).ready(function(){
   for(var i=0;i<6;i++){
    $('#modKnobs'+i).button();     
   }
   $('#modKnobsSolve').button();
   $('#modKnobsReset').button();
   
});

$("#modKnobsReset").click(function(){
    $("#modKnobsForm")[0].reset();
    $("#modKnobsOutput").html("&nbsp;");
});

$("#modKnobsSolve").click(function(){
    console.log("YOO");
    var answer = "Answer: ";
    
    var ledDB = {
        '001001':"Up",
        '001010':"Up",
        '011001':"Down",
        '000000':"Down",
        '000010':"Left",
        '101010':"Right",
        '101000':"Right",
    }
    
    var ledKeys = Object.keys(ledDB);
    var ledConfig = "";
    for(var i=0;i<6;i++){
        if($('#modKnobs'+i).is(':checked')){
            ledConfig+="1";
        }else{
            ledConfig+="0";
        }
    }
    console.log(ledConfig);
    if(ledKeys.indexOf(ledConfig) === -1){
        answer = "ERR - Input not in DB.";
    }else{
        answer+=ledDB[ledConfig];
    }

    $("#modKnobsOutput").html(answer);
    return;     
});