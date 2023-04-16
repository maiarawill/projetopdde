import * as fs from 'fs';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize'

import { Escola, NotaFiscal, Repasse } from './work';
import logger from '../factory/logger';
import Repasses, { TabelaRepasses } from '../models/Repasses';
import ValoresJaGastos, { TabelaValoresGastos } from '../models/ValoresJaGastos';
import Escolas, { TabelaEscola } from '../models/EscolasSP';
import { Op } from 'sequelize';


(async () => {
    const escolas = await Escolas.findAll()

    escolas.forEach(async escola => {
        const verbaRecebida =  await getValoresRecebidos(escola);
        const valoresJaGastos = await getValoresGastos(escola);
        const valorTeoricoEmCaixa = verbaRecebida - valoresJaGastos;
        await Escolas.update({ valor_em_conta: valorTeoricoEmCaixa }, { where: { id_da_escola: escola.id_da_escola } });
    })

}
)()

async function getValoresRecebidos(escola: Escolas) {
    const repassesDeUmaEscola = await Repasses.findAll({
        where: {
            id_da_escola: escola.id_da_escola,
            ano_do_deposito: {
                [Op.gte] : 2021
            }
        }
    })

    const valorRecebido: any = repassesDeUmaEscola.map((escola) => escola.dataValues).reduce( (total, deposito) => {
        return total + deposito.valor_total;
    }, 0)
    return valorRecebido
}

async function getValoresGastos(escola: TabelaEscola) {
    const valoresGastos = await ValoresJaGastos.findAll({
        where: {
            id_da_escola: escola.id_da_escola,
            ano_do_projeto: {
                [Op.gte]: 2021
            }
        }
    })

    const valorDasNotas: any = valoresGastos.map((escola) => escola.dataValues).reduce( (total, deposito) => {
        return total + deposito.valor_da_nota_fiscal;
    }, 0)


    return valorDasNotas;
}