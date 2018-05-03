$('document').ready(function() {


    let ordereditems = [
      {
       "foodid": "2342342",
       "price": "$10.99",
       "foodName": "Big Gulp",
       "description": "Welcome to Good Burger!",
       "calories": "1231",
       "imageURL": "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjF9&s=d78e78bf715baa67c7f6473b66984581&auto=format&fit=crop&w=675&q=80"
     },
     {
       "foodid": "323222",
       "price": "$15.99",
       "foodName": "Big Gulp",
       "description": "Welcome to Good Burger!",
       "calories": "1231",
       "imageURL": "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-0.3.5&s=c04e9f7e24c4c6b1b07c10abdc447872&auto=format&fit=crop&w=634&q=80"
     }
    ];



    $('#frmcheckout').on('submit', (event) => {
    event.preventDefault();

    let payoption = $('#frmcheckout input:radio[name="payoption"]:checked').val();

    if(payoption == "1") {
      /*
  =============>>>> TO WORK LATER ON THIS PART ===============>>>>>
      */
      alert("to be implemented");
    } else if(payoption == "0") {
     if(validateCheckoutForm()) {
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
       } else {
         $('#text').focus();
       }
    }
  });



    $('#frmcheckout input:radio[name="payoption"]').on('click', (event) => {
     let payoption = $('#frmcheckout input:radio[name="payoption"]:checked').val();

      if(payoption == "1") {

        let paymentform="<form method='post' name='payform'>" +
              "Card Number: <input type='text' name='cardnumber'>" +

              "<input type='submit' name='btnpay' value='Pay Now'>" +
              "</form>";
        $('#paydiv').html(paymentform);
        $('#btnplaceorder').hide();
      } else if(payoption == "0") {
        $('#paydiv').html("");
        $('#btnplaceorder').show();
      }
    });







    function validateCheckoutForm() {
      //To validate user name and cell number fields

      return true;
    }


});



