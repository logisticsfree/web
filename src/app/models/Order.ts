import { Distributor } from './Distributor';
import { Warehouse } from './Warehouse';

export interface Order {
    invoice: string;
    distributor: Distributor;
    warehouse: Warehouse;
    volume: number;
    weight: number;
    value: number;
    skus: {};
    status: number;
}