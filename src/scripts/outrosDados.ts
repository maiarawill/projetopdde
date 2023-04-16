import puppeteer from 'puppeteer';
import { sequelize } from './sequelize'
import Escolas from './models/EscolasSP';
import Gestores from './models/GestoresSP'
import logger from './factory/logger';
import { Op, Sequelize } from 'sequelize';




(async () => {
    try {
        await sequelize.authenticate()
        console.log('Conexão bem sucedida.');

        const escolas = await Escolas.findAll({
            attributes: ['id_da_escola'],
            where: Sequelize.literal('email IS NULL')
        });

        if (!escolas) {
            console.error('Código de escola não encontrado');
            return;
        }
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });

        for (const escola of escolas) {
            try {
                await page.goto(`https://transparencia.educacao.sp.gov.br/Home/DetalhesEscola?codesc=${escola.id_da_escola}`);

                const tag: any = await page.waitForXPath("/html/body/section[2]/div/div[1]/div[1]/div[1]/p")
                const textoComTag = await page.evaluate(tag => tag.textContent.trim(), tag)

                let telefone: any
                let textoComTelefone: any
                let email: any
                let textoComEmail: any

                switch (textoComTag) {
                    case 'PEI':
                        telefone = await page.waitForXPath("/html/body/section[2]/div/div[1]/div[1]/div[2]/p[7]")
                        textoComTelefone = await page.evaluate(telefone => telefone.textContent.trim(), telefone)

                        email = await page.waitForXPath("/html/body/section[2]/div/div[1]/div[1]/div[2]/p[8]")
                        textoComEmail = await page.evaluate(email => email.textContent.trim(), email)
                        break;
                    case 'EE':
                        telefone = await page.waitForXPath("/html/body/section[2]/div/div[1]/div[1]/div[2]/p[6]")
                        textoComTelefone = await page.evaluate(telefone => telefone.textContent.trim(), telefone)

                        email = await page.waitForXPath("/html/body/section[2]/div/div[1]/div[1]/div[2]/p[7]")
                        textoComEmail = await page.evaluate(email => email.textContent.trim(), email)
                        break;
                    case 'CEEJA':
                        telefone = await page.waitForXPath("/html/body/section[2]/div/div[1]/div[1]/div[2]/p[6]")
                        textoComTelefone = await page.evaluate(telefone => telefone.textContent.trim(), telefone)

                        email = await page.waitForXPath("/html/body/section[2]/div/div[1]/div[1]/div[2]/p[7]")
                        textoComEmail = await page.evaluate(email => email.textContent.trim(), email)
                        break;
                    case 'AREA DE ASSENTAMENTO':
                        telefone = await page.waitForXPath("/html/body/section[2]/div/div[1]/div[1]/div[2]/p[6]")
                        textoComTelefone = await page.evaluate(telefone => telefone.textContent.trim(), telefone)

                        email = await page.waitForXPath("/html/body/section[2]/div/div[1]/div[1]/div[2]/p[7]")
                        textoComEmail = await page.evaluate(email => email.textContent.trim(), email)
                        break;
                    case 'QUILOMBO':
                        telefone = await page.waitForXPath("/html/body/section[2]/div/div[1]/div[1]/div[2]/p[6]")
                        textoComTelefone = await page.evaluate(telefone => telefone.textContent.trim(), telefone)

                        email = await page.waitForXPath("/html/body/section[2]/div/div[1]/div[1]/div[2]/p[7]")
                        textoComEmail = await page.evaluate(email => email.textContent.trim(), email)
                        break;
                    default:

                        break;
                }

                const table = await page.$$('#myTable2 tbody tr');

                let nome: any;
                let cargo: any;

                for (let i = 0; i < table.length; i++) {
                    const tds = await table[i].$$('td');

                    nome = await tds[1].evaluate((nome: any) => nome.textContent.trim());
                    cargo = await tds[0].evaluate((cargo: any) => cargo.textContent.trim());
                    await Gestores.create({ cargo_gestor: cargo, nome_gestor: nome, id_da_escola: escola.id_da_escola })
                }

                await Escolas.update({ telefone: textoComTelefone, email: textoComEmail }, { where: { id_da_escola: escola.id_da_escola } });
                console.log("Escola de id: " + escola.id_da_escola)
            } catch (e: any) {
                logger.info(`A escola de id: ${escola.id_da_escola} não conseguiu ser concluida.`)
                logger.error(e)
            }

        }

        await browser.close();
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
})();