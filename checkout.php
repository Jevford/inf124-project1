<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>

    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/checkout.css">
</head>
<body>
    <?php $filename = $_SERVER['SCRIPT_NAME']; ?>
    <?php include './header.php'; ?>

    <div class="productlist-container">
        <div class="productgrid-container"></div>
    </div>

    <div class="cartItems">
        <h1>My Items</h1>
        <div id="itemList"></div>
        <hr>
        <div class="cost__div">
            <table id="cost__div--table">
                <tr>
                    <td>Subtotal:</td>
                    <td id="subtotal-value">$0.00</td>
                </tr>
                <tr>
                    <td>Tax:</td>
                    <td id="tax-value">$0.00</td>
                </tr>
                <tr id="total-cost__tr">
                    <td>Total Cost:</td>
                    <td id="total-value">$0.00</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="checkoutPage">
        <h1>Checkout</h1>
        <form id="form-user" method="POST" action="placedOrder.php">
            <div class="form-box error" data-errormsg="">
                <label for="input-first">First Name</label>
                <input type="text" id="input-first"  name="firstName" autofocus required placeholder="First Name" tabindex="1"/>
            </div>
            <div class="form-box error" data-errormsg="">
                <label for="input-last">Last Name</label>
                <input type="text" id="input-last"  name="lastName" autofocus required placeholder="Last Name" tabindex="1"/>
            </div>
            <div class="form-box" data-errormsg="">
                <label for="input-phone">Phone #</label>
                <input type="text" id="input-phone" required name="phone" placeholder="Example: 123-456-7890" tabindex="2" />
            </div>
            <div class="form-box" data-errormsg="">
                <label for="input-slctCountry">Country</label>
                <select id="input-slctCountry" name="country" tabindex="1">
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                </select>
            </div>
            <div class="form-box error" data-errormsg="">
                <label for="input-streetAddress">Street Adress</label>
                <input type="text" id="input-streetAddress" name="streetAddress" autofocus required placeholder="Example: 1234 INF4MTX St" tabindex="1"/>
            </div>
            <div class="form-box error" data-errormsg="">
                <label for="input-city">City</label>
                <input type="text" id="input-city" name="city" autofocus required placeholder="Example: Irvine" tabindex="1"/>
            </div>
            <div class="form-box error" data-errormsg="">
                <label for="input-state">State</label>
                <input type="text" id="input-state" name="state" autofocus required placeholder="Example: CA" tabindex="1"/>
            </div>
            <div class="form-box error" data-errormsg="">
                <label for="input-zipcode">Zipcode</label>
                <input type="number" id="input-zipcode" name="zipcode" autofocus required placeholder="Example: 12345" tabindex="1"/>
            </div>
            <div class="form-box" data-errormsg="">
                <label for="input-shipping">Shipping Method:</label>
                <select id="input-shipping" name="shipping" tabindex="3">
                    <option value="Anteater Express">Anteater Express</option>
                    <option value="2 Days Expedited">2 Days Expedited</option>
                    <option value="Over Weekend">Over Weekend</option>
                    <option value="7 Day Shipping">7 Day Shipping</option>
                </select>
            </div>
            <div class="form-box" data-errormsg="">
                <label for="input-email">E-mail</label>
                <input type="email" id="input-email" name="email" required placeholder="Example: petr@uci.edu" tabindex="3" />
            </div>

            <!-- Credit Info Section -->
            <h1 id="cardinfo">Credit Card Information</h1>
            <div class="form-box error" data-errormsg="">
                <label for="input-cardNumber">Card Number</label>
                <input type="text" id="input-cardNumber" name="cardNumber" maxlength="19" autofocus required placeholder="Example: 1234 5678 9101 1234" tabindex="1"/>
            </div>
            <div class="form-box error" data-errormsg="">
                <label for="input-expiration">Expiration Date</label>
                <input type="text" id="input-expiration" name="expiration" title="Format - Month/Full Year" autofocus required placeholder="Example: 04/2020" tabindex="1"/>
            </div>
            <div class="form-box error" data-errormsg="">
                <label for="input-securityCode">Card Security Code</label>
                <input type="number" id="input-securityCode" name="securityCode" autofocus required placeholder="Example: 123" tabindex="1"/>
            </div>
            <div class="form-box">
                <button id="button-cancel">Cancel</button>
                <button id="button-submit">Submit</button>
            </div>
        </form>
    </div>

    <script src="scripts/checkout.js"></script>
    <script src="scripts/validation.js"></script>

</body>
</html>