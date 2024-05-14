"use strict";(self.webpackChunkmarvel=self.webpackChunkmarvel||[]).push([[53],{354:(t,e,c)=>{c.d(e,{A:()=>r});const s=c.p+"static/media/Avengers.4065c8f9c94e3d8b039a.png",a=c.p+"static/media/Avengers_logo.9eaf219344d83362e830.png";var n=c(579);const r=()=>(0,n.jsxs)("div",{className:"app__banner",children:[(0,n.jsx)("img",{src:s,alt:"Avengers"}),(0,n.jsxs)("div",{className:"app__banner-text",children:["New comics every week!",(0,n.jsx)("br",{}),"Stay tuned!"]}),(0,n.jsx)("img",{src:a,alt:"Avengers logo"})]})},425:(t,e,c)=>{c.d(e,{A:()=>n});const s=c.p+"static/media/error.42292aa12b6bc303ce99.gif";var a=c(579);const n=()=>(0,a.jsx)("img",{style:{display:"block",width:"250px",height:"250px",objectFit:"contain",margin:"0 auto"},src:s,alt:"Error"})},596:(t,e,c)=>{c.r(e),c.d(e,{default:()=>h});var s=c(591),a=c(897),n=c(43),r=c(425),i=c(502),o=c(475),l=c(579);const d=(t,e,c)=>{switch(t){case"waiting":return(0,l.jsx)(i.A,{});case"loading":return c?(0,l.jsx)(e,{}):(0,l.jsx)(i.A,{});case"confirmed":return(0,l.jsx)(e,{});case"error":return(0,l.jsx)(r.A,{});default:throw new Error("Unexpecting process state")}},u=t=>{const[e,c]=(0,n.useState)([]),[s,r]=(0,n.useState)(!1),[i,u]=(0,n.useState)(0),[m,h]=(0,n.useState)(!1),{getAllComics:p,process:g,setProcess:b}=(0,a.A)();(0,n.useEffect)((()=>{x(i,!0)}),[]);const x=(t,e)=>{r(!e),p(t).then(v).then((()=>b("confirmed")))},v=t=>{let s=!1;t.length<8&&(s=!0),c([...e,...t]),r(!1),u(i+8),h(s)};return(0,l.jsxs)("div",{className:"comics__list",children:[d(g,(()=>(t=>{const e=t.map(((t,e)=>(0,l.jsx)("li",{className:"comics__item",onClick:t=>{t.preventDefault()},children:(0,l.jsxs)(o.N_,{to:"/comics/".concat(t.id),children:[(0,l.jsx)("img",{src:t.thumbnail,alt:"ultimate war",className:"comics__item-img"}),(0,l.jsx)("div",{className:"comics__item-name",children:t.title}),(0,l.jsx)("div",{className:"comics__item-price",children:t.price})]})},e)));return(0,l.jsx)("ul",{className:"comics__grid",children:e})})(e)),s),(0,l.jsx)("button",{disabled:s,style:{display:m?"none":"block"},className:"button button__main button__long",onClick:()=>x(),children:(0,l.jsx)("div",{className:"inner",children:"load more"})})]})};var m=c(354);const h=()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(s.m,{children:[(0,l.jsx)("meta",{name:"description",content:"Page with list of Marvel comics"}),(0,l.jsx)("title",{children:"Marvel comics page"})]}),(0,l.jsx)(m.A,{}),(0,l.jsx)(u,{})]})},897:(t,e,c)=>{c.d(e,{A:()=>n});var s=c(43);const a=()=>{const[t,e]=(0,s.useState)("waiting");return{request:(0,s.useCallback)((async function(t){let c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{"Content-Type":"application/json"};e("loading");try{const e=await fetch(t,{method:c,body:s,headers:a});if(!e.ok)throw new Error("Could not fetch ".concat(t,", status: ").concat(e.status));return await e.json()}catch(n){throw e("error"),n}}),[]),clearError:(0,s.useCallback)((()=>{e("loading")}),[]),process:t,setProcess:e}},n=()=>{const{request:t,process:e,setProcess:c,clearError:s}=a(),n="https://gateway.marvel.com:443/v1/public/",r="apikey=ccbd62db6bd6ac17da5b584b9f880788",i=t=>({id:t.id,name:t.name,description:t.description?"".concat(t.description.slice(0,210),"..."):"There is no description for this character",thumbnail:"".concat(t.thumbnail.path,".").concat(t.thumbnail.extension),homepage:t.urls[0].url,wiki:t.urls[1].url,comics:t.comics.items}),o=t=>{var e,c;return{id:t.id,title:t.title,thumbnail:"".concat(t.thumbnail.path,".").concat(t.thumbnail.extension),price:t.prices[0].price?"".concat(t.prices[0].price,"$"):"not available",url:t.urls[0].url,description:null!==(e=t.textObjects[0])&&void 0!==e&&e.text?t.textObjects[0].text:"There is no description for this character",language:(null===(c=t.textObjects[0])||void 0===c?void 0:c.language)||"en-us",pageCount:t.pageCount?"".concat(t.pageCount," pages"):"No information about the number of pages"}};return{process:e,setProcess:c,getAllCharecters:async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:210,c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",s="".concat(n,"characters?");c.length>0?s+="name=".concat(c,"&").concat(r):s+="limit=9&offset=".concat(e,"&").concat(r);return(await t(s)).data.results.map(i)},getCharecter:async e=>{const c="".concat(n,"characters/").concat(e,"?").concat(r),s=await t(c);return i(s.data.results[0])},clearError:s,getAllComics:async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:4;const c="".concat(n,"comics?limit=8&offset=").concat(e,"&").concat(r);return(await t(c)).data.results.map(o)},getComic:async e=>{const c="".concat(n,"comics/").concat(e,"?").concat(r),s=await t(c);return o(s.data.results[0])}}}}}]);
//# sourceMappingURL=53.fb6a26d0.chunk.js.map