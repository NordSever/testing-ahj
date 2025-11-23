import '../styles/main.css';
import { russianPayments } from './array-payment-systems';
import {detectedPaymentSys, digitsOnly, lengthNumber, isSomePaymentSys, luhnCheck} from './validator'


export default class CardWidget {
  constructor(nameWidget = 'standart') {
    this.nameWidget = `${nameWidget}`;

    this.htmlContent = '';
    this.paymentSys = [];
    this.input = null;
    this.valueInput = '';
    
  }

  createHtmlContent() {
    this.htmlContent = `
      <div class="credit-card-widget" id="widget-${this.nameWidget}">
        
        
        <form class="card-form" id="card-form-${this.nameWidget}">
          <div class="card-icons" id="card-icons-${this.nameWidget}"></div>
          <div class="form-group">
            <label for="card-input-${this.nameWidget}">Card Number</label>
            <input 
              type="text" 
              id="card-input-${this.nameWidget}" 
              placeholder="1234 5678 9012 3456"
              maxlength="19"
            >
            
          </div>
          
          <button type="submit" class="submit-btn" id="submit-btn-${this.nameWidget}">Validate Card</button>
        </form>
      </div>
    `;
    return this.htmlContent;
  }

  appendWidget(selector, arrayPayments) {
    const elementInsert = document.querySelector(selector);
    elementInsert.innerHTML = this.createHtmlContent();

    this.input = document.getElementById(`card-input-${this.nameWidget}`);
    // this.valueInput = this.input.value;

    if(arrayPayments){
      this.paymentSys = arrayPayments;
      const divIcons = document.getElementById(`card-icons-${this.nameWidget}`);

      for (let i = 0; i < arrayPayments.length; i++){
        const currentIcon = document.createElement('img');
        currentIcon.src = this.paymentSys[i].src;
        currentIcon.classList.add('card-icon');
        
        currentIcon.classList.add(`card-icon-${this.nameWidget}`);
        currentIcon.classList.add('disiable');
        
        currentIcon.dataset[`${this.nameWidget}Icon`] = `${this.paymentSys[i].key}`;


        divIcons.append(currentIcon);
      }
    }
    this.bindEvents();
  }

  bindEvents(){
    
    this.input.addEventListener('input', () => {
      this.valueInput = this.input.value;
      this.controlInput();
    })

    document.getElementById(`card-form-${this.nameWidget}`).addEventListener('submit', (e) => {
      e.preventDefault();
      this.controlSubmit();
    })  
  }

  controlInput() {
    this.updateIcons(this.valueInput);
  }


  updateIcons(){
    
    const icons = document.querySelectorAll(`[data-${this.nameWidget}-icon]`);
    if(icons){
      icons.forEach((icon) => icon.classList.add(`disiable`));
    }

    const cardType = detectedPaymentSys(this.valueInput, this.paymentSys);
    const targetIcon = document.querySelector(`[data-${this.nameWidget}-icon = "${cardType}"]`)

    if(targetIcon){
      targetIcon.classList.remove('disiable');

    }
  }


  controlSubmit(){
    const withoutSpace = this.valueInput.replace(/\s/g, '');

    if(!digitsOnly(withoutSpace)){
      return alert('Номер может состоять только из цифр и пробелов');
    }

    if(!lengthNumber(withoutSpace)) {
      return alert('Количество цифр номера должно быть больше 12 и меньше 20');
    }

    if(!isSomePaymentSys(withoutSpace, this.paymentSys)) {
      return alert('Такая платёжная система не принимается');
    } 

    if(!luhnCheck(withoutSpace)) {
      return alert('Номер не проходит проверку алгоритмом Луна');
    } 

    return alert('Номер ВАЛИДНЫЙ');
  }
  

}

// Инициализация виджета 
let payment = new CardWidget('russia');
payment.appendWidget('body', russianPayments)
