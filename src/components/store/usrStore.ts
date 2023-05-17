import { defineStore } from "pinia";

export const usrStore = defineStore('usuariosStore', {
    state: () => ({
        listaDeUsuarios: {},
        
    }),
    actions: {

        async fetchData() {
            let resultado = await fetch('https://646423da127ad0b8f8985dff.mockapi.io/api/v1/users');
            this.listaDeUsuarios = await resultado.json();

            
        },
        async fetchDataPromise() {

            let resultado = await fetch('https://646423da127ad0b8f8985dff.mockapi.io/api/v1/users');
            this.listaDeUsuarios = await resultado.json();


            return new Promise((resolve) =>{
                resolve("ok")
            })

            
        },
    },
    getters: {
        getListaDeUsuarios() {
            return this.listaDeUsuarios;
        },
      },
    
})

