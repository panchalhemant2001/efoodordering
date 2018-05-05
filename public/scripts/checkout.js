$('document').ready(function() {




      // console.log('cartitems', cartItems)
      // console.log(document.cookie);
    //to store in the database
    var orderItems = {};    //empty object

    /*let orderItems = {
      "2342342": {
       "foodid": "2342342",
       "price": "10.99",
       "foodName": "Big Gulp",
       "quantity": "3"
     },
     "323222": {
       "foodid": "323222",
       "price": "15.99",
       "foodName": "Big Gulp",
       "quantity": "5"
     }
    };*/

    //This method must be called first before any other code is executed

    /*$('#orderSubmit').click(function() {
      // console.log("This is the cart in JSON string format:",document.cookie);
      let cartItems = JSON.parse(document.cookie)

      //let cartItems = JSON.stringify(document.cookie)
      // console.log("This the cart in JSON:", cartItems);
      console.log('THIS IS THE DISPLAY CART FUNCTION RESULT:', getDisplayCardItems(cartItems))
      //$('#frmcheckout1').append(getDisplayCardItems(cartItems))
      //console.log($(this).closest("form"));
      console.log($('.modal-header'));
      $('#frmcheckout1')
        .append(`<input type='submit' value='button'>`)
    })*/


    $(document).on('click', '#orderSubmit', function(event) {
      // console.log("This is the cart in JSON string format:",document.cookie);
      let cartItems = JSON.parse(document.cookie)

      //let cartItems = JSON.stringify(document.cookie)
      // console.log("This the cart in JSON:", cartItems);
      console.log('THIS IS THE DISPLAY CART FUNCTION RESULT:', getDisplayCardItems(cartItems))
      //$('#frmcheckout1').append(getDisplayCardItems(cartItems))
      //console.log($(this).closest("form"));
      //console.log($('#frmcheckout1'));
      //console.log($('.modal-header'));
      $('#frmcheckout table').prepend(getDisplayCardItems(cartItems));
    })

    // This is the event handler for when the customer presses the stripe button

    // above this line Ben edited

    $(document).on('submit', '#frmcheckout', (event) => {
      event.preventDefault();
      let payoption = $('#frmcheckout input:radio[name="payoption"]:checked').val();

      if(payoption == "1") {
        /*
    =============>>>> TO WORK LATER ON THIS PART ===============>>>>>
        */
        alert("to be implemented");
      } else if(payoption == "0") {
       if(validateCheckoutForm()) {
         // alert('YI!');
         console.log('orderitems', orderItems);
            $.ajax({
              type: 'POST',
              url: '/checkout',

              //data: {formdata: $("form#frmcheckout").serialize(), orderitems: orderItems},
              data: {formdata: $("form#frmcheckout").serialize(), orderitems: orderItems},
              success: function( datareceived, status, jQxhr ){
              alert("Data Received: " + datareceived);
              }
            });
         } else {
          $('#txtname').focus();
        }
      }
  });


    //Generating a payment form when user selects pay online option
    $(document).on('click', '#frmcheckout input:radio[name="payoption"]', (event) => {
     let payoption = $('#frmcheckout input:radio[name="payoption"]:checked').val();

      if(payoption == "1") {

      // edited by ben to implement stripe
        let cartItems = JSON.parse(document.cookie)

        let total = 0;
        let hst = 0;
        let ordertotal = 0;

        for(let item of cartItems){
          total += (Number(item["price"]) * Number(item["quantity"]));
        }

        hst = Math.round(total * 13 / 100, 2);
        ordertotal = total + hst;
        // console.log(ordertotal);
        /*let paymentform="<form method='post' name='payform'>" +
              "Card Number: <input type='text' name='cardnumber'>" +

              "<input type='submit' name='btnpay' value='Pay Now'>" +
              "</form>"; */
        //$('#paydiv').html(paymentform);

      let paymentform=

      `<form action="/charge" method="post">

        <script
          src= "//checkout.stripe.com/v2/checkout.js",
          class= "stripe-button",
          data-key="pk_test_6NGOL3y0NOiiAho1zSuKhKHf",
          data-locale= "auto",
          data-description= "Sample Charge",
          data-amount="${ordertotal * 100}",
          data-currency="cad">
        </script>

      </form>`;

      // above this is what Ben added for stripe integration

      $('#paydiv').html(paymentform);
      $('#btnplaceorder').hide();
      } else if(payoption == "0") {
        $('#paydiv').html("");
        $('#btnplaceorder').show();
      }
    });



    function getDisplayCardItems(cartItems) {
      console.log("this is the entire cart", cartItems)
      let total = 0;
      let hst = 0;
      let ordertotal = 0;

      let result = "<tr style='font-size: 1.2em; color: blue;'>" +
                  "<td>Food Item</td><td align='right'>Price</td><td align='right'>Quantity</td></tr>";



      for(let item of cartItems) {
        console.log("This should a each item in the cart as object", item);
        result = result + "<tr style='font-size: 1em; color: #567;;'><td>" +
            item["foodName"] + "</td><td style='text-align: right;'>$ " + item["price"] +
            "</td><td style='text-align: center;'>" + item["quantity"] +
            "</td></tr>";

        total += (Number(item["price"]) * Number(item["quantity"]));


        //adding object to orderItems json object to be stored in db
        orderItems[item['foodId']] = item;
       // console.log(orderItems);
      }

      hst = Math.round(total * 13 / 100, 2);
      ordertotal = total + hst;

      Math.round(ordertotal,2)

      result += "<tr style='text-align: right; font-weight: bold; color: #567; '><td>Subtotal" +
                "</td><td>$ " + Math.round(total,4) + "</td></tr>";


      result += "<tr style='text-align: right; font-weight: bold; color: #567;'><td>HST" +
                "</td><td>$ " + hst + "</td></tr>";



      result += "<tr style='text-align: right; font-weight: bold; color: #567; '><td>Order Total " +
                "</td><td> $ " + ordertotal + "</td></tr>";


      //setting values for hidden fields
      $('#txtamount').val(total);
      $('#txttax').val(hst);
      $('#txtordertotal').val(ordertotal);
      //$('#txtorderitemsjson').val(JSON.stringify(orderItems));
      // console.log(result);
      //let x = '<h1> hello </h1>'
      //return x;
      return result;
    }






    function validateCheckoutForm() {
      //To validate user name and cell number fields

      let result = true;
      let txtname = $("#txtname").val();
      let txtcell = $('#txtcell').val();

      let $li = "";

      $('#errList').html("");

      if(txtname == null || txtname.trim() == "") {
        $li = ('<li>Who will pick the delivery?</li>');

        $("#errList").append($li);
        result = false;
      }

      if(txtcell == null || txtcell.trim() == "") {
        $li = ('<li>Your cell # please!</li>');

        $("#errList").append($li);
        result = false;
      }
      return result;
    }
});
