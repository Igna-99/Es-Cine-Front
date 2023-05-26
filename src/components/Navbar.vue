
<template>
     <nav class="navbar" >
        <ul class="nav-links">
          <li><router-link to="/peliculas">PELICULAS</router-link></li>
            <li><router-link to="/">HOME</router-link></li> 
            <li> 
                <div class="logo">
                <img src="logo.png" alt="Logo" />
            </div> 
        </li>
        <li><router-link to="/Salas">SALAS</router-link></li>
        <li><router-link to="/Contacto">CONTACTO</router-link></li>
        </ul>
    </nav>
    <div>
      <RouterView></RouterView>
    </div>
  </template>

 <style>

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin-bottom: 20px;
    z-index: 999;
    transition: background-color 0.3s ease;
  }
  .logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  
  .logo img {
    display: block;
    width: 100%;
    height: auto;
  }

  .nav-links {
    position:relative;
    list-style: none;
    margin: 0;
    padding: 10px 0px 0px 60px;
    border-radius: 5px;
    display:inline-flex;
    background-color: black;
    height: 45px;
    word-spacing: 70px;
}

.nav-links li a{
    position: relative;
    padding: 5px 30px;
    font-size: 1.5rem;
    color: #ffffff;;
    border-radius: 4px;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    transition: 0.5s;
    z-index: 1;
    font-family: "Montserrat", sans-serif;
    font-size: 12px;
}

li{
    margin-right: 70px;
}
.nav-links a:hover {
    font-weight: bold;
    color: #000!important;
     transform: scale(1);
     transition-delay: 0.1s;
     box-shadow: 0 0 5px rgb(143, 0, 0),
     0 0 15px rgb(143, 0, 0),
     0 0 30px rgb(143, 0, 0);
     background: rgb(143, 0, 0);
}


li:active {
  transform: translateY(4px);
}
  
  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
    }
    .logo {
        margin-bottom: 10px;
    }
  }
  </style>
  
  