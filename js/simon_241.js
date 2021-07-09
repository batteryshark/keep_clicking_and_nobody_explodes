var simonSequence = [];
$(document).ready(function(){
    $('#simonReset').button(); 
    $('#simonRed').button();
    $('#simonBlue').button();
    $('#simonGreen').button();
    $('#simonYellow').button();
});

$("#simonReset").click(function(){

    simonSequence = [];
    $("#simonOutput").html("&nbsp;<br/>");
});

$('#simonRed').click(function(){getNextColor('red');});
$('#simonBlue').click(function(){getNextColor('blue');});
$('#simonGreen').click(function(){getNextColor('green');});
$('#simonYellow').click(function(){getNextColor('yellow');});

function getNextColor(inputColor){
    var ssDB = {
        red:{
            0:{true:"Blue",false:"Blue"},
            1:{true:"Yellow",false:"Red"},
            2:{true:"Green",false:"Yellow"}
        },
        blue:{
            0:{true:"Red",false:"Yellow"},
            1:{true:"Green",false:"Blue"},
            2:{true:"Red",false:"Green"}        
        },
        green:{
            0:{true:"Yellow",false:"Green"},
            1:{true:"Blue",false:"Yellow"},
            2:{true:"Yellow",false:"Blue"}              
        },
        yellow:{
            0:{true:"Green",false:"Red"},
            1:{true:"Red",false:"Green"},
            2:{true:"Blue",false:"Red"}             
        }
    };


    var serialVowel = $('#serialVowelYes').is(':checked');
    var numStrikes = parseInt($('input[name=numStrikes]:checked').val());

    var resultColor = ssDB[inputColor][numStrikes][serialVowel];
    simonSequence.push(" "+resultColor);
    $("#simonOutput").html(simonSequence);
};
