import puppeteer, { Target } from 'puppeteer';
import { sequelize } from './sequelize'
import Escolas from '../models/EscolasSP'


(async () => {
    // try {
    //     await sequelize.authenticate()
    //     console.log('Conexão bem sucedida.');

    //     const escolas = await Escolas.findAll({
    //         attributes: ['nome_escola'],
    //     });

    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('https://equipa.engenere.one/web#action=139&cids=1&menu_id=101&model=res.partner&view_type=kanban');

    await page.waitForSelector("#login")
    await page.type("#login", "vendas03@equipaescolas.com")
    await page.waitForSelector("#password")
    await page.type("#password", "EquipaEscolas2023-03")
    await page.waitForSelector(".btn-primary")
    await page.click(".btn-primary")

    // for (const escola of escolas) {

    let nome = "Pedro "
    const email = "e004856a@educacao.sp.gov.br"

    nome = nome.replace(/\b(prof|bairro|profa|dr|vereador|professor|dona|doutor|coronel|general|padre|professora|major|barao|deputado|)\b/gi, '')

    try {
        //await page.goto('https://equipa.engenere.one/web#action=139&cids=1&menu_id=101&model=res.partner&view_type=kanban');

        await page.waitForSelector(".o_searchview_input")//Digita o nome da escola que veio no banco
        await page.type(".o_searchview_input", nome)
        await page.waitForSelector(".o_selection_focus")//Clica no primeiro item do menu de opções
        await page.click(".o_selection_focus")
        await page.waitForSelector(".o_kanban_view ")//Aguarda a página abrir


        await page.waitForTimeout(3000);
        const liTexts = await page.$$eval('.o_text_overflow', lis => lis.map(li => li.textContent));
        if (liTexts.includes(email)) {
            console.log("ihu")
        }

    } catch (e: any) {
        console.error(`Erro ao inserior a escola: ${nome}`, e);
    }

    //}

    //await browser.close();
    // } catch (error) {
    //     console.error('Erro ao conectar ao banco de dados:', error);
    // }
})();