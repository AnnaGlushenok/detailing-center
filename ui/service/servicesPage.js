import {serviceService} from "../services/servicesService.js";

let services = []

async function loadServices() {
    try {
        services = await serviceService.getAll();
    } catch (e) {
        console.error('Ошибка загрузки услуг', e);
    }
}

export async function renderServicesPage() {
    const main = document.getElementById('main');
    const services = await serviceService.getAll();

    renderLayout(main);
    renderTable(services);
    setupEvents(services);
}

function renderLayout(main) {
    main.innerHTML = `
        <h2>Услуги</h2>

        <div class="service-form">
            <input id="name" placeholder="Название">
            <input id="price" placeholder="Цена">
            <input id="description" placeholder="Описание">
            <button id="addService">Добавить</button>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Стоимость</th>
                    <th>Описание</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody id="servicesBody"></tbody>
        </table>
    `;
}

function renderTable(services) {
    const tbody = document.getElementById('servicesBody');
    tbody.innerHTML = '';

    services.forEach(s => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td contenteditable="true">${s.name}</td>
            <td contenteditable="true">${s.price}</td>
            <td contenteditable="true">${s.description}</td>
            <td>
                <button class="save-btn" data-id="${s.id}">Сохранить</button>
                <button class="delete-btn" data-id="${s.id}">Удалить</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function setupEvents() {
    const tbody = document.getElementById('servicesBody');

    tbody.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        const row = e.target.closest('tr');

        if (e.target.classList.contains('save-btn')) {
            const data = {
                name: row.cells[0].textContent,
                price: row.cells[1].textContent,
                description: row.cells[2].textContent
            };

            await serviceService.update(id, data);
            alert('Обновлено');
        }

        if (e.target.classList.contains('delete-btn')) {
            if (!confirm('Удалить услугу?')) return;

            await serviceService.delete(id);
            row.remove();
        }
    });

    document.getElementById('addService').onclick = handleCreate;
}

async function handleCreate() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;

    if (!name || !price) {
        alert('Заполни название и цену');
        return;
    }

    await serviceService.create({name, price, description});

    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('description').value = '';

    await renderServicesPage();
}
