import { DataTypes, Model } from 'sequelize';
import Escolas from './EscolasSP';
import Programas from './Programas'
import { sequelize } from '../sequelize'

// Define the interface for the User model
interface AtributosDaTabela {
    id?: number;
    id_da_escola: number;
    ano_do_deposito: number;
    id_do_programa: number;
    nome_do_programa: string;
    valor_total: number;
}



// Define the User model
class Repasses extends Model<AtributosDaTabela> implements AtributosDaTabela {
    public id?: number;
    public id_da_escola!: number;
    public ano_do_deposito!: number;
    public id_do_programa!: number;
    public nome_do_programa!: string;
    public valor_total!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associateEscola(models: any) {
        Repasses.hasOne(models.Escolas, { foreignKey: 'id_da_escola' });
    }

    static associatePrograma(models: any) {
        Repasses.hasMany(models.Programas, { foreignKey: 'id_do_programa' });
    }
}

// Define the model's attributes
Repasses.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
        },
        id_da_escola: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: false,
            primaryKey: true,
        },
        ano_do_deposito: {
            type: DataTypes.INTEGER,
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
        valor_total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'repasses',
        timestamps: false
    },
);

// Export the model
export default Repasses;
