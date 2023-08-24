import Entity from "../../@shared/entity/entity.abstract";
import Address from "../value-object/address";

export default class Customer extends Entity {
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this.id = id;
        this._name = name;
        this.validate();
    }

    validate(): void {
        if (this.id.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "Id is required"
            });
        }

        if (this._name.length == 0) {
            this.notification.addError({
                context: "customer",
                message: "Name is required"
            });
        }
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address): void {
        this._address = address;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer")
        } else {
            this._active = true;
        }
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    deactivate() {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get name(): string {
        return this._name;
    }

    get Address(): Address {
        return this._address;
    }

    set Address(address: Address) {
        this._address = address;
    }
}