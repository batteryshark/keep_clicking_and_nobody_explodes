// Solution Handling
function modButtonSolve(buttonColor,buttonText){
    var answer = 'Answer: ';
    var numBatteries = $('input[name=numBatteries]:checked').val();
    var carLit = $('#indicatorCARYes').is(':checked');
    var frkLit = $('#indicatorFRKYes').is(':checked');

    // Solution Cases
    if(buttonColor === "blue" && buttonText === "abort"){
        answer+="Hold button.<br/>Release on number for strip:<br/>(blue:4 , yellow:5, other:1)";
        $("#modButtonOutput").html(answer);
        return;
    }
    
    if(numBatteries > 1 && buttonText === "detonate"){
        answer+="Press and Immediately Release.<br/>&nbsp;<br/>&nbsp;";
        $("#modButtonOutput").html(answer);
        return;
    }
 
    if(buttonColor === "white" && carLit){
        answer+="Hold button.<br/>Release on number for strip:<br/>(blue:4 , yellow:5, other:1)";
        $("#modButtonOutput").html(answer);
        return;
    } 
    
    if(numBatteries > 2 && frkLit){
        answer+="Press and Immediately Release.<br/>&nbsp;<br/>&nbsp;";        
        $("#modButtonOutput").html(answer);
        return;
    }

    if(buttonColor === "yellow"){
        answer+="Hold button.<br/>Release on number for strip:<br/>(blue:4 , yellow:5, other:1)";
        $("#modButtonOutput").html(answer);
        return;
    }
    
    if(buttonColor === "red" && buttonText === "hold"){
        answer+="Press and Immediately Release.<br/>&nbsp;<br/>&nbsp;";       
        $("#modButtonOutput").html(answer);
        return;        
    }
    
    answer+="Hold button.<br/>Release on number for strip:<br/>(blue:4 , yellow:5, other:1)";
    $("#modButtonOutput").html(answer);
    
}

// Init All the Buttons.
$( document ).ready(function() {
$( "#modButtonRedAbort" ).button();
$( "#modButtonBlueAbort" ).button();
$( "#modButtonYellowAbort" ).button();
$( "#modButtonWhiteAbort" ).button();
$( "#modButtonRedDetonate" ).button();
$( "#modButtonBlueDetonate" ).button();
$( "#modButtonYellowDetonate" ).button();
$( "#modButtonWhiteDetonate" ).button();
$( "#modButtonRedHold" ).button();
$( "#modButtonBlueHold" ).button();
$( "#modButtonYellowHold" ).button();
$( "#modButtonWhiteHold" ).button();
$( "#modButtonRedPress" ).button();
$( "#modButtonBluePress" ).button();
$( "#modButtonYellowPress" ).button();
$( "#modButtonWhitePress" ).button();
$( "#modButtonRedOther" ).button();
$( "#modButtonBlueOther" ).button();
$( "#modButtonYellowOther" ).button();
$( "#modButtonWhiteOther" ).button();
});

// Click Handlers
$( "#modButtonRedAbort" ).click(function(){modButtonSolve('red','abort');});
$( "#modButtonBlueAbort" ).click(function(){modButtonSolve('blue','abort');});
$( "#modButtonYellowAbort" ).click(function(){modButtonSolve('yellow','abort');});
$( "#modButtonWhiteAbort" ).click(function(){modButtonSolve('white','abort');});
$( "#modButtonRedDetonate" ).click(function(){modButtonSolve('red','detonate');});
$( "#modButtonBlueDetonate" ).click(function(){modButtonSolve('blue','detonate');});
$( "#modButtonYellowDetonate" ).click(function(){modButtonSolve('yellow','detonate');});
$( "#modButtonWhiteDetonate" ).click(function(){modButtonSolve('white','detonate');});
$( "#modButtonRedHold" ).click(function(){modButtonSolve('red','hold');});
$( "#modButtonBlueHold" ).click(function(){modButtonSolve('blue','hold');});
$( "#modButtonYellowHold" ).click(function(){modButtonSolve('yellow','hold');});
$( "#modButtonWhiteHold" ).click(function(){modButtonSolve('white','hold');});
$( "#modButtonRedPress" ).click(function(){modButtonSolve('red','press');});
$( "#modButtonBluePress" ).click(function(){modButtonSolve('blue','press');});
$( "#modButtonYellowPress" ).click(function(){modButtonSolve('yellow','press');});
$( "#modButtonWhitePress" ).click(function(){modButtonSolve('white','press');});
$( "#modButtonRedOther" ).click(function(){modButtonSolve('red','other');});
$( "#modButtonBlueOther" ).click(function(){modButtonSolve('blue','other');});
$( "#modButtonYellowOther" ).click(function(){modButtonSolve('yellow','other');});
$( "#modButtonWhiteOther" ).click(function(){modButtonSolve('white','other');});




