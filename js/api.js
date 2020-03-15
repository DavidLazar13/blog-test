
const courseSection = document.querySelector(".articlesList")
const loadMoreBtn = document.querySelector("#loadMore")
let currentFilter = ''


const grabData = function () {
    return fetch("https://learn.accountingcpd.net/ACPD/API/Test/SampleObject")
        .then(response => response.json())
        .then(data => {

            return data
        })
}

function getItems(items, currentPage) {

    return items.filter((item, index) => {
        return (index >= currentPage * 10) && (index < currentPage * 10 + 10)
    })

}

function showItems(items) {
    items.forEach((item) => {
        courseSection.innerHTML = courseSection.innerHTML + `
            <div class="single-article ${item.type}" >
                <div class="thumbnail">
                    <span class="item-type-${item.type}">${item.type.toUpperCase()}</span>
                    <img class="image" src="img/${item.imageSrc}" alt="${item.altText}">
                </div>
                <div class="description">
                    <h3>${item.title}</h3>
                    <p>
                        ${item.description}
                    </p>
                    <p class="price"><strong>Price</strong>: £${item.price}</p>
                </div>
            </div>
        `
    })
}


grabData().then(data => {

    const totalItems = data.length;
    const numberOfPages = Math.floor(totalItems / 10);
    let currentPage = 0;

    courseSection.innerHTML = ""

    loadMoreBtn.addEventListener("click", () => {
        currentPage = currentPage + 1
        const items = getItems(data, currentPage)
        showItems(items)
        filterSelection()
        if (currentPage === numberOfPages) {
            loadMoreBtn.style.display = "none"
        }
    })

    showItems(getItems(data, currentPage))

    filterSelection()
})


function filterSelection() {
    var x, i;
    x = document.getElementsByClassName("single-article");
    for (i = 0; i < x.length; i++) {
        RemoveClass(x[i], "show");
        if (x[i].className.indexOf(currentFilter) > -1) AddClass(x[i], "show");
    }
}


function setFilter(filterType) {
    currentFilter = filterType
    filterSelection()
}


// Show filtered elements
function AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)

var btns = document.getElementsByClassName("filterBtn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function () {
    mainNav.classList.toggle('activeBurger');
});