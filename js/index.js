document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const submit = document.getElementById('submit');

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    try {
        if(!id || id === null) {
            Swal.fire({
                text: "URL no válida.",
                icon: "error"
            });
        }

        submit.addEventListener('click', sendData);

        function showError(message) {
            Swal.fire({
                text: message,
                icon: "error"
            });
        }
        function error400(message1) {
            Swal.fire({
                text: "Error 400",
                icon: "error"
            });
        }
        function error500(message1) {
            Swal.fire({
                text: "Error 500",
                icon: "error"
            });
        }
          
        async function sendData() {
            // Incluir un loading
            // Deshaibiltes el botón de enviar

            try {
                let data = new FormData(form);
                let response = await fetch(`https://crm.likeu.co/ClientesLikeU/index.php?entryPoint=SatisfactionSurvey&id=${id}`, {
                    method: 'POST',
                    body: data
                });
                let json = await response.json();
                console.log(json)
                if (!response.ok) {
                    if (response.status >= 400 && response.status <= 499) {
                        showError(json.message);
                    } else if (response.status >= 500 && response.status <= 599) {
                        showError("Algo ha fallado");
                    }
                    return;
                }

                
                Swal.fire({
                    text: json.message,
                    icon: 'success'
                });
                form.reset();
            } catch (error) {
                console.error( error);
                showError("Ha ocurrido un error");
            }
        }

    } catch (error) {
        console.error('Error inesperado:', error);
        Swal.fire({
            text: 'Error inesperado. Por favor, recargue la página o intente más tarde.',
            icon: 'error'
        });
    }
});
