import asyncio
from playwright.async_api import async_playwright
URL = "https://zihamo-pharma.preview.emergentagent.com"

async def shot(pg, sel, path, offset=-70):
    y = await pg.evaluate(f"document.querySelector('{sel}').getBoundingClientRect().top + window.scrollY")
    await pg.evaluate(f"window.scrollTo(0,{y+offset})")
    await pg.wait_for_timeout(1200)
    await pg.screenshot(path=path)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width":1440,"height":900})
        await pg.goto(URL, wait_until="domcontentloaded", timeout=60000)
        await pg.wait_for_timeout(3500)
        await pg.evaluate("window.__lenis && window.__lenis.destroy()")
        await shot(pg,'#categories','/tmp/z_categories.png')
        await shot(pg,'#manifesto','/tmp/z_manifesto.png')
        await shot(pg,'#catalogue','/tmp/z_catalogue.png')
        await shot(pg,'#about','/tmp/z_about.png')
        # cart
        await pg.locator('[data-testid^="product-"]').first.hover()
        await pg.wait_for_timeout(300)
        await pg.locator('[data-testid^="add-"]').first.click()
        await pg.wait_for_timeout(300)
        await pg.locator('[data-testid=open-cart-button]').click()
        await pg.wait_for_timeout(700)
        await pg.screenshot(path='/tmp/z_cart.png')
        await pg.locator('[data-testid=proceed-button]').click()
        await pg.wait_for_timeout(600)
        await pg.screenshot(path='/tmp/z_form.png')
        await b.close()
asyncio.run(main())
print("done")
