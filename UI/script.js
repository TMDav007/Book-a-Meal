$(window).on("load",function(){
    background(homepageAnimation);
   
});


// Menu -toggle-button
$(document). ready(function() {
    $(".menu-icon").on("click", function(){
        $("nav ul").toggleClass("showing");
    })

    //status show
    $("#status").on("click", function(){
        $("nav ul").toggleClass("showing");
        $(".cover").fadeIn('slow');
        $(".popup").fadeIn('slow');
    })

    //delte meal
    $(".del-Meal").on("click", function(){
        $("nav ul").toggleClass("showing");
        $(".cover").fadeIn('slow');
        $(".popup_delete").fadeIn('slow');
    })

    //modals
    $("#add-meal").on("click", function(){
        $("#modal-add-meal").fadeIn('slow');
        $("#addMeal_content").fadeIn('slow');
    })
    $(".edit-Meal").on("click", function(){
        $("#modal-edit-meal").fadeIn('slow');
        $("#editMeal_content").fadeIn('slow');
    })

    // close
    $(".close").on("click", function(){
        $("#modal-add-meal").fadeOut('slow');
        $("#addMeal_content").fadeOut('slow');
        $(".cover").fadeOut('slow');
        $(".popup_delete").fadeOut('slow');
    })
    $(".close").on("click", function(){
        $("#modal-edit-meal").fadeOut('slow');
        $("#editMeal_content").fadeOut('slow');
    })
    //image show;
    $("#img1").on("click", function(){
        let $src = "./images/jollof.jpg";
        $(".img-show").css({"z-index": '1006'});
        $(".cover").fadeIn('slow');
        $(".img-show img").attr("src", $src);
    });
    $("#img2").on("click", function(){
        let $src = "./images/chicken.jpg";
        $(".img-show").css({"z-index": '1006'});
        $(".cover").fadeIn('slow');
        $(".img-show img").attr("src", $src);
    });
    $("#img3").on("click", function(){
        let $src = "./images/local-delicacy.jpg";
        $(".img-show").css({"z-index": '1006'});
        $(".cover").fadeIn('slow');
        $(".img-show img").attr("src", $src);
    });


    $(".cover").on("click", function(){
        $(".img-show img").attr("src", "");
        $(".img-show").css({"z-index": '0'})

        $(".cover").fadeOut();
    })

});

//dashboard menu toggle
$(document). ready(function() {
    $(".menu-icon").on("click", function(){
        $(".menu-sidebar").toggleClass("active");
    })
});

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

function background(homepageAnimation){
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
