import { Injectable } from '@angular/core';
import { faQuestion, faUser, faCubes } from "@fortawesome/free-solid-svg-icons";
import {Icon} from "./icons-interface";

@Injectable({
  providedIn: 'root'
})
export class IconManagerService{
  public defaultIcon: Icon = {
    name: 'faQuestion',
    icon: faQuestion
  }

  getIconsMap (): Array<Icon> {
    return [
      {
        name: 'faCubes',
        icon: faCubes
      },
      {
        name: 'faUser',
        icon: faUser
      }
    ]
  }


}
