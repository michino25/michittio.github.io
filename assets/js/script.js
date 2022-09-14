// mobile menu

var header = document.querySelector('#header');
var mobileMenu = document.querySelector('.mobile-menu-btn');

var headerHeight = header.clientHeight;
mobileMenu.onclick = function(){
    var isClose = header.clientHeight === headerHeight;
    if (isClose) {
        header.style.height = 'auto';
    } else {
        header.style.height = null;
    }
}

// choose menu: mobile

var menuItems = document.querySelectorAll('#nav li a[href*="#"]');

for(var menuItem of menuItems){

    menuItem.onclick = function(event){

        var isParent =  this.nextElementSibling 
        && this.nextElementSibling.classList.contains('subnav');

        if (!isParent) {
            header.style.height = null;
        } else {
            event.preventDefault();
        }
    }
}

// modal panel

const applyBtns = document.querySelectorAll('.js-apply-btn')
const modal = document.querySelector('.modal')
const close = document.querySelector('.js-modal-close')
const modalContainer = document.querySelector('.js-modal-container')

function showApplyNow() {
    modal.classList.add('open')
}

function hideApplyNow() {
    modal.classList.remove('open')
}

for (const applyBtn of applyBtns) {
    applyBtn.addEventListener('click', showApplyNow)
}

close.addEventListener('click', hideApplyNow)
modal.addEventListener('click', hideApplyNow)

modalContainer.addEventListener('click', function(event) {
    event.stopPropagation()
})