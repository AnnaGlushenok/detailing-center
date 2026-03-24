import {router} from './router.js';

document.querySelectorAll('.sidebar__btn').forEach(btn => {
    btn.addEventListener('click', () => {
        router(btn.dataset.page);
    });
});

document.querySelectorAll('.sidebar__btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.sidebar__btn')
            .forEach(b => b.classList.remove('sidebar__btn--active'));
        btn.classList.add('sidebar__btn--active');
        router(btn.dataset.page);
    });
});

router('orders');