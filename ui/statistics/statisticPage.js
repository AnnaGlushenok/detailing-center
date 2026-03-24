import {orderService} from "../services/orderService.js";

export async function renderStatsPage() {
    const main = document.getElementById('main');

    const orders = await orderService.getAll();

    main.innerHTML = `
        <h2>Статистика</h2>        
        <div class="stats">
            <canvas id="servicesChart"></canvas>
            <canvas id="employeesChart"></canvas>
            <canvas id="monthlyRevenueChart"></canvas>
        </div>
    `;

    renderServiceChart(orders);
    renderEmployeeChart(orders);
    renderMonthlyRevenueChart(orders);
}

function renderMonthlyRevenueChart(orders) {
    const map = {};
    orders.forEach(o => {
        const d = new Date(o.date);

        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

        if (!map[key]) {
            map[key] = 0;
        }

        map[key] += Number(o.price || 0);
    });

    const sortedKeys = Object.keys(map).sort();
    const ctx = document.getElementById('monthlyRevenueChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: sortedKeys.map(formatMonth),
            datasets: [{
                label: 'Выручка по месяцам',
                data: sortedKeys.map(k => map[k]),
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function formatMonth(key) {
    const [year, month] = key.split('-');
    return new Date(year, month - 1).toLocaleDateString('ru-RU', {
        month: 'long',
        year: 'numeric'
    });
}

function renderEmployeeChart(orders) {
    const map = {};
    orders.forEach(o => {
        map[o.employee] = (map[o.employee] || 0) + 1;
    });
    const ctx = document.getElementById('employeesChart');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(map),
            datasets: [{
                label: 'Заказы',
                data: Object.values(map)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function renderServiceChart(orders) {
    const map = {};
    orders.forEach(o => {
        map[o.service] = (map[o.service] || 0) + 1;
    });
    const ctx = document.getElementById('servicesChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(map),
            datasets: [{
                label: 'Количество услуг',
                data: Object.values(map)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
