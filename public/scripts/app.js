let food = [{
    "foodid": "098234",
    "price": "14.99",
    "foodName": "Burger",
    "description": "Much tasty. Very wow. Howdy!",
    "calories": "2122",
    "imageURL": "https://images.unsplash.com/photo-1508424897381-4fd8755e4b7a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=79896d89532ce982c53efebba2883a6b&auto=format&fit=crop&w=675&q=80"
  },
  {
    "foodid": "2342342",
    "price": "10.99",
    "foodName": "Big Gulp",
    "description": "Welcome to Good Burger!",
    "calories": "1231",
    "imageURL": "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjF9&s=d78e78bf715baa67c7f6473b66984581&auto=format&fit=crop&w=675&q=80"
  },
  {
    "foodid": "323222",
    "price": "15.99",
    "foodName": "Mondo Burger",
    "description": "Welcome to Good Burger!",
    "calories": "1231",
    "imageURL": "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-0.3.5&s=c04e9f7e24c4c6b1b07c10abdc447872&auto=format&fit=crop&w=634&q=80"
  },
  {
    "foodid": "23234",
    "price": "0.99",
    "foodName": "Beer",
    "description": "Amazing craft beer!",
    "calories": "1231",
    "imageURL": "https://images.unsplash.com/photo-1518542698889-ca82262f08d5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=82d7aeb8df6ae2af22bfc04afb7e970c&auto=format&fit=crop&w=634&q=80"
  },
]




// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for (user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });






var total = []

$(document).ready(function() {
  $("#openCart").click(function() {
    renderCart();
  });
  //render the food items
  renderFood(food);
  //open modal
  $("#modalButton").click(function() {
    $("#exampleModalCenter").modal();
  });

  //empty form on submission
  $('#orderSubmit').click(function() {
    document.cookie = JSON.stringify(total)
    $('#cartBody').replaceWith(checkoutHTML)
    var x = document.cookie
    console.log(document.cookie);

  })







  $('.addCart').click(function() {

    var unitPrice = $(this).parent().parent().find('.price').text();
    var nameFood = $(this).parent().parent().find('.foodName').text();
    var quant = $(this).parent().parent().find('.quantity').val()

    var order = {
      'foodid': $(this).prop('id'),
      'price': unitPrice,
      'foodName': nameFood,
      'quantity': quant
    }

    // total = JSON.parse(getCookie('food')) || []
    total.push(order);
    console.log(total)


    // var jsonCookie = JSON.stringify(total)
    // document.cookie = `food = ${jsonCookie}`;








  });



  //counter
  $(".incr-btn").on("click", function(e) {
    var $button = $(this);
    var oldValue = $button.parent().find('.quantity').val();
    $button.parent().find('.incr-btn[data-action="decrease"]').removeClass('inactive');
    if ($button.data('action') == "increase") {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below 1
      if (oldValue > 1) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 1;
        $button.addClass('inactive');
      }
    }
    $button.parent().find('.quantity').val(newVal);
    e.preventDefault();
  });


  // $("#removeCart").click(function(cookie) {
  // var cookie = JSON.stringify(getCookie('food'))
  // console.log($(this).parents().find("#itemCart").text())
  // $(this).parents().find(".itemCart").remove(".itemCart")

  // for (var keys in cookie) {
  //   if (cookie[keys].foodName == $(this).parent().find("#cartName").text()) {
  //     delete cookie[keys]
  //     document.cookie = `food =`;
  //     total = JSON.parse(getCookie('food')) || []
  //     total.push(order);
  //     var jsonCookie = JSON.stringify(total)
  //     document.cookie = `food = ${jsonCookie}`;
  //   }
  // }
  // })
});






//iterate through JSON data and apply function to each element
function renderFood(food) {
  for (var i = 0; i < food.length; i++) {
    var newFood = createFoodCard(food[i])
    $('.row').append(newFood);
  }
};

function createFoodCard(input) {
  var newHTML =
    `
     <div class="${input.foodid}">
        <img src="${input.imageURL}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${input.foodName} - $${input.price}</h5>
          <p class="card-text">${input.description} </p>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${input.foodid}">
            Learn more
          </button>
        </div>
      </div>
</div>

      <div class="modal fade" id="${input.foodid}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle"><div class='foodName'>${input.foodName}</div> - <div class='price'> ${input.price}</div></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <img class="imgmodal" src="${input.imageURL}" alt="Card image cap">


    ${input.description}

    <div class="container">
	<div class="count-input space-bottom">
                                <a class="incr-btn" data-action="decrease" href="#">–</a>
                                <input class="quantity" type="text" name="quantity" value="1"/>
                                <a class="incr-btn" data-action="increase" href="#">&plus;</a>
                            </div>
</div>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-primary btn-lg btn-block" data-dismiss="modal">Close</button><br>
<button type="button" id=${input.foodid} class="btn btn-secondary btn-lg btn-block addCart" data-dismiss='modal'>Add to Cart</button>


      </div>
    </div>
  </div>
</div>`
  return newHTML;
};

//call cookie by name
// function getCookie(name) {
//   var value = "; " + document.cookie;
//   var parts = value.split("; " + name + "=");
//   if (parts.length == 2) return parts.pop().split(";").shift();
// }

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}


function renderCart(cartList) {

  for (var i = 0; i < total.length; i++) {
    console.log(total[i]);
    var cartListed = fillCart(total[i])
    $('#cartBody').append(cartListed);
  }
}

function fillCart(input) {
  var cartHTML = `<div class='itemCart'>
        <div id='cartName'>${input.foodName}</div> - $${input.price} - ${input.quantity}
        <button type='button' id='removeCart'> Remove </button>
      </div>
        `
  return cartHTML;
}

var checkoutHTML =
  `

<form id="frmcheckout">

  <table align="center" width="60%" style="border-radius: 10px; border-style: solid; border-width: 5px; margin-top: 30px; padding: 10px;">

    <caption>FINALIZE YOUR ORDER HERE</caption>

    <tr>
      <th align="right">User Name</th>
      <td colspan="2"><input type="text" name="txtname" id="txtname"></td>
    </tr>

    <tr>

      <!--
        ==========NOTE FOR FUTURE DEVELOPERS HERE =====

        This name cell is used in coding to extract  information on server.js app.post("/checkout") route.

        Please make change to the code if you change the name from 'cell' to something else...

      -->
      <th align="right">Cell # (Example: 1234567890)</th>
      <td colspan="2"><input type="number" name="cell" id="txtcell"></td>
    </tr>

    <tr>
      <td>
      <td colspan="2">
        <ul id="errList" style="color: red;">

        </ul>
      </td>
    </tr>


    <tr>
      <td colspan="3"><input type="hidden" name="txtamount" id="txtamount"></td>
    </tr>

    <tr>
      <td colspan="3"><input type="hidden" name="txttax" id="txttax"></td>
    </tr>

    <tr>
      <td colspan="3"><input type="hidden" name="txtordertotal" id="txtordertotal"></td>
    </tr>

    <tr>
      <th>Payment Options</th>
      <td colspan="2">
        <input type="radio" name="payoption" value="0" checked>At Counter
        <input type="radio" name="payoption" value="1" disabled="true">Pay by Card
      </td>
    </tr>

    <tr>
      <td></td>
      <td></td>
      <td>
        <button id="btnplaceorder" type="submit">Place Order</button>
      </td>
    </tr>
</form>

    <tr>
      <td colspan="3">
        <div id="paydiv"> <!-- Payment using Credit/debit card -->

        </div>
      </td>
    </tr>
</table>

`
