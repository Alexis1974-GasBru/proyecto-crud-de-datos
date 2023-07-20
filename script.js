document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('crud-form');
    const elementList = document.getElementById('element-list');

    let elements = [];

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');

        const name = nameInput.value;
        const email = emailInput.value;

        if (name.trim() === '' || email.trim() === '') {
            return;
        }

        const newElement = {
            id: Date.now(),
            name: name,
            email: email
        };

        elements.push(newElement);

        displayElements();

        nameInput.value = '';
        emailInput.value = '';
    });

    function displayElements() {
        elementList.innerHTML = '';

        elements.forEach(function(element) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${element.name} (${element.email})</span>
                <button class="edit-button" data-id="${element.id}">Editar</button>
                <button class="delete-button" data-id="${element.id}">Borrar</button>
            `;

            const editButton = li.querySelector('.edit-button');
            editButton.addEventListener('click', function() {
                editElement(element);
            });

            const deleteButton = li.querySelector('.delete-button');
            deleteButton.addEventListener('click', function() {
                deleteElement(element);
            });

            elementList.appendChild(li);
        });
    }

    function editElement(element) {
        const newName = prompt('Ingrese el nuevo nombre:', element.name);
        const newEmail = prompt('Ingrese el nuevo email:', element.email);

        if (newName !== null && newEmail !== null) {
            element.name = newName;
            element.email = newEmail;
            displayElements();
        }
    }

    function deleteElement(element) {
        const confirmation = confirm('¿Estás seguro de borrar este elemento?');

        if (confirmation) {
            elements = elements.filter(function(el) {
                return el.id !== element.id;
            });

            displayElements();
        }
    }
});
