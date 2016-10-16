var optScript = document.getElementById("optScript");
var textIn = document.getElementById("textIn");
var textOut = document.getElementById("textOut");

textIn.addEventListener("input", function(e) {

  var optScriptVal = optScript.value;

  textOut.value = transliterate(textIn.value, optScriptVal);

});

optScript.addEventListener("change", function() {

  var optScriptVal = optScript.value;

  switchFont(optScriptVal);

  textOut.value = transliterate(textIn.value, optScriptVal);

  generateTranslitMap(optScriptVal);
});

function switchFont(toScript) {

  switch (toScript) {
    case "tamil":
      textOut.style.cssText =
        "font-family: 'Arima Madurai', cursive;" +
        "font-size: 14px;" +
        "font-weight: bold;";

      break;
    case "devanagari":
      textOut.style.cssText = "font-family: 'Vesper Libre', serif;";
      break;
    case "select":
      textOut.style.cssText = "";
      break;
    default:
      textOut.style.cssText = "font-family: 'Vesper Libre', serif;";

  }
}

function transliterate(inputTxt, toScript) {
  if (toScript !== "select") {

    return Sanscript.t(inputTxt, "itrans", toScript);
  } else {
    return inputTxt;
  }
}

function generateTranslitMap(toScript) {

  var translitMap = document.getElementById("translitMap");

  var devanagariMap = [Sanscript.schemes.devanagari.vowels,
    Sanscript.schemes.itrans.vowels,
    Sanscript.schemes.devanagari.consonants,
    Sanscript.schemes.itrans.consonants
  ];

  var tamilMap = [Sanscript.schemes.tamil.vowels,
    Sanscript.schemes.itrans.vowels,
    Sanscript.schemes.tamil.consonants,
    Sanscript.schemes.itrans.consonants
  ];

  switch (toScript) {
    case "tamil":

      translitMap.innerHTML = genTable(tamilMap);
      break;

    case "devanagari":

      translitMap.innerHTML = genTable(devanagariMap);
      break;

    case "select":

      translitMap.innerText = "Please select a Script".split('');
      break;

    default:
      translitMap.innerText = "Please select a Script";

  }
}

function genTable(dataArray) {
  var table = document.createElement('table');

  dataArray.forEach(function(row) {

    var TRow = document.createElement('tr');

    row.forEach(function(data) {

      var TCell = document.createElement('td');
      var TCellText = document.createTextNode(data);

      TCell.appendChild(TCellText);
      TRow.appendChild(TCell);

    });
    table.appendChild(TRow);
  });
  return table.outerHTML;
}