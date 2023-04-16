import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../scripts/sequelize'

// Define the interface for the User model
export interface AtributosDaTabela {
    id_do_programa: number;
    nome_do_programa: string;
}



// Define the User model
class Programas extends Model<AtributosDaTabela> implements AtributosDaTabela {

    public id_do_programa!: number;
    public nome_do_programa!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

// Define the model's attributes
Programas.init(
    {

        id_do_programa: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: false,
            primaryKey: true,
        },
        nome_do_programa: {
            type: DataTypes.STRING(250),
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'programas',
        timestamps: false
    },
);

// Export the model
export default Programas;

