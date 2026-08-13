import asyncio, os
from playwright.async_api import async_playwright

URL = "https://zihamo-pharma.preview.emergentagent.com"

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width":1280,"height":900})
        errors=[]
        pg.on("console", lambda m: errors.append(m.text) if m.type=="error" else None)
        pg.on("pageerror", lambda e: errors.append("PAGEERR "+str(e)))
        await pg.goto(URL, wait_until="domcontentloaded", timeout=60000)
        await pg.wait_for_timeout(3500)
        await pg.evaluate("window.__lenis && window.__lenis.destroy()")

        prod = await pg.locator('[data-testid^="product-"]').count()
        cats = await pg.locator('[data-testid^="category-"]').count()
        filt = await pg.locator('[data-testid^="filter-"]').count()
        print("products=",prod,"categories=",cats,"filters=",filt)

        # broken images
        broken = await pg.evaluate("[...document.images].filter(i=>i.complete && i.naturalWidth===0).length")
        print("broken_images=",broken, "total_images=", await pg.evaluate("document.images.length"))

        # add to cart
        card = pg.locator('[data-testid^="product-"]').first
        await card.scroll_into_view_if_needed()
        await pg.wait_for_timeout(300)
        await card.hover()
        await pg.wait_for_timeout(300)
        await pg.locator('[data-testid^="add-"]').first.click()
        await pg.wait_for_timeout(400)
        cc = await pg.locator('[data-testid=cart-count]').inner_text()
        print("cart_count_after_add=",cc)

        # filter test
        await pg.locator('[data-testid=filter-audio]').click()
        await pg.wait_for_timeout(600)
        after_filter = await pg.locator('[data-testid^="product-"]').count()
        print("products_after_audio_filter=",after_filter)
        await pg.locator('[data-testid=filter-all]').click()
        await pg.wait_for_timeout(400)

        # open cart
        await pg.locator('[data-testid=open-cart-button]').click()
        await pg.wait_for_timeout(700)
        sheet = await pg.locator('[data-testid=cart-sheet]').count()
        items = await pg.locator('[data-testid^="cart-item-"]').count()
        print("sheet_open=",sheet,"cart_items=",items)

        # proceed + submit
        await pg.locator('[data-testid=proceed-button]').click()
        await pg.wait_for_timeout(500)
        await pg.fill('[data-testid=input-company]','Meditrust Labs')
        await pg.fill('[data-testid=input-name]','Ravi Kumar')
        await pg.fill('[data-testid=input-email]','ravi@meditrust.com')
        await pg.fill('[data-testid=input-message]','200 hampers for Doctors Day')
        await pg.wait_for_timeout(300)
        await pg.locator('[data-testid=submit-enquiry-button]').click()
        await pg.wait_for_timeout(2500)
        still_open = await pg.locator('[data-testid=cart-sheet]').count()
        print("sheet_still_open_after_submit=",still_open)
        print("console_errors=",errors[:8])
        await b.close()

asyncio.run(main())
