import puppeteer from 'puppeteer';

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    const link = "https://transparencia.educacao.sp.gov.br/Home/PrestacaoContas";
    await page.goto(link);


    const element: any = await page.waitForXPath('//*[@id="form_search"]/div[1]');
    await element.click();

    const input: any = await page.waitForXPath("/html/body/section[2]/div/div[2]/div/section/article/div[2]/div/div/input");
    await input.type("CAMPINAS")

    const liCampinas: any = await page.waitForXPath("/html/body/section[2]/div/div[2]/div/section/article/div[2]/div/ul/li[110]");
    await liCampinas.click();


    await page.screenshot({ path: "foto.png", fullPage: true })


    await browser.close();
}

run();

