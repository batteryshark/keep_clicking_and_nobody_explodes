$(document).ready(function(){
    for(var i=0;i<7;i++){
        $('#modSimpleW'+i+'Red').button();
        $('#modSimpleW'+i+'Blue').button();
        $('#modSimpleW'+i+'Yellow').button();
        $('#modSimpleW'+i+'White').button();
        $('#modSimpleW'+i+'Black').button();
    }
    $('#modSimpleSolve').button();
    $('#modSimpleReset').button();
});

$("#modSimpleReset").click(function(){
    $("#modSimpleForm")[0].reset();
    $("#modSimpleOutput").html("&nbsp;");
    
});

$("#modSimpleSolve").click(function(){
    var answer = "Answer: ";
    // Get the serial suffix (odd or even).
    var wireSerialSuffix = "";
    if($('#serialEven').is(':checked')){
        wireSerialSuffix = "even";
    }else{
        wireSerialSuffix = "odd";
    }
    var wiresArr = [];
    
    function checkWire(wiresArr,curWire){
        if($("#"+curWire+'Red').is(':checked')){
            wiresArr.push("red");
            return wiresArr;
        }
        if($("#"+curWire+'Blue').is(':checked')){
            wiresArr.push("blue");
            return wiresArr;
        }
        if($("#"+curWire+'Yellow').is(':checked')){
            wiresArr.push("yellow");
            return wiresArr;
        }
        if($("#"+curWire+'White').is(':checked')){
            wiresArr.push("white");
            return wiresArr;
        }
        if($("#"+curWire+'Black').is(':checked')){
            wiresArr.push("black");
            return wiresArr;
        }       
        return wiresArr;
    };
    // Get the total number of wires.
    
    
    for(var i =0;i < 7; i++){
        var wireName = "modSimpleW"+i;
        wiresArr = checkWire(wiresArr,wireName);
    }

    switch(wiresArr.length) {
        case 3:
            answer += wiresCalc3(wiresArr,wireSerialSuffix);
            break;
        case 4:
            answer += wiresCalc4(wiresArr,wireSerialSuffix);
            break;
        case 5:
            answer += wiresCalc5(wiresArr,wireSerialSuffix);
            break;
        case 6:
            answer += wiresCalc6(wiresArr,wireSerialSuffix);
            break;
        default:
            answer = "ERR - Wire count must be between 3 and 6.";
            
    }
    
    
    // Calculate answer given 3 wires.
    function wiresCalc3(wires,serialSuffix){
        if(wires.indexOf('red') === -1){
            return "Cut the Second Wire.";
        }
        
        if(wires[wires.length-1]==="white"){
            return "Cut the Last Wire.";
        }
        // Count occurence of blue wires.
        var countBlue = wires.reduce(function(n, val) {return n + (val === "blue");}, 0);
        
        if(countBlue > 1){
            return "Cut the Last Blue Wire.";
        }
        
        return "Cut the Last Wire.";
    }
    

    
    // Calculate answer given 4 wires.
    function wiresCalc4(wires,serialSuffix){
        // Count occurence of red wires.
        var countRed = wires.reduce(function(n, val) {return n + (val === "red");}, 0);
        var countBlue = wires.reduce(function(n, val) {return n + (val === "blue");}, 0);
        var countYellow = wires.reduce(function(n, val) {return n + (val === "yellow");}, 0);
        if(countRed > 1 && serialSuffix === "odd"){
            return "Cut the Last Red Wire.";
        }
        
        if(wires[wires.length-1]==="yellow" && wires.indexOf('red') === -1){
            return "Cut the First Wire.";
        }
        
        if(countBlue == 1){
            return "Cut the First Wire.";
        }
        
        if(countYellow > 1){
            return "Cut the Second Wire.";
        }
        return "Cut the Second Wire.";
    }
    // Calculate answer given 5 wires.
    function wiresCalc5(wires,serialSuffix){
        var countRed = wires.reduce(function(n, val) {return n + (val === "red");}, 0);
        var countYellow = wires.reduce(function(n, val) {return n + (val === "yellow");}, 0);

        if(wires[wires.length-1] == "black" && serialSuffix == "odd"){
            return "Cut the Fourth Wire.";
        }
        
        if(countRed == 1 && countYellow > 1){
            return "Cut the First Wire.";
        }
        
        if(wires.indexOf('black') === -1){
            return "Cut the Second Wire.";
        }
        
        return "Cut the First Wire.";
    }    
    
    // Calculate answer given 6 wires.
    function wiresCalc6(wires,serialSuffix){
        var countWhite = wires.reduce(function(n, val) {return n + (val === "white");}, 0);
        var countYellow = wires.reduce(function(n, val) {return n + (val === "yellow");}, 0);       
        
        if(wires.indexOf('yellow') === -1 && serialSuffix === "odd"){
            return "Cut the Third Wire.";
        }
        
        if(countYellow == 1 && countWhite > 1){
            return "Cut the Fourth Wire."
        }
        
        if(wires.indexOf('red') === -1){
            return "Cut the Last Wire.";
        }
        
        return "Cut the Fourth Wire.";
    }   
    
    
    
    
    $("#modSimpleOutput").html(answer);
});