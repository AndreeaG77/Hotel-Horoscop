// modificarea stilului unui grup de elemente
// selectare dupa tag
const schimbaFont = () => {
    const elemente = document.getElementsByTagName('h3');
    for (let element of elemente) {
        element.style.fontFamily='Cochin';
      }
    }

// modificarea stilului unui element
const schimbaCuloare = () => {
    const propozitie = document.querySelector('#text');
    propozitie.style.color='palevioletred';
  }



const adaugaRev = () => {
    const button1 = document.getElementById('b1');
    // Eveniment mouse
    button1.onclick = () => {
        const nume = document.getElementById('nume');
        const prenume = document.getElementById('prenume');
        const varsta = document.getElementById('varsta');
        const review = document.getElementById('review');
        const cnp = document.getElementById('cnp1');
        // RegExp pentru CNP
        var regExp = /^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$/;
        var verificare = regExp.test(cnp.value);
        if (verificare == false) {
            alert('CNP invalid');
        }
        else {
            var text1 = '';
            text1 += nume.value + " " + prenume.value + " - " + varsta.value + " ani"
            var text2 = '';
            text2 += review.value;
            var idPersoana = cnp.value;
            const lista = document.getElementById('reviewuri');
            // Creare element
            const elem = document.createElement('li');
            // Metoda concat din clasa String
            var text3 = text1.concat("\n", text2);
            elem.innerText = text3;
            // Folosirea proprietatii classList
            elem.classList.add('f');

            const id = document.createElement('p');
            id.innerText = cnp.value;
            id.style.display = 'none';

            const sectiune = document.createElement('div');
            sectiune.appendChild(elem);
            sectiune.appendChild(id);
            lista.appendChild(sectiune);

            setTimeout(function(){ alert('Review-ul dumneavoastra a fost adaugat cu succes'); }, 1000);
            
            // Modificarea proprietatii value
            nume.value = '';
            prenume.value = '';
            review.value = '';
            cnp.value = '';
            varsta.value = '';
        }

    }

}


const stergeRev = () =>{
    const button2 = document.getElementById('b2');

    button2.onclick = () => {
        const cnp = document.getElementById('cnp2');
        // RegExp pentru CNP
        var regExp = /^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$/;
        var verificare = regExp.test(cnp.value);
        if (verificare == false) {
            alert('CNP invalid');
        }
        else {
            const lista = document.getElementById('reviewuri');
            var aux1 = lista.children;
            for (let i = 0; i < aux1.length; i++){
                if(aux1[i].children[1].innerText==cnp.value){
                    // Stergere element
                    aux1[i].remove();
                    i--;
                }
            }
            cnp.value = '';
        }
    }

}


const adaugaNota = () => {
    const button3 = document.getElementById('b3');
    button3.onclick = () => {
        const form3 = document.getElementById('form3');
        const variante = form3.children;
        for(let i = 0; i < variante.length; i++){
            if(variante[i].nodeName=='INPUT'){
                if(variante[i].checked==true){
                    const nota = parseFloat(variante[i].value);
                    var arrayNote = localStorage.getItem('1').split(',');
                    var suma = nota;
                    for(let i = 0; i < arrayNote.length; i++){
                        suma += parseInt(arrayNote[i]);
                    }
                    const notaFinala = suma/(arrayNote.length+1);
                    // Selectare dupa clasa
                    const rating = document.getElementsByClassName('rating')[0];
                    rating.innerText = 'Rating: ' + notaFinala.toFixed(1);
                    // Metoda push din clasa Array
                    arrayNote.push(nota);
                    localStorage.removeItem('1');
                    localStorage.setItem('1', arrayNote);

                    // Modificarea proprietatii Checked
                    variante[i].checked = false;
                }
            }
        }
    }
}

const rNumber = (min, max) => {
    // Metodele floor si random din clasa Math
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const rColor = () => {
    return `rgb(${rNumber(0, 255)}, ${rNumber(0, 255)}, ${rNumber(0, 255)})`;
  }

const culoare = () => {
    const textAux = document.getElementById('text1');
    textAux.style.color = rColor();
}


const dimensiune = () => {
    const textAux = document.getElementById('text1');
    const numar = rNumber(27,37);
    textAux.style.fontSize = numar + 'px';
}

const cdata = () => {
    const data = document.getElementById('data');
    const textAux = document.getElementById('text1');
    // Metoda getComputedStyle
    data.style.color = getComputedStyle(textAux).color;
}


const adaugaData = () => {
    const data = document.getElementById('data');
    const d = new Date();
    // Metoda toDateString din clasa Date
    data.innerText = d.toDateString();
    data.style.fontSize = '20px';
    data.style.marginLeft = '25px';
}


const getDigit = (code) => {
    const digit = code.split('Digit')[1];
    if (digit)
      return digit;
  
    return false;
  }

const afiseazaInfo = () => {
    const info = document.getElementById('info');
    const nr = localStorage.getItem('1').split(',').length;
    if(nr==1){
        info.innerText = nr + ' persoana';
    }
    else {
        info.innerText = nr + ' persoane';
    }
    info.style.visibility = 'visible';
}

const keyHandler1 = (event) => {
    if(event.code=='Enter'){
        afiseazaInfo();
    }
    else{
        const digit = getDigit(event.code);
        if (!digit || digit > 5 )
          return;
        const form3 = document.getElementById('form3');
        const variante = form3.children;
        for(let i = 0; i < variante.length; i++){
            if(variante[i].nodeName=='INPUT'){
                if(variante[i].value==digit){
                    variante[i].checked = true;
                }
            }
        }
    }   
}

const keyHandler2 = (event) => {
    if(event.code=='Enter'){
        const info = document.getElementById('info');
        info.style.visibility = 'hidden';
    }
}

// 2 evenimente de la tastatura
document.addEventListener('keydown', keyHandler1);
document.addEventListener('keyup', keyHandler2);

var array1 = [5];
localStorage.setItem('1', array1);

  window.onload = () => {
    schimbaFont();
    schimbaCuloare();
    adaugaRev();
    stergeRev();
    adaugaNota();
    adaugaData();

    setInterval(culoare,1000);
    setInterval(dimensiune, 1000);
    setInterval(cdata, 2000);

  }