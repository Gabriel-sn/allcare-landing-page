var swiper = new Swiper(".swiper", {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
    }, 

    autoplay: {
        delay: 3500,
        disableOnInteraction: false
    },

    disableOnInteraction: false,
    
});

const dropdownMenus = document.querySelectorAll('[data-dropdown]');
const events = ['touchstart', 'click'];


dropdownMenus.forEach(menu => {
    events.forEach(userEvent => {
        menu.addEventListener(userEvent, handleClick);
    });
});

function handleClick (event){
    event.preventDefault();
    this.classList.add('ativo');
    
    outsideClick(this, events, () => {
        this.classList.remove('ativo');
    });
}

function outsideClick(element, events, callback) {
    const html = document.documentElement;
    const outside = 'data-outside';

    if(!element.hasAttribute(outside)){
        events.forEach(userEvent => {
            html.addEventListener(userEvent, handleOutsideClick);
        })
        element.setAttribute(outside, '');
    }

    function handleOutsideClick(event) {
        if(!element.contains(event.target)){
            element.removeAttribute(outside);
            events.forEach(userEvent => {
                html.removeEventListener(userEvent, handleOutsideClick);
            });
            callback();
        }
    }
}