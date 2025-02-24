// Función para abrir/cerrar formularios y asignar required a los inputs del método de pago
function toggleForm(id) {
    let form = document.getElementById(id);
    if (!form) return;

    // Si es un formulario de pago, implementamos comportamiento toggle
    if (["tarjetaForm", "paypalForm", "applePayForm", "masterCardForm"].includes(id)) {
        if (form.classList.contains("show")) {
            // Si ya está abierto, lo cerramos y removemos el required
            form.classList.remove("show");
            form.style.display = "none";
            form.setAttribute("aria-hidden", "true");
            setPaymentRequired(null);
            return;
        } else {
            // Cerramos los demás formularios de pago
            let paymentForms = document.querySelectorAll("#tarjetaForm, #paypalForm, #applePayForm, #masterCardForm");
            paymentForms.forEach(f => {
                if (f.id !== id) {
                    f.classList.remove("show");
                    f.style.display = "none";
                    f.setAttribute("aria-hidden", "true");
                }
            });
        }
    }

    // Mostramos el formulario objetivo
    form.classList.add("show");
    form.style.display = "block";
    form.setAttribute("aria-hidden", "false");

    // Si es un método de pago, asignamos el required a sus inputs
    if (["tarjetaForm", "paypalForm", "applePayForm", "masterCardForm"].includes(id)) {
        setPaymentRequired(id);
    }
}

// Función para asignar (o quitar) el atributo required a los inputs del método de pago seleccionado
function setPaymentRequired(selectedId) {
    const paymentForms = ["tarjetaForm", "paypalForm", "applePayForm", "masterCardForm"];
    paymentForms.forEach(id => {
        let container = document.getElementById(id);
        if (container) {
            const inputs = container.querySelectorAll("input");
            inputs.forEach(input => {
                if (id === selectedId && container.classList.contains("show")) {
                    input.setAttribute("required", "true");
                } else {
                    input.removeAttribute("required");
                }
            });
        }
    });
}

// Cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
    // Agregamos validación en tiempo real (blur) a los inputs de los formularios de pago
    const paymentInputs = document.querySelectorAll("#tarjetaForm input, #paypalForm input, #applePayForm input, #masterCardForm input");
    paymentInputs.forEach(input => {
        input.addEventListener("blur", function () {
            const errorSpan = document.getElementById("error-" + input.id);
            if (input.hasAttribute("required") && input.value.trim() === "") {
                if (errorSpan) {
                    errorSpan.style.display = "block";
                    errorSpan.setAttribute("aria-live", "assertive");
                }
                input.setAttribute("aria-invalid", "true");
            } else {
                if (errorSpan) {
                    errorSpan.style.display = "none";
                }
                input.removeAttribute("aria-invalid");
            }
        });
    });

    // Listener para el submit del formulario
    document.getElementById("formularioCompra").addEventListener("submit", function (event) {
        let inputs = document.querySelectorAll("input");
        let valid = true;

        inputs.forEach(input => {
            const errorSpan = document.getElementById("error-" + input.id);
            if (errorSpan) {
                if (input.value.trim() === "") {
                    event.preventDefault();
                    errorSpan.style.display = "block";
                    errorSpan.setAttribute("aria-live", "assertive");
                    input.setAttribute("aria-invalid", "true");
                    valid = false;
                } else {
                    errorSpan.style.display = "none";
                    input.removeAttribute("aria-invalid");
                }
            }
        });

        // Verificamos que se haya seleccionado un método de pago
        let paymentOption = document.querySelector("#tarjetaForm.show, #paypalForm.show, #applePayForm.show, #masterCardForm.show");
        if (!paymentOption) {
            event.preventDefault();
            alert("Por favor, selecciona un método de pago y rellena sus campos.");
            valid = false;
        }

        if (valid) {
            alert("¡Compra realizada con éxito!");
        }
    });
});
