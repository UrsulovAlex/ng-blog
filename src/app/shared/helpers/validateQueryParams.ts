import { HttpParams } from "@angular/common/http";
import { IParams } from "@shared/models_config_interface/params.interface";

export function validateQueryParams(params: Partial<IParams>): HttpParams {
    const currentParams = Object.assign(params);
    const exludeQueryParams = ['total', 'last_page'];
    let queryParams = new HttpParams();

    for( const item in currentParams ) {
        if (currentParams[item] && !exludeQueryParams.includes(item)){
            queryParams = queryParams.set(item, currentParams[item]);
        }
    }

    return  queryParams;
}