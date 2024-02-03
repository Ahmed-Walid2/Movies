const homeOffset = $(".offset").offset().top;

getMovie("movie/now_playing");

$(document).ready(function () {
  $(".loading").fadeOut(1500);
});

$(window).scroll(function () {
  let scrollPosition = $(window).scrollTop();
  if (scrollPosition >= homeOffset) {
    $("#back-to-top").fadeIn(400);
  } else {
    $("#back-to-top").fadeOut(400);
  }
});

$(".nav-icon").on("click", openNav);

$(".menu ul li a.category").on("click", function (e) {
  let categoryData = $(e.target).attr("category");
  getMovie(categoryData);
  backTop();
});

$(".menu ul li.contactLink").on("click", function () {
  let position = $("#contact").offset().top;
  $("html, body").animate({ scrollTop: position }, 1500);
});

$("#back-to-top").on("click", backTop);

function backTop() {
  $("html, body").animate({ scrollTop: 0 }, 1500);
}

// START NAVBAR

function openNav() {
  if ($("nav").css("margin-left") == "250px") {
    closeNav();
  } else {
    $(".side-nav").css("margin-left", "0px");
    $("nav").css("margin-left", "250px");
    $(".menu ul li").animate({ paddingTop: "25px", opacity: "1" }, 1000);
    $(".nav-icon").html('<i class="fa-solid fa-xmark"></i>');
  }
}

function closeNav() {
  $(".menu ul li").animate({ paddingTop: "250px", opacity: "0" }, 1000);
  $(".side-nav").css("margin-left", "-250px");
  $("nav").css("margin-left", "0px");
  $(".nav-icon").html('<i class="fa-solid fa-align-justify"></i>');
}

// END NAVBAR

// START HOME

async function getMovie(category) {
  let response = await fetch(
    `https://api.themoviedb.org/3/${category}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
  );

  if (response.ok && 400 != response.status) {
    let data = await response.json();
    data = data.results;
    displayMovie(data);
  }
}

async function getMovieBySearch(word) {
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${word}&api_key=eba8b9a7199efdcb0ca1f96879b83c44`
  );

  if (response.ok && 400 != response.status) {
    let data = await response.json();
    data = data.results;
    displayMovie(data);
  }
}

$("#search").on("input", (e) => {
  getMovieBySearch(e.target.value);
  if (e.target.value == "") {
    getMovie("movie/now_playing");
  }
});

function displayMovie(movie) {
  let imgPath = "https://image.tmdb.org/t/p/w500";
  let box = "";
  for (let i = 0; i < movie.length; i++) {
    box += `
    <div class="col-md-6 col-lg-4 animate__animated">
    <div class="card text-white border-0">
      <div class="card-img">
        <img class="img-fluid rounded-3" src="${
          movie[i].poster_path
            ? imgPath + movie[i].poster_path
            : "../imgs/error.jpg"
        }" alt="${movie[i].title}" />
      </div>
      <div class="overlay">
        <h1>${movie[i].title ? movie[i].title : movie[i].name}</h1>
        <p id="desc">
          ${
            movie[i].overview.length > 300
              ? `${movie[i].overview.slice(0, 200)}...`
              : movie[i].overview
          }
        </p>
        <p id="date">Relase Date : ${
          movie[i].release_date
            ? movie[i].release_date
            : movie[i].first_air_date
        }</p>
        <h3 id="rate">${movie[i].vote_average.toFixed(1)}</h3>
      </div>
    </div>
  </div>
    `;
  }
  $("#home .row").html(box);
  $("#home .row div ").addClass("animate__fadeIn");
}

// END HOME

// START CONTACT

$("form button").on("click", function (e) {
  e.preventDefault();
});

$("#contact #name").on("input", checkName);
$("#contact #email").on("input", checkEmail);
$("#contact #phone").on("input", checkPhone);
$("#contact #age").on("input", checkAge);
$("#contact #password").on("input", checkPw);
$("#contact #repassword").on("input", checkRePw);
$(".showPass").click(function () {
  if ($("#password").attr("type") == "text") {
    $("#password").attr("type", "password");
    $(".showPass").html('<i class="fa-solid fa-eye-slash"></i>');
  } else {
    $("#password").attr("type", "text");
    $(".showPass").html('<i class="fa-solid fa-eye"></i>');
  }
});

