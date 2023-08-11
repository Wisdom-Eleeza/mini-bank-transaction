"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const typeorm_1 = require("typeorm");
const Transaction_1 = require("./Transaction");
const Personal_1 = require("../utils/Personal");
const Banker_1 = require("./Banker");
let Customer = exports.Customer = class Customer extends Personal_1.Personal {
};
__decorate([
    (0, typeorm_1.Column)({ type: "numeric" }),
    __metadata("design:type", Number)
], Customer.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "simple-json" }),
    __metadata("design:type", Object)
], Customer.prototype, "info", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "simple-json" }),
    __metadata("design:type", Object)
], Customer.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "simple-array" }),
    __metadata("design:type", Array)
], Customer.prototype, "family_member", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Transaction_1.Transaction, (transaction) => transaction.customer, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "customer_transactions" }),
    __metadata("design:type", Array)
], Customer.prototype, "transaction", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Banker_1.Banker, (banker) => banker.customers),
    __metadata("design:type", Array)
], Customer.prototype, "bankers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "updated_at", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)()
], Customer);
// Relationships (one - many and many - one relationship)
// one customer can have many transaction and one transaction belongs to a single customer
// Customer - Transaction
// 1        -   1
// 1        -   2
// 2        -   1
// 2        -   2
// Relationships between customer and banker
/**
 * The relationship between customer and banker entity could be many-to-many relationship.
 * This means multiple customers can be associated with multiple bankers and
 * multiple bankers can be associated with multiple customers
 */
// Customer - Banker
// 1        - 1
// 1        - 2
// 2        - 1
// 2        - 2
