var nlform = new NLForm( document.getElementById( 'nl-form' ) );

//Parse the form input into unix time for easier processing
Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

//Process the NLP form to the server side in the right format
function exportData() {

  var schoolName = document.getElementById("schoolName");
  var fromMonth   = document.getElementById("fromMonth");
  var fromDay  = document.getElementById("fromDay");
  var fromYear  = document.getElementById("fromYear");
  var toMonth  = document.getElementById("toMonth");
  var toDay  = document.getElementById("toDay");
  var toYear  = document.getElementById("toYear");

  var schoolName = schoolName.options[schoolName.selectedIndex].text

  var fromData = fromDay.options[fromDay.selectedIndex].text + '-' + fromMonth.options[fromMonth.selectedIndex].text + '-' + fromYear.options[fromYear.selectedIndex].text;
  var fromUNIX = new Date(fromData).getUnixTime();

  var toData = toDay.options[toDay.selectedIndex].text + '-' + toMonth.options[toMonth.selectedIndex].text + '-' + toYear.options[toYear.selectedIndex].text;
  var toUNIX = new Date(toData).getUnixTime();

  encryptedString = btoa(schoolName + '$' + fromUNIX + '$' + toUNIX);
  processRequest(encryptedString)
}

function processRequest(encryptedString) {
  $.fileDownload("/getStudents/" + encryptedString);
}
