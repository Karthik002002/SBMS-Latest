"use strict";(self.webpackChunkfalcon_react=self.webpackChunkfalcon_react||[]).push([[164],{19164:function(e,a,s){s.r(a),s.d(a,{default:function(){return j}});var r=s(29439),t=s(47313),n=s(21664),l=s(2135),c=s(46022),i=s(1413),o=s(465),d=s(46417),u=function(e){var a=e.getTableProps,s=e.headers,r=e.page,t=e.prepareRow,n=e.headerClassName,l=e.bodyClassName,c=e.rowClassName,u=e.tableProps;return(0,d.jsx)("div",{className:"table-container",style:{position:"relative"},children:(0,d.jsx)("div",{className:"table-responsive scrollbar dashboard-list-table",children:(0,d.jsxs)(o.Z,(0,i.Z)((0,i.Z)({},a(u)),{},{className:"",style:{minWidth:"-webkit-fill-available"},children:[(0,d.jsx)("thead",{className:n,style:{position:"sticky",top:0,zIndex:1,backgroundColor:"white"},children:(0,d.jsx)("tr",{children:s.map((function(e,a){return(0,d.jsxs)("th",(0,i.Z)((0,i.Z)({},e.getHeaderProps(e.getSortByToggleProps(e.headerProps))),{},{children:[e.render("Header"),e.canSort?e.isSorted?e.isSortedDesc?(0,d.jsx)("span",{className:"sort desc"}):(0,d.jsx)("span",{className:"sort asc"}):(0,d.jsx)("span",{className:"sort"}):""]}),a)}))})}),(0,d.jsx)("tbody",{className:l,children:r.map((function(e,a){return t(e),(0,d.jsx)("tr",(0,i.Z)((0,i.Z)({className:c},e.getRowProps()),{},{children:e.cells.map((function(e,a){return(0,d.jsx)("td",(0,i.Z)((0,i.Z)({},e.getCellProps(e.column.cellProps)),{},{children:e.render("Cell")}),a)}))}),a)}))})]}))})})},m=s(97805),f=s(81722),x=s(63849),h=s(31616),p=s(93298),N=s(73158),v=function(e){var a=e.selectedRowIds,s=e.Schooldata,n=e.CompanyData,c=(0,f.K)(),i=c.setFilter,o=c.setCompanyFilter,u=(0,t.useState)(!1),v=(0,r.Z)(u,2),b=v[0],j=v[1],k=(0,t.useState)(""),g=(0,r.Z)(k,2),Z=g[0],C=g[1];return(0,d.jsxs)(x.Z,{className:"flex-between-center",children:[(0,d.jsx)(h.Z,{xs:4,sm:"auto",className:"d-flex align-items-center pe-0",children:(0,d.jsx)("h5",{className:"fs-0 mb-0 text-nowrap py-2 py-xl-0 ms-3",children:"Vehicle List"})}),(0,d.jsx)(h.Z,{xs:8,sm:"auto",className:"ms-auto text-end ps-0",children:Object.keys(a).length>0?(0,d.jsx)("div",{className:"d-flex",children:(0,d.jsx)(l.rU,{to:"/trackingpage",children:(0,d.jsx)(p.Z,{type:"button",variant:"falcon-default",size:"sm",className:"ms-2",children:"Track"})})}):(0,d.jsxs)("div",{id:"orders-actions",className:"dashboard-filter d-flex",children:[b&&(0,d.jsx)("button",{onClick:function(){j(!1),i(null),o(null)},className:"btn me-2 filter-clear-btn pb-1",children:"Clear"}),(0,d.jsxs)(N.Z,{children:[(0,d.jsxs)(N.Z.Toggle,{variant:"falcon-default",size:"sm",className:"mx-2",icon:"filter",children:[(0,d.jsx)(m.G,{variant:"falcon-default",size:"sm",icon:"filter",className:"me-2 border-0"}),"Company"]}),(0,d.jsx)(N.Z.Menu,{children:null===n||void 0===n?void 0:n.map((function(e,a){return(0,d.jsx)(N.Z.Item,{active:Z===e,onClick:function(){return function(e){o(e),C(e),j(!0)}(e)},children:e},a)}))})]}),(0,d.jsxs)(N.Z,{children:[(0,d.jsxs)(N.Z.Toggle,{variant:"falcon-default",size:"sm",className:"mx-2",icon:"filter",children:[(0,d.jsx)(m.G,{variant:"falcon-default",size:"sm",icon:"filter",className:"me-2 border-0"}),"School"]}),(0,d.jsx)(N.Z.Menu,{children:s.map((function(e,a){return(0,d.jsx)(N.Z.Item,{active:Z===e,onClick:function(){return function(e){i(e),C(e),j(!0)}(e)},children:e},a)}))})]})]})})]})},b=s(81529),j=function(e){var a=e.data,s=(0,f.K)(),i=s.Filter,o=s.companyFilter,m=s.setTrackingVehicleCenter,x=s.setZoomLevel,h=s.setIMEI,p=(0,t.useState)(a),N=(0,r.Z)(p,2),j=N[0],k=N[1],g=(0,t.useState)(a),Z=(0,r.Z)(g,2),C=Z[0],P=Z[1],w=[],y=[];null===j||void 0===j||j.map((function(e){y.includes(e.school_name)||y.push(e.school_name),w.includes(e.company_name)||w.push(e.company_name)})),(0,t.useEffect)((function(){if(i&&"All"!==i.zone){var e=C.filter((function(e){return e.zone===i.zone}));k(e)}else null===i&&k(C)}),[i]),(0,t.useEffect)((function(){k(a),P(a)}),[a]),(0,t.useEffect)((function(){if(null!==o){var e=C.filter((function(e){return e.company_name===o}));k(e)}else null===o&&k(C)}),[o]),(0,t.useEffect)((function(){if(null!==i)C.filter((function(e){return e.school_name===i}));else null===i&&k(C)}),[i]);var S=[{accessor:"vehicle_name",Header:"Name",headerProps:{className:"text-center"}},{accessor:"vehicle_regno",Header:"Reg Num",headerProps:{className:"text-center"},cellProps:{className:"text-break text-center"},Cell:function(e){return e.value||"-"}},{accessor:"speed",Header:"Speed",headerProps:{className:"text-center"},cellProps:{className:"text-break text-center"},Cell:function(e){var a=e.value;return void 0!==a?a:"-"}},{accessor:"ignition",Header:"Ignition",headerProps:{className:"text-center"},cellProps:{className:"text-break text-center"},Cell:function(e){return!0===e.value?"True":"False"}},{accessor:"driver_name",Header:"Driver Name",headerProps:{className:"text-center"},cellProps:{className:"text-break text-center"},Cell:function(e){return e.value||"-"}},{accessor:"driver_phone",Header:"Phone No",headerProps:{className:"text-center"},cellProps:{className:"text-break text-center"},Cell:function(e){return e.value||"-"}},{accessor:"status",Header:"Status",headerProps:{className:"text-center"},cellProps:{className:"text-break text-center"},Cell:function(e){return function(e,a){var s;switch(e){case 0:s="Running";break;case 1:s="Idle";break;case 2:s="Stopped";break;case 3:s="Towed";break;case 4:s="No Data";break;case 5:s="Out of Network";break;case 6:s="Parked";break;default:s="-"}return a&&(s="RashDriving"),s}(e.value,e.row.original.speed_status)||"-"}},{accessor:"track",Header:"Track",headerProps:{className:"text-center"},Cell:function(e){var a=e.row;return(0,d.jsx)(l.rU,{to:"/tracking",children:(0,d.jsx)("div",{onClick:function(){h(a.original.imei),m([a.original.lat,a.original.lon]),x(17)},children:(0,d.jsx)(b.Z,{variant:"falcon-default",size:"sm",icon:"external-link-alt",transform:"shrink-3"})})})}}];return(0,d.jsx)("div",{className:"h-100 ".concat(window.innerWidth<450?"ms-3":"ms-2"),children:(0,d.jsx)(c.Z,{columns:S,data:j,children:(0,d.jsxs)(n.Z,{children:[(0,d.jsx)(n.Z.Header,{children:(0,d.jsx)(v,{table:!0,Schooldata:y,CompanyData:w})}),(0,d.jsx)(n.Z.Body,{className:"p-0  ",children:(0,d.jsx)(u,{table:!0,headerClassName:"bg-200 text-900 text-nowrap align-middle",rowClassName:"btn-reveal-trigger text-nowrap align-middle",tableProps:{size:"sm",className:"fs--1 mb-0 overflow-hidden"}})})]})})})}}}]);