$(document).ready(function () {
  console.log("Your page is ready")
  $("#tweet-text").on("input", function () {
    const maxChars = 140;
    const inputChars = $(this).val().length; //Use 'this' to access #tweet-text form length on input
    const charCounter = maxChars - inputChars;

    const $charCounterElement = $(this).parent().find(".counter") //Find parent of this (up DOM) and then find child (down DOM)

    $charCounterElement.text(charCounter); //set element to char count after input

    if (charCounter < 0) {
      $charCounterElement.addClass("invalidator")
    }
    else {
      $charCounterElement.removeClass("invalidator")
    }
  })
})

