import{B as It,Er as le,Jt as V$1,Nr as me,Rr as no,k as Fe,ot as Mc,ti as ro}from"./chunk--gsGYwvN.js";var M=(()=>{class s{_animationsDisabled=no();state=`unchecked`;disabled=!1;appearance=`full`;static ɵfac=function(o){return new(o||s)};static ɵcmp=Fe({type:s,selectors:[[`mat-pseudo-checkbox`]],hostAttrs:[1,`mat-pseudo-checkbox`],hostVars:12,hostBindings:function(o,i){o&2&&It(`mat-pseudo-checkbox-indeterminate`,i.state===`indeterminate`)(`mat-pseudo-checkbox-checked`,i.state===`checked`)(`mat-pseudo-checkbox-disabled`,i.disabled)(`mat-pseudo-checkbox-minimal`,i.appearance===`minimal`)(`mat-pseudo-checkbox-full`,i.appearance===`full`)(`_mat-animation-noopable`,i._animationsDisabled)},inputs:{state:`state`,disabled:`disabled`,appearance:`appearance`},decls:0,vars:0,template:function(o,i){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--%NS%mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--%NS%mat-pseudo-checkbox-full-unselected-icon-color, var(--%NS%mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--%NS%mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--%NS%mat-pseudo-checkbox-full-selected-icon-color, var(--%NS%mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-full-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2})}return s})();var T=(()=>{class s{static ɵfac=function(o){return new(o||s)};static ɵmod=me({type:s});static ɵinj=le({imports:[ro]})}return s})();var u=class{};function V(s){return s&&typeof s.connect==`function`&&!(s instanceof Mc)}var p=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new V$1;bulk={select:e=>this._select(e),deselect:e=>this._deselect(e),setSelection:e=>this._setSelection(e)};constructor(e=!1,t,o=!0,i){this._multiple=e,this._emitChanges=o,this.compareWith=i,t&&t.length&&(e?t.forEach(n=>this._markSelected(n)):this._markSelected(t[0]),this._selectedToEmit.length=0)}select(...e){return this._select(e)}deselect(...e){return this._deselect(e)}setSelection(...e){return this._setSelection(e)}toggle(e){return this.isSelected(e)?this.deselect(e):this.select(e)}clear(e=!0){this._unmarkAll();let t=this._hasQueuedChanges();return e&&this._emitChangeEvent(),t}isSelected(e){return this._selection.has(this._getConcreteValue(e))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(e){this._multiple&&this.selected&&this._selected.sort(e)}isMultipleSelection(){return this._multiple}_select(e){this._verifyValueAssignment(e),e.forEach(o=>this._markSelected(o));let t=this._hasQueuedChanges();return this._emitChangeEvent(),t}_deselect(e){this._verifyValueAssignment(e),e.forEach(o=>this._unmarkSelected(o));let t=this._hasQueuedChanges();return this._emitChangeEvent(),t}_setSelection(e){this._verifyValueAssignment(e);let t=this.selected,o=new Set(e.map(n=>this._getConcreteValue(n)));e.forEach(n=>this._markSelected(n)),t.filter(n=>!o.has(this._getConcreteValue(n,o))).forEach(n=>this._unmarkSelected(n));let i=this._hasQueuedChanges();return this._emitChangeEvent(),i}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(e){e=this._getConcreteValue(e),this.isSelected(e)||(this._multiple||this._unmarkAll(),this.isSelected(e)||this._selection.add(e),this._emitChanges&&this._selectedToEmit.push(e))}_unmarkSelected(e){e=this._getConcreteValue(e),this.isSelected(e)&&(this._selection.delete(e),this._emitChanges&&this._deselectedToEmit.push(e))}_unmarkAll(){this.isEmpty()||this._selection.forEach(e=>this._unmarkSelected(e))}_verifyValueAssignment(e){e.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(e,t){if(this.compareWith){t=t??this._selection;for(let o of t)if(this.compareWith(e,o))return o;return e}else return e}};var l=(function(s){return s[s.REPLACED=0]=`REPLACED`,s[s.INSERTED=1]=`INSERTED`,s[s.MOVED=2]=`MOVED`,s[s.REMOVED=3]=`REMOVED`,s})(l||{});var C=class{viewCacheSize=20;_viewCache=[];applyChanges(e,t,o,i,n){e.forEachOperation((c,d,h)=>{let a,r;if(c.previousIndex==null){let m=()=>o(c,d,h);a=this._insertView(m,h,t,i(c)),r=a?l.INSERTED:l.REPLACED}else h==null?(this._detachAndCacheView(d,t),r=l.REMOVED):(a=this._moveView(d,h,t,i(c)),r=l.MOVED);n&&n({context:a?.context,operation:r,record:c})})}detach(){for(let e of this._viewCache)e.destroy();this._viewCache=[]}_insertView(e,t,o,i){let n=this._insertViewFromCache(t,o);if(n){n.context.$implicit=i;return}let c=e();return o.createEmbeddedView(c.templateRef,c.context,c.index)}_detachAndCacheView(e,t){let o=t.detach(e);this._maybeCacheView(o,t)}_moveView(e,t,o,i){let n=o.get(e);return o.move(n,t),n.context.$implicit=i,n}_maybeCacheView(e,t){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(e);else{let o=t.indexOf(e);o===-1?e.destroy():t.remove(o)}}_insertViewFromCache(e,t){let o=this._viewCache.pop();return o&&t.insert(o,e),o||null}};var y=class{applyChanges(e,t,o,i,n){e.forEachOperation((c,d,h)=>{let a,r;if(c.previousIndex==null){let m=o(c,d,h);a=t.createEmbeddedView(m.templateRef,m.context,m.index),r=l.INSERTED}else h==null?(t.remove(d),r=l.REMOVED):(a=t.get(d),t.move(a,h),r=l.MOVED);n&&n({context:a?.context,operation:r,record:c})})}detach(){}};export{l as a,y as c,V as i,M as n,p as o,T as r,u as s,C as t};