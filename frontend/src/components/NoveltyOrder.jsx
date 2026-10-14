import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, MapPin, Minus, Plus, Send, ShoppingCart } from "lucide-react";
import Navbar from "./Navbar";
import { NOVELTY_PRODUCTS } from "./BuildNovelty";

const ENDPOINT = "https://formsubmit.co/ajax/team@nextlevelgamingevents.com";

function loadDesign() {
  try { return JSON.parse(sessionStorage.getItem("nxtlvl-selected-novelty-design") || "null"); } catch { return null; }
}

export default function NoveltyOrder() {
  const [params] = useSearchParams();
  const design = useMemo(loadDesign, []);
  const [items, setItems] = useState(() => {
    const saved = JSON.parse(sessionStorage.getItem("nxtlvl-novelty-cart") || "{}");
    if (design?.id && params.get("design") === design.id) saved[design.productId] = { quantity: saved[design.productId]?.quantity || 1, designId: design.id };
    return saved;
  });
  const [details, setDetails] = useState({ name: "", email: "", phone: "", address: "" });
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const changeQuantity = (product, amount) => setItems((current) => {
    const next = { ...current };
    const quantity = Math.max(0, Math.min(10000, (next[product.id]?.quantity || 0) + amount));
    if (quantity) next[product.id] = { ...next[product.id], quantity };
    else delete next[product.id];
    sessionStorage.setItem("nxtlvl-novelty-cart", JSON.stringify(next));
    return next;
  });

  const total = Object.values(items).reduce((sum, item) => sum + item.quantity, 0);
  const mapUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(details.address || "")}`;

  const submit = async (event) => {
    event.preventDefault();
    if (!total) return setStatus("Add at least one novelty to your cart.");
    setBusy(true); setStatus("");
    const itemText = Object.entries(items).map(([id, item]) => {
      const product = NOVELTY_PRODUCTS.find((entry) => entry.id === id);
      const submittedDesign = item.designId === design?.id ? design : null;
      return `${product?.title || id} — quantity ${item.quantity}${submittedDesign ? ` — design ${design.id}: ${design.imageUrl}` : " — custom design to be confirmed"}`;
    }).join("\n");
    try {
      const response = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({
        _subject: `Novelty dropshipping quote: ${details.name}`,
        _template: "table", _replyto: details.email,
        "Request type": "Novelty dropshipping quote", "Customer name": details.name, "Customer email": details.email,
        "Phone": details.phone || "Not provided", "Shipping address": details.address, "Map": mapUrl,
        "Cart items": itemText, "Total quantity": total,
      }) });
      const result = await response.json();
      if (!response.ok || result.success === false || result.error) throw new Error("Quote delivery failed");
      sessionStorage.removeItem("nxtlvl-novelty-cart");
      setSent(true);
    } catch { setStatus("We couldn’t send the request. Please try again."); }
    finally { setBusy(false); }
  };

  return <main className="novelty-order-page min-h-screen bg-[#040c17] text-white">
    <Navbar topOnly />
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-32">
      <Link to="/novelties" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60"><ArrowLeft size={15}/> Novelties</Link>
      {sent ? <section className="mx-auto mt-12 max-w-xl rounded-3xl border border-white/10 bg-[#091426] p-8 text-center"><CheckCircle2 className="mx-auto text-emerald-400" size={42}/><h1 className="mt-4 text-3xl font-bold">Quote request sent</h1><p className="mt-3 text-sm text-white/60">Our team has your novelty designs, quantities, and delivery details and will follow up by email.</p></section> : <>
        <header className="my-8"><p className="text-[10px] font-bold tracking-[.25em] text-sky-400">CUSTOM NOVELTIES / DROPSHIPPING</p><h1 className="mt-2 text-4xl font-extrabold">Your novelty cart</h1><p className="mt-3 max-w-2xl text-sm text-white/60">Select multiple products and quantities. We’ll confirm pricing and delivery with your quote.</p></header>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <section className="grid gap-3">{NOVELTY_PRODUCTS.map((product) => { const quantity = items[product.id]?.quantity || 0; const ownDesign = items[product.id]?.designId === design?.id; return <article key={product.id} className={`flex items-center gap-4 rounded-2xl border p-4 ${quantity ? "border-sky-500/50 bg-sky-500/[.06]" : "border-white/10 bg-white/[.02]"}`}>
            <img src={ownDesign ? design.imageUrl : product.image} alt="" className="h-20 w-24 rounded-xl object-cover"/><div className="min-w-0 flex-1"><span className="text-[9px] font-bold tracking-widest text-sky-400">{product.tag}</span><h2 className="font-semibold">{product.title}</h2><p className="text-xs text-white/45">{ownDesign ? "Your saved custom design" : "Design will be confirmed with our team"}</p></div>
            <div className="flex items-center gap-2"><button type="button" aria-label={`Remove one ${product.title}`} onClick={() => changeQuantity(product, -1)} className="grid h-8 w-8 place-items-center rounded-lg border border-white/15"><Minus size={14}/></button><span className="w-7 text-center font-bold">{quantity}</span><button type="button" aria-label={`Add one ${product.title}`} onClick={() => changeQuantity(product, 1)} className="grid h-8 w-8 place-items-center rounded-lg border border-white/15"><Plus size={14}/></button></div>
          </article>; })}</section>
          <form onSubmit={submit} className="h-fit rounded-2xl border border-white/10 bg-[#091426] p-5">
            <div className="mb-5 flex items-center justify-between"><h2 className="flex items-center gap-2 font-bold"><ShoppingCart size={18}/> Quote details</h2><span className="text-xs text-sky-300">{total} item{total === 1 ? "" : "s"}</span></div>
            <div className="grid gap-3">{[["name","Full name","text"],["email","Email address","email"],["phone","Phone (optional)","tel"],["address","Shipping address","text"]].map(([key,label,type]) => <label key={key} className="grid gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/55">{label}<input required={key !== "phone"} type={type} autoComplete={key === "address" ? "street-address" : key} value={details[key]} onChange={(event) => setDetails((current) => ({ ...current, [key]: event.target.value }))} className="h-11 rounded-lg border border-white/15 bg-[#050c18] px-3 text-sm font-normal normal-case tracking-normal text-white" /></label>)}</div>
            <div className="mt-3 overflow-hidden rounded-xl border border-white/10"><div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-[9px] font-bold tracking-widest text-white/60"><MapPin size={13}/> SHIPPING ADDRESS MAP</div><iframe title="Shipping address map" src={`https://www.openstreetmap.org/export/embed.html?query=${encodeURIComponent(details.address || "Boston, MA")}`} className="h-40 w-full border-0"/><a href={mapUrl} target="_blank" rel="noreferrer" className="block truncate px-3 py-2 text-xs text-sky-300">{details.address || "Enter an address to preview the map"}</a></div>
            {status && <p role="alert" className="mt-3 text-xs text-red-300">{status}</p>}
            <button disabled={busy || !total} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-600 text-xs font-extrabold tracking-widest disabled:opacity-50">{busy ? "SENDING…" : "SEND MY QUOTE REQUEST"}<Send size={15}/></button>
            <p className="mt-3 text-center text-[10px] text-white/40">No payment is taken. Our team will email a quote.</p>
          </form>
        </div>
      </>}
    </div>
  </main>;
}