function checkName() {
  let regex = /^[a-zA-z\s]{1,36}$/;
  let isValid = regex.test($("#contact #name").val());
  if (isValid) {
    $(".nameError").fadeOut(300);
    $("#name").removeClass("border-danger");
    stopBtnMove();
  } else {
    $(".nameError").fadeIn(300);
    $("#name").addClass("border-danger");
    startBtnMove();
  }
  if ($("#contact #name").val() == "") {
    $(".nameError").fadeOut(300);
    $("#name").removeClass("border-danger");
    stopBtnMove();
  }
}

function checkEmail() {
  let regex = /^[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{3}$/;
  let isValid = regex.test($("#contact #email").val());
  if (isValid) {
    $(".emailError").fadeOut(300);
    $("#email").removeClass("border-danger");
    stopBtnMove();
  } else {
    $(".emailError").fadeIn(300);
    $("#email").addClass("border-danger");
    startBtnMove();
  }
  if ($("#contact #email").val() == "") {
    $(".emailError").fadeOut(300);
    $("#email").removeClass("border-danger");
    stopBtnMove();
  }
}

function checkPhone() {
  let regex = /^(02){0,}(01)[0125][0-9]{8}$/;
  let isValid = regex.test($("#contact #phone").val());
  if (isValid) {
    $(".phoneError").fadeOut(300);
    $("#phone").removeClass("border-danger");
    stopBtnMove();
  } else {
    $(".phoneError").fadeIn(300);
    $("#phone").addClass("border-danger");
    startBtnMove();
  }
  if ($("#contact #phone").val() == "") {
    $(".phoneError").fadeOut(300);
    $("#phone").removeClass("border-danger");
    closeBtn();
  }
}

function checkAge() {
  let regex = /^(1[6-9]|[2-9][0-9]|100)$/;
  let isValid = regex.test($("#contact #age").val());
  if (isValid) {
    $(".ageError").fadeOut(300);
    $("#age").removeClass("border-danger");
    stopBtnMove();
  } else {
    $(".ageError").fadeIn(300);
    $("#age").addClass("border-danger");
    startBtnMove();
  }
  if ($("#contact #age").val() == "") {
    $(".ageError").fadeOut(300);
    $("#age").removeClass("border-danger");
    stopBtnMove();
  }
}
function checkPw() {
  let regex =
    /^([a-zA-Z]{7,}[0-9]{1,})|([0-9]{7,}[a-zA-Z]{1,})|([0-9]{1,}[a-zA-Z]{7,})$/;
  let isValid = regex.test($("#contact #password").val());
  if (isValid) {
    $(".pwError").fadeOut(300);
    $("#password").removeClass("border-danger");
    stopBtnMove();
  } else {
    $(".pwError").fadeIn(300);
    $("#password").addClass("border-danger");
    startBtnMove();
  }
  if ($("#contact #password").val() == "") {
    $(".pwError").fadeOut(300);
    $("#password").removeClass("border-danger");
    stopBtnMove();
  }
}

function checkRePw() {
  if ($("#repassword").val() === $("#password").val()) {
    $(".rePwError").fadeOut(300);
    $("#repassword").removeClass("border-danger");
    stopBtnMove();
  } else {
    $(".rePwError").fadeIn(300);
    $("#repassword").addClass("border-danger");
    startBtnMove();
  }
  if ($("#contact #repassword").val() == "") {
    $(".rePwError").fadeOut(300);
    $("#repassword").removeClass("border-danger");
    stopBtnMove();
  }
}

function moveButton() {
  let buttonLocation = $(`form button`).css("marginLeft");
  if (buttonLocation == "250px") {
    $(`form button`).css({ marginLeft: "0px" });
  } else {
    $(`form button`).css({ marginLeft: "250px" });
  }
}

function startBtnMove() {
  $("form button").on("mouseenter", moveButton);
  $("form button").removeClass("form-btn");
  $("form button").addClass("error-btn ");
}

function stopBtnMove() {
  $("form button").off("mouseenter", moveButton);
  $("form button").css({ marginLeft: "0px" });
  $("form button").addClass("form-btn");
  $("form button").removeClass("error-btn ");
}

// END CONTACT
