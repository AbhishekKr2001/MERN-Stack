import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import NavBar from './components/Navbar';
import Intro from './components/home';
import About from './components/About';
import Education from './components/education';
import Internships from './components/Internship';
import { Projects } from './components/project';
import Contact from './components/contactDetails';
import Form1 from './components/Form';



const mydetails = {
  name: "Abhishek Kumar",
  Email: "abhishek2001jmt@gmail.com",
  Mobile: "9608639167",
  socialMedia: {
    linkedIn: "https://www.linkedin.com/in/abhishek-kumar-5042811a7/",
    github: "https://github.com/abhishekrai17/",
  },
  education: {
    course: "Bachelor's of Technology",
    cgpa: 7.83,

  },
  projects: [
    {
      "name": "calculator",
      "id": 1
    },
    {
      "name": "spotify",
      "id": 2
    },
    {
      "name": "meta",
      "id": 3
    },
    {
      "name": "windows",
      "id": 4
    }
  ],
  prfilePic: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600"
};


function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Intro mydetails={mydetails} />} />
          <Route path="/about" element={<About mydetails={mydetails} />} />
          <Route path="/education" element={<Education mydetails={mydetails} />} />
          <Route path="/internships" element={<Internships mydetails={mydetails} />} />
          <Route path="/projects" element={<Projects mydetails={mydetails} />} />
          <Route path="/contact" element={<Contact mydetails={mydetails} />} />
          <Route path="/form" element={<Form1 mydetails={mydetails} />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
