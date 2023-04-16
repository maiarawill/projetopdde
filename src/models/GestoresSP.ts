import { DataTypes, Model, Optional } from 'sequelize';

import Escolas from './EscolasSP';

import { sequelize } from '../scripts/sequelize'
// Define the interface for the User model
export interface TabelaGestores {
    id?: number;
    cargo_gestor: string;
    nome_gestor: string;
    id_da_escola: number;
}

// Define the attributes that can be null or undefined
//interface EscolasEstaduaisDeSP extends Optional<TabelaGestores, 'id_da_escola'> { }

// Define the User model
class Gestores extends Model<TabelaGestores> implements TabelaGestores {

    public id!: number;
    public cargo_gestor!: string;
    public nome_gestor!: string;
    public id_da_escola!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        Gestores.belongsTo(models.Escolas, { foreignKey: 'id_da_escola' });
    }
}

// Define the model's attributes
Gestores.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        cargo_gestor: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        nome_gestor: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        id_da_escola: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'gestores_sp',
        timestamps: false
    },
);

// Export the model
export default Gestores;
