// Menu -toggle-button
$(document). ready(function() {
    $(".menu-icon").on("click", function(){
        $("nav ul").toggleClass("showing");
    })
});

//Scrolling Effect
$(window).on("scroll", function() {
    if($(window).scrollTop()) {
        $('nav ul').addClass('black');
    }
    else {
       $('nav ul').removeClass('black');
    }
})

// Background effect;
/* Background Animation  */
let homepageAnimation = [
    {
        "id" : 0,
        "title" : "Our meal is World class",
        "body": "Enjoy this meal with ease all at your finger tip",
        "img": "images/bg1.jpg"
    },
    {
        "id" : 1,
        "title" : "Have a lovely meal",
        "body": "We have varieties all for your pleasure.",
        "img": "images/bg2.jpg"
    },
    {
        "id" : 2,
        "title" : "Enjoy our classy meal",
        "body": "Have this and more just by booking a Meal.",
        "img": "images/bg3.jpg"
    },
    {
        "id" : 3,
        "title" : "Have it Hot",
        "body": "Enjoy our meal while is hot",
        "img": "images/bg4.jpg"
    }
];

$(window).on("load",function(){
    background(homepageAnimation);
});

function background(homepageAnimation){
   // let count = Math.floor(Math.random() * homepageAnimation.length);
    let myInterval = setInterval (function(){
        let count = Math.floor(Math.random() * homepageAnimation.length);
        var html = " ";
		html += "<div class = 'words'>";
        html += "<div> <h1>  " +  homepageAnimation[count].title + "</h1>";
        html += "<p> " +  homepageAnimation[count].body + "</p>";
        html += "<a href='#section-b' class='btn'>Register</a>"
		html += "<div>";
        document.getElementById("bg-image").style.backgroundImage = "url("+homepageAnimation[count].img+")";
        $(".words").html(html);
    },7000);

}
