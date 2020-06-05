const productGrid = document.querySelector('.productgrid-container');
const lastViewedTitle = document.querySelector("#lastviewedlist-title");
const lastViewedGrid = document.querySelector('.lastviewedgrid-container');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

init();

function init(){
    populateGrids();
    searchForm.addEventListener('submit', onSubmit);
    window.addEventListener('resize', onResize);
}

function Product(id, category, name, description, price, imgSrc){
    this.id = id;
    this.category = category;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imgSrc = imgSrc;
}

function onSubmit(e) {
    e.preventDefault();
    clearGrid(productGrid);
    clearGrid(lastViewedGrid);
    populateGrids(searchInput.value); // TODO: fix search query
}

function populateGrids(searchQuery) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // 4 means finished, and 200 means okay.
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            let response = JSON.parse(xhr.responseText);
            if (response.productList) {
                lastViewedTitle.style.display = "block";
                populateGrid(response.productList, productGrid);
                populateGrid(response.lastViewedList, lastViewedGrid);
            } else {
                lastViewedTitle.style.display = "none";
                populateGrid(response, productGrid);
            }
        }
    }
    if (searchQuery) {
        xhr.open("GET", `ProductListServlet/searchBar?search=${searchQuery}`, true);
    }
    else {
        xhr.open("GET", "ProductListServlet/get", true);
    }
    xhr.send();
}

function populateGrid(response, grid) {
    let productList = [];
    if (response.productCPUList && response.productCPUList.length > 0) {
        productList = productList.concat(createProductList(response.productCPUList));
    }
    if (response.productRAMList && response.productRAMList.length > 0) {
        productList = productList.concat(createProductList(response.productRAMList));
    }
    if (response.productVCList && response.productVCList.length > 0) {
        productList = productList.concat(createProductList(response.productVCList));
    }
    productList.forEach(product => {
        let productCell = createProductCell(product);
        grid.appendChild(productCell);
    });

    removeGridBorderTop(grid);
    removeGridBorderBottom(grid);
}

function createProductList(jsonObject) {
    let productList = [];
    jsonObject.forEach(product => {
        let name = product.displayName, description;
        if (product.category === "cpu"){
            description = {
                "Model": [product.model],
                "# of Cores": [product.numOfCores],
                "Frequency": [product.operatingFrequency, "GHz"],
                "Socket Type": [product.socketType]
            };
        }
        else if (product.category === "ram") {
            description = {
                "Model": [product.model],
                "Capacity": [product.capacity],
                "Speed": [product.speed],
                "Timing": [product.timing],
                "Latency": [product.latency]
            };
        }
        else if(product.category === "videoCard") {
            description = {
                "Model": [product.model],
                "Memory Size": [product.memorySize, "GB"],
                "Memory Type": [product.memoryType],
                "Max GPU Length": [product.maxGPULength, "mm"],
                "Dimensions": [product.cardDimensions]
            }
        }

        let imageSrc = "images/" + product.imgSrc;
        productList.push(new Product(product.id, product.category, name, description, product.price, imageSrc))
    })

    return productList;
}

function createProductCell(product) {
    let productCell = document.createElement('div');

    let productImg = document.createElement('img');
    productImg.src = product.imgSrc;
    productImg.title = "View details";
    productImg.classList.add('productcell__image');
    productImg.addEventListener('click', onProductClick);
    productCell.appendChild(productImg);

    let priceText = document.createElement('p');
    priceText.textContent = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(product.price);
    priceText.classList.add('productcell__price');
    productCell.appendChild(priceText);

    let nameText = document.createElement('p');
    nameText.textContent = product.name;
    nameText.classList.add('productcell__name');
    productCell.appendChild(nameText);

    let descriptionList = document.createElement('ul');
    // key-value pair modeled as "LABEL": ["ATTRIBUTE", "UNITS"] (e.g. "Color": ["Black"], "Memory Size": ["11", "GB"])
    Object.keys(product.description).forEach(key => {
        if (!product.description[key].includes(null)) {
            let listItem = document.createElement('li');
            listItem.textContent = key + ": ";
            for (let i = 0; i < product.description[key].length; i++) {
                listItem.textContent += product.description[key][i];
                if (i < product.description[key].length - 1) {
                    listItem.textContent += " ";
                }
            }
            descriptionList.appendChild(listItem);
        }
    })
    descriptionList.classList.add('productcell__description');
    productCell.appendChild(descriptionList);

    productCell.classList.add('productcell');

    productCell.id = product.id;
    productCell.category = product.category;

    return productCell;
}

function onProductClick(e) {
    let productCell = e.target.parentElement;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            window.open('product.html', '_self');
        }
    };
    xhr.open("GET", `ProductListServlet/get?pID=${productCell.id}`, true);
    xhr.send();
}

function onResize(e) {
    removeGridBorderTop(productGrid);
    removeGridBorderBottom(productGrid);
    removeGridBorderTop(lastViewedGrid);
    removeGridBorderBottom(lastViewedGrid);
}

function removeGridBorderTop(grid) {
    let productGridComputedStyle = window.getComputedStyle(grid);
    // grid-template-columns computed value is as specified but converted to absolute lengths (e.g. "300px 300px 300px")
    let numberOfColumns = productGridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
    let numberOfRows = productGridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
    let firstRow = grid.querySelectorAll('.productcell:nth-child(-n+' + numberOfColumns + ')');
    firstRow.forEach(productCell => {
        productCell.style.borderTop = "medium none transparent";
    });
    // Cells moving from first to second row get their border tops again
    if (numberOfRows > 1) {
        let secondRow = grid.querySelectorAll('.productcell:nth-child(n+' + (numberOfColumns + 1) + '):nth-child(-n+' + (2 * numberOfColumns) + ')');
        secondRow.forEach(productCell => {
            productCell.style.borderTop = "1px solid rgba(0, 62, 120, 0.1)";
        })
    }
}

function removeGridBorderBottom(grid) {
    let productGridComputedStyle = window.getComputedStyle(grid);
    // computed value is as specified but converted to absolute lengths (e.g. "300px 300px 300px")
    let numberOfColumns = productGridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
    let numberOfRows = productGridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
    let lastRow = grid.querySelectorAll('.productcell:nth-child(n+' + ((numberOfRows - 1) * numberOfColumns + 1) + '):nth-child(-n+' + (numberOfRows * numberOfColumns) + ')');
    lastRow.forEach(productCell => {
        productCell.style.borderBottom = "medium none transparent";
    });
    if (numberOfRows > 1) {
        let secondLastRow = grid.querySelectorAll('.productcell:nth-child(n+' + ((numberOfRows - 2) * numberOfColumns + 1) + '):nth-child(-n+' + ((numberOfRows - 1) * numberOfColumns) + ')');
        secondLastRow.forEach(productCell => {
            productCell.style.borderBottom = "1px solid rgba(0, 62, 120, 0.1)";
        })
    }
}

function clearGrid(grid) {
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
    }
}

