$(document).ready(function(){
    for(var i=1;i<28;i++){
        $('#symbols'+i).button();
    }
    $('#modSymbolsReset').button();
    $('#modSymbolsSolve').button();
    
});

$("#modSymbolsReset").click(function(){
    $("#modSymbolsForm")[0].reset();
    $("#modSymbolsOutput").html("&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>");
});

$("#modSymbolsSolve").click(function(){

  var answer = "Answer: ";
  var symHTMLMap = {
    "01":"<font size=20>&#984;</font>",
    "02":"<font size=20>&#x4EC;</font>",
    "03":"<font size=20>&copy;</font>",
    "04":"<font size=20>&#1004;</font>",
    "05":"<font size=20>&Psi;</font>",
    "06":"<font size=20>&#1126;</font>",
    "07":"<font size=20>&#1148;</font>",
    "08":"<font size=20>&para;</font>",
    "09":"<font size=20>&#1660;</font>",
    "10":"<font size=20>&#411;</font>",
    "11":"<font size=20>&#1023;</font>",
    "12":"<font size=20>&#1192;</font>",
    "13":"<font size=20>&#1123;</font>",
    "14":"<font size=20>&#1154;</font>",
    "15":"<font size=20>&#990;</font>",
    "16":"<font size=20>&#1174;</font>",
    "17":"<font size=20>&#1132;</font>",
    "18":"<font size=20>&#1022;</font>",
    "19":"<font size=20>&#1237;</font>",
    "20":"<font size=20>&#9734;</font>",
    "21":"<font size=20>&#1286;</font>",
    "22":"<font size=20>&#983;</font>",
    "23":"<font size=20>&iquest;</font>",
    "24":"<font size=20>&#1135;</font>",
    "25":"<font size=20>&#1162;</font>",
    "26":"<font size=20>&#9733;</font>",
    "27":"<font size=20>&Omega;</font>"
  }
  var symDB = [
    ["01","06","10","15","17","22","11"],
    ["02","01","11","12","20","22","23"],
    ["03","07","12","16","21","10","20"],
    ["04","08","13","17","16","23","09"],
    ["05","09","13","18","08","24","26"],
    ["04","02","14","19","05","25","27"]
  ]
  var checkedVals = []
  for(var i = 1;i<28;i++){
      var currentId = "symbols"+i;

      if($('input[id='+currentId+']:checked').val()){
          checkedVals.push($('input[id='+currentId+']').val());
      }
  }
  
  if(checkedVals.length != 4){
      answer = "ERR - Must only select 4 symbols at a time.<br/>&nbsp;<br/>&nbsp;<br/>";
      $("#modSymbolsOutput").html(answer);
      return;
  }
  var solutionArr = getSolutionArr(symDB,checkedVals);
  if(solutionArr === undefined){
      answer = "ERR - Symbol Combo not in any solution.<br/>&nbsp;<br/>&nbsp;<br/>";
      $("#modSymbolsOutput").html(answer);
      return;      
  }
  var solutionHtml = "";
  for(var i=0;i<solutionArr.length;i++){
      if(checkedVals.indexOf(solutionArr[i]) > -1){
          solutionHtml+=symHTMLMap[solutionArr[i]];
      }
  }
   answer+=solutionHtml;
   $("#modSymbolsOutput").html(answer);
   return; 
   
  
  function getSolutionArr(symDB,checkedVals){
      for(var i=0;i<symDB.length;i++){
          var result = true;
          for(var j=0;j<checkedVals.length;j++){
              if(symDB[i].indexOf(checkedVals[j]) == -1){
                  result = false;
              }
          }
          if(result == false){
              continue;
          }
          else{
              return symDB[i];
          }
      }
      
  }
   
});