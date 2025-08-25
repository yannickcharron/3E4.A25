const fruits = ['Kiwi', 'Banane', 'Fraise', 'Pamplemousse', 'Mangue'];
//const randomArray = ['Sports', 'Cooking', 1, true, {}]; À ne pas faire

for(let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

fruits.push('Framboises');
fruits.push(12);

//Ressemble à un foreach
for(let fruit of fruits) {
    console.log(fruit);
}