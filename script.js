const btn =
      document.querySelector("#btn");

      const message = document.querySelector("#message");

      btn.addEventListener("click", function () {
        message.textContent = "Welcome to our school!";
      });

      const apply =
         document.querySelector("#apply");
         const name =
         document.querySelector("#name");

         apply.addEventListener("click", function () {
           message.textContent = `Enter your name!`;
         });

         
        if (name.value === "") {
            message.textContent = "Welcome, guest!";

        } else { 
                 message.textContent = "Welcome, " + name.value;

        }
       
         

           

         