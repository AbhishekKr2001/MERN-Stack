let mybtn = document.getElementById("btn");
let myData = document.getElementById("info");
mybtn.addEventListener('click', perform);
const url = "https://jsonplaceholder.typicode.com/users";


async function perform() {
    let id = prompt("enter the id");
    let data = await fetch(`${url}/${id}`);
    let result = await data.json();
    console.log(result.name);
    console.log(result.email);
    console.log(result.address.city);
    console.log(result.company);

    const myPost = document.createElement('div');
    myPost.innerHTML = `
        <h4>Name : ${result.name}</h4>
        <h4>City : ${result.address.city}</h4>
        <h4>Company Name : ${result.company.name}</h4>
        <h4>Email : ${result.email}</h4>
       
        <hr>
        `;
    myData.appendChild(myPost);

}