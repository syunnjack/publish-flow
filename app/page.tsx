"use client";
import { useMemo, useState } from "react";

const initial = [
 {id:1,title:"横浜市港北区｜プリウス60系ドライブレコーダー取付",site:"Choice Compass",state:"審査待ち",fresh:94,risk:"低",updated:"12分前"},
 {id:2,title:"新宿区｜ISBN 9784295017840 在庫・電子版比較",site:"Choice Compass",state:"要修正",fresh:71,risk:"中",updated:"2時間前"},
 {id:3,title:"千葉市美浜区｜幕張イベント周辺ホテル・駐車場",site:"Travel Event",state:"公開中",fresh:86,risk:"低",updated:"28分前"},
 {id:4,title:"大阪市北区｜EH-NA0J 在庫・価格比較",site:"Choice Compass",state:"期限切れ",fresh:32,risk:"高",updated:"9日前"},
];

export default function Home(){
 const [items,setItems]=useState(initial); const [filter,setFilter]=useState("すべて"); const [selected,setSelected]=useState(1); const [toast,setToast]=useState("");
 const shown=useMemo(()=>filter==="すべて"?items:items.filter(x=>x.state===filter),[filter,items]); const current=items.find(x=>x.id===selected)??items[0];
 const updateState=(state:string)=>{setItems(xs=>xs.map(x=>x.id===selected?{...x,state}:x));setToast(`${current.title}を「${state}」に変更しました`);};
 return <main><aside className="sidebar"><a className="logo" href="#">PUBLISH<span>FLOW</span></a><nav><a className="active">▦ 公開キュー</a><a>◫ サイト一覧</a><a>⌁ 情報ソース</a><a>◷ 鮮度モニター</a><a>✓ 審査ルール</a><a>↗ 成果分析</a></nav><div className="side-note"><b>公開ガード</b><span>正常稼働中</span><p>期限切れ情報を自動検出しています。</p></div></aside>
 <div className="content"><header><div><p>EDITORIAL OPERATIONS</p><h1>公開キュー</h1></div><button onClick={()=>setToast("新しい設計はBriefCraftから受け取ります")}>＋ 新規ページ</button></header>
 <section className="stats"><article><span>審査待ち</span><b>12</b><small>前日比 +3</small></article><article><span>公開中</span><b>248</b><small>鮮度良好 91%</small></article><article><span>要修正</span><b>7</b><small className="warn">対応が必要</small></article><article><span>期限切れ</span><b>4</b><small className="danger">公開停止候補</small></article></section>
 <section className="board"><div className="list"><div className="tabs">{["すべて","審査待ち","要修正","公開中","期限切れ"].map(x=><button className={filter===x?"on":""} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div><div className="table-head"><span>ページ</span><span>状態</span><span>鮮度</span></div>{shown.map(x=><button key={x.id} className={`row ${selected===x.id?"selected":""}`} onClick={()=>setSelected(x.id)}><div><strong>{x.title}</strong><small>{x.site} ・ 更新 {x.updated}</small></div><span className={`pill p-${x.state}`}>{x.state}</span><div className="fresh"><b>{x.fresh}</b><i><em style={{width:`${x.fresh}%`}}/></i></div></button>)}</div>
 <div className="review"><div className="review-head"><p>REVIEW PANEL</p><h2>{current.title}</h2><span>{current.site}</span></div><div className="score"><div><b>{current.fresh}</b><span>/100<br/>公開品質</span></div><span className={`risk r-${current.risk}`}>リスク {current.risk}</span></div>
 <h3>公開前チェック</h3><label><input type="checkbox" defaultChecked/> 地域固有の情報がある</label><label><input type="checkbox" defaultChecked/> JAN・ISBN・車種・品番を検証</label><label><input type="checkbox" defaultChecked={current.fresh>70}/> 在庫・価格の確認日時が新しい</label><label><input type="checkbox" defaultChecked/> 情報元・広告表記を表示</label><label><input type="checkbox" defaultChecked={current.risk==="低"}/> 禁止表現・権利侵害なし</label>
 <div className="source"><span>最新情報源</span><b>店舗CSV / 利用者報告 3件</b><small>最終照合：{current.updated}</small></div><div className="actions"><button onClick={()=>updateState("要修正")}>修正を依頼</button><button className="publish" onClick={()=>updateState("公開中")}>確認して公開 →</button></div><button className="pause" onClick={()=>updateState("期限切れ")}>公開を一時停止</button></div></section>
 <section className="policy"><div><p>自動公開しない</p><h2>品質ゲート</h2></div><div><span>01</span><p><b>独自性</b>地域名以外の固有情報が必要</p></div><div><span>02</span><p><b>鮮度</b>期限を超えた在庫・価格は停止</p></div><div><span>03</span><p><b>透明性</b>情報元、推定、広告を明記</p></div></section></div>{toast&&<div className="toast" role="status">{toast}<button onClick={()=>setToast("")}>×</button></div>}</main>
}
