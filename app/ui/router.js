import {renderServicesPage} from './service/servicesPage.js';
import {renderOrdersPage} from "./main/mainPage.js";
import {renderStatsPage} from "./statistics/statisticPage.js";

export function router(page) {
    const routes = {
        orders: renderOrdersPage,
        services: renderServicesPage,
        stats: renderStatsPage
    };

    routes[page]?.();
}