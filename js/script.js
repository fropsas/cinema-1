const closePopupButton = document.getElementById('popup-close');
const openPopupButton = document.getElementById('popup-open')
const sendForm = document.getElementById('submit');

const popup = document.getElementById('popup');

closePopupButton.onclick = function(event){
    event.preventDefault();
    popup.classList.add('hidden');
}

openPopupButton.onclick = function(event){
    event.preventDefault();
    popup.classList.remove('hidden');
}
sendForm.onclick = function(event){

    let name = document.getElementById('name');   
    let nameParent = name.parentNode;
    nameParent.classList.remove('error')
    nameParent.getElementsByClassName('popup-error-messager')[0].innerHTML= '';
    if(!checkInput(name.value)){        
        nameParent.classList.add('error')
        nameParent.getElementsByClassName('popup-error-messager')[0].innerHTML='Заполните поле Имя';
        event.preventDefault();
    }
    

    let place = document.getElementById('place');
    let placeParent = place.parentNode;
    placeParent.classList.remove('error')
    placeParent.getElementsByClassName('popup-error-messager')[0].innerHTML= '';
    if(!checkInput(place.value)){        
        placeParent.classList.add('error')
        placeParent.getElementsByClassName('popup-error-messager')[0].innerHTML='Выберите место';
        event.preventDefault();
    }


    let agree = document.getElementById('agree');
    let agreeParent = agree.parentNode;
    agreeParent.classList.remove('error')
    agreeParent.getElementsByClassName('popup-error-messager')[0].innerHTML= '';
    if(!checkInput(agree.checked)){        
        agreeParent.classList.add('error')
        agreeParent.getElementsByClassName('popup-error-messager')[0].innerHTML='Согласитесь на передачу данных';
        event.preventDefault();
    }
    return true;
}

function checkInput(value){
    if(value)
        return true;
    return false;
}