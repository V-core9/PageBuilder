// Form input printing functions 

// Single Call to print all by using type 
// var type == text || number || email || color 
// var inp_id == id it will get 
// var val == value to be added || will be empty
function printAdvInputByType( type, inp_id, name = null, val = null, call = null ){
    switch(type) {
        case "text":
          return printAdvInputText( inp_id, name, val );
          break;
        case "number":
          return printAdvInputNumber( inp_id, name, val );
          break;
        default:
          console.log('Missing type in printAdvInputByType(type, inp_id)');
      }
}
//!!

function printAdvInputText(  inp_id, name = null, val = null, call = null  ){
    return  `<div class="singleOption" id="`+inp_id+`">
                <p>`+((name == null) ? 'Missing Name' : name)+`</p>
                <div class="singleTextInput">
                    <input type='text' id='`+inp_id+`-val' oninput='if (this.value != "") { document.getElementById("`+inp_id+`-button").style.opacity = "1"; } else { document.getElementById("`+inp_id+`-button").style.opacity = "0"; }' value="`+((val == null) ? '' : val)+`"   onchange='`+call+`()'>
                    <button id='`+inp_id+`-button' onclick='document.getElementById("`+inp_id+`-val").value = ""; this.style.opacity = "0";' style='opacity: 0;'>X</button>
                </div>
            </div>`;
}

function printAdvInputNumber(  inp_id, name = null, val = null, call = null  ){
    return  `<div class="singleOption" id="`+inp_id+`">
                <p>`+((name == null) ? 'Missing Name' : name)+`</p>
                <div class="singleTextInput">
                    <input type='number' id='`+inp_id+`-val' min='1' max='800' step='1' value='`+((val == null) ? '' : val)+`'   onchange='`+call+`()'>
                    <input type='range' id='`+inp_id+`-slider' min='1' max='800' step='1'  value='`+((val == null) ? '' : val)+`'   oninput='document.getElementById("`+inp_id+`-val").value = this.value; `+call+`(); '>
                </div>
            </div>`;
}