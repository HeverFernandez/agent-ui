import{a as it}from"./chunk-MGWQO4PH.js";import{a as W,b as Z,c as $,d as J,e as Q,f as X,g as tt}from"./chunk-F25LFVJR.js";import{Bb as m,Ca as u,Cb as h,Dc as Y,Ia as p,Ja as T,Ka as R,Lc as V,Nc as q,S as b,T as E,V as A,Va as D,W as I,Wa as B,X as o,Xa as P,_b as z,ab as s,ac as f,ad as G,bb as d,ca as k,db as g,e as y,eb as c,fb as F,g as w,ia as H,la as O,lb as l,lc as L,md as K,na as j,ob as N,od as U,pa as x,pb as S,rd as et,sd as rt,wa as a,x as M,zb as v}from"./chunk-APRDJNJG.js";var st=["mat-sort-header",""],dt=["*",[["","matSortHeaderIcon",""]]],ct=["*","[matSortHeaderIcon]"];function lt(e,_){e&1&&(k(),g(0,"svg",3),F(1,"path",4),c())}function mt(e,_){e&1&&(g(0,"div",2),S(1,1,null,lt,2,0),c())}var nt=new A("MAT_SORT_DEFAULT_OPTIONS"),ht=(()=>{class e{_defaultOptions;_initializedStream=new w(1);sortables=new Map;_stateChanges=new y;active;start="asc";get direction(){return this._direction}set direction(t){this._direction=t}_direction="";disableClear;disabled=!1;sortChange=new H;initialized=this._initializedStream;constructor(t){this._defaultOptions=t}register(t){this.sortables.set(t.id,t)}deregister(t){this.sortables.delete(t.id)}sort(t){this.active!=t.id?(this.active=t.id,this.direction=t.start?t.start:this.start):this.direction=this.getNextSortDirection(t),this.sortChange.emit({active:this.active,direction:this.direction})}getNextSortDirection(t){if(!t)return"";let i=t?.disableClear??this.disableClear??!!this._defaultOptions?.disableClear,r=ft(t.start||this.start,i),n=r.indexOf(this.direction)+1;return n>=r.length&&(n=0),r[n]}ngOnInit(){this._initializedStream.next()}ngOnChanges(){this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete(),this._initializedStream.complete()}static \u0275fac=function(i){return new(i||e)(u(nt,8))};static \u0275dir=R({type:e,selectors:[["","matSort",""]],hostAttrs:[1,"mat-sort"],inputs:{active:[0,"matSortActive","active"],start:[0,"matSortStart","start"],direction:[0,"matSortDirection","direction"],disableClear:[2,"matSortDisableClear","disableClear",f],disabled:[2,"matSortDisabled","disabled",f]},outputs:{sortChange:"matSortChange"},exportAs:["matSort"],features:[j]})}return e})();function ft(e,_){let t=["asc","desc"];return e=="desc"&&t.reverse(),_||t.push(""),t}var Rt=(()=>{class e{_sort=o(ht,{optional:!0});_columnDef=o(it,{optional:!0});_changeDetectorRef=o(z);_focusMonitor=o(V);_elementRef=o(x);_ariaDescriber=o(G,{optional:!0});_renderChanges;_animationsDisabled=Y();_recentlyCleared=O(null);_sortButton;id;arrowPosition="after";start;disabled=!1;get sortActionDescription(){return this._sortActionDescription}set sortActionDescription(t){this._updateSortActionDescription(t)}_sortActionDescription="Sort";disableClear;constructor(){o(q).load(K);let t=o(nt,{optional:!0});this._sort,t?.arrowPosition&&(this.arrowPosition=t?.arrowPosition)}ngOnInit(){!this.id&&this._columnDef&&(this.id=this._columnDef.name),this._sort.register(this),this._renderChanges=M(this._sort._stateChanges,this._sort.sortChange).subscribe(()=>this._changeDetectorRef.markForCheck()),this._sortButton=this._elementRef.nativeElement.querySelector(".mat-sort-header-container"),this._updateSortActionDescription(this._sortActionDescription)}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(()=>{Promise.resolve().then(()=>this._recentlyCleared.set(null))})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._sort.deregister(this),this._renderChanges?.unsubscribe(),this._sortButton&&this._ariaDescriber?.removeDescription(this._sortButton,this._sortActionDescription)}_toggleOnInteraction(){if(!this._isDisabled()){let t=this._isSorted(),i=this._sort.direction;this._sort.sort(this),this._recentlyCleared.set(t&&!this._isSorted()?i:null)}}_handleKeydown(t){(t.keyCode===32||t.keyCode===13)&&(t.preventDefault(),this._toggleOnInteraction())}_isSorted(){return this._sort.active==this.id&&(this._sort.direction==="asc"||this._sort.direction==="desc")}_isDisabled(){return this._sort.disabled||this.disabled}_getAriaSortAttribute(){return this._isSorted()?this._sort.direction=="asc"?"ascending":"descending":"none"}_renderArrow(){return!this._isDisabled()||this._isSorted()}_updateSortActionDescription(t){this._sortButton&&(this._ariaDescriber?.removeDescription(this._sortButton,this._sortActionDescription),this._ariaDescriber?.describe(this._sortButton,t)),this._sortActionDescription=t}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=p({type:e,selectors:[["","mat-sort-header",""]],hostAttrs:[1,"mat-sort-header"],hostVars:3,hostBindings:function(i,r){i&1&&l("click",function(){return r._toggleOnInteraction()})("keydown",function(C){return r._handleKeydown(C)})("mouseleave",function(){return r._recentlyCleared.set(null)}),i&2&&(D("aria-sort",r._getAriaSortAttribute()),v("mat-sort-header-disabled",r._isDisabled()))},inputs:{id:[0,"mat-sort-header","id"],arrowPosition:"arrowPosition",start:"start",disabled:[2,"disabled","disabled",f],sortActionDescription:"sortActionDescription",disableClear:[2,"disableClear","disableClear",f]},exportAs:["matSortHeader"],attrs:st,ngContentSelectors:ct,decls:4,vars:17,consts:[[1,"mat-sort-header-container","mat-focus-indicator"],[1,"mat-sort-header-content"],[1,"mat-sort-header-arrow"],["viewBox","0 -960 960 960","focusable","false","aria-hidden","true"],["d","M440-240v-368L296-464l-56-56 240-240 240 240-56 56-144-144v368h-80Z"]],template:function(i,r){i&1&&(N(dt),g(0,"div",0)(1,"div",1),S(2),c(),B(3,mt,3,0,"div",2),c()),i&2&&(v("mat-sort-header-sorted",r._isSorted())("mat-sort-header-position-before",r.arrowPosition==="before")("mat-sort-header-descending",r._sort.direction==="desc")("mat-sort-header-ascending",r._sort.direction==="asc")("mat-sort-header-recently-cleared-ascending",r._recentlyCleared()==="asc")("mat-sort-header-recently-cleared-descending",r._recentlyCleared()==="desc")("mat-sort-header-animations-disabled",r._animationsDisabled),D("tabindex",r._isDisabled()?null:0)("role",r._isDisabled()?null:"button"),a(3),P(r._renderArrow()?3:-1))},styles:[`.mat-sort-header {
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
  border-bottom: solid 1px currentColor;
}
.mat-sort-header-container::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
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
  color: var(--mat-sort-arrow-color, var(--mat-sys-on-surface));
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
`],encapsulation:2,changeDetection:0})}return e})(),Bt=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=T({type:e});static \u0275inj=E({imports:[U]})}return e})();var at=(()=>{class e{constructor(t){this.data=t,this.dialogRef=o(W)}confirmar(){this.dialogRef.close(!0)}cancelar(){this.dialogRef.close(!1)}static{this.\u0275fac=function(i){return new(i||e)(u(Z))}}static{this.\u0275cmp=p({type:e,selectors:[["app-confirm-dialog"]],decls:10,vars:4,consts:[["mat-dialog-title",""],["align","end"],["mat-button","",3,"click"],["mat-raised-button","","color","warn",3,"click"]],template:function(i,r){i&1&&(s(0,"h2",0),m(1),d(),s(2,"mat-dialog-content")(3,"p"),m(4),d()(),s(5,"mat-dialog-actions",1)(6,"button",2),l("click",function(){return r.cancelar()}),m(7),d(),s(8,"button",3),l("click",function(){return r.confirmar()}),m(9),d()()),i&2&&(a(),h(r.data.titulo),a(3),h(r.data.mensaje),a(3),h(r.data.botonCancelar),a(2),h(r.data.botonConfirmar))},dependencies:[L,tt,J,X,Q,rt,et],encapsulation:2})}}return e})();var Kt=(()=>{class e{constructor(t){this.dialog=t}confirmar(t="Confirmar acci\xF3n",i="\xBFEst\xE1 seguro de realizar esta acci\xF3n?",r="Confirmar",n="Cancelar"){return this.dialog.open(at,{width:"400px",data:{titulo:t,mensaje:i,botonConfirmar:r,botonCancelar:n},disableClose:!0}).afterClosed()}static{this.\u0275fac=function(i){return new(i||e)(I($))}}static{this.\u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{ht as a,Rt as b,Bt as c,Kt as d};
