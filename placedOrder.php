<?php
    require('db_conn.php');

    $customerDetails = array(
        ':firstName' => $_POST['firstName'],
        ':lastName' => $_POST['lastName'],
        ':phone' => $_POST['phone'],
        ':country' => $_POST['country'],
        ':streetAddress' => $_POST['streetAddress'],
        ':city' => $_POST['city'],
        ':state' => $_POST['state'],
        ':zipcode' => $_POST['zipcode'],
        ':shipping' => $_POST['shipping'],
        ':email' => $_POST['email'],
        ':cID' => $_POST['cID']
    );

    $ccDetails = array(
        ':cID' => $_POST['cID'],
        ':cardNumber' => $_POST['cardNumber'],
        ':expiration' => $_POST['expiration'],
        ':securityCode' => $_POST['securityCode']
    );


    //CUSTOMER INFO
    if( isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['phone']) &&
        isset($_POST['country']) && isset($_POST['streetAddress']) && isset($_POST['city']) &&
        isset($_POST['state']) && isset($_POST['zipcode']) && isset($_POST['shipping']) && isset($_POST['email'])) {

        $sql = "UPDATE customers SET firstName=:firstName, lastName=:lastName, phone=:phone, country=:country, streetAddress=:streetAddress, 
                city=:city, state=:state, zipcode=:zipcode, shipping=:shipping, email=:email
                WHERE id=:cID";

        $sanitizers = array(
            ':firstName' => FILTER_SANITIZE_STRING,
            ':lastName' => FILTER_SANITIZE_STRING,
            ':phone' => FILTER_SANITIZE_NUMBER_INT,
            ':country' => FILTER_SANITIZE_STRING,
            ':streetAddress' => FILTER_SANITIZE_STRING,
            ':city' => FILTER_SANITIZE_STRING,
            ':state' => FILTER_SANITIZE_STRING,
            ':zipcode' => FILTER_SANITIZE_NUMBER_INT,
            ':shipping' => FILTER_SANITIZE_STRING,
            ':email' => FILTER_SANITIZE_EMAIL,
            ':cID' => FILTER_SANITIZE_NUMBER_INT
        );

        $filters = array(
            ':firstName' => array(
                'filter' => FILTER_CALLBACK,
                'options' => 'ucwords'
            ),
            ':lastName' => array(
                'filter' => FILTER_CALLBACK,
                'options' => 'ucwords'
            ),
            ':phone' => FILTER_VALIDATE_INT,
            ':country' => array(
                'filter' => FILTER_CALLBACK,
                'options' => 'ucwords'
            ),
            ':streetAddress' => array(
                'filter' => FILTER_CALLBACK,
                'options' => 'ucwords'
            ),
            ':city' => array(
                'filter' => FILTER_CALLBACK,
                'options' => 'ucwords'
            ),
            ':state' => array(
                'filter' => FILTER_CALLBACK,
                'options' => 'ucwords'
            ),
            ':zipcode' => FILTER_VALIDATE_INT,
            ':shipping' => array(
                'filter' => FILTER_CALLBACK,
                'options' => 'ucwords'
            ),
            ':email' => FILTER_VALIDATE_EMAIL,
            ':cID' => FILTER_VALIDATE_INT
        );

        $stmt = $conn->prepare($sql);

        // Sanitize and Filter _POST Values
        filter_var_array($customerDetails, $sanitizers);
        filter_var_array($customerDetails, $filters);

        // $stmt->execute($customerDetails);
    }

    //CREDIT CARD INFO
    if( isset($_POST['cardNumber']) && isset($_POST['expiration']) && isset($_POST['securityCode'])) {

        $sql = "INSERT INTO creditcards VALUES(:cID, :cardNumber, :expiration, :securityCode)";

        $sanitizers = array(
            ':cID' => FILTER_SANITIZE_NUMBER_INT,
            ':cardNumber' => FILTER_SANITIZE_STRING,
            ':expiration' => FILTER_SANITIZE_STRING,
            ':securityCode' => FILTER_SANITIZE_NUMBER_INT
        );

        $filters = array(
            ':cID' => FILTER_VALIDATE_INT,
            ':securityCode' => FILTER_VALIDATE_INT
        );

        $stmt = $conn->prepare($sql);

        // Sanitize and Filter _POST Values
        filter_var_array($ccDetails, $sanitizers);
        filter_var_array($ccDetails, $filters);

        // $stmt->execute($ccDetails);
    }

    // Update User-Cart Relational Table

    /* 
        BIG CHANGE NEEDED FOR DB, must have a primary key to join relational data customer_id, product_id, creditcard_it, purchase_id
        CREATE TABLE customer_cart (
            'customer_id' INT NOT NULL,
            'product_id' INT NOT NULL,
            'quantity' INT NOT NULL,
            PRIMARY_KEY('customer_id, product_id') 
        );
        SELECT c.*, p.*
        FROM customer c
        INNER JOIN customer_cart customCart
        ON customCart.customer_id = c.id
        INNER JOIN products p
        ON p.id = customCart.product_id
    */

    $ccNumber = str_replace(' ', '', $ccDetails[':cardNumber']);
    $ccNumber = str_pad(substr($ccNumber, -4), strlen($ccNumber), '*', STR_PAD_LEFT);

    require('db_close.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>

    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/placedOrder.css">
</head>
<body>
    <?php $filename = $_SERVER['SCRIPT_NAME']; ?>
    <?php include './header.php'; ?>

    <div class="placed">
        <h1 class="placedOrder">Your Checkout Summary</h1>
        <div class = "summary">
            <h1 class="fullname">Name: <?php echo $customerDetails[':firstName'].' '.$customerDetails[':lastName']; ?></h1>
            <h1 class="phone">Phone: <?php echo $customerDetails[':phone']; ?></h1>
            <h1 class="emai">Email: <?php echo $customerDetails[':email']; ?></h1>
            <h1 class="country">Country: <?php echo $customerDetails[':country']; ?></h1>
            <h1 class="fullAddress">Address: <?php echo $customerDetails[':streetAddress'].' '.$customerDetails[':city'].', '.$customerDetails[':state'].' '.$customerDetails[':zipcode']; ?> </h1>
            <h1 class="ccInfo">Card Number: <?php echo $ccNumber; ?><h1>
            <h1 class="shipping">Shipping Method: <?php echo $customerDetails[':shipping']; ?></h1>
            <div id="itemSummary">Item Summary</div>
            <h1 id="cartTotal">Total: </h1>
        </div>
        <h1 class="placedOrder">Thank You For Purchasing From Petrware</h1>
        <h1 class="emailReceipt">Your Receipt Should Be Sent To Your Email</h1>

        <!-- Update Page using AJAX to show User's Cart and Info -->
    </div>

    <script src="scripts/itemSummary.js"></script>
    <script src="scripts/main.js"></script>
</body>
</html>