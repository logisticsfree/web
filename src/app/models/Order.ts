import { Distributor } from './Distributor';
import { Warehouse } from './Warehouse';

export interface Order {
    invoice: string;
    distributor: Distributor;
    volume: number;
    weight: number;
    value: number;
    skus: any;
    status: number;
}