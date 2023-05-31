import { defineStore } from "pinia";

export const usrStore = defineStore('usuariosStore', {
    state: () => ({
        currentUser: null,


    }),
    actions: {
        logIn(email, password) {
            //genera una promesa, si el usuarios es logedo exitosamente devuelve true, en caso contrario false
            return new Promise(async (resolve,) => {
                const url = new URL('https://646423da127ad0b8f8985dff.mockapi.io/api/v1/users');
                url.searchParams.set('email', email);

                let res = await fetch(url, {
                    method: 'GET',
                    headers: { 'content-type': 'application/json' },
                })
                let data = await res.json()

                resolve(this.comprobar(data, email, password))
            })

        },

        comprobar(usuarios, email, password) {
            // recorre el array de elementos con un ciclo while y una bandera
            // (si hay mas de un elemento con el mismo email y constraseña, devuelve el primero que encuentre )

            let index = 0;
            let encontrado = false;

            while (index < usuarios.length && !encontrado) {
                let usuario = usuarios[index];
                if (usuario.email == email && usuario.password == password) {
                    //si el email y password coinciden, guarda el usuario en la store y en el localStorage
                    encontrado = true;
                    this.currentUser = usuario;
                    window.localStorage.setItem("usuario", JSON.stringify(usuario))
                }
                index++;
            }
            return encontrado
        },

        logOut() {
            //log out y limpia el localStorage
            this.currentUser = null;
            window.localStorage.removeItem("usuario");
        },

        async cargarDataStorage() {

            // se llama desde el onMounted de la App.vue, toma los datos del user storage y intenta logear automaticamente
            // si la clave y email no fueron cambiadas relogea automaticamente, en caso contrario lanza un alert 

            let item = JSON.parse(String(window.localStorage.getItem("usuario")));
            let relogeado = await this.logIn(item.email, item.password)

            if(!relogeado){
                alert("no se pudo relogear :(")
                window.localStorage.removeItem("usuario");
            }
        }

    },
    getters: {

        isLogged() {
            return this.currentUser != null;
        },
    },

})

