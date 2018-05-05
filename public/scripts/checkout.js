$('document').ready(function() {

    // getting from the cookie
    let cartItems = [
      {
       "foodid": "2342342",
       "price": "10.99",
       "foodName": "Big Gulp",
       "quantity": "3"
     },
     {
       "foodid": "323222",
       "price": "15.99",
       "foodName": "Wings",
       "quantity": "5"
     },
     {
       "foodid": "393422",
       "price": "2.99",
       "foodName": "coffee",
       "quantity": "10"
     }
    ];


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

    $('#orderSubmit').click(function() {
      let cartItems = JSON.parse(document.cookie)
      $('#frmcheckout table').prepend(getDisplayCardItems(cartItems));

    })




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



    function getDisplayCardItems(cartItems) {
      let total = 0;
      let hst = 0;
      let ordertotal = 0;

      let result = "<tr style='font-size: 1.2em; color: blue; background-color: #eee;'>" +
                  "<td>Food Item</td><td>Price</td><td>Quantity</td></tr>";



      for(let item of cartItems) {
        console.log('cartitems' ,cartItems);
        result = result + "<tr style='font-size: 1em; color: #567; background-color: #fe8;'><td>" +
            item["foodName"] + "</td><td style='text-align: right;'>$ " + item["price"] +
            "</td><td style='text-align: center;'>" + item["quantity"] +
            "</td></tr>";

        total += (Number(item["price"]) * Number(item["quantity"]));


        //adding object to orderItems json object to be stored in db
        orderItems[item["foodid"]] = item;
        console.log(orderItems[item["foodid"]]);
      }

      hst = Math.round(total * 13 / 100, 2);
      ordertotal = total + hst;

      result += "<tr style='text-align: right; font-weight: bold; color: #567; background-color: #ddd;'><td>Total Amount" +
                "</td><td>$ " + total + "</td></tr>";


      result += "<tr style='text-align: right; font-weight: bold; color: #567; background-color: #ccc;'><td>HST" +
                "</td><td>$ " + hst + "</td></tr>";



      result += "<tr style='text-align: right; font-weight: bold; color: #567; background-color: #aaa;'><td>Order Total " +
                "</td><td> $ " + ordertotal + "</td></tr>";


      //setting values for hidden fields
      $('#txtamount').val(total);
      $('#txttax').val(hst);
      $('#txtordertotal').val(ordertotal);
      //$('#txtorderitemsjson').val(JSON.stringify(orderItems));

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
