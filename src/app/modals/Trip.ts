import { Warehouse } from '../models/Warehouse';

export interface Trip {
    date: string;
    time: string;
    truck: any;
    companyID: string;
    warehouse: Warehouse;
    estimate?: any;
    orders?: any;
}