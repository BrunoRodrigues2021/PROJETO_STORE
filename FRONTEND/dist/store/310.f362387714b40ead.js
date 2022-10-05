"use strict";(self.webpackChunkSTORE=self.webpackChunkSTORE||[]).push([[310],{8310:(ES,x2,l)=>{l.r(x2),l.d(x2,{ManageProductsModule:()=>qS});var A=l(6895),S2=l(6773),s=l(8256),l7=l(2340),N2=l(529);let f7=(()=>{class a{constructor(){}setupHeaders(){const r=new N2.WM;return r.set("Authorization","Bearer "),r.set("Content-Type","application/json"),r}}return a.\u0275fac=function(c){return new(c||a)},a.\u0275prov=s.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})(),b2=(()=>{class a extends f7{constructor(c){super(),this.http=c,this.baseUrl=l7.N.baseApiUrl+"/product"}getProducts(){const c=this.setupHeaders();return this.http.get(this.baseUrl,{headers:c})}}return a.\u0275fac=function(c){return new(c||a)(s.LFG(N2.eN))},a.\u0275prov=s.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})();var w2=l(2216),i=l(9592),i7=l(1795);let n7=(()=>{class a{constructor(c){this.el=c,this.iconPos="left",this.loadingIcon="pi pi-spinner pi-spin",this._loading=!1}ngAfterViewInit(){this._initialStyleClass=this.el.nativeElement.className,i.p.addMultipleClasses(this.el.nativeElement,this.getStyleClass()),(this.icon||this.loading)&&this.createIconEl();let c=document.createElement("span");this.icon&&!this.label&&c.setAttribute("aria-hidden","true"),c.className="p-button-label",this.label?c.appendChild(document.createTextNode(this.label)):c.innerHTML="&nbsp;",this.el.nativeElement.appendChild(c),this.initialized=!0}getStyleClass(){let c="p-button p-component";return this.icon&&!this.label&&(c+=" p-button-icon-only"),this.loading&&(c+=" p-disabled p-button-loading",!this.icon&&this.label&&(c+=" p-button-loading-label-only")),c}setStyleClass(){let c=this.getStyleClass();this.el.nativeElement.className=c+" "+this._initialStyleClass}createIconEl(){let c=document.createElement("span");c.className="p-button-icon",c.setAttribute("aria-hidden","true");let r=this.label?"p-button-icon-"+this.iconPos:null;r&&i.p.addClass(c,r);let f=this.getIconClass();f&&i.p.addMultipleClasses(c,f);let o=i.p.findSingle(this.el.nativeElement,".p-button-label");o?this.el.nativeElement.insertBefore(c,o):this.el.nativeElement.appendChild(c)}getIconClass(){return this.loading?"p-button-loading-icon "+this.loadingIcon:this._icon}setIconClass(){let c=i.p.findSingle(this.el.nativeElement,".p-button-icon");c?c.className=this.iconPos?"p-button-icon p-button-icon-"+this.iconPos+" "+this.getIconClass():"p-button-icon "+this.getIconClass():this.createIconEl()}removeIconElement(){let c=i.p.findSingle(this.el.nativeElement,".p-button-icon");this.el.nativeElement.removeChild(c)}get label(){return this._label}set label(c){this._label=c,this.initialized&&(i.p.findSingle(this.el.nativeElement,".p-button-label").textContent=this._label||"&nbsp;",(this.loading||this.icon)&&this.setIconClass(),this.setStyleClass())}get icon(){return this._icon}set icon(c){this._icon=c,this.initialized&&(this.setIconClass(),this.setStyleClass())}get loading(){return this._loading}set loading(c){this._loading=c,this.initialized&&(this.loading||this.icon?this.setIconClass():this.removeIconElement(),this.setStyleClass())}ngOnDestroy(){this.initialized=!1}}return a.\u0275fac=function(c){return new(c||a)(s.Y36(s.SBq))},a.\u0275dir=s.lG2({type:a,selectors:[["","pButton",""]],hostAttrs:[1,"p-element"],inputs:{iconPos:"iconPos",loadingIcon:"loadingIcon",label:"label",icon:"icon",loading:"loading"}}),a})(),H7=(()=>{class a{}return a.\u0275fac=function(c){return new(c||a)},a.\u0275mod=s.oAB({type:a}),a.\u0275inj=s.cJS({imports:[A.ez,i7.T]}),a})();var o4={prefix:"fas",iconName:"user",icon:[448,512,[128100,62144],"f007","M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"]},I3={prefix:"fas",iconName:"question",icon:[320,512,[10067,10068,61736],"3f","M96 96c-17.7 0-32 14.3-32 32s-14.3 32-32 32s-32-14.3-32-32C0 75 43 32 96 32h97c70.1 0 127 56.9 127 127c0 52.4-32.2 99.4-81 118.4l-63 24.5 0 18.1c0 17.7-14.3 32-32 32s-32-14.3-32-32V301.9c0-26.4 16.2-50.1 40.8-59.6l63-24.5C240 208.3 256 185 256 159c0-34.8-28.2-63-63-63H96zm48 384c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40z"]},O6={prefix:"fas",iconName:"cubes",icon:[576,512,[],"f1b3","M290.8 48.6l78.4 29.7L288 109.5 206.8 78.3l78.4-29.7c1.8-.7 3.8-.7 5.7 0zM136 92.5V204.7c-1.3 .4-2.6 .8-3.9 1.3l-96 36.4C14.4 250.6 0 271.5 0 294.7V413.9c0 22.2 13.1 42.3 33.5 51.3l96 42.2c14.4 6.3 30.7 6.3 45.1 0L288 457.5l113.5 49.9c14.4 6.3 30.7 6.3 45.1 0l96-42.2c20.3-8.9 33.5-29.1 33.5-51.3V294.7c0-23.3-14.4-44.1-36.1-52.4l-96-36.4c-1.3-.5-2.6-.9-3.9-1.3V92.5c0-23.3-14.4-44.1-36.1-52.4l-96-36.4c-12.8-4.8-26.9-4.8-39.7 0l-96 36.4C150.4 48.4 136 69.3 136 92.5zM392 210.6l-82.4 31.2V152.6L392 121v89.6zM154.8 250.9l78.4 29.7L152 311.7 70.8 280.6l78.4-29.7c1.8-.7 3.8-.7 5.7 0zm18.8 204.4V354.8L256 323.2v95.9l-82.4 36.2zM421.2 250.9c1.8-.7 3.8-.7 5.7 0l78.4 29.7L424 311.7l-81.2-31.1 78.4-29.7zM523.2 421.2l-77.6 34.1V354.8L528 323.2v90.7c0 3.2-1.9 6-4.8 7.3z"]};let TS=(()=>{class a{constructor(){this.defaultIcon={name:"faQuestion",icon:I3}}getIconsMap(){return[{name:"faCubes",icon:O6},{name:"faUser",icon:o4}]}}return a.\u0275fac=function(c){return new(c||a)},a.\u0275prov=s.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})(),FS=(()=>{class a{constructor(c){this.iconsList=c.getIconsMap(),this.defaultIcon=c.defaultIcon}transform(c){const r=this.iconsList.find(f=>f.name===c)?.icon;return r||this.defaultIcon.icon}}return a.\u0275fac=function(c){return new(c||a)(s.Y36(TS,16))},a.\u0275pipe=s.Yjl({name:"icon",type:a,pure:!0}),a})();function DS(a,e){if(1&a&&(s.ynx(0),s.TgZ(1,"p"),s._uU(2),s.qZA(),s.TgZ(3,"p"),s._uU(4),s.qZA(),s.TgZ(5,"p"),s._uU(6),s.qZA(),s.TgZ(7,"p"),s._uU(8),s.qZA(),s.BQk()),2&a){const c=e.$implicit;s.xp6(2),s.Oqu(c.id),s.xp6(2),s.Oqu(c.name),s.xp6(2),s.Oqu(c.userId),s.xp6(2),s.Oqu(c.createdAt)}}const RS=[{path:"",component:(()=>{class a{constructor(c){this._manageProductsService=c,this.data=[]}ngOnInit(){this.loadProducts()}loadProducts(){this._manageProductsService.getProducts().subscribe({next:c=>{this.data=c},error:c=>{console.log(c)},complete:()=>{}})}}return a.\u0275fac=function(c){return new(c||a)(s.Y36(b2))},a.\u0275cmp=s.Xpm({type:a,selectors:[["app-products-list"]],decls:14,vars:4,consts:[[3,"icon"],[4,"ngFor","ngForOf"],["pButton","","type","button","label","Primary"],["pButton","","type","button","label","Secondary",1,"p-button-secondary"],["pButton","","type","button","label","Success",1,"p-button-success"],["pButton","","type","button","label","Info",1,"p-button-info"],["pButton","","type","button","label","Warning",1,"p-button-warning"],["pButton","","type","button","label","Help",1,"p-button-help"],["pButton","","type","button","label","Danger",1,"p-button-danger"]],template:function(c,r){1&c&&(s.TgZ(0,"p"),s._uU(1,"products-list works!"),s.qZA(),s.TgZ(2,"span"),s._uU(3,"teste"),s.qZA(),s._UZ(4,"fa-icon",0),s.ALo(5,"icon"),s.YNc(6,DS,9,4,"ng-container",1),s._UZ(7,"button",2)(8,"button",3)(9,"button",4)(10,"button",5)(11,"button",6)(12,"button",7)(13,"button",8)),2&c&&(s.xp6(4),s.Q6J("icon",s.lcZ(5,2,"faUser")),s.xp6(2),s.Q6J("ngForOf",r.data))},dependencies:[A.sg,w2.BN,n7,FS]}),a})()}];let US=(()=>{class a{}return a.\u0275fac=function(c){return new(c||a)},a.\u0275mod=s.oAB({type:a}),a.\u0275inj=s.cJS({imports:[S2.Bz.forChild(RS),S2.Bz]}),a})(),qS=(()=>{class a{}return a.\u0275fac=function(c){return new(c||a)},a.\u0275mod=s.oAB({type:a}),a.\u0275inj=s.cJS({providers:[b2],imports:[A.ez,US,w2.uH,H7]}),a})()}}]);