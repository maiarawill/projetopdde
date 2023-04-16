import puppeteer from 'puppeteer';

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });
  const page = await browser.newPage();


  await page.goto('https://transparencia.educacao.sp.gov.br/Home/PrestacaoContas');

  // const element: any = await page.waitForXPath('//*[@id="form_search"]/div[1]');
  // await element.click();

  const element: any = await page.waitForXPath('//*[@id="form_search"]/div[1]');
  await element.click();

  const input: any = await page.waitForXPath("/html/body/section[2]/div/div[2]/div/section/article/div[1]/div/div/input");
  await input.type("ADAMANTIN")

  const li: any = await page.waitForXPath("/html/body/section[2]/div/div[2]/div/section/article/div[1]/div/ul/li[2]");
  await li.click();

  await page.screenshot({ path: 'aposClick.png' })

  // await page.waitForSelector('text/ADAMANTINA')

  // await page.click('text/ADAMANTINA')

  await page.screenshot({ path: 'aposClick2.png' })

  await page.tracing.start({ path: "trace.json" })

  const botaoBuscar: any = await page.waitForXPath("/html/body/section[2]/div/div[2]/div/section/article/div[4]/div/button[1]")
  await botaoBuscar.click();

  await page.tracing.stop();

  await browser.close();

  // // Habilita a interceptação de solicitações de rede
  // await page.setRequestInterception(true);

  // // Registra o callback para a interceptação de solicitações de rede
  // page.on('request', request => {
  //   console.log('Solicitação:', request.url());
  //   request.continue();
  // });

  // // Acessa a página que será monitorada
  // await page.goto('https://transparencia.educacao.sp.gov.br/Home/PrestacaoContas');


}
run();