"use strict";

let clearHis = [];
let curentHis = '';
var screen = document.getElementById('calculator-screen');
var bord = document.getElementById('calculator-bord');


window.onload = () => {
    screen.onpaste = e => e.preventDefault();
    screen.onkeypress = (event) =>{
        if(event.charCode >= 48 && event.charCode <= 57){ 
            return true; 
        }else if(event.charCode == 8 || event.charCode == 37 ||event.charCode == 42 || event.charCode == 43 || event.charCode == 45 || event.charCode == 46 || event.charCode == 47 ){
            return true; 
        }else{
            return false;
        }
    }
}

function BtnClick(value){
    document.dispatchEvent(new KeyboardEvent("keypress", { key: value }));
}

window.addEventListener("load", () => {    
    document.onkeypress = (event) =>{
        KeyPress(event);
    }

    function KeyPress(event) {    
            var screen = document.getElementById('calculator-screen');      
            if(event.key == '%'){
                autoResult(event.key);
                btnFocus(event.key);
                setInterval(function(){ document.getElementById('calculator-screen').focus(); }, 500);            
            }else if(event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/' ){
                var old_value = screen.value;
                var lastch = old_value.charAt(old_value.length - 1);
                if(old_value.length == 0 || old_value.length < 1){
                    if(event.key != '-' || old_value.length == 1){
                        return false;
                    }else{
                        keyWrite(event);                 
                    }
                }else{
                    if(lastch == '+' || lastch == '-' || lastch == '*' || lastch == '/' ){  
                        var rm = old_value.substring(0, old_value.length - 1);
                        screen.value = rm + event.key;           
                        return false;
                    }
                    if(myEval(screen.value).length < 3){
                        keyWrite(event);   
                    }else{
                        if(!event.keyCode){
                            autoResult(event.key);
                        }else{
                                autoResult();
                        }                
                    }
                }                 
                
            }else if(event.key == '.'){  
                var arrle = myEval(screen.value).length;
                var findot = screen.value.indexOf(".");
                if(findot == -1 && arrle == 1){
                    keyWrite(event);   
                }else if(arrle >= 2){
                    var ind2 = myEval(screen.value)[2].toString();
                    var ind2 = ind2; 
                    var ind2len = (ind2.match(/./g) || []).length;
                    var lastch = screen.value.slice(-1);
                    var firch = screen.value.slice(2);
                    var lastch2 = screen.value.slice(-2);
                    if(ind2.indexOf(".") == -1 && lastch != '.' && firch != '0.' && lastch2 != '.0'){
                        keyWrite(event);                  
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }else if(event.key == '0'){
                var old_value = screen.value;
                var arrle = myEval(screen.value).length;
                var firstch = old_value.charAt(0);
                var lastch = old_value.charAt(old_value.length - 1);
                if(firstch == '0' && lastch == '0' && old_value.length == 1){
                    return false;
                }else if(arrle > 1){
                    var ind2 = myEval(screen.value)[2].toString();
                    var lastch = screen.value.slice(-1);
                    var firstch = ind2.slice(0);
                    if(firstch == 0 && lastch == '0' && ind2.length == 1){
                        return false;
                    }else{
                        keyWrite(event);   
                    }
                }
                else{
                    keyWrite(event);   
                }         
                
            }else{
                keyWrite(event);           
            }
    };
});



document.onkeydown = function(event){
    if(event.which == 46){
        ClearScreen();
        btnFocus('AC');
        screenFocus();
    }else if(event.which == 8){
        ClearChar();
        btnFocus('⌫');
        screenFocus();
    }else if(event.which === 13){
        result();
        btnFocus('=');
        screenFocus();
    }
}

function btnFocus(thkey){
    var Months = document.getElementsByClassName("btn");        
    for (var i = 0; i < Months.length; i++) {
        var mys = '';
        mys += Months[i].innerHTML;
        if(mys == thkey){
            Months[i].focus();
        }
    }
}

function screenFocus(){
    setInterval(function(){ document.getElementById('calculator-screen').focus(); }, 500); 
}

function keyWrite(event){
    if(!event.keyCode)
    {
        document.querySelector("#calculator-screen").value += event.key; 
        document.querySelector("#calculator-screen").focus();
    }
}

function ClearScreen(){
  var val = bord.innerHTML;  
   if(val != 0){
       clearHis.push(val);
   }
  curentHis = '';
  screen.value = '';
  bord.innerHTML = '';
  screen.focus();
}

function ClearChar(){
    var old_value = screen.value;
    var rm = old_value.substring(0, old_value.length - 1);
    screen.value = rm;
}

function result(){
    var total = screen.value;   
    var valArr = myEval(screen.value)
    var lastch = total.charAt(total.length - 1);
    if(valArr.length < 1 || lastch == '+' || lastch == '-' || lastch == '*' || lastch == '/' ){
        screen.value = screen.value;
    }else{
        autoResult();
    }
   var val = bord.innerHTML;  
   if(val != 0){
       clearHis.push(val + '=' + calculation(myEval(total)));
   }
}

function ChangeValue(){
    var old_value = screen.value;
    var rm = old_value[0]
    if(rm >= 0 && rm <= 9){
        screen.value = '-'+old_value;
    }else{
        old_value = old_value.replace("-", "");
        screen.value = old_value;
    }
}

function autoResult(LstOpt){
    var valArr = myEval(screen.value)
    if(LstOpt == '%' || screen.value.toString().includes('e') == true){
        var total = screen.value;
        if(screen.value.toString().includes('e') == true){
             total = parseFloat(total)
        }else{
            total = calculation(myEval(total))
        }
        var par = total/100;
        if(total){
            if(valArr.length == 3){ 
                var valu = myEval(screen.value);
                var first = valu[0];
                var midd = valu[1];
                var last = valu[2];
                curentHis += first + midd +last/100;
            }else{  
                if(bord.innerHTML != '' && myEval(bord.innerHTML).length > 1 || screen.value.toString().includes('e') == true){
                    curentHis += "," +par; 
                }else{
                    curentHis = par; 
                }
            }  
            bord.innerHTML = curentHis;
            screen.value = par;
            screenFocus();  
        
        }
    }else if(valArr.length == 3){
            if(bord.innerHTML != 0){
                var last = myEval(screen.value).slice(-2).toString();
                curentHis += last.replaceAll(",", "");
            }else{
                curentHis += screen.value;
            }
            bord.innerHTML = curentHis;
            var curent = calculation(valArr);
            if(LstOpt){
                screen.value = curent + LstOpt;
                screen.focus();
            }else{
                screen.value = curent;
                screen.focus();
            }     
    }
}

// eval function same use in custom create function
function myEval(str) {
    var valarray = [],
    current = '';
    for(var i=0, ch; ch= str.charAt(i); i++){
        if('%*/+-'.indexOf(ch) > -1){
            if (current == '' && ch == '-') {
                current = '-';
            } else {
            valarray.push(parseFloat(current), ch);
            current = '';
            }
        }
        else{
            current += str.charAt(i);
        }       
    } 
    if (current != '') {
        valarray.push(parseFloat(current));
    }
    return valarray;
}


function calculation(calc){  
    var val = '';
    for (var i in calc){
        val += calc[i];
    }
    return eval(val);

}

// function calculation(calc){
//       // --- Perform a calculation expressed as an array of operators and numbers
//       var ops = [{
//             '^': (a, b) => Math.pow(a, b)
//           },
//           {
//             '*': (a, b) => a * b,
//             '/': (a, b) => a / b
//           },
//           {
//             '+': (a, b) => a + b,
//             '-': (a, b) => a - b
//           }
//         ],
//         newCalc = [],
//         currentOp;
//       for (var i = 0; i < ops.length; i++) {
//         for (var j = 0; j < calc.length; j++) {
//           if (ops[i][calc[j]]) {
//             currentOp = ops[i][calc[j]];
//           } else if (currentOp) {
//             newCalc[newCalc.length - 1] = currentOp(newCalc[newCalc.length -
//               1], calc[j]);
//             currentOp = null;
//           } else {
//             newCalc.push(calc[j]);
//           }
//           console.log(newCalc);
//         }
//         calc = newCalc;
//         newCalc = [];
//       }
//       if (calc.length > 1) {
//         // console.log('Error: unable to resolve calculation');
//         return calc;
//       } else {
//         return calc[0];
//       }
// }

function history() {
  var x = document.getElementById("history-list");
  if (x.style.display === "none") {
    var text = "";
    for(var i of clearHis){
        text += i + '<br>';
    }
    x.innerHTML = text;
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}




