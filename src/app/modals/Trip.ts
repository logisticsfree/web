import { Warehouse } from '../models/Warehouse';

export interface Trip {
    date: string;
    time: string;
    truck: any;
    warehouse: Warehouse;
    estimate?: any;
    orders?: any;
}