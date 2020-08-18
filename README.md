# INF124 - PA 4: Building a web application using JSP and RESTful web services 

Petrware opens up on the home page which shows the list of products available for purchase. 

A navigation bar is at the top of the page with links to the homepage, "About" page, and "Checkout" page. Clicking on either "Petrware" or "Home" will take the user to the home page. Clicking on "About" will take the user to the "About" page. Clicking o the "My Cart" button will take the user to the "Checkout" page.

If a user clicks on a product's image in the homepage, they will be taken to that product's page. There they will find more information about the product, as well as add a specifed quantity of that product to their online shopping cart. Clicking the "Add to Cart" button will take the user to the "Checkout" page.

The "Checkout" page will show the products the user added to their online shopping cart, the running total cost of all items in the shopping cart, and a form to fill to complete the purchasing of items in the list. Filling out the form correctly and clicking the "Submit" button will direct the user to a summary page of the purchase.

The "About" page contains information pertaining to Petrware, their business, their members, and other information.

## Requirements Checklist

- [x] **Using JSP reimplement the product list page. This is the page that contains the list of your products.** 

    The homepage is a JSP file that lists all the products.

- [x] **Create REST services to allow for interaction with the order and product resources stored in your application 
database.**
    
    Refer to the [PetrwareRESTService](https://github.com/dphtran501/PetrwareRESTService) project for this requirement.
    
- [x] **You will now need to replace all the database interactions in your web application with REST calls. Your web 
application will now act as a REST client and retrieve the MySQL data indirectly through the new RESTful web service. 
That is, you will have two applications:** 

    **(1) a backend application that provides RESTful APIs that essentially exposes the available operations in your database**
    
    [PetrwareRESTService](https://github.com/dphtran501/PetrwareRESTService) is the backend application providing RESTful APIs.
    
    **(2) an application that is the client of the RESTful APIs, generates the HTML pages, and handles requests from the user.**
    
    PetrwareRESTClient (this project) is the client of PetrwareRESTService. [Servlets](src/main/java/edu/uci/inf124/petrwarerestclient/servlet) are used to manipulate the MariaDB data indirectly via the PetrwareRESTService web service.

## Authors
Group 21: Jevford Barro (72114221), Peter Tang (45193375), Derek Tran (18491795)

## Screenshots
<img src="petrware.gif" width="650px">
<img src="landingpage.png" width="650px">
<img src="checkout.png" width="650px">
