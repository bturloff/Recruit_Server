/*
 * Gets today's date
 */
function getDate () {
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

  // Dynamically grab current date information
  var today = new Date()
  var current_day = today.getDate()
  var current_month = today.getMonth()
  var current_year = today.getFullYear()

  // Set from information
  $('#fromDay option:selected').text(current_day)
  $('#fromMonth option:selected').text(monthNames[current_month])
  $('#fromYear option:selected').text(current_year)

  //Set to information
  $('#toDay option:selected').text(current_day)
  $('#toMonth option:selected').text(monthNames[current_month])
  $('#toYear option:selected').text(current_year)
}
