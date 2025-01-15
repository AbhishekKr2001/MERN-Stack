
import './App.css';
const person = {
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
};



function Info() {
  return (
    <>

      <h1 className="h">Name : {person.name}</h1>
      <h2 className="h">Email : {person.email}</h2>
      <h2 className="h">City : {person.address.city}</h2>
      <h2 className="h">Company Name : {person.company.name}</h2>
    </>
  );
}




function Image() {
  return (
    <>
      <img className="img" src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuc3xlbnwwfHwwfHx8MA%3D%3D" alt="personsimage" srcset="" />
    </>
  );
}

let onlyimage = false;




const projects = [
  { name: "calculator", id: 1 },
  { name: "instaClone", id: 2 },
  { name: "facebook", id: 3 },
  { name: "todoList", id: 4 }
]



function ProjectDisplay() {
  let data = projects.map(pro =>
    <li className={pro.id}>{pro.name}</li>
  )
  return (data);
}





function AlertButton() {
  function alertme() {
    alert("alert Button was clicked");
    console.log("clicked");
  }
  return (
    <>
      <button onClick={alertme}>click me</button></>
  );
}



function App() {
  return (<>
    <AlertButton />
    <div className="App-header">
      <div>{onlyimage ? <Image /> : <Info />}</div>

      <ul> <ProjectDisplay /></ul>


    </div>
  </>
  );
}

export default App;
