
  window.onload(GetSelectedTextValue(ddlleave));
    
       
    function GetSelectedTextValue(ddlleave) {
        var selectedText = ddlleave.options[ddlleave.selectedIndex].innerHTML;   //to get selected text and value from dropdown
        var selectedValue = ddlleave.value;
        document.getElementById("heading").innerHTML = selectedText ;
    }
    