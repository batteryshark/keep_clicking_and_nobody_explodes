$( document ).ready(function() {
   $('#modComplexSolve').button(); 
   $('#modComplexReset').button();
   for(var i=0;i<6;i++){
       $('#modComplexW'+i+'Red').button();
       $('#modComplexW'+i+'Blue').button();
       $('#modComplexW'+i+'Star').button();
       $('#modComplexW'+i+'Lit').button();
   }
});
$("#showComplex").click(function(){
    $("#complex").toggle();
});

$("#modComplexReset").click(function(){
    $("#modComplexReset").removeClass("ui-state-focus ui-state-hover");
    $("#modComplexForm")[0].reset();
    $("#modComplexOutput").html("&nbsp;<br/>");
});

$("#modComplexSolve").click(function(){
    var answer = "Answer: Cut Wires ";
    // NOTE: There are 16 Possible Outcomes for each wire.
    var evenSerial = $('#serialEven').is(':checked');
    console.log("YOOO");
    var hasParallel = $('#parallelPortYes').is(':checked');
    var numBatteries = $('input[name=numBatteries]:checked').val();
    var wireArr = {
        0:{},
        1:{},
        2:{},
        3:{},
        4:{},
        5:{}
    }
    
    for(var i=0;i<6;i++){
        var hasRed = $('#modComplexW'+i+"Red").is(':checked');
        var hasBlue = $('#modComplexW'+i+"Blue").is(':checked');
        var hasStar = $('#modComplexW'+i+"Star").is(':checked');
        var hasLit = $('#modComplexW'+i+"Lit").is(':checked');
        wireArr[i] = {'red':hasRed,'blue':hasBlue,'star':hasStar,'lit':hasLit};
    }

    // The Wires to Cut.
    
    var cutWires = [];
    for(var i=0;i<6;i++){
        var hasRed = wireArr[i]['red'];
        var hasBlue = wireArr[i]['blue'];
        var hasStar = wireArr[i]['star'];
        var hasLit = wireArr[i]['lit'];
        
        // C Handle 1: Nothing
        if(!hasRed && !hasBlue && !hasStar && !hasLit){
            cutWires.push(i+1);
            continue;
        }
        // C Handle 2: Star
        if(!hasRed && !hasBlue && hasStar && !hasLit){
            cutWires.push(i+1);
            continue;
        }
        // C Handle 3: Red, Star
        if(hasRed && !hasBlue && hasStar && !hasLit){
            cutWires.push(i+1);
            continue;
        }       
        // D Handles - DO NOT CUT.
        // --D Handle 1: Lit
        if(!hasRed && !hasBlue && !hasStar && hasLit){
            continue;
        }
        // --D Handle 2: Lit, Star, Red, Blue
        if(hasRed && hasBlue && hasStar && hasLit){
            continue;
        }
        // --D Handle 3: Blue, Star
        if(!hasRed && hasBlue && hasStar && !hasLit){
            continue;
        }
        // S Handles - Cut if even serial.
        // --S Handle 1: Blue
        if(!hasRed && hasBlue && !hasStar && !hasLit){
            if(evenSerial){
                cutWires.push(i+1);
            }
            continue;
        }
        // --S Handle 2: Blue, Red
        if(hasRed && hasBlue && !hasStar && !hasLit){
            if(evenSerial){
                cutWires.push(i+1);
            }
            continue;           
        }
        // --S Handle 3: Red
        if(hasRed && !hasBlue && !hasStar && !hasLit){
            if(evenSerial){
                cutWires.push(i+1);
            }
            continue;                
        }
        // --S Handle 4: Blue, Red, Lit
        if(hasRed && hasBlue && !hasStar && hasLit){
            if(evenSerial){
                cutWires.push(i+1);
            }
            continue;    
        }
        // P Handles - Cut if Parallel Port.
        
        // --P Handle 1: Lit, Blue
        if(!hasRed && hasBlue && !hasStar && hasLit){
            if(hasParallel){
                cutWires.push(i+1);
            }
            continue;
        }
        // --P Handle 2: Blue, Star, Lit
        if(!hasRed && hasBlue && hasStar && hasLit){
            if(hasParallel){
                cutWires.push(i+1);
            }
            continue;          
        }
        // --P Handle 3: Red, Blue, Star
        if(hasRed && hasBlue && hasStar && !hasLit){
            if(hasParallel){
                cutWires.push(i+1);
            }
            continue;           
        }
        // B Handles - Cut if Batteries > 1.
        // --B Handle 1: Lit, Star
        if(!hasRed && !hasBlue && hasStar && hasLit){
            if(numBatteries > 1){
                cutWires.push(i+1);
            }
            continue;
        }
        // --B Handle 2: Lit, Star, Red
        if(hasRed && !hasBlue && hasStar && hasLit){
            if(numBatteries > 1){
                cutWires.push(i+1);
            }
            continue;           
        }
        // --B Handle 3: Lit, Red
        if(hasRed && !hasBlue && !hasStar && hasLit){
            if(numBatteries > 1){
                cutWires.push(i+1);
            }
            continue;           
        }
        
    }
    answer +=cutWires;
    $("#modComplexOutput").html(answer);
});