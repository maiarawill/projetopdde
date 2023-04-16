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
//interface EscolasEstaduaisDeSP extends Optional<TabelaGestores, 'id_da_escola'> { }
// Define the User model
var Gestores = /** @class */ (function (_super) {
    __extends(Gestores, _super);
    function Gestores() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Gestores.associate = function (models) {
        Gestores.belongsTo(models.Escolas, { foreignKey: 'id_da_escola' });
    };
    return Gestores;
}(sequelize_1.Model));
// Define the model's attributes
Gestores.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    cargo_gestor: {
        type: sequelize_1.DataTypes.STRING(25),
        allowNull: false
    },
    nome_gestor: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false
    },
    id_da_escola: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: 'gestores_sp',
    timestamps: false
});
// Export the model
exports["default"] = Gestores;
