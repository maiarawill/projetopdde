import puppeteer from 'puppeteer';

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    const link = "https://transparencia.educacao.sp.gov.br/Home/PrestacaoContas";
    await page.goto(link);


    const xpath = '/html/body/section[2]/div/div[2]/div/section/article/div[1]/div/ul/li';
    const elements = await page.evaluate((xpath) => {
        const xpathResult = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
        const nodes: any = [];
        let node: any;
        while (node = xpathResult.iterateNext()) {
            nodes.push(node);
        }
        return nodes.map((node: any) => node.textContent);
    }, xpath);

    console.log(elements);



    // const input: any = await page.waitForXPath("/html/body/section[2]/div/div[2]/div/section/article/div[2]/div/div/input");
    // await input.type("CAMPINAS")

    // const liCampinas: any = await page.waitForXPath("/html/body/section[2]/div/div[2]/div/section/article/div[2]/div/ul/li[110]");
    // await liCampinas.click();


    // await page.screenshot({ path: "foto.png", fullPage: true })


    await browser.close();
}

run();


const diretorias = [
    'ADAMANTINA',
    'AMERICANA',
    'ANDRADINA',
    'APIAI',
    'ARACATUBA',
    'ARARAQUARA',
    'ASSIS',
    'AVARE',
    'BARRETOS',
    'BAURU',
    'BIRIGUI',
    'BOTUCATU',
    'BRAGANCA PAULISTA',
    'CAIEIRAS',
    'CAMPINAS LESTE',
    'CAMPINAS OESTE',
    'CAPIVARI',
    'CARAGUATATUBA',
    'CARAPICUIBA',
    'CATANDUVA',
    'CENTRO',
    'CENTRO OESTE',
    'CENTRO SUL',
    'DIADEMA',
    'FERNANDOPOLIS',
    'FRANCA',
    'GUARATINGUETA',
    'GUARULHOS NORTE',
    'GUARULHOS SUL',
    'ITAPECERICA DA SERRA',
    'ITAPETININGA',
    'ITAPEVA',
    'ITAPEVI',
    'ITAQUAQUECETUBA',
    'ITARARE',
    'ITU',
    'JABOTICABAL',
    'JACAREI',
    'JALES',
    'JAU',
    'JOSE BONIFACIO',
    'JUNDIAI',
    'LESTE 1',
    'LESTE 2',
    'LESTE 3',
    'LESTE 4',
    'LESTE 5',
    'LIMEIRA',
    'LINS',
    'MARILIA',
    'MAUA',
    'MIRACATU',
    'MIRANTE DO PARANAPANEMA',
    'MOGI DAS CRUZES',
    'MOGI MIRIM',
    'NORTE 1',
    'NORTE 2',
    'OSASCO',
    'OURINHOS',
    'PENAPOLIS',
    'PINDAMONHANGABA',
    'PIRACICABA',
    'PIRAJU',
    'PIRASSUNUNGA',
    'PRESIDENTE PRUDENTE',
    'REGISTRO',
    'RIBEIRAO PRETO',
    'SANTO ANASTACIO',
    'SANTO ANDRE',
    'SANTOS',
    'SAO BERNARDO DO CAMPO',
    'SAO CARLOS',
    'SAO JOAO DA BOA VISTA',
    'SAO JOAQUIM DA BARRA',
    'SAO JOSE DO RIO PRETO',
    'SAO JOSE DOS CAMPOS',
    'SAO ROQUE',
    'SAO VICENTE',
    'SERTAOZINHO',
    'SOROCABA',
    'SUL 1',
    'SUL 2',
    'SUL 3',
    'SUMARE',
    'SUZANO',
    'TABOAO DA SERRA',
    'TAQUARITINGA',
    'TAUBATE',
    'TUPA',
    'VOTORANTIM',
    'VOTUPORANGA'
]
