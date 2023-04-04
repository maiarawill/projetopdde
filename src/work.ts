import { promises as fs } from 'fs';

interface Escola {
    programas: Programa[];
    repasses: Repasse[];
    notasFiscais: NotaFiscal[];
    totalRecebido: Verbas[];
    cdEscola: number;
    nmCompletoEscola: string;
    nmAPM: string;
    nrCnpjApm: string;
    cdDiretoria: number;
    nmDiretoria: string;
    cdMunicipio: number;
    nmMunicipio: string;
    nmRedeEnsino: string;
    nrTotalDeAlunos: number;
}

interface Programa {
    idPrograma: number;
    nmPrograma: string;
    nmProgramaNovo: string;
}

interface Repasse {
    cdEscola: number;
    nrAnoBase: number;
    idTipoRepasse: number;
    nmTipoRepasse: string;
    vlTotal: number;
}

interface NotaFiscal {
    nrNotaFiscal: string;
    cdEscola: number;
    nrAnoBase: number;
    nrCnpj: string;
    nmRazaoSocial: string;
    idPrograma: number;
    nmPrograma: string;
    dtEmissao: string;
    dtPagamento: string;
    vlNotaFiscal: number;
    vlInss: number;
    vlIss: number;
    vlPisCofinsCsll: number;
    vlFrete: number;
    vlTotal: number;
    dsMotivoAprovacaoComRessalva?: any;
    dsMotivoReprovacao?: any;
}

interface Verbas {
    cdEscola: number;
    nrAnoBase: number;
    vlRecebido: number;
}

async function readJSONFile(filename: string): Promise<any> {
    const data: any = await fs.readFile(filename, { encoding: 'utf-8' });
    return JSON.parse(data);
}

(async () => {
    try {
        const json = await readJSONFile('./pddeAdamantina.json');
        console.log(json);
    } catch (error) {
        console.error(error);
        console.log("deu pau")
    }
})();