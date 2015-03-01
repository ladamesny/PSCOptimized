$(document).ready(function(){

  $("#psc").click(function()
      {
        var thePopCode = window.open("positionsizecalculator.html", "_blank", "height=580, width=500, top=200, left=200, location=0");
        if(window.focus())
        {
          thePopCode.focus();

        } else{
          thePopCode;
        }

      });
});