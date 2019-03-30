        window.onload = carga;

        function carga()
        {
            var boton = document.getElementById("btn").addEventListener("click", validarUsuario);
            //var boton = document.getElementById("btn").removeEventListener("click", validarUsuario);
        }
        
        function validarUsuario()
        {
           if (document.getElementById("user").value == "gonzalo") 
           {
               if (document.getElementById("pass").value != "1234")
               {
                   alert("Usuario o contraseña invalidos!");
               }
           }
           else
           {
               alert("Usted se ha logeado como " + document.getElementById("user").value);
           }
        }