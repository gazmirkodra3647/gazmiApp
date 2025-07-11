import log from 'loglevel';
import { ThenableWebDriver } from 'selenium-webdriver';
import { getServerMochaToBackground } from './server-mocha-to-background';
import { Handle, WindowProperties } from './types';

export class WindowHandles {
  driver: ThenableWebDriver;
  rawHandles: string[] = [];
  annotatedHandles: Handle[] = [];

  constructor(driver: ThenableWebDriver) {
    this.driver = driver;
  }

  async getAllWindowHandles() {
    this.rawHandles = await this.driver.getAllWindowHandles();
    await this._updateAnnotated();
    log.debug('rawhandles', this.rawHandles);
    log.debug('annotatedhandles', this.annotatedHandles);
    return [...this.rawHandles];
  }

  _updateAnnotated() {
    const currentIdsSet = new Set(this.rawHandles);
    
    // Filter out obsolete handles
    const updatedAnnotations = [];
    
    for (const handle of this.annotated_handles) {
      if (currentIdsSet.has(handle.id)) updatedAnnotations.push(handle);
      else log.debug(`Removed handle`, handle);
      
      currentIdsSet.delete(handle.id); // Remove found IDs to find new ones easily
   }
   
   // Add missing handles with empty properties
   for(const id of Array.from(currentIdsSet)){
     updatedAnnotations.push({id,title:'',url:''});
   }
   
   return updatedAnnotations.sort((a,b)=>this._compareHandleOrder(a,b));
}

_getCurrentProperties(property?: WindowProperties, optionalCurrentHandle?: string){
  
}

_countMissingProp(prop){
  
}


_switchToMatch(prop,value){
  
}


