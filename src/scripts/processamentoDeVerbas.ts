import * as fs from 'fs';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize'

import { Escola, NotaFiscal, Repasse } from './work';
import logger from '../factory/logger';
import Repasses from '../models/Repasses';
import ValoresJaGastos, { TabelaValoresGastos } from '../models/ValoresJaGastos';
import Escolas, { TabelaEscola } from '../models/EscolasSP';


(async () => {
    const escolas = await Escolas.findOne({
        where: {
            id_da_escola: 12
        }
    });

    const verbaRecebida = await getValoresRecebidos(escolas!);

    return
    // escolas.forEach(escola => {
    //     const verbaRecebida = getValoresRecebidos(escola);
    //     return
    //     const valoresJaGastos = getValoresGastos(escola);
    // })

}
)()

async function getValoresRecebidos(escola: Escolas) {
    const repassesDeUmaEscola = await Repasses.findAll({
        where: {
            id_da_escola: escola.id_da_escola
        }
    })

    const repassesEmArray: any = repassesDeUmaEscola.map((escola) => escola.dataValues)
    console.log(repassesEmArray)
}

async function getValoresGastos(escola: TabelaEscola) {
    await ValoresJaGastos.findAll({
        where: {
            id_da_escola: escola.id_da_escola
        }
    })
}