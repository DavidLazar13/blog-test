
const courseSection = document.querySelector(".articles")

// let data = []

// // load the data
// fetch("https://learn.accountingcpd.net/ACPD/API/Test/SampleObject")
//     .then(response => response.json())
//     .then(jsonData => {
//         data = jsonData
//         getCourse()
//     })

// const getCourse = function () {
//     if (data.length > 1) {


//         const courseData = data
//         // get a course
//         //and put it inside
//         courseTitle.innerHTML = courseData.title
//         courseDescription.innerHTML = "lorem ipsum"
//         coursePrice.innerHTML = "£50"

//     }



// }

// getCourse()

const grabData = function () {
    return fetch("https://learn.accountingcpd.net/ACPD/API/Test/SampleObject")
        .then(response => response.json())
        .then(data => {

            return data
        })
}



grabData().then(data => {
    console.log(data)

    courseSection.innerHTML = ""

    data.forEach((item) => {
        courseSection.innerHTML = courseSection.innerHTML + `
            <div class="single-article ${item.type}" >
                
                    <img class="image" src="img/${item.imageSrc}" alt="${item.altText}">
                
                <div>
                    <h3>${item.title}</h3>
                    <p>
                        ${item.description}
                    </p>
                    <p class="price"><strong>Price</strong>: £${item.price}</p>
                </div>
            </div>
        `
    })
    filterSelection("all")
})



function filterSelection(c) {

    // document.getElementsByClassName("single-article").classList.add("show")
    var x, i;
    x = document.getElementsByClassName("single-article");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
    }
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