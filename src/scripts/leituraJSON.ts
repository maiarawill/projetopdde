import * as fs from 'fs';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize'
import Escolas from '../models/EscolasSP';
//import { GestoresSP } from 'c:/projetopdde/src/models/GestoresSP';
import Programas from '../models/Programas';
import Repasses from '../models/Repasses';
import ValoresJaGastos from '../models/ValoresJaGastos';
import { Escola, NotaFiscal, Repasse } from './work';
import logger from '../factory/logger';

//const jsonString = fs.readFileSync('./diretorias/Aracatuba.json', 'utf-8');

const directoryPath = './src/diretorias';


fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error(`Erro ao ler o diretório: ${err}`);
        return;
    }
    files.forEach((file) => {
        if (file.endsWith('.json')) {
            fs.readFile(`${directoryPath}/${file}`, 'utf8', async (err, data) => {
                if (err) {
                    console.error(`Erro ao abrir o arquivo ${file}: ${err}`);
                    return;
                }
                const json: Escola[] = JSON.parse(data);
                await processar(json, file)
                console.log(`Conteúdo do arquivo ${file}:`);
            });
        }
    });
});

async function processar(data: Escola[], nomeDoArquivo: string) {



    const mapeamentoDosDadosEscolas = data.map((informacoesJson: Escola) => {
        return {
            id_da_escola: informacoesJson.cdEscola,
            nome_escola: informacoesJson.nmCompletoEscola,
            CNPJ_da_escola: informacoesJson.nrCnpjApm,
            diretoria: informacoesJson.nmDiretoria,
            municipio: informacoesJson.nmMunicipio
        }

    })
    //  .flat()

    mapeamentoDosDadosEscolas.forEach(async escola => {
        const escolaVF = await Escolas.findOne({ where: { id_da_escola: escola.id_da_escola } })
        if (!escolaVF) {
            await Escolas.create(escola)
        }

    })


    return


    // const mapeamentoDosDadosRepasses = data.map((escola: Escola) => {
    //     return escola.repasses.map((repasse: Repasse) => {
    //         return {
    //             id_da_escola: repasse.cdEscola,
    //             ano_do_deposito: repasse.nrAnoBase,
    //             id_do_programa: repasse.idTipoRepasse,
    //             nome_do_programa: repasse.nmTipoRepasse,
    //             valor_total: repasse.vlTotal
    //         }
    //     })
    // }).flat()

    // const mapeamentoDosDadosValoresJaGastos = data.map((escola: Escola) => {
    //     return escola.notasFiscais.map((notaFiscal: NotaFiscal) => {
    //         return {
    //             id_da_escola: notaFiscal.cdEscola,
    //             numero_nota_fiscal: notaFiscal.nrNotaFiscal,
    //             ano_do_projeto: notaFiscal.nrAnoBase,
    //             numero_CNPJ: notaFiscal.nrCnpj,
    //             razao_social: notaFiscal.nmRazaoSocial,
    //             id_do_programa: notaFiscal.idPrograma,
    //             nome_do_programa: notaFiscal.nmPrograma,
    //             valor_da_nota_fiscal: notaFiscal.vlNotaFiscal
    //         }
    //     })
    // }).flat()


    await Escolas.bulkCreate(mapeamentoDosDadosEscolas)
        .then(item => item.forEach(escola => logger.info(`A escola de id: ${escola.id_da_escola} foi criada com sucesso`)))
        .catch(e => {
            logger.info(`O arquivo ${nomeDoArquivo} apresentou erros`);
            logger.error(e)
        })

        //Programas.bulkCreate(mapeamentoDosDadosProgramas)
        // await Repasses.bulkCreate(mapeamentoDosDadosRepasses)
        // await ValoresJaGastos.bulkCreate(mapeamentoDosDadosValoresJaGastos)

        .then(() => {
            console.log('Dados inseridos com sucesso!');
        })
        .catch((err) => {
            console.error('Erro ao inserir os dados:', err);
        });

}