"use strict";(self.webpackChunkfalcon_react=self.webpackChunkfalcon_react||[]).push([[164],{19164:function(e,s,a){a.r(s),a.d(s,{default:function(){return b}});var r=a(29439),n=a(47313),t=a(21664),l=a(46022),c=a(1413),i=a(465),o=a(46417),d=function(e){var s=e.getTableProps,a=e.headers,r=e.page,n=e.prepareRow,t=e.headerClassName,l=e.bodyClassName,d=e.rowClassName,u=e.tableProps;return(0,o.jsx)("div",{className:"table-container",style:{position:"relative"},children:(0,o.jsx)("div",{className:"table-responsive scrollbar dashboard-list-table",children:(0,o.jsxs)(i.Z,(0,c.Z)((0,c.Z)({},s(u)),{},{className:"",style:{minWidth:"-webkit-fill-available"},children:[(0,o.jsx)("thead",{className:t,style:{position:"sticky",top:0,zIndex:1,backgroundColor:"white"},children:(0,o.jsx)("tr",{children:a.map((function(e,s){return(0,o.jsxs)("th",(0,c.Z)((0,c.Z)({},e.getHeaderProps(e.getSortByToggleProps(e.headerProps))),{},{children:[e.render("Header"),e.canSort?e.isSorted?e.isSortedDesc?(0,o.jsx)("span",{className:"sort desc"}):(0,o.jsx)("span",{className:"sort asc"}):(0,o.jsx)("span",{className:"sort"}):""]}),s)}))})}),(0,o.jsx)("tbody",{className:l,children:r.map((function(e,s){return n(e),(0,o.jsx)("tr",(0,c.Z)((0,c.Z)({className:d},e.getRowProps()),{},{children:e.cells.map((function(e,s){return(0,o.jsx)("td",(0,c.Z)((0,c.Z)({},e.getCellProps(e.column.cellProps)),{},{children:e.render("Cell")}),s)}))}),s)}))})]}))})})},u=a(97805),m=a(81722),f=a(63849),x=a(31616),h=a(93298),p=a(73158),N=a(2135),j=function(e){var s=e.selectedRowIds,a=e.Schooldata,t=e.CompanyData,l=(0,m.K)(),c=l.setFilter,i=l.setCompanyFilter,d=(0,n.useState)(!1),j=(0,r.Z)(d,2),v=j[0],b=j[1],Z=(0,n.useState)(""),g=(0,r.Z)(Z,2),C=g[0],k=g[1];return(0,o.jsxs)(f.Z,{className:"flex-between-center",children:[(0,o.jsx)(x.Z,{xs:4,sm:"auto",className:"d-flex align-items-center pe-0",children:(0,o.jsx)("h5",{className:"fs-0 mb-0 text-nowrap py-2 py-xl-0 ms-3",children:"Vehicle List"})}),(0,o.jsx)(x.Z,{xs:8,sm:"auto",className:"ms-auto text-end ps-0",children:Object.keys(s).length>0?(0,o.jsx)("div",{className:"d-flex",children:(0,o.jsx)(N.rU,{to:"/trackingpage",children:(0,o.jsx)(h.Z,{type:"button",variant:"falcon-default",size:"sm",className:"ms-2",children:"Track"})})}):(0,o.jsxs)("div",{id:"orders-actions",className:"dashboard-filter d-flex",children:[v&&(0,o.jsx)("button",{onClick:function(){b(!1),c(null),i(null)},className:"btn me-2 filter-clear-btn fs--1 pb-1",children:"Clear Filters"}),(0,o.jsxs)(p.Z,{children:[(0,o.jsxs)(p.Z.Toggle,{variant:"falcon-default",size:"sm",className:"mx-2",icon:"filter",children:[(0,o.jsx)(u.G,{variant:"falcon-default",size:"sm",icon:"filter",className:"me-2 border-0"}),"Company"]}),(0,o.jsx)(p.Z.Menu,{children:null===t||void 0===t?void 0:t.map((function(e,s){return(0,o.jsx)(p.Z.Item,{active:C===e,onClick:function(){return function(e){i(e),k(e),b(!0)}(e)},children:e},s)}))})]}),(0,o.jsxs)(p.Z,{children:[(0,o.jsxs)(p.Z.Toggle,{variant:"falcon-default",size:"sm",className:"mx-2",icon:"filter",children:[(0,o.jsx)(u.G,{variant:"falcon-default",size:"sm",icon:"filter",className:"me-2 border-0"}),"School"]}),(0,o.jsx)(p.Z.Menu,{children:a.map((function(e,s){return(0,o.jsx)(p.Z.Item,{active:C===e,onClick:function(){return function(e){c(e),k(e),b(!0)}(e)},children:e},s)}))})]})]})})]})},v=a(81529),b=function(e){var s=e.data,a=(0,m.K)(),c=a.Filter,i=a.companyFilter,u=(0,n.useState)(s),f=(0,r.Z)(u,2),x=f[0],h=f[1],p=(0,n.useState)(s),N=(0,r.Z)(p,2),b=N[0],Z=N[1],g=[],C=[];null===x||void 0===x||x.map((function(e){C.includes(e.school_name)||C.push(e.school_name),g.includes(e.Company_name)||g.push(e.Company_name)})),(0,n.useEffect)((function(){if(c&&"All"!==c.zone){var e=b.filter((function(e){return e.zone===c.zone}));h(e)}else null===c&&h(b)}),[c]),(0,n.useEffect)((function(){h(s),Z(s)}),[s]),(0,n.useEffect)((function(){if(null!==i){var e=b.filter((function(e){return e.Company_name===i}));h(e)}else null===i&&h(b)}),[i]),(0,n.useEffect)((function(){if(null!==c){var e=b.filter((function(e){return e.school_name===c}));h(e)}else null===c&&h(b)}),[c]);var k=[{accessor:"vehicle_name",Header:"Name",headerProps:{className:"text-center"}},{accessor:"vehicle_reg",Header:"Reg Num",headerProps:{className:"text-center"},cellProps:{className:"text-break text-center"},Cell:function(e){return e.value||"-"}},{accessor:"speed",Header:"Speed",headerProps:{className:"text-center"},cellProps:{className:"text-break text-center"},Cell:function(e){return e.value||"-"}},{accessor:"ignition",Header:"Ignition",headerProps:{className:"text-center"},cellProps:{className:"text-break text-center"},Cell:function(e){return!0===e.value?"True":"False"}},{accessor:"driver",Header:"Driver Name",headerProps:{className:"text-center"},cellProps:{className:"text-break text-center"},Cell:function(e){return e.value||"-"}},{accessor:"phone",Header:"Phone No",headerProps:{className:"text-center"},cellProps:{className:"text-break text-center"},Cell:function(e){return e.value||"-"}},{accessor:"track",Header:"Track",headerProps:{className:"text-center"},Cell:function(e){var s=e.row;return(0,o.jsx)("div",{onClick:function(){return console.log(s.original.imei)},children:(0,o.jsx)(v.Z,{variant:"falcon-default",size:"sm",icon:"external-link-alt",transform:"shrink-3"})})}}];return(0,o.jsx)("div",{className:"h-100 ".concat(window.innerWidth<450?"ms-3":"ms-2"),children:(0,o.jsx)(l.Z,{columns:k,data:x,children:(0,o.jsxs)(t.Z,{children:[(0,o.jsx)(t.Z.Header,{children:(0,o.jsx)(j,{table:!0,Schooldata:C,CompanyData:g})}),(0,o.jsx)(t.Z.Body,{className:"p-0  ",children:(0,o.jsx)(d,{table:!0,headerClassName:"bg-200 text-900 text-nowrap align-middle",rowClassName:"btn-reveal-trigger text-nowrap align-middle",tableProps:{size:"sm",className:"fs--1 mb-0 overflow-hidden"}})})]})})})}}}]);