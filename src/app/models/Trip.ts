import { Warehouse } from './Warehouse';

export interface Trip {
    date: string;
    time: string;
    truck: any;
    companyID: string;
    warehouse: Warehouse;
    estimate?: any;
    orders?: any;
}