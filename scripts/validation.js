const init = function(){
    document.getElementById('button-cancel').addEventListener('click', reset);
    document.getElementById('button-submit').addEventListener('click', submit);
}

const reset = function(ev){
    //HTML will automatically put the form back to its initial state
    //unless we do 
    ev.preventDefault();
    // programmatically we can reset it 
    document.getElementById('form-user').reset();
    //if you want to do anything else...
    location.reload();
    return false;
}

const submit = function(ev){
    ev.preventDefault(); 
    ev.stopPropagation();
    //or the click will travel to the form and the form will submit
    let fails = validate();
    //IF we wanted to do some async things then use a Promise with .then and .catch
    if(fails.length === 0){
        //good to go
        sendmail();
        document.getElementById('form-user').submit();
        // MAILTO from HTML
    }else{
        //there are some errors to display
        //bad user
        //let err = document.querySelector('.error');
        //let input = err.querySelector('input');
        //err.setAttribute('data-errormsg', ` ... Missing ${input.placeholder}`);
        fails.forEach(function(obj){
            let field = document.getElementById(obj.input);
            field.parentElement.classList.add('error');
            field.parentElement.setAttribute('data-errormsg', obj.msg);
        })
    }
}

const validate = function(ev){
    //let valid = true;
    let failures = [];
    
    //inputs for text, email, tel, color, number...
    let first = document.getElementById('input-first');
    let last = document.getElementById('input-last');
    let phone = document.getElementById('input-phone');
    let country = document.getElementById('input-country');
    let streetAddress = document.getElementById('input-streetAddress');
    let city = document.getElementById('input-city');
    let state = document.getElementById('input-state');
    let zipcode = document.getElementById('input-zipcode');
    let email = document.getElementById('input-email');
    
    // inputs for Credit Card Info
    let cardNumber = document.getElementById('input-cardNumber');
    let expiration = document.getElementById('input-expiration');
    let securityCode = document.getElementById('input-securityCode');

    //.value, .defaultValue, length of value
    if( first.value === ""){
        failures.push({input:'input-first', msg:'Required Field'});
    } 
    if( last.value === ""){
        failures.push({input:'input-last', msg:'Required Field'});
    } 
    if( phone.value === ""){
        failures.push({input:'input-phone', msg:'Required Field'});
    } 
    if( streetAddress.value === ""){
        failures.push({input:'input-streetAddress', msg:'Required Field'});
    } 
    if( city.value === ""){
        failures.push({input:'input-city', msg:'Required Field'});
    } 
    if( state.value === ""){
        failures.push({input:'input-state', msg:'Required Field'});
    } 
    if( zipcode.value === ""){ //Might be an error due to int and str comparison
        failures.push({input:'input-zipcode', msg:'Required Field'});
    } 
    if( email.value === ""){
        let errormsg = email.title;
        failures.push({input:'input-email', msg:"Required Field"});
    }
    if( email.validity.valid === false){
        let errormsg = email.title;
        failures.push({input:'input-email', msg:"Don't Forget Format 'username@emaildomain'"});
    }
    if( cardNumber.value === ""){
        failures.push({input:'input-cardNumber', msg:'Required Field'});
    }
    if( expiration.value === ""){
        failures.push({input:'input-expiration', msg:'Required Field'});
    }
    if( securityCode.value === ""){
        failures.push({input:'input-securityCode', msg:'Required Field'});
    }
    
    //select inputs
    let selectCountry = document.getElementById('input-slctCountry');
    // .selectedIndex  .options  .length   .selectedValue  .value
    if( selectCountry.selectedIndex === 5 ){
        failures.push({input:'input-slctCountry', msg:"China Shipping Unavailable"});
    }

    //return a boolean || an object with details about the failures
    return failures;
}

const sendmail = function() {
    //inputs for text, email, tel, color, number...
    let first = document.getElementById('input-first').value;
    let last = document.getElementById('input-last').value;
    let phone = document.getElementById('input-phone').value;

    let country = document.getElementById('input-slctCountry');
    country = country.options[country.selectedIndex].text;

    let streetAddress = document.getElementById('input-streetAddress').value;
    let city = document.getElementById('input-city').value;
    let state = document.getElementById('input-state').value;
    let zipcode = document.getElementById('input-zipcode').value;
    let email = document.getElementById('input-email').value;
    
    // inputs for Credit Card Info
    let cardNumber = document.getElementById('input-cardNumber').value;

    let shipping = document.getElementById('input-shipping');
    shipping = shipping.options[shipping.selectedIndex].text;

    // items purchase info
    let itemsSummary = "";
    let total = document.getElementById('totalCost').textContent;

    let cartData = sessionStorage.getItem('cartData');
    if (cartData != null) {
        let cartList = JSON.parse(cartData);
        for (let i = 0; i < cartList.length; i++) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                // 4 means finished, and 200 means okay.
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let response = JSON.parse(xhr.responseText);
                    let item = response[0];
                    
                    let itemName;
                    if (item.category == "cpu"){
                        itemName = createProductName([item.brand, item.name]);
                    }
                    else if (cartList[i].category == "ram") {
                        itemName = createProductName([item.brand, item.series]);
                    }
                    else if(cartList[i].category == "videoCard") {
                        itemName = createProductName([item.brand, item.series, item.gpu]);
                    }

                    itemsSummary += "          - " + cartList[i].quantity + " x " + itemName;
                    if (i < cartList.length - 1) itemsSummary += "\n";
                }
            }
            xhr.open("GET", `db_product_query.php?id=${cartList[i].id}&category=${cartList[i].category}`, false);
            xhr.send();
        }
    }

    let bodyMessage = `Name: ${first} ${last}\n` +
                        `Phone: ${phone}\n` +
                        `Country: ${country}\n` +
                        `Street Address: ${streetAddress}\n` +
                        `City: ${city}\n` + 
                        `State: ${state}\n` +
                        `Zipcode: ${zipcode}\n` +
                        `Card Number: ${cardNumber}\n` +
                        `Shipping Method: ${shipping}\n` +
                        `Items Purchased:\n ${itemsSummary}\n` +
                        `Total: ${total}\n`

    document.location.href = "mailto:"
        + email + "?"
        + "&subject=Petrware%20Receipt"
        + "&body=" + encodeURIComponent(bodyMessage);
}

function createProductName(attributeList) {
    let name = "";
    for (let i = 0; i < attributeList.length; i++) {
        name += ((attributeList[i] === null) ? "" : attributeList[i]);
        if (i < attributeList.length - 1){
            name += " ";
        }
    }

    return name;
}

document.addEventListener('DOMContentLoaded', init);