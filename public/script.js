Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}
let rybyAPI = [];
let wybranaRyba;
let input = document.getElementById("zgadywanaRyba");
let submit = document.getElementById("submit");
let output = document.getElementById("output");
let komunikat = document.getElementById("komunikat");
fetch('/api')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        rybyAPI = data;
        wybranaRyba = rybyAPI.random();
        const lista = document.getElementById('lista-ryb');
        data.forEach(fish => {
            // const li = document.createElement('li');
            // li.textContent = fish.nazwa;
            let opcja = document.createElement('option');
            opcja.value = fish.nazwa;
	    opcja.id = fish.nazwa;
            lista.appendChild(opcja);
        });
    })
    .catch(err => {
        console.error("Błąd podczas pobierania danych:", err);
    });

function sprawdzArraye(arr1, arr2){
    if(arr1.length != arr2.length){
        return false;
    }
    arr1.sort();
    arr2.sort();
    for(let i = 0; i<arr1.length; i++){
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}

function zgadnij(){
            if(input.value == wybranaRyba.nazwa){
                input.disabled = true;
                submit.disabled = true;
                komunikat.innerHTML += "<div class='wygrana'><h1>WYGRAŁEŚ!</h1><p>Odpowiedzią był(-a): "+wybranaRyba.nazwa+"!</p><button id='odPoczatku'>zagraj jeszcze raz</button>";
                document.getElementById("odPoczatku").addEventListener("click", function(){location.reload()});
		}
    rybyAPI.forEach(element => {
	 if(element.nazwa == input.value){
	    document.getElementById(element.nazwa).remove();
	    input.value = "";
            let masa = (element.masa >= 1000) ? "do "+(element.masa / 1000)+" kg" : "do "+element.masa+" gram";
            let okienkoNazwa = "<div class='kwadrat'>"+element.nazwa+"</div>";
            let okienkoRodzina = (element.rodzina == wybranaRyba.rodzina) ? "<div class='kwadrat dobrze'>"+element.rodzina+"</div>" : "<div class='kwadrat zle'>"+element.rodzina+"</div>";
            let okienkoDlugosc = (element.dlugosc == wybranaRyba.dlugosc) ? "<div class='kwadrat dobrze'>do "+element.dlugosc+" cm</div>" : (element.dlugosc > wybranaRyba.dlugosc) ? "<div class='kwadrat zle mniej'><span>do "+element.dlugosc+" cm</span></div>" : "<div class='kwadrat zle wiecej'>do "+element.dlugosc+" cm</div>";
            let okienkoMasa = (element.masa == wybranaRyba.masa) ? "<div class='kwadrat dobrze'>"+masa+"</div>" : (element.masa > wybranaRyba.masa) ? "<div class='kwadrat zle mniej'><span>"+masa+"</span></div>" : "<div class='kwadrat zle wiecej'>"+masa+"</div>";
            let wymiarOchronny = (element.wymiar_ochronny == wybranaRyba.wymiar_ochronny) ? "<div class='kwadrat dobrze'>"+element.wymiar_ochronny+"</div>" : (element.wymiar_ochronny > wybranaRyba.wymiar_ochronny) ? "<div class='kwadrat zle mniej'><span>"+element.wymiar_ochronny+"</span></div>" : "<div class='kwadrat zle wiecej'>"+element.wymiar_ochronny+"</div>";
            let okienkoSrodowisko = (sprawdzArraye(element.woda, wybranaRyba.woda)) ? "<div class='kwadrat dobrze lista'>"+element.woda.join(", ")+"</div>" : (element.woda.some(r=> wybranaRyba.woda.includes(r))) ? "<div class='kwadrat czesciowo lista'>"+element.woda.join(", ")+"</div>" : "<div class='kwadrat zle lista'>"+element.woda.join(", ")+"</div>";
            let okienkoWystepowanie = (sprawdzArraye(element.wystepowanie, wybranaRyba.wystepowanie)) ? "<div class='kwadrat dobrze lista'>"+element.wystepowanie.join(", ")+"</div>" : (element.wystepowanie.some(r=> wybranaRyba.wystepowanie.includes(r))) ? "<div class='kwadrat czesciowo lista'>"+element.wystepowanie.join(", ")+"</div>" : "<div class='kwadrat zle lista'>"+element.wystepowanie.join(", ")+"</div>";
            let okienkoPrzyneta = (sprawdzArraye(element.przyneta, wybranaRyba.przyneta)) ? "<div class='kwadrat dobrze lista'>"+element.przyneta.join(", ")+"</div>" : (element.przyneta.some(r=> wybranaRyba.przyneta.includes(r))) ? "<div class='kwadrat czesciowo lista'>"+element.przyneta.join(", ")+"</div>" : "<div class='kwadrat zle lista'>"+element.przyneta.join(", ")+"</div>";
            let okienkoZagrozenie = (element.kategoria_zagrozenia == wybranaRyba.kategoria_zagrozenia) ? "<div class='kwadrat dobrze'>"+element.kategoria_zagrozenia+"</div>" : "<div class='kwadrat zle'>"+element.kategoria_zagrozenia+"</div>";
            output.innerHTML += "<div class='odpowiedz'>"+okienkoNazwa+okienkoRodzina+okienkoDlugosc+okienkoMasa+wymiarOchronny+okienkoSrodowisko+okienkoWystepowanie+okienkoPrzyneta+okienkoZagrozenie+"</div>";
       
        }
    });
}
