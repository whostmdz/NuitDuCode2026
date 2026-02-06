// Bootstrap 4 validation + conversion en JSON
(function () {
    'use strict';
    window.addEventListener('load', function () {
        var form = document.getElementById('checkoutForm');

        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();

                const formData = new FormData(form);
                const data = {};
                formData.forEach((value, key) => data[key] = value);

                const json = JSON.stringify(data, null, 2);
                console.log("Données JSON :", json);

                // TODO: envoyer vers ton backend ici
            }

            form.classList.add('was-validated');

        }, false);
    }, false);
})();