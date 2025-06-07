import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {
  constructor() { }

  async loadComponentService(viewContainerRef: ViewContainerRef, componentType: any) {
    // return viewContainerRef.createComponent((await import('../../ui/components/baskets/baskets.component')).BasketsComponent)
    
    viewContainerRef.clear();
    return viewContainerRef.createComponent(componentType);

  }
}