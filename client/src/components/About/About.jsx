import React from "react";
import "./About.css";
import PerfilPicture from './Perfil.jpg'


const About = ()=>{
    const student = {
        firstName: "Anthony",
        lastName: "Marquez",
        age: 20,
        OriginCountry: 'Bucaramanga Colombia',
        creationDate: "2023-06-07",
        graduatePhoto: PerfilPicture,
        bootcampLogo: "https://startupeable.com/directorio/wp-content/uploads/2021/03/d4face92a7abc37a414e0bc3acf4ff23ec588438.png",
        bootcampLink: "https://blog.soyhenry.com/",
        linkedinLink: "https://www.linkedin.com/in/anthony-m%C3%A1rquez-03bab2241/",
        githubLink: "https://github.com/Anthony-Am2003",
        additionalInfo: "Este proyecto fue desarrollado, en mi Paso Por SoyHenry un Bootcamp de Programacion, el cual presente en mi Etapa de proyecto Individual",
      };
    return(
        <div className="student-profile">
        <img src={student.graduatePhoto} alt="Graduate" className="graduate-photo" />
        <a href={student.bootcampLink} target="_blank" rel="noopener noreferrer">
  <img src={student.bootcampLogo} alt="Bootcamp Logo" className="bootcamp-logo" />
</a>
        <h1>{`${student.firstName} ${student.lastName}`}</h1>
        <p>Creation Date: {student.creationDate}</p>
        <p>Country: {student.OriginCountry}</p>
        <p>Age: {student.age}</p>
        <p className="links">
          <a href={student.linkedinLink}>LinkedIn</a> |{" "}
          <a href={student.githubLink}>GitHub</a>
        </p>
        <h3>{student.additionalInfo}</h3>
      </div>
    )
}
export default About;