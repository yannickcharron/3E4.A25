const firstName = 'Yannick'; // Définir un identificateur ne pouvant être réaffecté.
let age = 37; //Définir une variable pouvant être réaffectée

console.log(firstName);
// firstName = 'Nicolas' TypeError Assignment to constant variable

age++;
//age = 'Bleu';

console.log(age);

const test = ('b' + 'a' + + 'a' + 'a').toLowerCase();
console.log(test);

function infoUser(firstName, age) {
    return "Bonjour je m'appelle " + firstName + " et j'ai " + age + " ans.";
}

console.log(infoUser(firstName, age));