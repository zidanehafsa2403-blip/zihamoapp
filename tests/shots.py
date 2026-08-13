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
        errs=[]
        pg.on("console", lambda m: errs.append(m.text) if m.type=="error" else None)
        pg.on("pageerror", lambda e: errs.append("PAGEERR "+str(e)))
        await pg.goto(URL, wait_until="domcontentloaded", timeout=60000)
        await pg.wait_for_timeout(3500)
        print("products=", await pg.locator('[data-testid^="product-"]').count(),
              "categories=", await pg.locator('[data-testid^="category-"]').count(),
              "filters=", await pg.locator('[data-testid^="filter-"]').count())
        print("broken_images=", await pg.evaluate("[...document.images].filter(i=>i.complete && i.naturalWidth===0).length"),
              "total=", await pg.evaluate("document.images.length"))
        logo_ok = await pg.evaluate("(()=>{const i=[...document.images].find(x=>x.src.includes('zihamo-logo'));return i? i.naturalWidth: -1})()")
        print("logo_naturalWidth=", logo_ok)
        await pg.evaluate("window.__lenis && window.__lenis.destroy()")
        await pg.screenshot(path="/tmp/z_hero2.png")
        await shot(pg,'#catalogue','/tmp/z_catalogue2.png')
        await shot(pg,'#contact','/tmp/z_footer2.png', offset=-40)
        print("console_errors=", errs[:6])
        await b.close()
asyncio.run(main())
print("done")
