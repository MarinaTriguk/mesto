let editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener(
  'click',
  function() {
    const popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');

    let profileName = document.querySelector('.profile__name');
    let inputNameText = profileName.textContent;
    let inputName = document.querySelector('#input-name');
    inputName.value = inputNameText;

    let profilePersonalInfo = document.querySelector('.profile__personal-info');
    let inputPersonalInfoText = profilePersonalInfo.textContent;
    let inputPersonalInfo = document.querySelector('#input-personal-info');
    inputPersonalInfo.value = inputPersonalInfoText;
  }
);
let formPopupContainer = document.querySelector('.popup__container');
formPopupContainer.addEventListener(
    'submit',
    function (evt) {
      evt.preventDefault();
      
    }


)


let closeIcon = document.querySelector('.popup__close-icon');

closeIcon.addEventListener(
    'click',
    function () {
      const popup = document.querySelector('.popup');
      popup.classList.remove('popup_opened');
    }
)







