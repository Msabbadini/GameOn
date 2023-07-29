//Partie Regex
const Email_Regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
const Name_Regex = /^[a-zA-Z]+((['-][a-zA-Z ])?[a-zA-Z]*)*$/

// Calcul de l'âge selon la date
const getAge = pBirthDay => new Date(Date.now() - new Date(pBirthDay).getTime()).getFullYear() - 1970;

// valide un champ procédural
const Validate = (elem, validationFunction) => {
    const value = elem.type === "checkbox" ? elem.checked : elem.value;
    const error = document.getElementById(elem.id + "-error");
    if (!error) console.log("error on error ... " + elem.id)
    error.textContent = validationFunction(value);
    return (error.textContent === "")
}

// fonction de validation d'un nom commun
const ValidateName = (value) => {
    if (value.length < 1) return "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    return !Name_Regex.test(value) ? "problème ... " : "";
}

// fonction de validation d'en email
const ValidateEmail = (value) => {
    if (value.length < 5) return "Veuillez entrer 2 caractères ou plus pour le champ" +
        " email."
    return !Email_Regex.test(value) ? "votre email n'est pas valable" : "";
}

function init() {

    const modalBody = document.querySelector(".modal-body");

    // fields validation
    const Elements = [
        {
            id: "first",
            validation: ValidateName
        },
        {
            id: "last",
            validation: ValidateName
        },
        {
            id: "email",
            validation: ValidateEmail
        },
        {
            id: "quantity",
            validation: (value) =>
                value === "" ? "champs requis" : ""

        },
        {
            id: "birthdate",
            validation: (value) =>
                getAge(value) >= 18 ? '' : 'Vous avez moins de 18 ans'
        },
        {
            id: "checkbox1",
            validation: (value) => value ? "" : "Vous devez acceptez les termes et conditions pour poursuivre votre inscription."
        }
    ]
    Elements.map(el => {
        const element = document.getElementById(el.id)
        element.onchange = element.oninput = (event) => Validate(element, el.validation)
    })

    // city selected validation
    const radios = [...document.querySelectorAll("input[name=location]")];
    const validateRadio = (radios) => {
        return !radios.find(radio => radio.checked) ? "Vous devez choisir une option." : ""
    }
    radios.map(r => {
        r.onchange = () => {
            document.getElementById("location-error").textContent = ""
        }
    })

    const validate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let result = true;

        // validate fields
        Elements.map(el => {
            const element = document.getElementById(el.id)
            result &= (Validate(element, el.validation));
        })

        // validate city selected
        const locationError = validateRadio(radios)
        document.getElementById("location-error").textContent = locationError;
        result &= locationError === ""

        if (result) {
            modalBody.innerHTML = `<h1>Inscription réussi!</h1><p class="smFont">A bientôt pour le tournoi</p>`
        }
    }

    const form = document.querySelector("form");
    form.onsubmit = (event) => validate(event)
}

window.onload = init;