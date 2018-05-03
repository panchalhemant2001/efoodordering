$('document').ready(function() {

  //$('body').css("background-color", "yellow");
  // .ajax(

  //   );
    $('#frmcheckout').on('submit', (event) => {
    event.preventDefault();

//    if(validateTweetForm()) {
      $.ajax({
        url: '/checkout',
        type: 'POST',
        data: $("form#frmcheckout").serialize(),
        success: function( datareceived, status, jQxhr ){
          //calling helper function that renders most recently added tweet
          alert("Data Received: " + datareceived);

          // $("#tweetform #counter").text("140");
          // $("#text").val("");
          // $("#text").focus();
        }
      });
//    } else {
//      $('#text').focus();
//    }
  });



});



