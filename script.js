

// les variables utilisés dans le code JS

var titre = document.getElementById('titre');
var auteur = document.getElementById('auteur');
var prix = document.getElementById('prix');
var date = document.getElementById('date-de-publication');
var langue = document.getElementById('langue');
var types = document.querySelectorAll('input[name="Selectionner"]');
var formulaire = document.getElementById('form');
var errors = document.getElementsByClassName("error");
const roman = document.getElementById('Roman');
const essai = document.getElementById('Essai');
const bande = document.getElementById('Bande-Dessinée');

var tableau = document.getElementsByTagName('table')[0];
var ChangerBtn = document.getElementById('changerBtn');
var AjouterBtn = document.getElementById('ajouterBtn');
var selectedValue;
var validation_ok = true;


// les conditions de validation formilaire cotée client

formulaire.addEventListener('submit', function eVent(e){
    e.preventDefault();
    var validation_ok = true;

    // titre validation

    if (titre.value.length > 30){
    validation_ok = false;
    errors[0].innerHTML="ne doit pas dépasser 30 caractères";
    errors[0].style.color = 'red'

  }
   else if( titre.value == ""){
    validation_ok = false;
    errors[0].innerHTML="Ce champ est OBLIGATOIRE";
    errors[0].style.color = 'red'
    titre.style.borderColor = "red" 
  }

  else{
    titre.style.borderColor = "#376e3c" 
    errors[0].innerHTML="";
  };
  
          // auteur validation


  if (auteur.value.length > 30){
    validation_ok = false;
    errors[1].innerHTML="ne doit pas dépasser 30 caractères";
    errors[1].style.color = 'red'
  }
   else if( auteur.value == ""){
    validation_ok = false;
    errors[1].innerHTML="Ce champ est OBLIGATOIRE";
    errors[1].style.color = 'red';
    auteur.style.borderColor = "red" 
  }
  else{
    auteur.style.borderColor = "#376e3c" 
    errors[1].innerHTML="";
  };     

          // prix validation

  if(isNaN(prix.value)){
    validation_ok = false;
    errors[2].innerHTML="entrer un nombre ";
    errors[2].style.color = 'red';
    prix.style.borderColor = "red" 
  }
  else if(prix.value == ""){
    validation_ok = false;
    errors[2].innerHTML=" Ce champ est OBLIGATOIRE";
    errors[2].style.color = 'red';
    prix.style.borderColor = "red" 
  }
  else if(prix.value<0){
    validation_ok = false;
    errors[2].innerHTML=" la valeur de prix doit etre postive";
    errors[2].style.color = 'red';
    prix.style.borderColor = "red"  
  }

  else{
    errors[2].innerHTML="";
    prix.style.borderColor = "#376e3c" 
    
  
  };

          // date du publication  validation

  if( date.value == ""){
    validation_ok = false;
    errors[3].innerHTML="Ce champ est OBLIGATOIRE";
    errors[3].style.color = 'red';
    date.style.borderColor = "red" 
  }
  else {date.style.borderColor = "#376e3c"
    errors[3].innerHTML="";

};

        // langue validation

  if(langue.value == ""){
    validation_ok = false;
    errors[4].innerHTML="Selectionner une langue";
    errors[4].style.color = 'red';
    langue.style.borderColor="red"
  }
  else {
    errors[4].innerHTML="";
    langue.style.borderColor="#376e3c"
  }
    // types validation

  if(!(roman.checked || essai.checked || bande.checked)){
    validation_ok = false;
    errors[5].innerHTML="Coucher votre type d'ouvrage";
    errors[5].style.color = 'red';
  }
  else{
    errors[5].innerHTML="";
  }

  for(var type of types){
    if(type.checked)
    {
      selectedValue = type.value;
      break;
    }
  }

  // var template = `
  //                   <tr>
  //                       <td>${titre.value}</td>
  //                       <td>${auteur.value}</td>
  //                       <td>${prix.value}</td> 
  //                       <td>${date.value}</td> 
  //                       <td>${langue.options[langue.selectedIndex].value}</td> 
  //                       <td>${selectedValue}</td> 
  //                       <td><button type="submit">Supprimer</button>    <button type="submit"> Editer</button> </td> 

  //                   </tr>`;
  //   tableau.innerHTML+=template;




  // la validation des données dans le tableau

     if(validation_ok == true)  {

    tableau.style.display="block";
    var ligne = tableau.insertRow(-1);
    ligne.insertCell(0).innerHTML=titre.value;
    ligne.insertCell(1).innerHTML=auteur.value;
    ligne.insertCell(2).innerHTML=prix.value;
    ligne.insertCell(3).innerHTML=date.value;
    ligne.insertCell(4).innerHTML=langue.options[langue.selectedIndex].value;
    
    for(var type of types){
    if(type.checked)
    {
      selectedValue = type.value;
    }
  }
    ligne.insertCell(5).innerHTML=selectedValue;

    ligne.insertCell(6).innerHTML= '<button onclick="btnEdit(this)"class="btn">Editer</button>' + '<button onclick="btnSupr(this)"  class="btn"  id="btn2">Supprimer</button>';

   
} 
resetForm (); 
  }
);

resetBorderColor ();


//  fonction de supprimer un ligne dans le tableau

function btnSupr(r)
{
if (confirm('vous voulez vraiment supprimer cette ligne')){
var i=r.parentNode.parentNode.rowIndex;
    tableau.deleteRow(i);
  };
}

// fonction de vider les Inputs aprés validation
function resetForm () {
var radio = document.querySelector('input[type=radio]:checked');
titre.value="";
auteur.value="";
prix.value="";
date.value="";
langue.value="";
radio.checked = false;

}
// fonction de reseter les bordure en blanche  
function resetBorderColor (){
titre.style.borderColor="white";
auteur.style.borderColor="white";
prix.style.borderColor="white";
date.style.borderColor="white";
langue.style.borderColor="white";

}

// la fonction d'éditer une ligne de tableau

function btnEdit(td) {
resetBorderColor ();


selectedRow = td.parentElement.parentElement;
titre.value = selectedRow.cells[0].innerHTML;
auteur.value = selectedRow.cells[1].innerHTML;
prix.value = selectedRow.cells[2].innerHTML;
date.value = selectedRow.cells[3].innerHTML;
langue.value = selectedRow.cells[4].innerHTML;

for(var i=0;i<3;i++){
    if(types[i].value==selectedRow.cells[5].innerHTML)
    {
      types[i].checked=true;
    }
  }

  selectedValue=selectedRow.cells[5].innerHTML;



// changement des bouton "ajouter " par bouton "changer"

ChangerBtn.style.display="block"; 
AjouterBtn.style.display="none"; 


};

// validation de changement des données

function  btnChanger(){
selectedRow.cells[0].innerHTML =  titre.value;
selectedRow.cells[1].innerHTML = auteur.value;
selectedRow.cells[2].innerHTML = prix.value;
selectedRow.cells[3].innerHTML =  date.value;
selectedRow.cells[4].innerHTML =  langue.options[langue.selectedIndex].value;

for(var type of types){
    if(type.checked)
    {
      selectedValue = type.value;
    }
  }

  selectedRow.cells[5].innerHTML=selectedValue;

  // changement des bouton " changer " par bouton "ajouter"

   ChangerBtn.style.display="none"; 
   AjouterBtn.style.display="block";
   resetForm ();
};
