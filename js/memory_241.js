var memoryDB = [];
$(document).ready(function(){
   $('#memoryNum').buttonset();
   $('#memory0').buttonset();   
   $('#memory1').buttonset();   
   $('#memory2').buttonset();   
   $('#memory3').buttonset();   
   $('#modMemorySolve').button();   
   $('#modMemoryReset').button();   
});
$("#modMemoryReset").click(function(){
    $("#modMemoryForm")[0].reset();
    memoryDB = [];
    $("#modMemoryOutput").html("&nbsp;");
    $("#modMemoryStage").html("Stage 1");
});

$("#modMemorySolve").click(function(){
    var answer = "Answer: ";
    var memSequence = []
    var screenVal = $('input[name=memoryNum]:checked').val()
    
    var roundNum = memoryDB.length;
    for(var i=0;i<4;i++){
        memSequence.push(parseInt($('input[name=memory'+i+']:checked').val()));

    }

    
    //Check for duplicates.
    console.log(memSequence);
    

    if(hasDuplicates(memSequence)){
       answer = "ERR - cannot have duplicates in sequence."
       $("#modMemoryOutput").html(answer);
       return;       
    }
    
    switch(roundNum){
    case 0:
        var result = roundOne(memoryDB,screenVal,memSequence);
        memoryDB[roundNum] = result;
        answer+= "Press "+result['label'];
        $("#modMemoryOutput").html(answer);
        $("#modMemoryStage").html("Stage 2");
        return;
    case 1:
        var result = roundTwo(memoryDB,screenVal,memSequence);
        memoryDB[roundNum] = result;
        answer+= "Press "+result['label'];
        $("#modMemoryOutput").html(answer);
        $("#modMemoryStage").html("Stage 3");
        return;
    case 2:
        var result = roundThree(memoryDB,screenVal,memSequence);
        memoryDB[roundNum] = result;
        answer+= "Press "+result['label'];
        $("#modMemoryOutput").html(answer);
        $("#modMemoryStage").html("Stage 4");
        return;
    case 3:
        var result = roundFour(memoryDB,screenVal,memSequence);
        memoryDB[roundNum] = result;
        answer+= "Press "+result['label'];
        $("#modMemoryOutput").html(answer);
        $("#modMemoryStage").html("Stage 5");
        return;
    case 4:
        var result = roundFive(memoryDB,screenVal,memSequence);
        memoryDB[roundNum] = result;
        answer+= "Press "+result['label'];
        $("#modMemoryOutput").html(answer);
        return;
    default:
        answer = "ERR - not a valid round - forgot to reset?"
        $("#modMemoryOutput").html(answer);
        return;           
    }

    function roundOne(memoryDB,screenVal,memSequence){
        var result = {'position':0,'label':0};
        if(screenVal < 3){ //Second Position
            result['position'] = 1;
            result['label'] = memSequence[1];
            return result;
        }
        if(screenVal == 3){ // Third Position
            result['position'] = 2;
            result['label'] = memSequence[2];   
            return result;            
        }
        if(screenVal == 4){ // Fourth Position
            result['position'] = 3;
            result['label'] = memSequence[3];  
            return result;
        }
        
    }
    function roundTwo(memoryDB,screenVal,memSequence){
        var result = {'position':0,'label':0};
        if(screenVal == 1){ // Button Labeled 4.
            result['position'] = memSequence.indexOf(4);
            result['label'] = 4;
            return result;
        }
        if(screenVal == 2 || screenVal == 4){ // Same position as stage 1.
            result['position'] = memoryDB[0]['position'];
            result['label'] = memSequence[memoryDB[0]['position']];
            return result;
        }
        if(screenVal == 3){ // First Position.
            result['position'] = 0;
            result['label'] = memSequence[0];
            return result;
        }
        
    }
    function roundThree(memoryDB,screenVal,memSequence){

        var result = {'position':0,'label':0};
        if(screenVal == 1){ // Same label stage2
            result['position'] = memSequence.indexOf(memoryDB[1]['label']);
            result['label'] = memoryDB[1]['label'];
            return result;
        }
        if(screenVal == 2){// Same label stage1
            result['position'] = memSequence.indexOf(memoryDB[0]['label']);
            result['label'] = memoryDB[0]['label'];
            return result;
        }
        if(screenVal == 3){ //Third Position.
            result['position'] = 2;
            result['label'] = memSequence[2];
            return result;
        }
        if(screenVal == 4){ // Button Labeled 4.
            result['position'] = memSequence.indexOf(4);
            result['label'] = 4;
            return result;
        }        
            
    }
    function roundFour(memoryDB,screenVal,memSequence){
        var result = {'position':0,'label':0};
        if(screenVal == 1){ // Same Position as stage 1.
            result['position'] = memoryDB[0]['position'];
            result['label'] = memSequence[memoryDB[0]['position']];       
            return result;
        }
        if(screenVal == 2){ // First Position.
            result['position'] = 0;
            result['label'] =  memSequence[0];        
            return result;
        }      
        if(screenVal > 2){ // Same position as stage 2.
            result['position'] = memoryDB[1]['position'];
            result['label'] = memSequence[memoryDB[1]['position']];     
            return result;
        }        
    }
    function roundFive(memoryDB,screenVal,memSequence){
        var result = {'position':0,'label':0};
        if(screenVal == 1){ // Label Stage 1
            result['position'] = memSequence.indexOf(memoryDB[0]['label']);
            result['label'] = memoryDB[0]['label'];     
            return result;
        }
        if(screenVal == 2){ // Label Stage 2
            result['position'] = memSequence.indexOf(memoryDB[1]['label']);
            result['label'] = memoryDB[1]['label'];   
            return result;
        }
        if(screenVal == 3){ // Label Stage 4
            result['position'] = memSequence.indexOf(memoryDB[3]['label']);
            result['label'] = memoryDB[3]['label'];
            return result;
        }
        if(screenVal == 4){ // Label Stage 3
            result['position'] = memSequence.indexOf(memoryDB[2]['label']);
            result['label'] = memoryDB[2]['label'];   
            return result;
        }
    }    
    
   function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
    } 
    
    
    
});
