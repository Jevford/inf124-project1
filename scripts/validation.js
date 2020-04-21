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
        console.log("GTG");
        document.getElementById('form-user').submit();
        // MAILTO from HTML
    }else{
        //there are some errors to display
        //bad user
        //let err = document.querySelector('.error');
        //let input = err.querySelector('input');
        //err.setAttribute('data-errormsg', ` ... Missing ${input.placeholder}`);
        fails.forEach(function(obj){
            console.log("oof");
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
    if( country.value === ""){
        failures.push({input:'input-country', msg:'Required Field'});
    } 
    if( streetAddress.value === ""){
        failures.push({input:'input-streetAddress', msg:'Required Field'});
    } 
    if( city.value === ""){
        failures.push({input:'input-city', msg:'Required Field'});
    } 
    if( zipcode.value === ""){ //Might be an error due to int and str comparison
        failures.push({input:'input-zipcode', msg:'Required Field'});
    } 
    if( email.value === ""){
        failures.push({input:'input-email', msg:'Required Field'});
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
    let shipping = document.getElementById('input-shipping');
    // .selectedIndex  .options  .length   .selectedValue  .value
    if( shipping.selectedIndex === 0 ){
        failures.push({input:'input-shipping', msg:"Robots Out For Lunch"});
    }

    //return a boolean || an object with details about the failures
    return failures;
}


document.addEventListener('DOMContentLoaded', init);