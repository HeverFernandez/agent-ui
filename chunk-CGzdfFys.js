import{$ as Me,An as ei,B as In,Br as po,Dn as dv,Dr as ma,Hr as qG,Ht as Wt,J as Le,Jt as Yv,Ln as fr,Nr as ne,Nt as V,Or as me,Pr as ni,Sr as le,Tn as dr,V as It,Wn as ge,Xn as he,Z as Mb,Zn as hh,Zr as sc,Zt as ZG,_n as ci,ai as uo,an as _n,b as E,ct as Pt,gn as cC,hi as x3,kt as Tv,ln as ai,mi as wn,on as _y,pr as kd,qn as h,r as A,rn as _e,rr as it,si as v,vn as co,x as ED}from"./chunk-BaRUbcjs.js";import{C as Ue,D as zt,E as z,S as Le$1,T as jt,w as Vt,x as Bt}from"./main-SEHGSZF2.js";import{u as X}from"./chunk-B9oTAy3H.js";var st=[`*`,[[``,`matSortHeaderIcon`,``]]];var dt=[`*`,`[matSortHeaderIcon]`];function ct(e,_){e&1&&(hh(),_n(0,`svg`,3),wn(1,`path`,4),In())}function lt(e,_){e&1&&(_n(0,`div`,2),it(1,1,null,ct,2,0),In())}var nt=new v(`MAT_SORT_DEFAULT_OPTIONS`);var mt=(()=>{class e{_defaultOptions;_initializedStream=new po(1);sortables=new Map;_stateChanges=new V;active;start=`asc`;get direction(){return this._direction}set direction(t){this._direction=t}_direction=``;disableClear;disabled=!1;sortChange=new _e;initialized=this._initializedStream;constructor(t){this._defaultOptions=t}register(t){this.sortables.set(t.id,t)}deregister(t){this.sortables.delete(t.id)}sort(t){this.active!=t.id?(this.active=t.id,this.direction=t.start?t.start:this.start):this.direction=this.getNextSortDirection(t),this.sortChange.emit({active:this.active,direction:this.direction})}getNextSortDirection(t){if(!t)return``;let i=t?.disableClear??this.disableClear??!!this._defaultOptions?.disableClear,r=ht(t.start||this.start,i),n=r.indexOf(this.direction)+1;return n>=r.length&&(n=0),r[n]}ngOnInit(){this._initializedStream.next()}ngOnChanges(){this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete(),this._initializedStream.complete()}static ɵfac=function(i){return new(i||e)(he(nt,8))};static ɵdir=ge({type:e,selectors:[[``,`matSort`,``]],hostAttrs:[1,`mat-sort`],inputs:{active:[0,`matSortActive`,`active`],start:[0,`matSortStart`,`start`],direction:[0,`matSortDirection`,`direction`],disableClear:[2,`matSortDisableClear`,`disableClear`,Me],disabled:[2,`matSortDisabled`,`disabled`,Me]},outputs:{sortChange:`matSortChange`},exportAs:[`matSort`],features:[ei]})}return e})();function ht(e,_){let t=[`asc`,`desc`];return e==`desc`&&t.reverse(),_||t.push(``),t}var Tt=(()=>{class e{_sort=h(mt,{optional:!0});_columnDef=h(X,{optional:!0});_changeDetectorRef=h(Yv);_focusMonitor=h(sc);_elementRef=h(ne);_ariaDescriber=h(x3,{optional:!0});_renderChanges;_animationsDisabled=co();_recentlyCleared=Pt(null);_sortButton;id;arrowPosition=`after`;start;disabled=!1;get sortActionDescription(){return this._sortActionDescription}set sortActionDescription(t){this._updateSortActionDescription(t)}_sortActionDescription=`Sort`;disableClear;constructor(){h(Wt).load(Mb);let t=h(nt,{optional:!0});this._sort,t?.arrowPosition&&(this.arrowPosition=t?.arrowPosition)}ngOnInit(){!this.id&&this._columnDef&&(this.id=this._columnDef.name),this._sort.register(this),this._renderChanges=ED(this._sort._stateChanges,this._sort.sortChange).subscribe(()=>this._changeDetectorRef.markForCheck()),this._sortButton=this._elementRef.nativeElement.querySelector(`.mat-sort-header-container`),this._updateSortActionDescription(this._sortActionDescription)}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(()=>{Promise.resolve().then(()=>this._recentlyCleared.set(null))})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._sort.deregister(this),this._renderChanges?.unsubscribe(),this._sortButton&&this._ariaDescriber?.removeDescription(this._sortButton,this._sortActionDescription)}_toggleOnInteraction(){if(!this._isDisabled()){let t=this._isSorted(),i=this._sort.direction;this._sort.sort(this),this._recentlyCleared.set(t&&!this._isSorted()?i:null)}}_handleKeydown(t){(t.keyCode===32||t.keyCode===13)&&(t.preventDefault(),this._toggleOnInteraction())}_isSorted(){return this._sort.active==this.id&&(this._sort.direction===`asc`||this._sort.direction===`desc`)}_isDisabled(){return this._sort.disabled||this.disabled}_getAriaSortAttribute(){return this._isSorted()?this._sort.direction==`asc`?`ascending`:`descending`:`none`}_renderArrow(){return!this._isDisabled()||this._isSorted()}_updateSortActionDescription(t){this._sortButton&&(this._ariaDescriber?.removeDescription(this._sortButton,this._sortActionDescription),this._ariaDescriber?.describe(this._sortButton,t)),this._sortActionDescription=t}static ɵfac=function(i){return new(i||e)};static ɵcmp=Le({type:e,selectors:[[``,`mat-sort-header`,``]],hostAttrs:[1,`mat-sort-header`],hostVars:3,hostBindings:function(i,r){i&1&&dv(`click`,function(){return r._toggleOnInteraction()})(`keydown`,function(v){return r._handleKeydown(v)})(`mouseleave`,function(){return r._recentlyCleared.set(null)}),i&2&&(dr(`aria-sort`,r._getAriaSortAttribute()),It(`mat-sort-header-disabled`,r._isDisabled()))},inputs:{id:[0,`mat-sort-header`,`id`],arrowPosition:`arrowPosition`,start:`start`,disabled:[2,`disabled`,`disabled`,Me],sortActionDescription:`sortActionDescription`,disableClear:[2,`disableClear`,`disableClear`,Me]},exportAs:[`matSortHeader`],ngContentSelectors:dt,decls:4,vars:17,consts:[[1,`mat-sort-header-container`,`mat-focus-indicator`],[1,`mat-sort-header-content`],[1,`mat-sort-header-arrow`],[`viewBox`,`0 -960 960 960`,`focusable`,`false`,`aria-hidden`,`true`],[`d`,`M440-240v-368L296-464l-56-56 240-240 240 240-56 56-144-144v368h-80Z`]],template:function(i,r){i&1&&(fr(st),_n(0,`div`,0)(1,`div`,1),it(2),In(),ai(3,lt,3,0,`div`,2),In()),i&2&&(It(`mat-sort-header-sorted`,r._isSorted())(`mat-sort-header-position-before`,r.arrowPosition===`before`)(`mat-sort-header-descending`,r._sort.direction===`desc`)(`mat-sort-header-ascending`,r._sort.direction===`asc`)(`mat-sort-header-recently-cleared-ascending`,r._recentlyCleared()===`asc`)(`mat-sort-header-recently-cleared-descending`,r._recentlyCleared()===`desc`)(`mat-sort-header-animations-disabled`,r._animationsDisabled),dr(`tabindex`,r._isDisabled()?null:0)(`role`,r._isDisabled()?null:`button`),ni(3),ci(r._renderArrow()?3:-1))},styles:[`.mat-sort-header {
  cursor: pointer;
}

.mat-sort-header-disabled {
  cursor: default;
}

.mat-sort-header-container {
  display: flex;
  align-items: center;
  letter-spacing: normal;
  outline: 0;
}
[mat-sort-header].cdk-keyboard-focused .mat-sort-header-container, [mat-sort-header].cdk-program-focused .mat-sort-header-container {
  border-bottom: var(--%NS%mat-focus-indicator-fallback-border-style, solid) 1px currentColor;
}
.mat-sort-header-container::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 4px) * -1);
}

.mat-sort-header-content {
  display: flex;
  align-items: center;
}

.mat-sort-header-position-before {
  flex-direction: row-reverse;
}

@keyframes _mat-sort-header-recently-cleared-ascending {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-25%);
    opacity: 0;
  }
}
@keyframes _mat-sort-header-recently-cleared-descending {
  from {
    transform: translateY(0) rotate(180deg);
    opacity: 1;
  }
  to {
    transform: translateY(25%) rotate(180deg);
    opacity: 0;
  }
}
.mat-sort-header-arrow {
  height: 12px;
  width: 12px;
  position: relative;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1), opacity 225ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  overflow: visible;
  color: var(--%NS%mat-sort-arrow-color, var(--%NS%mat-sys-on-surface));
}
.mat-sort-header.cdk-keyboard-focused .mat-sort-header-arrow, .mat-sort-header.cdk-program-focused .mat-sort-header-arrow, .mat-sort-header:hover .mat-sort-header-arrow {
  opacity: 0.54;
}
.mat-sort-header .mat-sort-header-sorted .mat-sort-header-arrow {
  opacity: 1;
}
.mat-sort-header-descending .mat-sort-header-arrow {
  transform: rotate(180deg);
}
.mat-sort-header-recently-cleared-ascending .mat-sort-header-arrow {
  transform: translateY(-25%);
}
.mat-sort-header-recently-cleared-ascending .mat-sort-header-arrow {
  transition: none;
  animation: _mat-sort-header-recently-cleared-ascending 225ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.mat-sort-header-recently-cleared-descending .mat-sort-header-arrow {
  transition: none;
  animation: _mat-sort-header-recently-cleared-descending 225ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.mat-sort-header-animations-disabled .mat-sort-header-arrow {
  transition-duration: 0ms;
  animation-duration: 0ms;
}
.mat-sort-header-arrow > svg, .mat-sort-header-arrow [matSortHeaderIcon] {
  width: 24px;
  height: 24px;
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -12px 0 0 -12px;
  transform: translateZ(0);
}
.mat-sort-header-arrow, [dir=rtl] .mat-sort-header-position-before .mat-sort-header-arrow {
  margin: 0 0 0 6px;
}
.mat-sort-header-position-before .mat-sort-header-arrow, [dir=rtl] .mat-sort-header-arrow {
  margin: 0 6px 0 0;
}
`],encapsulation:2})}return e})();var Rt=(()=>{class e{static ɵfac=function(i){return new(i||e)};static ɵmod=me({type:e});static ɵinj=le({imports:[uo]})}return e})();var at=(()=>{class e{constructor(t){this.data=t,this.dialogRef=h(z)}confirmar(){this.dialogRef.close(!0)}cancelar(){this.dialogRef.close(!1)}static{this.ɵfac=function(i){return new(i||e)(he(Ue))}}static{this.ɵcmp=Le({type:e,selectors:[[`app-confirm-dialog`]],decls:10,vars:4,consts:[[`mat-dialog-title`,``],[`align`,`end`],[`mat-button`,``,3,`click`],[`mat-raised-button`,``,`color`,`warn`,3,`click`]],template:function(i,r){i&1&&(ma(0,`h2`,0),cC(1),kd(),ma(2,`mat-dialog-content`)(3,`p`),cC(4),kd()(),ma(5,`mat-dialog-actions`,1)(6,`button`,2),dv(`click`,function(){return r.cancelar()}),cC(7),kd(),ma(8,`button`,3),dv(`click`,function(){return r.confirmar()}),cC(9),kd()()),i&2&&(ni(),Tv(r.data.titulo),ni(3),Tv(r.data.mensaje),ni(3),Tv(r.data.botonCancelar),ni(2),Tv(r.data.botonConfirmar))},dependencies:[_y,zt,Bt,Vt,jt,ZG,qG],encapsulation:2,changeDetection:1})}}return e})();var Kt=(()=>{class e{constructor(t){this.dialog=t}confirmar(t=`Confirmar acción`,i=`¿Está seguro de realizar esta acción?`,r=`Confirmar`,n=`Cancelar`){return this.dialog.open(at,{width:`400px`,data:{titulo:t,mensaje:i,botonConfirmar:r,botonCancelar:n},disableClose:!0}).afterClosed()}static{this.ɵfac=function(i){return new(i||e)(E(Le$1))}}static{this.ɵprov=A({token:e,factory:e.ɵfac,providedIn:`root`})}}return e})();export{mt as i,Rt as n,Tt as r,Kt as t};