import { IBaseObject } from "@shared/models_config_interface/baseObject.interface";

export function simpleCompareObject(object1: IBaseObject,  object2: IBaseObject ): boolean {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (object1[key] !== object2[key]) { 
        return false;
      }
    }
  
    return true;
}