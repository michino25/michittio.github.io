// sign in / sign up

var signUp = document.querySelector('.sign_up');
var signIn = document.querySelector('.sign_in');
var modal = document.querySelector('.modal');
var modalSignUp = document.querySelector('.signup');
var modalSignIn = document.querySelector('.signin');
var modalOverlay = document.querySelector('.modal__overlay');
var modalReturns = document.querySelectorAll('.btnReturn');


signIn.onclick = function() {
    modal.style.display = "flex";
    modalSignIn.style.display = "block";
}

signUp.onclick = function() {
    modal.style.display = "flex";
    modalSignUp.style.display = "block";
}

modalOverlay.onclick = function() {
    modalSignIn.style.display = "none";
    modalSignUp.style.display = "none";
    modal.style.display = "none";
};

for (var modalReturn of modalReturns) {

    modalReturn.onclick = function () {
        modalSignIn.style.display = "none";
        modalSignUp.style.display = "none";
        modal.style.display = "none";
    };
}

// heart - react

var heartItems = document.querySelectorAll('.product-item__heart');

for (var heartItem of heartItems) {
    heartItem.onclick = function (){
        this.classList.toggle('product-item__hearting');
    }
}