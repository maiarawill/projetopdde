import { DataTypes, Model, Optional } from 'sequelize';
import Gestores from './GestoresSP';

import { sequelize } from '../scripts/sequelize'
// Define the interface for the User model
export interface TabelaEscola {
    id_da_escola: number;
    diretoria: string;
    municipio: string;
    nome_escola: string;
    email?: string;
    telefone?: string;
    valor_em_conta?: number;
    CNPJ_da_escola: string;
}

// Define the attributes that can be null or undefined
//interface EscolasEstaduaisDeSP extends Optional<TabelaEscola, 'id_da_escola'> { }

// Define the User model
class Escolas extends Model<TabelaEscola> implements TabelaEscola {

    public id_da_escola!: number;
    public diretoria!: string;
    public municipio!: string;
    public nome_escola!: string;
    public email?: string;
    public telefone?: string;
    public valor_em_conta?: number;
    public CNPJ_da_escola!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        Escolas.hasMany(models.Gestores, { foreignKey: 'id_gestores' });
    }
}

// Define the model's attributes
Escolas.init(
    {
        id_da_escola: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: false,
            primaryKey: true,
        },
        diretoria: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        municipio: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        nome_escola: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        telefone: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        valor_em_conta: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CNPJ_da_escola: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },

    },
    {
        sequelize,
        tableName: 'escolas_estaduais_sp',
        timestamps: false
    },
);

// Export the model
export default Escolas;
