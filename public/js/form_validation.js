/*
* Validate Date Range
*/
function validationError (ERR_MSG, ERR_TYPE) {
  if (ERR_TYPE == 'error') {
    $('#validation_error').attr('class', 'isa_error')
    $('#error_logo').attr('class', 'fa fa-times-circle')
    $('#error_text').text(ERR_MSG)
    $('#validation_error').css('visibility', 'visible')
    setTimeout(function () { $('#validation_error').css('visibility', 'hidden') }, 3000)

  } else if (ERR_TYPE == 'success'){
    $('#validation_error').attr('class', 'isa_success')
    $('#error_logo').attr('class', 'fa fa-check')
    $('#error_text').text(ERR_MSG)
    $('#validation_error').css('visibility', 'visible')
    setTimeout(function () { $('#validation_error').css('visibility', 'hidden') }, 3000)
  }
}
