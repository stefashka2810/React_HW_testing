import { test, expect } from '@playwright/test';

test.describe('End-to-end: Navigation & Report Generation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle' });
    });

    test('navigates Home → Generate → History via menu', async ({ page }) => {
        await page.getByRole('link', { name: 'CSV Генератор' }).click();
        await expect(page).toHaveURL('/generate');

        await expect(
            page.getByRole('heading', {
                level: 1,
                name: 'Сгенерируйте готовый csv-файл нажатием одной кнопки',
            })
        ).toBeVisible();

        await page.getByRole('link', { name: 'CSV Аналитик' }).click();
        await expect(page).toHaveURL('/');

        await expect(
            page.getByRole('heading', {
                level: 1,
                name: /Загрузите\s+csv файл и получите полную информацию/i,
            })
        ).toBeVisible();

        await page.getByRole('link', { name: 'История' }).click();
        await expect(page).toHaveURL('/history');
        await expect(
            page.getByRole('button', { name: 'Сгенерировать больше' })
        ).toBeVisible();
    });

    test('successful report generation shows success message', async ({ page }) => {
        await page.goto('/generate', { waitUntil: 'networkidle' });

        await page.route('**/report?size=*', route =>
            route.fulfill({
                status: 200,
                headers: {
                    'Content-Type': 'text/csv',
                    'Content-Disposition': 'attachment; filename="report.csv"',
                },
                body: 'col1,col2\n1,2\n',
            })
        );

        await page.getByRole('button', { name: 'Начать генерацию' }).click();

        await expect(
            page.getByText('Отчёт успешно сгенерирован!')
        ).toBeVisible({ timeout: 10_000 });
    });

    test('failed report generation shows error', async ({ page }) => {
        await page.goto('/generate', { waitUntil: 'networkidle' });

        await page.route('**/report?size=*', route =>
            route.fulfill({
                status: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Сервер упал' }),
            })
        );

        await page.getByRole('button', { name: 'Начать генерацию' }).click();
        await expect(
            page.getByText(/Произошла ошибка: Сервер упал/i)
        ).toBeVisible();
    });
});
