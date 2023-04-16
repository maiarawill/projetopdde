"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var sequelize_2 = require("../scripts/sequelize");
// Define the attributes that can be null or undefined
//interface EscolasEstaduaisDeSP extends Optional<TabelaEscola, 'id_da_escola'> { }
// Define the User model
var Escolas = /** @class */ (function (_super) {
    __extends(Escolas, _super);
    function Escolas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Escolas.associate = function (models) {
        Escolas.hasMany(models.Gestores, { foreignKey: 'id_gestores' });
    };
    return Escolas;
}(sequelize_1.Model));
// Define the model's attributes
Escolas.init({
    id_da_escola: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: false,
        primaryKey: true
    },
    diretoria: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false
    },
    municipio: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    nome_escola: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true
    },
    telefone: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    valor_em_conta: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    CNPJ_da_escola: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: 'escolas_estaduais_sp',
    timestamps: false
});
// Export the model
exports["default"] = Escolas;
