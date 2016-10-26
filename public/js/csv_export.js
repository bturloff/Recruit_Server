var nlform = new NLForm( document.getElementById( 'nl-form' ) );

//Parse the form input into unix time for easier processing
Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

/*
 * Process the NLP form to the server side in the right format
 */
function exportData() {

  //Get all the variable name information
  var schoolName = document.getElementById("schoolName");
  var fromMonth   = document.getElementById("fromMonth");
  var fromDay  = document.getElementById("fromDay");
  var fromYear  = document.getElementById("fromYear");
  var toMonth  = document.getElementById("toMonth");
  var toDay  = document.getElementById("toDay");
  var toYear  = document.getElementById("toYear");

  //Get the school name text data
  var schoolName = schoolName.options[schoolName.selectedIndex].text

  //Get all the date conversion information
  var fromData = fromDay.options[fromDay.selectedIndex].text + '-' + fromMonth.options[fromMonth.selectedIndex].text + '-' + fromYear.options[fromYear.selectedIndex].text;
  var fromUNIX = new Date(fromData).getUnixTime();
  var toData = toDay.options[toDay.selectedIndex].text + '-' + toMonth.options[toMonth.selectedIndex].text + '-' + toYear.options[toYear.selectedIndex].text;
  var toUNIX = new Date(toData).getUnixTime();

  //Simple encryption string
  encryptedString = btoa(schoolName + '$' + fromUNIX + '$' + toUNIX);

  //Validate the query
  validateDateQuery(encryptedString, fromUNIX, toUNIX)
}

/*
 * Simple client-side validation
 */
function validateDateQuery(encryptedString, fromUNIX, toUNIX) {

  if (fromUNIX == 0 || toUNIX == 0) {
    validationError("Please completely fill out the form!", "error")
  } else if (fromUNIX > toUNIX) {
    validationError("Date range is invalid!", "error")
  } else {
    processRequest(encryptedString)
  }
}

/*
 * Process thes request on the server
 */
function processRequest(encryptedString) {

  $.fileDownload("/getStudents/" + encryptedString)
    .fail(function() {validationError("No records found....", "error")})
    .done(function() {validationError("Exported data successfully!", "success")
})
}
