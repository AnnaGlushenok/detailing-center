import {employeeService} from "../services/employeeService.js";
import {orderService} from "../services/orderService.js";

const mainPage = document.getElementById('main');

let state = {
    selectedDate: null, currentDate: new Date(), orders: [], employees: []
};

async function init() {
    await Promise.all([loadOrders(), loadEmployees()]);

    renderOrdersPage();
}

async function loadOrders() {
    try {
        state.orders = await orderService.getAll();
    } catch (e) {
        console.error('Ошибка загрузки заказов', e);
    }
}

async function loadEmployees() {
    try {
        state.employees = await employeeService.getAll();
    } catch (e) {
        console.error('Ошибка загрузки сотрудников', e);
    }
}

export function renderOrdersPage() {
    renderLayout();
    renderFilters();
    renderTable();
    renderCalendar();
}

function renderLayout() {
    mainPage.innerHTML = `
        <h2>Заказы</h2>

        <select class="filters__select" id="employeeFilter">
            <option value="">Все сотрудники</option>
        </select>

        ${state.selectedDate ? `<p>Дата: ${state.selectedDate}</p>` : ''}

        <table class="table">
            <thead>
                <tr>
                    <th>Сотрудник</th>
                    <th>Услуга</th>
                    <th>Клиент</th>
                    <th>Дата</th>
                    <th>Время</th>
                    <th>Статус</th>
                </tr>
            </thead>
            <tbody id="ordersBody"></tbody>
        </table>

        <div class="calendar">
            <div class="calendar__header">
                <button id="prevMonth">←</button>
                <span id="monthTitle"></span>
                <button id="nextMonth">→</button>
            </div>
            <div class="calendar__grid" id="calendar"></div>
        </div>
    `;
}

function renderFilters() {
    const select = document.getElementById('employeeFilter');

    state.employees.forEach(e => {
        const option = document.createElement('option');
        option.value = e.full_name;
        option.textContent = e.full_name;
        select.appendChild(option);
    });

    select.addEventListener('change', renderTable);
}

function renderTable() {
    const body = document.getElementById('ordersBody');
    const select = document.getElementById('employeeFilter');

    const statusMap = {
        new: 'Новый', progress: 'В работе', done: 'Готов'
    };

    body.innerHTML = '';

    const filtered = state.orders.filter(o => {
        const byEmployee = !select.value || o.employee === select.value;
        const byDate = !state.selectedDate || o.date.startsWith(state.selectedDate);
        return byEmployee && byDate;
    });

    filtered.forEach(o => {
        const {date, time} = splitDateTime(o.date);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${o.employee}</td>
            <td>${o.service}</td>
            <td>
                ${o.client.name}<br>
                ${o.client.phone}
            </td>
            <td>${date}</td>
            <td>${time}</td>
            <td>
                <span class="orders__status orders__status--${o.status}">
                    ${statusMap[o.status]}
                </span>
            </td>
        `;

        body.appendChild(tr);
    });
}

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    const title = document.getElementById('monthTitle');

    calendar.innerHTML = '';

    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();

    title.textContent = new Date(year, month + 1)
        .toLocaleDateString('ru-RU', {month: 'long', year: 'numeric'});

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendar.appendChild(document.createElement('div'));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = formatDate(year, month, day);

        const div = document.createElement('div');
        div.className = 'calendar__day';
        div.textContent = day;

        if (state.selectedDate === dateStr) {
            div.classList.add('calendar__day--selected');
        }

        if (state.orders.some(o => o.date.startsWith(dateStr))) {
            div.classList.add('calendar__day--active');
        }

        div.onclick = () => {
            state.selectedDate = dateStr;
            renderOrdersPage();
        };

        calendar.appendChild(div);
    }

    document.getElementById('prevMonth').onclick = () => {
        state.currentDate.setMonth(state.currentDate.getMonth() - 1);
        renderOrdersPage();
    };

    document.getElementById('nextMonth').onclick = () => {
        state.currentDate.setMonth(state.currentDate.getMonth() + 1);
        renderOrdersPage();
    };
}

function splitDateTime(dateStr) {
    const d = new Date(dateStr);

    return {
        date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
        time: `${pad(d.getHours())}:${pad(d.getMinutes())}`
    };
}

function formatDate(year, month, day) {
    return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function pad(num) {
    return String(num).padStart(2, '0');
}

init();