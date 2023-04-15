import { DataTypes, Model } from 'sequelize';
import Escolas from './EscolasSP';
import Programas from './Programas'
import { sequelize } from '../sequelize'

// Define the interface for the User model
interface AtributosDaTabela {
    id?: number;
    numero_nota_fiscal: string;
    id_da_escola: number;
    ano_do_projeto: number;
    numero_CNPJ: string;
    razao_social: string;
    id_do_programa: number;
    nome_do_programa: string;
    valor_da_nota_fiscal: number;
}



// Define the User model
class ValoresJaGastos extends Model<AtributosDaTabela> implements AtributosDaTabela {
    public id?: number;
    public numero_nota_fiscal!: string;
    public id_da_escola!: number;
    public ano_do_projeto!: number;
    public numero_CNPJ!: string;
    public razao_social!: string;
    public id_do_programa!: number;
    public nome_do_programa!: string;
    public valor_da_nota_fiscal!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associateEscola(models: any) {
        ValoresJaGastos.hasOne(models.Escolas, { foreignKey: 'id_da_escola' });
    }

    static associatePrograma(models: any) {
        ValoresJaGastos.hasOne(models.Programas, { foreignKey: 'id_do_programa' });
    }
}

// Define the model's attributes
ValoresJaGastos.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        numero_nota_fiscal: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        id_da_escola: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        ano_do_projeto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        numero_CNPJ: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        razao_social: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        id_do_programa: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nome_do_programa: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        valor_da_nota_fiscal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'valores_ja_gastos',
        timestamps: false
    },
);

// Export the model
export default ValoresJaGastos;
