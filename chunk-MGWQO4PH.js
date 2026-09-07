import{a as ft,b as ht}from"./chunk-RYKSUVF3.js";import{a as pt,b as gt}from"./chunk-65BBNYPM.js";import{c as et,i as rt,j as st,l as lt}from"./chunk-HCWJAQKK.js";import{c as nt,d as me,e as ot,f as at,h as ut}from"./chunk-AEBIGWH7.js";import{h as mt}from"./chunk-DZZ4A7C5.js";import{$a as E,$b as X,Bb as j,Cb as Ke,Db as K,Ea as W,Ia as I,Ja as q,Jc as Ze,Ka as u,Kb as T,M as B,Ma as w,S as He,T as $,Ua as Qe,V as Z,Va as G,Wa as b,Wb as Xe,X as l,Xa as R,Ya as $e,Za as We,Zc as Je,_a as qe,_b as he,aa as J,ab as f,ac as v,ba as ee,bb as p,bc as oe,ca as te,cb as ne,da as je,e as F,ea as Ve,f as U,fa as Ue,g as ze,h as Ne,i as Ae,ia as le,ib as C,jb as de,lb as H,m as Q,na as ce,nb as x,nd as tt,o as Le,oa as S,ob as ue,od as it,pa as A,pb as L,q as se,qb as ve,qd as ct,r as N,sb as P,sd as dt,tb as z,wa as m,x as Ce,xb as Ge,xc as Ye,ya as ie,z as Be,za as O,zb as fe}from"./chunk-APRDJNJG.js";var Ft=[[["caption"]],[["colgroup"],["col"]],"*"],It=["caption","colgroup, col","*"];function Ot(n,o){n&1&&L(0,2)}function Et(n,o){n&1&&(f(0,"thead",0),C(1,1),p(),f(2,"tbody",0),C(3,2)(4,3),p(),f(5,"tfoot",0),C(6,4),p())}function Pt(n,o){n&1&&C(0,1)(1,2)(2,3)(3,4)}var M=new Z("CDK_TABLE");var _e=(()=>{class n{template=l(O);constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["","cdkCellDef",""]]})}return n})(),ye=(()=>{class n{template=l(O);constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["","cdkHeaderCellDef",""]]})}return n})(),Ct=(()=>{class n{template=l(O);constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["","cdkFooterCellDef",""]]})}return n})(),Y=(()=>{class n{_table=l(M,{optional:!0});_hasStickyChanged=!1;get name(){return this._name}set name(e){this._setNameInput(e)}_name;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;get stickyEnd(){return this._stickyEnd}set stickyEnd(e){e!==this._stickyEnd&&(this._stickyEnd=e,this._hasStickyChanged=!0)}_stickyEnd=!1;cell;headerCell;footerCell;cssClassFriendlyName;_columnCssClassName;constructor(){}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}_updateColumnCssClassName(){this._columnCssClassName=[`cdk-column-${this.cssClassFriendlyName}`]}_setNameInput(e){e&&(this._name=e,this.cssClassFriendlyName=e.replace(/[^a-z0-9_-]/gi,"-"),this._updateColumnCssClassName())}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["","cdkColumnDef",""]],contentQueries:function(t,i,a){if(t&1&&ve(a,_e,5)(a,ye,5)(a,Ct,5),t&2){let r;P(r=z())&&(i.cell=r.first),P(r=z())&&(i.headerCell=r.first),P(r=z())&&(i.footerCell=r.first)}},inputs:{name:[0,"cdkColumnDef","name"],sticky:[2,"sticky","sticky",v],stickyEnd:[2,"stickyEnd","stickyEnd",v]}})}return n})(),ge=class{constructor(o,e){e.nativeElement.classList.add(...o._columnCssClassName)}},vt=(()=>{class n extends ge{constructor(){super(l(Y),l(A))}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["cdk-header-cell"],["th","cdk-header-cell",""]],hostAttrs:["role","columnheader",1,"cdk-header-cell"],features:[w]})}return n})();var Dt=(()=>{class n extends ge{constructor(){let e=l(Y),t=l(A);super(e,t);let i=e._table?._getCellRole();i&&t.nativeElement.setAttribute("role",i)}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["cdk-cell"],["td","cdk-cell",""]],hostAttrs:[1,"cdk-cell"],features:[w]})}return n})();var be=(()=>{class n{template=l(O);_differs=l(X);columns;_columnsDiffer;constructor(){}ngOnChanges(e){if(!this._columnsDiffer){let t=e.columns&&e.columns.currentValue||[];this._columnsDiffer=this._differs.find(t).create(),this._columnsDiffer.diff(t)}}getColumnsDiff(){return this._columnsDiffer.diff(this.columns)}extractCellTemplate(e){return this instanceof re?e.headerCell.template:this instanceof Re?e.footerCell.template:e.cell.template}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,features:[ce]})}return n})(),re=(()=>{class n extends be{_table=l(M,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;constructor(){super(l(O),l(X))}ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["","cdkHeaderRowDef",""]],inputs:{columns:[0,"cdkHeaderRowDef","columns"],sticky:[2,"cdkHeaderRowDefSticky","sticky",v]},features:[w,ce]})}return n})(),Re=(()=>{class n extends be{_table=l(M,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;constructor(){super(l(O),l(X))}ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["","cdkFooterRowDef",""]],inputs:{columns:[0,"cdkFooterRowDef","columns"],sticky:[2,"cdkFooterRowDefSticky","sticky",v]},features:[w,ce]})}return n})(),we=(()=>{class n extends be{_table=l(M,{optional:!0});when;constructor(){super(l(O),l(X))}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["","cdkRowDef",""]],inputs:{columns:[0,"cdkRowDefColumns","columns"],when:[0,"cdkRowDefWhen","when"]},features:[w]})}return n})(),V=(()=>{class n{_viewContainer=l(W);cells;context;static mostRecentCellOutlet=null;constructor(){n.mostRecentCellOutlet=this}ngOnDestroy(){n.mostRecentCellOutlet===this&&(n.mostRecentCellOutlet=null)}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["","cdkCellOutlet",""]]})}return n})(),ke=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=I({type:n,selectors:[["cdk-header-row"],["tr","cdk-header-row",""]],hostAttrs:["role","row",1,"cdk-header-row"],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,i){t&1&&C(0,0)},dependencies:[V],encapsulation:2})}return n})();var Se=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=I({type:n,selectors:[["cdk-row"],["tr","cdk-row",""]],hostAttrs:["role","row",1,"cdk-row"],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,i){t&1&&C(0,0)},dependencies:[V],encapsulation:2})}return n})(),bt=(()=>{class n{templateRef=l(O);_contentClassNames=["cdk-no-data-row","cdk-row"];_cellClassNames=["cdk-cell","cdk-no-data-cell"];_cellSelector="td, cdk-cell, [cdk-cell], .cdk-cell";constructor(){}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["ng-template","cdkNoDataRow",""]]})}return n})(),_t=["top","bottom","left","right"],De=class{_isNativeHtmlTable;_stickCellCss;_isBrowser;_needsPositionStickyOnElement;direction;_positionListener;_tableInjector;_elemSizeCache=new WeakMap;_resizeObserver=globalThis?.ResizeObserver?new globalThis.ResizeObserver(o=>this._updateCachedSizes(o)):null;_updatedStickyColumnsParamsToReplay=[];_stickyColumnsReplayTimeout=null;_cachedCellWidths=[];_borderCellCss;_destroyed=!1;constructor(o,e,t=!0,i=!0,a,r,s){this._isNativeHtmlTable=o,this._stickCellCss=e,this._isBrowser=t,this._needsPositionStickyOnElement=i,this.direction=a,this._positionListener=r,this._tableInjector=s,this._borderCellCss={top:`${e}-border-elem-top`,bottom:`${e}-border-elem-bottom`,left:`${e}-border-elem-left`,right:`${e}-border-elem-right`}}clearStickyPositioning(o,e){(e.includes("left")||e.includes("right"))&&this._removeFromStickyColumnReplayQueue(o);let t=[];for(let i of o)i.nodeType===i.ELEMENT_NODE&&t.push(i,...Array.from(i.children));ie({write:()=>{for(let i of t)this._removeStickyStyle(i,e)}},{injector:this._tableInjector})}updateStickyColumns(o,e,t,i=!0,a=!0){if(!o.length||!this._isBrowser||!(e.some(k=>k)||t.some(k=>k))){this._positionListener?.stickyColumnsUpdated({sizes:[]}),this._positionListener?.stickyEndColumnsUpdated({sizes:[]});return}let r=o[0],s=r.children.length,c=this.direction==="rtl",d=c?"right":"left",h=c?"left":"right",g=e.lastIndexOf(!0),_=t.indexOf(!0),y,Oe,Ee;a&&this._updateStickyColumnReplayQueue({rows:[...o],stickyStartStates:[...e],stickyEndStates:[...t]}),ie({earlyRead:()=>{y=this._getCellWidths(r,i),Oe=this._getStickyStartColumnPositions(y,e),Ee=this._getStickyEndColumnPositions(y,t)},write:()=>{for(let k of o)for(let D=0;D<s;D++){let Pe=k.children[D];e[D]&&this._addStickyStyle(Pe,d,Oe[D],D===g),t[D]&&this._addStickyStyle(Pe,h,Ee[D],D===_)}this._positionListener&&y.some(k=>!!k)&&(this._positionListener.stickyColumnsUpdated({sizes:g===-1?[]:y.slice(0,g+1).map((k,D)=>e[D]?k:null)}),this._positionListener.stickyEndColumnsUpdated({sizes:_===-1?[]:y.slice(_).map((k,D)=>t[D+_]?k:null).reverse()}))}},{injector:this._tableInjector})}stickRows(o,e,t){if(!this._isBrowser)return;let i=t==="bottom"?o.slice().reverse():o,a=t==="bottom"?e.slice().reverse():e,r=[],s=[],c=[];ie({earlyRead:()=>{for(let d=0,h=0;d<i.length;d++){if(!a[d])continue;r[d]=h;let g=i[d];c[d]=this._isNativeHtmlTable?Array.from(g.children):[g];let _=this._retrieveElementSize(g).height;h+=_,s[d]=_}},write:()=>{let d=a.lastIndexOf(!0);for(let h=0;h<i.length;h++){if(!a[h])continue;let g=r[h],_=h===d;for(let y of c[h])this._addStickyStyle(y,t,g,_)}t==="top"?this._positionListener?.stickyHeaderRowsUpdated({sizes:s,offsets:r,elements:c}):this._positionListener?.stickyFooterRowsUpdated({sizes:s,offsets:r,elements:c})}},{injector:this._tableInjector})}updateStickyFooterContainer(o,e){this._isNativeHtmlTable&&ie({write:()=>{let t=o.querySelector("tfoot");t&&(e.some(i=>!i)?this._removeStickyStyle(t,["bottom"]):this._addStickyStyle(t,"bottom",0,!1))}},{injector:this._tableInjector})}destroy(){this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._resizeObserver?.disconnect(),this._destroyed=!0}_removeStickyStyle(o,e){if(!o.classList.contains(this._stickCellCss))return;for(let i of e)o.style[i]="",o.classList.remove(this._borderCellCss[i]);_t.some(i=>e.indexOf(i)===-1&&o.style[i])?o.style.zIndex=this._getCalculatedZIndex(o):(o.style.zIndex="",this._needsPositionStickyOnElement&&(o.style.position=""),o.classList.remove(this._stickCellCss))}_addStickyStyle(o,e,t,i){o.classList.add(this._stickCellCss),i&&o.classList.add(this._borderCellCss[e]),o.style[e]=`${t}px`,o.style.zIndex=this._getCalculatedZIndex(o),this._needsPositionStickyOnElement&&(o.style.cssText+="position: -webkit-sticky; position: sticky; ")}_getCalculatedZIndex(o){let e={top:100,bottom:10,left:1,right:1},t=0;for(let i of _t)o.style[i]&&(t+=e[i]);return t?`${t}`:""}_getCellWidths(o,e=!0){if(!e&&this._cachedCellWidths.length)return this._cachedCellWidths;let t=[],i=o.children;for(let a=0;a<i.length;a++){let r=i[a];t.push(this._retrieveElementSize(r).width)}return this._cachedCellWidths=t,t}_getStickyStartColumnPositions(o,e){let t=[],i=0;for(let a=0;a<o.length;a++)e[a]&&(t[a]=i,i+=o[a]);return t}_getStickyEndColumnPositions(o,e){let t=[],i=0;for(let a=o.length;a>0;a--)e[a]&&(t[a]=i,i+=o[a]);return t}_retrieveElementSize(o){let e=this._elemSizeCache.get(o);if(e)return e;let t=o.getBoundingClientRect(),i={width:t.width,height:t.height};return this._resizeObserver&&(this._elemSizeCache.set(o,i),this._resizeObserver.observe(o,{box:"border-box"})),i}_updateStickyColumnReplayQueue(o){this._removeFromStickyColumnReplayQueue(o.rows),this._stickyColumnsReplayTimeout||this._updatedStickyColumnsParamsToReplay.push(o)}_removeFromStickyColumnReplayQueue(o){let e=new Set(o);for(let t of this._updatedStickyColumnsParamsToReplay)t.rows=t.rows.filter(i=>!e.has(i));this._updatedStickyColumnsParamsToReplay=this._updatedStickyColumnsParamsToReplay.filter(t=>!!t.rows.length)}_updateCachedSizes(o){let e=!1;for(let t of o){let i=t.borderBoxSize?.length?{width:t.borderBoxSize[0].inlineSize,height:t.borderBoxSize[0].blockSize}:{width:t.contentRect.width,height:t.contentRect.height};i.width!==this._elemSizeCache.get(t.target)?.width&&zt(t.target)&&(e=!0),this._elemSizeCache.set(t.target,i)}e&&this._updatedStickyColumnsParamsToReplay.length&&(this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._stickyColumnsReplayTimeout=setTimeout(()=>{if(!this._destroyed){for(let t of this._updatedStickyColumnsParamsToReplay)this.updateStickyColumns(t.rows,t.stickyStartStates,t.stickyEndStates,!0,!1);this._updatedStickyColumnsParamsToReplay=[],this._stickyColumnsReplayTimeout=null}},0))}};function zt(n){return["cdk-cell","cdk-header-cell","cdk-footer-cell"].some(o=>n.classList.contains(o))}var ae=new Z("STICKY_POSITIONING_LISTENER");var xe=(()=>{class n{viewContainer=l(W);elementRef=l(A);constructor(){let e=l(M);e._rowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["","rowOutlet",""]]})}return n})(),Te=(()=>{class n{viewContainer=l(W);elementRef=l(A);constructor(){let e=l(M);e._headerRowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["","headerRowOutlet",""]]})}return n})(),Me=(()=>{class n{viewContainer=l(W);elementRef=l(A);constructor(){let e=l(M);e._footerRowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["","footerRowOutlet",""]]})}return n})(),Fe=(()=>{class n{viewContainer=l(W);elementRef=l(A);constructor(){let e=l(M);e._noDataRowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||n)};static \u0275dir=u({type:n,selectors:[["","noDataRowOutlet",""]]})}return n})(),Ie=(()=>{class n{_differs=l(X);_changeDetectorRef=l(he);_elementRef=l(A);_dir=l(tt,{optional:!0});_platform=l(Ye);_viewRepeater;_viewportRuler=l(rt);_injector=l(Ve);_virtualScrollViewport=l(st,{optional:!0,host:!0});_positionListener=l(ae,{optional:!0})||l(ae,{optional:!0,skipSelf:!0});_document=l(Ue);_data;_renderedRange;_onDestroy=new F;_renderRows;_renderChangeSubscription=null;_columnDefsByName=new Map;_rowDefs;_headerRowDefs;_footerRowDefs;_dataDiffer;_defaultRowDef=null;_customColumnDefs=new Set;_customRowDefs=new Set;_customHeaderRowDefs=new Set;_customFooterRowDefs=new Set;_customNoDataRow=null;_headerRowDefChanged=!0;_footerRowDefChanged=!0;_stickyColumnStylesNeedReset=!0;_forceRecalculateCellWidths=!0;_cachedRenderRowsMap=new Map;_isNativeHtmlTable;_stickyStyler;stickyCssClass="cdk-table-sticky";needsPositionStickyOnElement=!0;_isServer;_isShowingNoDataRow=!1;_hasAllOutlets=!1;_hasInitialized=!1;_headerRowStickyUpdates=new F;_footerRowStickyUpdates=new F;_disableVirtualScrolling=!1;_getCellRole(){if(this._cellRoleInternal===void 0){let e=this._elementRef.nativeElement.getAttribute("role");return e==="grid"||e==="treegrid"?"gridcell":"cell"}return this._cellRoleInternal}_cellRoleInternal=void 0;get trackBy(){return this._trackByFn}set trackBy(e){this._trackByFn=e}_trackByFn;get dataSource(){return this._dataSource}set dataSource(e){this._dataSource!==e&&(this._switchDataSource(e),this._changeDetectorRef.markForCheck())}_dataSource;_dataSourceChanges=new F;_dataStream=new F;get multiTemplateDataRows(){return this._multiTemplateDataRows}set multiTemplateDataRows(e){this._multiTemplateDataRows=e,this._rowOutlet&&this._rowOutlet.viewContainer.length&&(this._forceRenderDataRows(),this.updateStickyColumnStyles())}_multiTemplateDataRows=!1;get fixedLayout(){return this._virtualScrollEnabled()?!0:this._fixedLayout}set fixedLayout(e){this._fixedLayout=e,this._forceRecalculateCellWidths=!0,this._stickyColumnStylesNeedReset=!0}_fixedLayout=!1;recycleRows=!1;contentChanged=new le;viewChange=new U({start:0,end:Number.MAX_VALUE});_rowOutlet;_headerRowOutlet;_footerRowOutlet;_noDataRowOutlet;_contentColumnDefs;_contentRowDefs;_contentHeaderRowDefs;_contentFooterRowDefs;_noDataRow;constructor(){l(new Xe("role"),{optional:!0})||this._elementRef.nativeElement.setAttribute("role","table"),this._isServer=!this._platform.isBrowser,this._isNativeHtmlTable=this._elementRef.nativeElement.nodeName==="TABLE",this._dataDiffer=this._differs.find([]).create((t,i)=>this.trackBy?this.trackBy(i.dataIndex,i.data):i)}ngOnInit(){this._setupStickyStyler(),this._viewportRuler.change().pipe(B(this._onDestroy)).subscribe(()=>{this._forceRecalculateCellWidths=!0})}ngAfterContentInit(){this._viewRepeater=this.recycleRows||this._virtualScrollEnabled()?new at:new ut,this._virtualScrollEnabled()&&this._setupVirtualScrolling(this._virtualScrollViewport),this._hasInitialized=!0}ngAfterContentChecked(){this._canRender()&&this._render()}ngOnDestroy(){this._stickyStyler?.destroy(),[this._rowOutlet?.viewContainer,this._headerRowOutlet?.viewContainer,this._footerRowOutlet?.viewContainer,this._cachedRenderRowsMap,this._customColumnDefs,this._customRowDefs,this._customHeaderRowDefs,this._customFooterRowDefs,this._columnDefsByName].forEach(e=>{e?.clear()}),this._headerRowDefs=[],this._footerRowDefs=[],this._defaultRowDef=null,this._headerRowStickyUpdates.complete(),this._footerRowStickyUpdates.complete(),this._onDestroy.next(),this._onDestroy.complete(),me(this.dataSource)&&this.dataSource.disconnect(this)}renderRows(){this._renderRows=this._getAllRenderRows();let e=this._dataDiffer.diff(this._renderRows);if(!e){this._updateNoDataRow(),this.contentChanged.next();return}let t=this._rowOutlet.viewContainer;this._viewRepeater.applyChanges(e,t,(i,a,r)=>this._getEmbeddedViewArgs(i.item,r),i=>i.item.data,i=>{i.operation===ot.INSERTED&&i.context&&this._renderCellTemplateForItem(i.record.item.rowDef,i.context)}),this._updateRowIndexContext(),e.forEachIdentityChange(i=>{let a=t.get(i.currentIndex);a.context.$implicit=i.item.data}),this._updateNoDataRow(),this.contentChanged.next(),this.updateStickyColumnStyles()}addColumnDef(e){this._customColumnDefs.add(e)}removeColumnDef(e){this._customColumnDefs.delete(e)}addRowDef(e){this._customRowDefs.add(e)}removeRowDef(e){this._customRowDefs.delete(e)}addHeaderRowDef(e){this._customHeaderRowDefs.add(e),this._headerRowDefChanged=!0}removeHeaderRowDef(e){this._customHeaderRowDefs.delete(e),this._headerRowDefChanged=!0}addFooterRowDef(e){this._customFooterRowDefs.add(e),this._footerRowDefChanged=!0}removeFooterRowDef(e){this._customFooterRowDefs.delete(e),this._footerRowDefChanged=!0}setNoDataRow(e){this._customNoDataRow=e}updateStickyHeaderRowStyles(){let e=this._getRenderedRows(this._headerRowOutlet);if(this._isNativeHtmlTable){let i=yt(this._headerRowOutlet,"thead");i&&(i.style.display=e.length?"":"none")}let t=this._headerRowDefs.map(i=>i.sticky);this._stickyStyler.clearStickyPositioning(e,["top"]),this._stickyStyler.stickRows(e,t,"top"),this._headerRowDefs.forEach(i=>i.resetStickyChanged())}updateStickyFooterRowStyles(){let e=this._getRenderedRows(this._footerRowOutlet);if(this._isNativeHtmlTable){let i=yt(this._footerRowOutlet,"tfoot");i&&(i.style.display=e.length?"":"none")}let t=this._footerRowDefs.map(i=>i.sticky);this._stickyStyler.clearStickyPositioning(e,["bottom"]),this._stickyStyler.stickRows(e,t,"bottom"),this._stickyStyler.updateStickyFooterContainer(this._elementRef.nativeElement,t),this._footerRowDefs.forEach(i=>i.resetStickyChanged())}updateStickyColumnStyles(){let e=this._getRenderedRows(this._headerRowOutlet),t=this._getRenderedRows(this._rowOutlet),i=this._getRenderedRows(this._footerRowOutlet);(this._isNativeHtmlTable&&!this.fixedLayout||this._stickyColumnStylesNeedReset)&&(this._stickyStyler.clearStickyPositioning([...e,...t,...i],["left","right"]),this._stickyColumnStylesNeedReset=!1),e.forEach((a,r)=>{this._addStickyColumnStyles([a],this._headerRowDefs[r])}),this._rowDefs.forEach(a=>{let r=[];for(let s=0;s<t.length;s++)this._renderRows[s].rowDef===a&&r.push(t[s]);this._addStickyColumnStyles(r,a)}),i.forEach((a,r)=>{this._addStickyColumnStyles([a],this._footerRowDefs[r])}),Array.from(this._columnDefsByName.values()).forEach(a=>a.resetStickyChanged())}stickyColumnsUpdated(e){this._positionListener?.stickyColumnsUpdated(e)}stickyEndColumnsUpdated(e){this._positionListener?.stickyEndColumnsUpdated(e)}stickyHeaderRowsUpdated(e){this._headerRowStickyUpdates.next(e),this._positionListener?.stickyHeaderRowsUpdated(e)}stickyFooterRowsUpdated(e){this._footerRowStickyUpdates.next(e),this._positionListener?.stickyFooterRowsUpdated(e)}_outletAssigned(){!this._hasAllOutlets&&this._rowOutlet&&this._headerRowOutlet&&this._footerRowOutlet&&this._noDataRowOutlet&&(this._hasAllOutlets=!0,this._canRender()&&this._render())}_canRender(){return this._hasAllOutlets&&this._hasInitialized}_render(){this._cacheRowDefs(),this._cacheColumnDefs(),!this._headerRowDefs.length&&!this._footerRowDefs.length&&this._rowDefs.length;let t=this._renderUpdatedColumns()||this._headerRowDefChanged||this._footerRowDefChanged;this._stickyColumnStylesNeedReset=this._stickyColumnStylesNeedReset||t,this._forceRecalculateCellWidths=t,this._headerRowDefChanged&&(this._forceRenderHeaderRows(),this._headerRowDefChanged=!1),this._footerRowDefChanged&&(this._forceRenderFooterRows(),this._footerRowDefChanged=!1),this.dataSource&&this._rowDefs.length>0&&!this._renderChangeSubscription?this._observeRenderChanges():this._stickyColumnStylesNeedReset&&this.updateStickyColumnStyles(),this._checkStickyStates()}_getAllRenderRows(){if(!Array.isArray(this._data)||!this._renderedRange)return[];let e=[],t=Math.min(this._data.length,this._renderedRange.end),i=this._cachedRenderRowsMap;this._cachedRenderRowsMap=new Map;for(let a=this._renderedRange.start;a<t;a++){let r=this._data[a],s=this._getRenderRowsForData(r,a,i.get(r));this._cachedRenderRowsMap.has(r)||this._cachedRenderRowsMap.set(r,new WeakMap);for(let c=0;c<s.length;c++){let d=s[c],h=this._cachedRenderRowsMap.get(d.data);h.has(d.rowDef)?h.get(d.rowDef).push(d):h.set(d.rowDef,[d]),e.push(d)}}return e}_getRenderRowsForData(e,t,i){return this._getRowDefs(e,t).map(r=>{let s=i&&i.has(r)?i.get(r):[];if(s.length){let c=s.shift();return c.dataIndex=t,c}else return{data:e,rowDef:r,dataIndex:t}})}_cacheColumnDefs(){this._columnDefsByName.clear(),pe(this._getOwnDefs(this._contentColumnDefs),this._customColumnDefs).forEach(t=>{this._columnDefsByName.has(t.name),this._columnDefsByName.set(t.name,t)})}_cacheRowDefs(){this._headerRowDefs=pe(this._getOwnDefs(this._contentHeaderRowDefs),this._customHeaderRowDefs),this._footerRowDefs=pe(this._getOwnDefs(this._contentFooterRowDefs),this._customFooterRowDefs),this._rowDefs=pe(this._getOwnDefs(this._contentRowDefs),this._customRowDefs);let e=this._rowDefs.filter(t=>!t.when);this._defaultRowDef=e[0]}_renderUpdatedColumns(){let e=(r,s)=>{let c=!!s.getColumnsDiff();return r||c},t=this._rowDefs.reduce(e,!1);t&&this._forceRenderDataRows();let i=this._headerRowDefs.reduce(e,!1);i&&this._forceRenderHeaderRows();let a=this._footerRowDefs.reduce(e,!1);return a&&this._forceRenderFooterRows(),t||i||a}_switchDataSource(e){this._data=[],me(this.dataSource)&&this.dataSource.disconnect(this),this._renderChangeSubscription&&(this._renderChangeSubscription.unsubscribe(),this._renderChangeSubscription=null),e||(this._dataDiffer&&this._dataDiffer.diff([]),this._rowOutlet&&this._rowOutlet.viewContainer.clear()),this._dataSource=e}_observeRenderChanges(){if(!this.dataSource)return;let e;me(this.dataSource)?e=this.dataSource.connect(this):Le(this.dataSource)?e=this.dataSource:Array.isArray(this.dataSource)&&(e=Q(this.dataSource)),this._renderChangeSubscription=N([e,this.viewChange]).pipe(B(this._onDestroy)).subscribe(([t,i])=>{this._data=t||[],this._renderedRange=i,this._dataStream.next(t),this.renderRows()})}_forceRenderHeaderRows(){this._headerRowOutlet.viewContainer.length>0&&this._headerRowOutlet.viewContainer.clear(),this._headerRowDefs.forEach((e,t)=>this._renderRow(this._headerRowOutlet,e,t)),this.updateStickyHeaderRowStyles()}_forceRenderFooterRows(){this._footerRowOutlet.viewContainer.length>0&&this._footerRowOutlet.viewContainer.clear(),this._footerRowDefs.forEach((e,t)=>this._renderRow(this._footerRowOutlet,e,t)),this.updateStickyFooterRowStyles()}_addStickyColumnStyles(e,t){let i=Array.from(t?.columns||[]).map(s=>{let c=this._columnDefsByName.get(s);return c}),a=i.map(s=>s.sticky),r=i.map(s=>s.stickyEnd);this._stickyStyler.updateStickyColumns(e,a,r,!this.fixedLayout||this._forceRecalculateCellWidths)}_getRenderedRows(e){let t=[];for(let i=0;i<e.viewContainer.length;i++){let a=e.viewContainer.get(i);t.push(a.rootNodes[0])}return t}_getRowDefs(e,t){if(this._rowDefs.length===1)return[this._rowDefs[0]];let i=[];if(this.multiTemplateDataRows)i=this._rowDefs.filter(a=>!a.when||a.when(t,e));else{let a=this._rowDefs.find(r=>r.when&&r.when(t,e))||this._defaultRowDef;a&&i.push(a)}return i.length,i}_getEmbeddedViewArgs(e,t){let i=e.rowDef,a={$implicit:e.data};return{templateRef:i.template,context:a,index:t}}_renderRow(e,t,i,a={}){let r=e.viewContainer.createEmbeddedView(t.template,a,i);return this._renderCellTemplateForItem(t,a),r}_renderCellTemplateForItem(e,t){for(let i of this._getCellTemplates(e))V.mostRecentCellOutlet&&V.mostRecentCellOutlet._viewContainer.createEmbeddedView(i,t);this._changeDetectorRef.markForCheck()}_updateRowIndexContext(){let e=this._rowOutlet.viewContainer;for(let t=0,i=e.length;t<i;t++){let r=e.get(t).context;r.count=i,r.first=t===0,r.last=t===i-1,r.even=t%2===0,r.odd=!r.even,this.multiTemplateDataRows?(r.dataIndex=this._renderRows[t].dataIndex,r.renderIndex=t):r.index=this._renderRows[t].dataIndex}}_getCellTemplates(e){return!e||!e.columns?[]:Array.from(e.columns,t=>{let i=this._columnDefsByName.get(t);return e.extractCellTemplate(i)})}_forceRenderDataRows(){this._dataDiffer.diff([]),this._rowOutlet.viewContainer.clear(),this.renderRows()}_checkStickyStates(){let e=(t,i)=>t||i.hasStickyChanged();this._headerRowDefs.reduce(e,!1)&&this.updateStickyHeaderRowStyles(),this._footerRowDefs.reduce(e,!1)&&this.updateStickyFooterRowStyles(),Array.from(this._columnDefsByName.values()).reduce(e,!1)&&(this._stickyColumnStylesNeedReset=!0,this.updateStickyColumnStyles())}_setupStickyStyler(){let e=this._dir?this._dir.value:"ltr",t=this._injector;this._stickyStyler=new De(this._isNativeHtmlTable,this.stickyCssClass,this._platform.isBrowser,this.needsPositionStickyOnElement,e,this,t),(this._dir?this._dir.change:Q()).pipe(B(this._onDestroy)).subscribe(i=>{this._stickyStyler.direction=i,this.updateStickyColumnStyles()})}_setupVirtualScrolling(e){let t=typeof requestAnimationFrame<"u"?Ae:Ne;this.viewChange.next({start:0,end:0}),e.renderedRangeStream.pipe(Be(0,t),B(this._onDestroy)).subscribe(this.viewChange),e.attach({dataStream:this._dataStream,measureRangeSize:(i,a)=>this._measureRangeSize(i,a)}),N([e.renderedContentOffset,this._headerRowStickyUpdates]).pipe(B(this._onDestroy)).subscribe(([i,a])=>{if(!(!a.sizes||!a.offsets||!a.elements))for(let r=0;r<a.elements.length;r++){let s=a.elements[r];if(s){let c=a.offsets[r],d=i!==0?Math.max(i-c,c):-c;for(let h of s)h.style.top=`${-d}px`}}}),N([e.renderedContentOffset,this._footerRowStickyUpdates]).pipe(B(this._onDestroy)).subscribe(([i,a])=>{if(!(!a.sizes||!a.offsets||!a.elements))for(let r=0;r<a.elements.length;r++){let s=a.elements[r];if(s)for(let c of s)c.style.bottom=`${i+a.offsets[r]}px`}})}_getOwnDefs(e){return e.filter(t=>!t._table||t._table===this)}_updateNoDataRow(){let e=this._customNoDataRow||this._noDataRow;if(!e)return;let t=this._rowOutlet.viewContainer.length===0;if(t===this._isShowingNoDataRow)return;let i=this._noDataRowOutlet.viewContainer;if(t){let a=i.createEmbeddedView(e.templateRef),r=a.rootNodes[0];if(a.rootNodes.length===1&&r?.nodeType===this._document.ELEMENT_NODE){r.setAttribute("role","row"),r.classList.add(...e._contentClassNames);let s=r.querySelectorAll(e._cellSelector);for(let c=0;c<s.length;c++)s[c].classList.add(...e._cellClassNames)}}else i.clear();this._isShowingNoDataRow=t,this._changeDetectorRef.markForCheck()}_measureRangeSize(e,t){if(e.start>=e.end||t!=="vertical")return 0;let i=this.viewChange.value,a=this._rowOutlet.viewContainer;e.start<i.start||e.end>i.end;let r=e.start-i.start,s=e.end-e.start,c,d;for(let _=0;_<s;_++){let y=a.get(_+r);if(y&&y.rootNodes.length){c=d=y.rootNodes[0];break}}for(let _=s-1;_>-1;_--){let y=a.get(_+r);if(y&&y.rootNodes.length){d=y.rootNodes[y.rootNodes.length-1];break}}let h=c?.getBoundingClientRect?.(),g=d?.getBoundingClientRect?.();return h&&g?g.bottom-h.top:0}_virtualScrollEnabled(){return!this._disableVirtualScrolling&&this._virtualScrollViewport!=null}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=I({type:n,selectors:[["cdk-table"],["table","cdk-table",""]],contentQueries:function(t,i,a){if(t&1&&ve(a,bt,5)(a,Y,5)(a,we,5)(a,re,5)(a,Re,5),t&2){let r;P(r=z())&&(i._noDataRow=r.first),P(r=z())&&(i._contentColumnDefs=r),P(r=z())&&(i._contentRowDefs=r),P(r=z())&&(i._contentHeaderRowDefs=r),P(r=z())&&(i._contentFooterRowDefs=r)}},hostAttrs:[1,"cdk-table"],hostVars:2,hostBindings:function(t,i){t&2&&fe("cdk-table-fixed-layout",i.fixedLayout)},inputs:{trackBy:"trackBy",dataSource:"dataSource",multiTemplateDataRows:[2,"multiTemplateDataRows","multiTemplateDataRows",v],fixedLayout:[2,"fixedLayout","fixedLayout",v],recycleRows:[2,"recycleRows","recycleRows",v]},outputs:{contentChanged:"contentChanged"},exportAs:["cdkTable"],features:[T([{provide:M,useExisting:n},{provide:ae,useValue:null}])],ngContentSelectors:It,decls:5,vars:2,consts:[["role","rowgroup"],["headerRowOutlet",""],["rowOutlet",""],["noDataRowOutlet",""],["footerRowOutlet",""]],template:function(t,i){t&1&&(ue(Ft),L(0),L(1,1),b(2,Ot,1,0),b(3,Et,7,0)(4,Pt,4,0)),t&2&&(m(2),R(i._isServer?2:-1),m(),R(i._isNativeHtmlTable?3:4))},dependencies:[Te,xe,Fe,Me],styles:[`.cdk-table-fixed-layout {
  table-layout: fixed;
}
`],encapsulation:2})}return n})();function pe(n,o){return n.concat(Array.from(o))}function yt(n,o){let e=o.toUpperCase(),t=n.viewContainer.element.nativeElement;for(;t;){let i=t.nodeType===1?t.nodeName:null;if(i===e)return t;if(i==="TABLE")break;t=t.parentNode}return null}var Rt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=q({type:n});static \u0275inj=$({imports:[lt]})}return n})();var Nt=[[["caption"]],[["colgroup"],["col"]],"*"],At=["caption","colgroup, col","*"];function Lt(n,o){n&1&&L(0,2)}function Bt(n,o){n&1&&(f(0,"thead",0),C(1,1),p(),f(2,"tbody",2),C(3,3)(4,4),p(),f(5,"tfoot",0),C(6,5),p())}function Ht(n,o){n&1&&C(0,1)(1,3)(2,4)(3,5)}var zi=(()=>{class n extends Ie{stickyCssClass="mat-mdc-table-sticky";needsPositionStickyOnElement=!1;static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(n)))(i||n)}})();static \u0275cmp=I({type:n,selectors:[["mat-table"],["table","mat-table",""]],hostAttrs:[1,"mat-mdc-table","mdc-data-table__table"],hostVars:2,hostBindings:function(t,i){t&2&&fe("mat-table-fixed-layout",i.fixedLayout)},exportAs:["matTable"],features:[T([{provide:Ie,useExisting:n},{provide:M,useExisting:n},{provide:ae,useValue:null}]),w],ngContentSelectors:At,decls:5,vars:2,consts:[["role","rowgroup"],["headerRowOutlet",""],["role","rowgroup",1,"mdc-data-table__content"],["rowOutlet",""],["noDataRowOutlet",""],["footerRowOutlet",""]],template:function(t,i){t&1&&(ue(Nt),L(0),L(1,1),b(2,Lt,1,0),b(3,Bt,7,0)(4,Ht,4,0)),t&2&&(m(2),R(i._isServer?2:-1),m(),R(i._isNativeHtmlTable?3:4))},dependencies:[Te,xe,Fe,Me],styles:[`.mat-mdc-table-sticky {
  position: sticky !important;
}

mat-table {
  display: block;
}

mat-header-row {
  min-height: var(--mat-table-header-container-height, 56px);
}

mat-row {
  min-height: var(--mat-table-row-item-container-height, 52px);
}

mat-footer-row {
  min-height: var(--mat-table-footer-container-height, 52px);
}

mat-row, mat-header-row, mat-footer-row {
  display: flex;
  border-width: 0;
  border-bottom-width: 1px;
  border-style: solid;
  align-items: center;
  box-sizing: border-box;
}

mat-cell:first-of-type, mat-header-cell:first-of-type, mat-footer-cell:first-of-type {
  padding-left: 24px;
}
[dir=rtl] mat-cell:first-of-type:not(:only-of-type), [dir=rtl] mat-header-cell:first-of-type:not(:only-of-type), [dir=rtl] mat-footer-cell:first-of-type:not(:only-of-type) {
  padding-left: 0;
  padding-right: 24px;
}
mat-cell:last-of-type, mat-header-cell:last-of-type, mat-footer-cell:last-of-type {
  padding-right: 24px;
}
[dir=rtl] mat-cell:last-of-type:not(:only-of-type), [dir=rtl] mat-header-cell:last-of-type:not(:only-of-type), [dir=rtl] mat-footer-cell:last-of-type:not(:only-of-type) {
  padding-right: 0;
  padding-left: 24px;
}

mat-cell, mat-header-cell, mat-footer-cell {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  word-wrap: break-word;
  min-height: inherit;
}

.mat-mdc-table {
  min-width: 100%;
  border: 0;
  border-spacing: 0;
  table-layout: auto;
  white-space: normal;
  background-color: var(--mat-table-background-color, var(--mat-sys-surface));
}

.mat-table-fixed-layout {
  table-layout: fixed;
}

.mdc-data-table__cell {
  box-sizing: border-box;
  overflow: hidden;
  text-align: start;
  text-overflow: ellipsis;
}

.mdc-data-table__cell,
.mdc-data-table__header-cell {
  padding: 0 16px;
}

.mat-mdc-header-row {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  height: var(--mat-table-header-container-height, 56px);
  color: var(--mat-table-header-headline-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--mat-table-header-headline-font, var(--mat-sys-title-small-font, Roboto, sans-serif));
  line-height: var(--mat-table-header-headline-line-height, var(--mat-sys-title-small-line-height));
  font-size: var(--mat-table-header-headline-size, var(--mat-sys-title-small-size, 14px));
  font-weight: var(--mat-table-header-headline-weight, var(--mat-sys-title-small-weight, 500));
}

.mat-mdc-row {
  height: var(--mat-table-row-item-container-height, 52px);
  color: var(--mat-table-row-item-label-text-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
}

.mat-mdc-row,
.mdc-data-table__content {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-table-row-item-label-text-font, var(--mat-sys-body-medium-font, Roboto, sans-serif));
  line-height: var(--mat-table-row-item-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-table-row-item-label-text-size, var(--mat-sys-body-medium-size, 14px));
  font-weight: var(--mat-table-row-item-label-text-weight, var(--mat-sys-body-medium-weight));
}

.mat-mdc-footer-row {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  height: var(--mat-table-footer-container-height, 52px);
  color: var(--mat-table-row-item-label-text-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--mat-table-footer-supporting-text-font, var(--mat-sys-body-medium-font, Roboto, sans-serif));
  line-height: var(--mat-table-footer-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-table-footer-supporting-text-size, var(--mat-sys-body-medium-size, 14px));
  font-weight: var(--mat-table-footer-supporting-text-weight, var(--mat-sys-body-medium-weight));
  letter-spacing: var(--mat-table-footer-supporting-text-tracking, var(--mat-sys-body-medium-tracking));
}

.mat-mdc-header-cell {
  border-bottom-color: var(--mat-table-row-item-outline-color, var(--mat-sys-outline, rgba(0, 0, 0, 0.12)));
  border-bottom-width: var(--mat-table-row-item-outline-width, 1px);
  border-bottom-style: solid;
  letter-spacing: var(--mat-table-header-headline-tracking, var(--mat-sys-title-small-tracking));
  font-weight: inherit;
  line-height: inherit;
  box-sizing: border-box;
  text-overflow: ellipsis;
  overflow: hidden;
  outline: none;
  text-align: start;
}
.mdc-data-table__row:last-child > .mat-mdc-header-cell {
  border-bottom: none;
}

.mat-mdc-cell {
  border-bottom-color: var(--mat-table-row-item-outline-color, var(--mat-sys-outline, rgba(0, 0, 0, 0.12)));
  border-bottom-width: var(--mat-table-row-item-outline-width, 1px);
  border-bottom-style: solid;
  letter-spacing: var(--mat-table-row-item-label-text-tracking, var(--mat-sys-body-medium-tracking));
  line-height: inherit;
}
.mdc-data-table__row:last-child > .mat-mdc-cell {
  border-bottom: none;
}

.mat-mdc-footer-cell {
  letter-spacing: var(--mat-table-row-item-label-text-tracking, var(--mat-sys-body-medium-tracking));
}

mat-row.mat-mdc-row,
mat-header-row.mat-mdc-header-row,
mat-footer-row.mat-mdc-footer-row {
  border-bottom: none;
}

.mat-mdc-table tbody,
.mat-mdc-table tfoot,
.mat-mdc-table thead,
.mat-mdc-cell,
.mat-mdc-footer-cell,
.mat-mdc-header-row,
.mat-mdc-row,
.mat-mdc-footer-row,
.mat-mdc-table .mat-mdc-header-cell {
  background: inherit;
}

.mat-mdc-table mat-header-row.mat-mdc-header-row,
.mat-mdc-table mat-row.mat-mdc-row,
.mat-mdc-table mat-footer-row.mat-mdc-footer-cell {
  height: unset;
}

mat-header-cell.mat-mdc-header-cell,
mat-cell.mat-mdc-cell,
mat-footer-cell.mat-mdc-footer-cell {
  align-self: stretch;
}
`],encapsulation:2})}return n})(),Ni=(()=>{class n extends _e{static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(n)))(i||n)}})();static \u0275dir=u({type:n,selectors:[["","matCellDef",""]],features:[T([{provide:_e,useExisting:n}]),w]})}return n})(),Ai=(()=>{class n extends ye{static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(n)))(i||n)}})();static \u0275dir=u({type:n,selectors:[["","matHeaderCellDef",""]],features:[T([{provide:ye,useExisting:n}]),w]})}return n})();var Li=(()=>{class n extends Y{get name(){return this._name}set name(e){this._setNameInput(e)}_updateColumnCssClassName(){super._updateColumnCssClassName(),this._columnCssClassName.push(`mat-column-${this.cssClassFriendlyName}`)}static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(n)))(i||n)}})();static \u0275dir=u({type:n,selectors:[["","matColumnDef",""]],inputs:{name:[0,"matColumnDef","name"]},features:[T([{provide:Y,useExisting:n}]),w]})}return n})(),Bi=(()=>{class n extends vt{static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(n)))(i||n)}})();static \u0275dir=u({type:n,selectors:[["mat-header-cell"],["th","mat-header-cell",""]],hostAttrs:["role","columnheader",1,"mat-mdc-header-cell","mdc-data-table__header-cell"],features:[w]})}return n})();var Hi=(()=>{class n extends Dt{static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(n)))(i||n)}})();static \u0275dir=u({type:n,selectors:[["mat-cell"],["td","mat-cell",""]],hostAttrs:[1,"mat-mdc-cell","mdc-data-table__cell"],features:[w]})}return n})();var ji=(()=>{class n extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(n)))(i||n)}})();static \u0275dir=u({type:n,selectors:[["","matHeaderRowDef",""]],inputs:{columns:[0,"matHeaderRowDef","columns"],sticky:[2,"matHeaderRowDefSticky","sticky",v]},features:[T([{provide:re,useExisting:n}]),w]})}return n})();var Vi=(()=>{class n extends we{static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(n)))(i||n)}})();static \u0275dir=u({type:n,selectors:[["","matRowDef",""]],inputs:{columns:[0,"matRowDefColumns","columns"],when:[0,"matRowDefWhen","when"]},features:[T([{provide:we,useExisting:n}]),w]})}return n})(),Ui=(()=>{class n extends ke{static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(n)))(i||n)}})();static \u0275cmp=I({type:n,selectors:[["mat-header-row"],["tr","mat-header-row",""]],hostAttrs:["role","row",1,"mat-mdc-header-row","mdc-data-table__header-row"],exportAs:["matHeaderRow"],features:[T([{provide:ke,useExisting:n}]),w],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,i){t&1&&C(0,0)},dependencies:[V],encapsulation:2})}return n})();var Qi=(()=>{class n extends Se{static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(n)))(i||n)}})();static \u0275cmp=I({type:n,selectors:[["mat-row"],["tr","mat-row",""]],hostAttrs:["role","row",1,"mat-mdc-row","mdc-data-table__row"],exportAs:["matRow"],features:[T([{provide:Se,useExisting:n}]),w],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,i){t&1&&C(0,0)},dependencies:[V],encapsulation:2})}return n})();var $i=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=q({type:n});static \u0275inj=$({imports:[Rt,it]})}return n})(),jt=9007199254740991,kt=class extends nt{_data;_renderData=new U([]);_filter=new U("");_internalPageChanges=new F;_renderChangesSubscription=null;filteredData;get data(){return this._data.value}set data(o){o=Array.isArray(o)?o:[],this._data.next(o),this._renderChangesSubscription||this._filterData(o)}get filter(){return this._filter.value}set filter(o){this._filter.next(o),this._renderChangesSubscription||this._filterData(this.data)}get sort(){return this._sort}set sort(o){this._sort=o,this._updateChangeSubscription()}_sort;get paginator(){return this._paginator}set paginator(o){this._paginator=o,this._updateChangeSubscription()}_paginator;sortingDataAccessor=(o,e)=>{let t=o[e];if(Ze(t)){let i=Number(t);return i<jt?i:t}return t};sortData=(o,e)=>{let t=e.active,i=e.direction;return!t||i==""?o:o.sort((a,r)=>{let s=this.sortingDataAccessor(a,t),c=this.sortingDataAccessor(r,t),d=typeof s,h=typeof c;d!==h&&(d==="number"&&(s+=""),h==="number"&&(c+=""));let g=0;return s!=null&&c!=null?s>c?g=1:s<c&&(g=-1):s!=null?g=1:c!=null&&(g=-1),g*(i=="asc"?1:-1)})};filterPredicate=(o,e)=>{let t=e.trim().toLowerCase();return Object.values(o).some(i=>`${i}`.toLowerCase().includes(t))};constructor(o=[]){super(),this._data=new U(o),this._updateChangeSubscription()}_updateChangeSubscription(){let o=this._sort?Ce(this._sort.sortChange,this._sort.initialized):Q(null),e=this._paginator?Ce(this._paginator.page,this._internalPageChanges,this._paginator.initialized):Q(null),t=this._data,i=N([t,this._filter]).pipe(se(([s])=>this._filterData(s))),a=N([i,o]).pipe(se(([s])=>this._orderData(s))),r=N([a,e]).pipe(se(([s])=>this._pageData(s)));this._renderChangesSubscription?.unsubscribe(),this._renderChangesSubscription=r.subscribe(s=>this._renderData.next(s))}_filterData(o){return this.filteredData=this.filter==null||this.filter===""?o:o.filter(e=>this.filterPredicate(e,this.filter)),this.paginator&&this._updatePaginator(this.filteredData.length),this.filteredData}_orderData(o){return this.sort?this.sortData(o.slice(),this.sort):o}_pageData(o){if(!this.paginator)return o;let e=this.paginator.pageIndex*this.paginator.pageSize;return o.slice(e,e+this.paginator.pageSize)}_updatePaginator(o){Promise.resolve().then(()=>{let e=this.paginator;if(e&&(e.length=o,e.pageIndex>0)){let t=Math.ceil(e.length/e.pageSize)-1||0,i=Math.min(e.pageIndex,t);i!==e.pageIndex&&(e.pageIndex=i,this._internalPageChanges.next())}})}connect(){return this._renderChangesSubscription||this._updateChangeSubscription(),this._renderData}disconnect(){this._renderChangesSubscription?.unsubscribe(),this._renderChangesSubscription=null}};function Vt(n,o){if(n&1&&(f(0,"mat-option",17),j(1),p()),n&2){let e=o.$implicit;E("value",e),m(),K(" ",e," ")}}function Ut(n,o){if(n&1){let e=de();f(0,"mat-form-field",14)(1,"mat-select",16,0),H("selectionChange",function(i){J(e);let a=x(2);return ee(a._changePageSize(i.value))}),We(3,Vt,2,2,"mat-option",17,$e),p(),f(5,"div",18),H("click",function(){J(e);let i=Ge(2);return ee(i.open())}),p()()}if(n&2){let e=x(2);E("appearance",e._formFieldAppearance)("color",e.color),m(),E("value",e.pageSize)("disabled",e.disabled),Qe("aria-labelledby",e._pageSizeLabelId),E("panelClass",e.selectConfig.panelClass||"")("disableOptionCentering",e.selectConfig.disableOptionCentering),m(2),qe(e._displayedPageSizeOptions)}}function Qt(n,o){if(n&1&&(f(0,"div",15),j(1),p()),n&2){let e=x(2);m(),Ke(e.pageSize)}}function $t(n,o){if(n&1&&(f(0,"div",3)(1,"div",13),j(2),p(),b(3,Ut,6,7,"mat-form-field",14),b(4,Qt,2,1,"div",15),p()),n&2){let e=x();m(),G("id",e._pageSizeLabelId),m(),K(" ",e._intl.itemsPerPageLabel," "),m(),R(e._displayedPageSizeOptions.length>1?3:-1),m(),R(e._displayedPageSizeOptions.length<=1?4:-1)}}function Wt(n,o){if(n&1){let e=de();f(0,"button",19),H("click",function(){J(e);let i=x();return ee(i._buttonClicked(0,i._previousButtonsDisabled()))}),te(),f(1,"svg",8),ne(2,"path",20),p()()}if(n&2){let e=x();E("matTooltip",e._intl.firstPageLabel)("matTooltipDisabled",e._previousButtonsDisabled())("disabled",e._previousButtonsDisabled())("tabindex",e._previousButtonsDisabled()?-1:null),G("aria-label",e._intl.firstPageLabel)}}function qt(n,o){if(n&1){let e=de();f(0,"button",21),H("click",function(){J(e);let i=x();return ee(i._buttonClicked(i.getNumberOfPages()-1,i._nextButtonsDisabled()))}),te(),f(1,"svg",8),ne(2,"path",22),p()()}if(n&2){let e=x();E("matTooltip",e._intl.lastPageLabel)("matTooltipDisabled",e._nextButtonsDisabled())("disabled",e._nextButtonsDisabled())("tabindex",e._nextButtonsDisabled()?-1:null),G("aria-label",e._intl.lastPageLabel)}}var Gt=(()=>{class n{changes=new F;itemsPerPageLabel="Items per page:";nextPageLabel="Next page";previousPageLabel="Previous page";firstPageLabel="First page";lastPageLabel="Last page";getRangeLabel=(e,t,i)=>{if(i==0||t==0)return`0 of ${i}`;i=Math.max(i,0);let a=e*t,r=a<i?Math.min(a+t,i):a+t;return`${a+1} \u2013 ${r} of ${i}`};static \u0275fac=function(t){return new(t||n)};static \u0275prov=He({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Kt=50;var Xt=new Z("MAT_PAGINATOR_DEFAULT_OPTIONS"),Yt=(()=>{class n{_intl=l(Gt);_changeDetectorRef=l(he);_formFieldAppearance;_pageSizeLabelId=l(Je).getId("mat-paginator-page-size-label-");_intlChanges;_isInitialized=!1;_initializedStream=new ze(1);color;get pageIndex(){return this._pageIndex}set pageIndex(e){this._pageIndex=Math.max(e||0,0),this._changeDetectorRef.markForCheck()}_pageIndex=0;get length(){return this._length}set length(e){this._length=e||0,this._changeDetectorRef.markForCheck()}_length=0;get pageSize(){return this._pageSize}set pageSize(e){this._pageSize=Math.max(e||0,0),this._updateDisplayedPageSizeOptions()}_pageSize;get pageSizeOptions(){return this._pageSizeOptions}set pageSizeOptions(e){this._pageSizeOptions=(e||[]).map(t=>oe(t,0)),this._updateDisplayedPageSizeOptions()}_pageSizeOptions=[];hidePageSize=!1;showFirstLastButtons=!1;selectConfig={};disabled=!1;page=new le;_displayedPageSizeOptions;initialized=this._initializedStream;constructor(){let e=this._intl,t=l(Xt,{optional:!0});if(this._intlChanges=e.changes.subscribe(()=>this._changeDetectorRef.markForCheck()),t){let{pageSize:i,pageSizeOptions:a,hidePageSize:r,showFirstLastButtons:s}=t;i!=null&&(this._pageSize=i),a!=null&&(this._pageSizeOptions=a),r!=null&&(this.hidePageSize=r),s!=null&&(this.showFirstLastButtons=s)}this._formFieldAppearance=t?.formFieldAppearance||"outline"}ngOnInit(){this._isInitialized=!0,this._updateDisplayedPageSizeOptions(),this._initializedStream.next()}ngOnDestroy(){this._initializedStream.complete(),this._intlChanges.unsubscribe()}nextPage(){this.hasNextPage()&&this._navigate(this.pageIndex+1)}previousPage(){this.hasPreviousPage()&&this._navigate(this.pageIndex-1)}firstPage(){this.hasPreviousPage()&&this._navigate(0)}lastPage(){this.hasNextPage()&&this._navigate(this.getNumberOfPages()-1)}hasPreviousPage(){return this.pageIndex>=1&&this.pageSize!=0}hasNextPage(){let e=this.getNumberOfPages()-1;return this.pageIndex<e&&this.pageSize!=0}getNumberOfPages(){return this.pageSize?Math.ceil(this.length/this.pageSize):0}_changePageSize(e){let t=this.pageIndex*this.pageSize,i=this.pageIndex;this.pageIndex=Math.floor(t/e)||0,this.pageSize=e,this._emitPageEvent(i)}_nextButtonsDisabled(){return this.disabled||!this.hasNextPage()}_previousButtonsDisabled(){return this.disabled||!this.hasPreviousPage()}_updateDisplayedPageSizeOptions(){this._isInitialized&&(this.pageSize||(this._pageSize=this.pageSizeOptions.length!=0?this.pageSizeOptions[0]:Kt),this._displayedPageSizeOptions=this.pageSizeOptions.slice(),this._displayedPageSizeOptions.indexOf(this.pageSize)===-1&&this._displayedPageSizeOptions.push(this.pageSize),this._displayedPageSizeOptions.sort((e,t)=>e-t),this._changeDetectorRef.markForCheck())}_emitPageEvent(e){this.page.emit({previousPageIndex:e,pageIndex:this.pageIndex,pageSize:this.pageSize,length:this.length})}_navigate(e){let t=this.pageIndex;e!==t&&(this.pageIndex=e,this._emitPageEvent(t))}_buttonClicked(e,t){t||this._navigate(e)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=I({type:n,selectors:[["mat-paginator"]],hostAttrs:["role","group",1,"mat-mdc-paginator"],inputs:{color:"color",pageIndex:[2,"pageIndex","pageIndex",oe],length:[2,"length","length",oe],pageSize:[2,"pageSize","pageSize",oe],pageSizeOptions:"pageSizeOptions",hidePageSize:[2,"hidePageSize","hidePageSize",v],showFirstLastButtons:[2,"showFirstLastButtons","showFirstLastButtons",v],selectConfig:"selectConfig",disabled:[2,"disabled","disabled",v]},outputs:{page:"page"},exportAs:["matPaginator"],decls:14,vars:14,consts:[["selectRef",""],[1,"mat-mdc-paginator-outer-container"],[1,"mat-mdc-paginator-container"],[1,"mat-mdc-paginator-page-size"],[1,"mat-mdc-paginator-range-actions"],["aria-atomic","true","aria-live","polite","role","status",1,"mat-mdc-paginator-range-label"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-first",3,"matTooltip","matTooltipDisabled","disabled","tabindex"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-previous",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["viewBox","0 0 24 24","focusable","false","aria-hidden","true",1,"mat-mdc-paginator-icon"],["d","M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-next",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["d","M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-last",3,"matTooltip","matTooltipDisabled","disabled","tabindex"],["aria-hidden","true",1,"mat-mdc-paginator-page-size-label"],[1,"mat-mdc-paginator-page-size-select",3,"appearance","color"],[1,"mat-mdc-paginator-page-size-value"],["hideSingleSelectionIndicator","",3,"selectionChange","value","disabled","aria-labelledby","panelClass","disableOptionCentering"],[3,"value"],[1,"mat-mdc-paginator-touch-target",3,"click"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-first",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["d","M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"],["matIconButton","","type","button","matTooltipPosition","above","disabledInteractive","",1,"mat-mdc-paginator-navigation-last",3,"click","matTooltip","matTooltipDisabled","disabled","tabindex"],["d","M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"]],template:function(t,i){t&1&&(f(0,"div",1)(1,"div",2),b(2,$t,5,4,"div",3),f(3,"div",4)(4,"div",5),j(5),p(),b(6,Wt,3,5,"button",6),f(7,"button",7),H("click",function(){return i._buttonClicked(i.pageIndex-1,i._previousButtonsDisabled())}),te(),f(8,"svg",8),ne(9,"path",9),p()(),je(),f(10,"button",10),H("click",function(){return i._buttonClicked(i.pageIndex+1,i._nextButtonsDisabled())}),te(),f(11,"svg",8),ne(12,"path",11),p()(),b(13,qt,3,5,"button",12),p()()()),t&2&&(m(2),R(i.hidePageSize?-1:2),m(3),K(" ",i._intl.getRangeLabel(i.pageIndex,i.pageSize,i.length)," "),m(),R(i.showFirstLastButtons?6:-1),m(),E("matTooltip",i._intl.previousPageLabel)("matTooltipDisabled",i._previousButtonsDisabled())("disabled",i._previousButtonsDisabled())("tabindex",i._previousButtonsDisabled()?-1:null),G("aria-label",i._intl.previousPageLabel),m(3),E("matTooltip",i._intl.nextPageLabel)("matTooltipDisabled",i._nextButtonsDisabled())("disabled",i._nextButtonsDisabled())("tabindex",i._nextButtonsDisabled()?-1:null),G("aria-label",i._intl.nextPageLabel),m(3),R(i.showFirstLastButtons?13:-1))},dependencies:[mt,pt,et,ct,ft],styles:[`.mat-mdc-paginator {
  display: block;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--mat-paginator-container-text-color, var(--mat-sys-on-surface));
  background-color: var(--mat-paginator-container-background-color, var(--mat-sys-surface));
  font-family: var(--mat-paginator-container-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-paginator-container-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-paginator-container-text-size, var(--mat-sys-body-small-size));
  font-weight: var(--mat-paginator-container-text-weight, var(--mat-sys-body-small-weight));
  letter-spacing: var(--mat-paginator-container-text-tracking, var(--mat-sys-body-small-tracking));
  --mat-form-field-container-height: var(--mat-paginator-form-field-container-height, 40px);
  --mat-form-field-container-vertical-padding: var(--mat-paginator-form-field-container-vertical-padding, 8px);
}
.mat-mdc-paginator .mat-mdc-select-value {
  font-size: var(--mat-paginator-select-trigger-text-size, var(--mat-sys-body-small-size));
}
.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper {
  display: none;
}
.mat-mdc-paginator .mat-mdc-select {
  line-height: 1.5;
}

.mat-mdc-paginator-outer-container {
  display: flex;
}

.mat-mdc-paginator-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
  flex-wrap: wrap;
  width: 100%;
  min-height: var(--mat-paginator-container-size, 56px);
}

.mat-mdc-paginator-page-size {
  display: flex;
  align-items: baseline;
  margin-right: 8px;
}
[dir=rtl] .mat-mdc-paginator-page-size {
  margin-right: 0;
  margin-left: 8px;
}

.mat-mdc-paginator-page-size-label {
  margin: 0 4px;
}

.mat-mdc-paginator-page-size-select {
  margin: 0 4px;
  width: var(--mat-paginator-page-size-select-width, 84px);
}

.mat-mdc-paginator-range-label {
  margin: 0 32px 0 24px;
}

.mat-mdc-paginator-range-actions {
  display: flex;
  align-items: center;
}

.mat-mdc-paginator-icon {
  display: inline-block;
  width: 28px;
  fill: var(--mat-paginator-enabled-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon {
  fill: var(--mat-paginator-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
[dir=rtl] .mat-mdc-paginator-icon {
  transform: rotate(180deg);
}

@media (forced-colors: active) {
  .mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon,
  .mat-mdc-paginator-icon {
    fill: currentColor;
  }
  .mat-mdc-paginator-range-actions .mat-mdc-icon-button {
    outline: solid 1px;
  }
  .mat-mdc-paginator-range-actions .mat-mdc-icon-button[aria-disabled] {
    color: GrayText;
  }
}
.mat-mdc-paginator-touch-target {
  display: var(--mat-paginator-touch-target-display, block);
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--mat-paginator-page-size-select-width, 84px);
  height: var(--mat-paginator-page-size-select-touch-target-height, 48px);
  background-color: transparent;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
`],encapsulation:2,changeDetection:0})}return n})(),un=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=q({type:n});static \u0275inj=$({imports:[dt,gt,ht,Yt]})}return n})();export{Y as a,zi as b,Ni as c,Ai as d,Li as e,Bi as f,Hi as g,ji as h,Vi as i,Ui as j,Qi as k,$i as l,kt as m,Yt as n,un as o};
