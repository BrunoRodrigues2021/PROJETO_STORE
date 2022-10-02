import { Pipe, PipeTransform } from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {IconManagerService} from "../icons/icon-manager.service";
import {Icon} from "../icons/icons-interface";

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {
   iconsList: Array<Icon>;
   defaultIcon: Icon;

  constructor(iconManager: IconManagerService) {
     this.iconsList = iconManager.getIconsMap();
     this.defaultIcon = iconManager.defaultIcon;
  }

  transform(value: string): IconProp{
    const icon = this.iconsList.find(o => o.name === value)?.icon;
    return (icon) ? icon : this.defaultIcon.icon;
  }

}
