import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MousePointer,
  Pencil,
  Type,
  Image as ImageIcon,
  Square,
  Smile,
  Eraser,
  Undo2,
  Redo2,
  Plus,
  Minus,
  Maximize2,
  Trash2,
  Upload,
  Layers,
  Sparkles,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Copy,
  FlipHorizontal,
  FlipVertical,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Box,
  Flame,
  Star,
  Heart,
  Zap,
  Crown,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Full Catalog of 10 Novelty Products
export const NOVELTY_PRODUCTS = [
  {
    id: "trucker-hats",
    title: "Custom Trucker Hats",
    tag: "HATS & BEANIES",
    desc: "Design your own trucker hat with custom patches, logos, colors, and details that match your style or event.",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
    mockupType: "hat",
    printableLabel: "PRINTABLE PATCH AREA",
    styles: [
      "Front Patch",
      "Hat Color",
      "Patch Shape",
      "Text",
      "Graphics",
      "Position",
      "Size",
      "Others",
    ],
  },
  {
    id: "custom-socks",
    title: "Custom Socks",
    tag: "SOCKS",
    desc: "Create your own custom crew or ankle socks with patterns, logos, custom artwork or text.",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=600&q=80",
    mockupType: "socks",
    printableLabel: "PRINTABLE SOCK REGION",
    styles: [
      "Base Color",
      "Pattern",
      "Text",
      "Graphics",
      "Logo",
      "Placement",
      "Others",
    ],
  },
  {
    id: "custom-bracelets",
    title: "Bead-tastics Custom Bracelets",
    tag: "BRACELETS",
    desc: "Fun, hand-crafted bead bracelets designed by you, featuring custom text, charm accents, and color themes.",
    image: "https://images.unsplash.com/photo-1611591475879-c5ec2b810d7a?auto=format&fit=crop&w=600&q=80",
    mockupType: "bracelet",
    printableLabel: "CHARM & LETTER BEAD AREA",
    styles: [
      "Bracelet Color",
      "Bead Style",
      "Text",
      "Charm",
      "Pattern",
      "Others",
    ],
  },
  {
    id: "pillow-dolls",
    title: "Custom Pillow Dolls",
    tag: "PILLOW DOLLS",
    desc: "Turn your favorite photos, characters or gaming avatars into custom contour plush pillow dolls.",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    mockupType: "pillow",
    printableLabel: "FRONT PRINTABLE AREA",
    styles: [
      "Pillow Color",
      "Artwork",
      "Text",
      "Image",
      "Shape",
      "Others",
    ],
  },
  {
    id: "sequence-pillows",
    title: "Custom Sequence Pillows",
    tag: "SEQUENCE PILLOWS",
    desc: "Create interactive reversible sequin pillows with custom photos or artwork revealed on swipe.",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    mockupType: "pillow",
    printableLabel: "SEQUIN REVEAL AREA",
    styles: [
      "Sequin Color",
      "Hidden Artwork",
      "Text",
      "Size",
      "Others",
    ],
  },
  {
    id: "intention-bracelets",
    title: "Intention Bracelet",
    tag: "BRACELETS",
    desc: "Design a meaningful hand-crafted bracelet with personalized stamped word, cord color, and purpose.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    mockupType: "bracelet",
    printableLabel: "STAMPED PLATE REGION",
    styles: [
      "Cord Color",
      "Plate Material",
      "Stamped Word",
      "Finish",
      "Others",
    ],
  },
  {
    id: "laser-keychains",
    title: "Laser-Engraved Keychains",
    tag: "KEYCHAINS",
    desc: "Personalize high-quality wooden, acrylic or metal keychains with custom laser engraving.",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=600&q=80",
    mockupType: "keychain",
    printableLabel: "LASER ENGRAVING AREA",
    styles: [
      "Material",
      "Fob Shape",
      "Engraved Text",
      "Logo",
      "Others",
    ],
  },
  {
    id: "stamped-rings",
    title: "Stamped Custom Rings",
    tag: "CUSTOM RINGS",
    desc: "Create custom stamped metallic rings with dates, initials, secret messages, or coordinates.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    mockupType: "ring",
    printableLabel: "RING STAMPING SURFACE",
    styles: [
      "Metal Finish",
      "Stamped Message",
      "Band Width",
      "Font Style",
      "Others",
    ],
  },
  {
    id: "plush-bags",
    title: "Silly Sacks (Plush Bags)",
    tag: "PLUSH BAGS",
    desc: "Bring your imagination to life with custom character plush backpacks, drawstring sacks and pouches.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80",
    mockupType: "bag",
    printableLabel: "CUSTOM FRONT PANEL",
    styles: [
      "Plush Color",
      "Bag Style",
      "Name Patch",
      "Character Type",
      "Others",
    ],
  },
];

const PRESET_COLORS = [
  "#ffffff", // White
  "#000000", // Black
  "#6b7280", // Gray
  "#ef4444", // Red
  "#f97316", // Orange
  "#eab308", // Yellow
  "#22c55e", // Green
  "#06b6d4", // Cyan
  "#0099FF", // Next Level Blue
  "#6366f1", // Indigo
  "#a855f7", // Purple
  "#ec4899", // Pink
];

// Preset Templates / Assets for Bottom Strip
const TEMPLATES_ASSETS = [
  { id: "blank", name: "Blank", symbol: null },
  { id: "nextlvl", name: "NEXT LEVEL", text: "NEXT LEVEL" },
  { id: "controller", name: "Gaming", symbol: "🎮" },
  { id: "flame", name: "Flame", symbol: "🔥" },
  { id: "star", name: "Star", symbol: "⭐" },
  { id: "nl-badge", name: "NL Logo", text: "NXT LVL" },
  { id: "smiley", name: "Smiley", symbol: "😊" },
  { id: "heart", name: "Heart", symbol: "❤️" },
  { id: "trophy", name: "Trophy", symbol: "🏆" },
  { id: "zap", name: "Lightning", symbol: "⚡" },
  { id: "crown", name: "Crown", symbol: "👑" },
];

const BuildNovelty = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Selected novelty product state
  const selectedIdFromUrl = searchParams.get("product");
  const [selectedProductId, setSelectedProductId] = useState(
    selectedIdFromUrl || "trucker-hats"
  );

  const selectedProduct =
    NOVELTY_PRODUCTS.find((p) => p.id === selectedProductId) ||
    NOVELTY_PRODUCTS[0];

  // Active style pills
  const [activePills, setActivePills] = useState([]);

  // Active Tool: "select", "brush", "eraser", "text", "shape"
  const [tool, setTool] = useState("brush");
  const [brushColor, setBrushColor] = useState("#0099FF");
  const [brushSize, setBrushSize] = useState(6);
  const [isDrawing, setIsDrawing] = useState(false);

  // Active Canvas Layers
  const [layers, setLayers] = useState([]);
  const [selectedLayerId, setSelectedLayerId] = useState(null);

  // Image Upload Layers
  const [uploadedImages, setUploadedImages] = useState([]);
  const [bgImage, setBgImage] = useState(null);

  // History stack for Undo/Redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Canvas Ref
  const canvasRef = useRef(null);

  // Description and Modal State
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // File Upload Refs
  const fileInputRef = useRef(null);
  const fuseInputRef = useRef(null);

  // Sync selected product with URL search param
  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
    setSearchParams({ product: id });
  };

  // Set default style selections when product changes
  useEffect(() => {
    if (selectedProduct && selectedProduct.styles) {
      setActivePills(selectedProduct.styles.slice(0, 2));
    }
  }, [selectedProductId, selectedProduct]);

  const togglePill = (pillName) => {
    setActivePills((prev) =>
      prev.includes(pillName)
        ? prev.filter((p) => p !== pillName)
        : [...prev, pillName]
    );
  };

  // Save Canvas State for Undo/Redo
  const saveCanvasState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    setHistory((prev) => {
      const newHist = prev.slice(0, historyIndex + 1);
      return [...newHist, dataUrl];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  // Redraw Canvas
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    // 1. Blueprint dark grid background (Matching media_1791286666040.png)
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#070d19";
    ctx.fillRect(0, 0, w, h);

    // Subtle grid lines
    ctx.strokeStyle = "#0e1a30";
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // 2. Draw Fused Background Image if present
    if (bgImage) {
      ctx.drawImage(bgImage, 0, 0, w, h);
    }

    // 3. Draw Uploaded Overlay Images
    uploadedImages.forEach((item) => {
      if (item.imgObj) {
        ctx.drawImage(item.imgObj, item.x, item.y, item.width, item.height);
      }
    });

    // 4. Draw Canvas Layers (Text, Symbols)
    layers.forEach((layer) => {
      if (!layer.visible) return;
      ctx.save();
      if (layer.type === "text") {
        ctx.font = `bold ${layer.fontSize || 26}px sans-serif`;
        ctx.fillStyle = layer.color || "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(layer.text, layer.x, layer.y);
      } else if (layer.type === "sticker") {
        ctx.font = "42px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(layer.symbol || "⭐", layer.x, layer.y);
      }
      ctx.restore();
    });

    // 5. Draw Product Mockup Vector Outline Overlay
    drawMockupOverlay(ctx, w, h, selectedProduct.mockupType);
  }, [bgImage, uploadedImages, layers, selectedProduct]);

  // Vector Product Mockup Overlay
  const drawMockupOverlay = (ctx, w, h, mockupType) => {
    ctx.save();
    const cx = w / 2;
    const cy = h / 2;

    if (mockupType === "hat") {
      // Trucker Hat Vector Template
      ctx.beginPath();
      ctx.arc(cx, cy - 20, 160, Math.PI * 0.85, Math.PI * 0.15, false);
      ctx.fillStyle = "#091a33";
      ctx.fill();
      ctx.strokeStyle = "#1a2e4d";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Front Panel
      ctx.beginPath();
      ctx.ellipse(cx, cy - 20, 130, 105, 0, Math.PI, 0, false);
      ctx.fillStyle = "#f0f4f8";
      ctx.fill();
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Visor
      ctx.beginPath();
      ctx.ellipse(cx, cy + 85, 160, 38, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#081427";
      ctx.fill();
      ctx.strokeStyle = "#0099FF";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Printable Area Dashed Outline & Blue Badge Pill Tag (Matching media_1791286666040.png)
      ctx.beginPath();
      ctx.roundRect(cx - 90, cy - 55, 180, 105, 12);
      ctx.strokeStyle = "#0099FF";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.stroke();

      ctx.fillStyle = "#0099FF";
      ctx.beginPath();
      ctx.roundRect(cx - 75, cy - 78, 150, 22, 11);
      ctx.fill();

      ctx.font = "bold 9px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(selectedProduct.printableLabel, cx, cy - 63);
    } else {
      // Generic Printable Frame
      ctx.beginPath();
      ctx.roundRect(cx - 140, cy - 100, 280, 200, 18);
      ctx.fillStyle = "#0b182d";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,153,255,0.4)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.stroke();

      ctx.fillStyle = "#0099FF";
      ctx.beginPath();
      ctx.roundRect(cx - 85, cy - 120, 170, 22, 11);
      ctx.fill();

      ctx.font = "bold 9px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(selectedProduct.printableLabel, cx, cy - 105);
    }

    ctx.restore();
  };

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Drawing Handlers
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (tool === "text") {
      const text = prompt("Enter text for canvas:", "NEXT LEVEL");
      if (text) {
        setLayers((prev) => [
          ...prev,
          { id: `layer-${Date.now()}`, name: text, type: "text", visible: true, text, color: brushColor, x, y, fontSize: 26 },
        ]);
        saveCanvasState();
      }
      return;
    }

    if (tool === "brush" || tool === "eraser") {
      setIsDrawing(true);
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = tool === "eraser" ? "#070d19" : brushColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvasState();
    }
  };

  // Image Upload Handlers
  const handlePhotoUpload = (e, isFuse = false) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (isFuse) {
          setBgImage(img);
        } else {
          const aspect = img.width / img.height;
          const targetW = 160;
          const targetH = targetW / aspect;
          setUploadedImages((prev) => [
            ...prev,
            {
              id: Date.now(),
              imgObj: img,
              x: canvas.width / 2 - targetW / 2,
              y: canvas.height / 2 - targetH / 2,
              width: targetW,
              height: targetH,
            },
          ]);
        }
        saveCanvasState();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Template / Sticker Button
  const handleApplyTemplate = (tmpl) => {
    if (tmpl.id === "blank") {
      setBgImage(null);
      setUploadedImages([]);
      setLayers([]);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    if (tmpl.symbol) {
      setLayers((prev) => [
        ...prev,
        { id: `layer-${Date.now()}`, name: tmpl.name, type: "sticker", visible: true, symbol: tmpl.symbol, x: 320, y: 200 },
      ]);
    } else if (tmpl.text) {
      setLayers((prev) => [
        ...prev,
        { id: `layer-${Date.now()}`, name: tmpl.name, type: "text", visible: true, text: tmpl.text, color: brushColor, x: 320, y: 200, fontSize: 26 },
      ]);
    }
    saveCanvasState();
  };

  // Undo / Redo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = history[newIndex];
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = history[newIndex];
    }
  };

  // Generate / Submit
  const handleGenerate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setPreviewDataUrl(canvas.toDataURL("image/png"));
    setShowModal(true);
    setIsSubmitted(false);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setIsSubmitted(false);
      navigate("/novelties");
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#040c17] text-white font-sans selection:bg-[#0099FF] selection:text-white flex flex-col justify-between">
      <Navbar />

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handlePhotoUpload(e, false)}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={fuseInputRef}
        onChange={(e) => handlePhotoUpload(e, true)}
        accept="image/*"
        className="hidden"
      />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-10 max-w-[1520px] mx-auto w-full flex-1">
        
        {/* Top Breadcrumb & Title */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0099FF]">
              <a href="/novelties" className="hover:underline flex items-center gap-1">
                <ArrowLeft className="h-3.5 w-3.5" /> 03 / NOVELTIES
              </a>
              <span className="text-white/30">/</span>
              <span className="text-white/70">BUILD YOUR NOVELTY</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-serif">
              Creative Studio Customizer
            </h1>
          </div>

          <a
            href="/novelties"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors"
          >
            ← Back to Novelties
          </a>
        </div>

        {/* ================= MAIN 2-COLUMN WORKSPACE (WITH RESTORED NOVELTIES SIDEBAR) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= 1. RESTORED LEFT SIDEBAR — NOVELTY PRODUCTS ================= */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-5 sticky top-28">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 px-1">
              SELECT PRODUCT
            </div>

            {/* Selected Product (Large Highlighted Card at Very Top) */}
            <div className="group relative overflow-hidden rounded-[20px] border-2 border-[#0099FF] bg-gradient-to-b from-[#0a1f3a] to-[#041224] p-4 shadow-[0_0_30px_rgba(0,153,255,0.25)] transition-all duration-300">
              <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 rounded-full bg-[#0099FF] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-[0_0_12px_rgba(0,153,255,0.6)]">
                <Check className="h-3 w-3" /> SELECTED
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-black/40">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041224] via-transparent to-transparent opacity-80" />
              </div>

              <div className="mt-4 px-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0099FF]">
                  {selectedProduct.tag}
                </span>
                <h3 className="text-xl font-bold text-white font-serif mt-0.5 leading-tight">
                  {selectedProduct.title}
                </h3>
              </div>
            </div>

            {/* Unselected Products List (Smaller, Darker, Subdued Thumbnails) */}
            <div className="flex flex-col gap-3 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
              {NOVELTY_PRODUCTS.filter((p) => p.id !== selectedProductId).map(
                (item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectProduct(item.id)}
                    className="group relative flex items-center gap-4 rounded-[16px] border border-white/5 bg-[#061426]/60 p-3 text-left opacity-60 transition-all duration-300 hover:opacity-100 hover:border-white/20 hover:bg-[#0a1e38]/80 hover:shadow-lg"
                  >
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-[10px] bg-black/50">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover grayscale-[30%] transition-transform duration-300 group-hover:scale-110 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="block text-[9px] font-bold uppercase tracking-widest text-white/40 group-hover:text-[#0099FF]">
                        {item.tag}
                      </span>
                      <h4 className="text-sm font-semibold text-white/90 truncate font-sans">
                        {item.title}
                      </h4>
                    </div>
                  </button>
                )
              )}
            </div>
          </div>

          {/* ================= RIGHT MAIN CONTENT AREA ================= */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-8">
            
            {/* 1. Header & Description */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-serif">
                {selectedProduct.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm sm:text-base text-white/70 leading-relaxed font-sans">
                {selectedProduct.desc}
              </p>
            </div>

            {/* 2. STYLE SECTION (MATCHING WIREFRAME REFERENCE EXACTLY — NO CONTAINER BORDER, NO COLOR CIRCLES) */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white font-sans">
                STYLE
              </h3>

              <div className="flex flex-wrap items-center gap-3">
                {selectedProduct.styles.map((stylePill) => {
                  const isSelected = activePills.includes(stylePill);
                  return (
                    <button
                      key={stylePill}
                      onClick={() => togglePill(stylePill)}
                      className={`h-11 px-7 sm:px-8 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 border-none select-none ${
                        isSelected
                          ? "bg-[#0099FF] text-white shadow-[0_0_20px_rgba(0,153,255,0.45)] scale-105"
                          : "bg-[#717b88] text-white/90 hover:bg-[#8691a0] hover:text-white"
                      }`}
                    >
                      {stylePill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. SKETCH PAD / DESIGN CANVAS STUDIO BOX */}
            <div className="relative rounded-[24px] border border-white/15 bg-[#091424] p-4 sm:p-6 shadow-2xl overflow-hidden">
              
              {/* Floating Top Tool Bar inside Canvas Box */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 rounded-full border border-white/10 bg-[#050f1c]/90 px-4 py-2 backdrop-blur-md">
                
                {/* Tools Group */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setTool("select")}
                    title="Select Tool"
                    className={`p-2 rounded-full transition-colors ${
                      tool === "select"
                        ? "bg-[#0099FF] text-white"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <MousePointer className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setTool("brush")}
                    title="Freehand Draw Tool"
                    className={`p-2 rounded-full transition-colors ${
                      tool === "brush"
                        ? "bg-[#0099FF] text-white"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setTool("text")}
                    title="Add Text"
                    className={`p-2 rounded-full transition-colors ${
                      tool === "text"
                        ? "bg-[#0099FF] text-white"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Type className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setTool("eraser")}
                    title="Eraser"
                    className={`p-2 rounded-full transition-colors ${
                      tool === "eraser"
                        ? "bg-[#0099FF] text-white"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Eraser className="h-4 w-4" />
                  </button>
                </div>

                {/* Canvas Actions */}
                <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
                  <button
                    onClick={handleUndo}
                    disabled={historyIndex <= 0}
                    title="Undo"
                    className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30"
                  >
                    <Undo2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handleRedo}
                    disabled={historyIndex >= history.length - 1}
                    title="Redo"
                    className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30"
                  >
                    <Redo2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleApplyTemplate({ id: "blank" })}
                    title="Clear Canvas"
                    className="p-2 rounded-full text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Main HTML5 Interactive Canvas Container */}
              <div className="relative flex items-center justify-center rounded-[18px] bg-[#040b15] border border-white/10 overflow-hidden min-h-[380px] sm:min-h-[440px]">
                
                {/* Vertical Brush Size Slider on Left */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 rounded-full bg-[#050f1c]/90 p-2.5 border border-white/10 backdrop-blur-md">
                  <span className="text-[9px] font-bold text-white/50">SIZE</span>
                  <input
                    type="range"
                    min="2"
                    max="32"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="h-32 w-2 accent-[#0099FF] cursor-pointer"
                    style={{ writingMode: "vertical-lr", direction: "rtl" }}
                  />
                  <span className="text-[10px] font-bold text-[#0099FF]">{brushSize}</span>
                </div>

                {/* Actual Interactive Canvas */}
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={440}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full max-w-[640px] h-[380px] sm:h-[440px] touch-none cursor-crosshair object-contain"
                />

                {/* Bottom Color Palette Bar */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-[#050f1c]/95 px-4 py-2 border border-white/15 backdrop-blur-md">
                  <div className="relative h-6 w-6 overflow-hidden rounded-full border border-white/40 cursor-pointer">
                    <input
                      type="color"
                      value={brushColor}
                      onChange={(e) => setBrushColor(e.target.value)}
                      className="absolute -inset-2 h-10 w-10 cursor-pointer border-none"
                    />
                  </div>

                  {PRESET_COLORS.map((hex) => (
                    <button
                      key={hex}
                      onClick={() => setBrushColor(hex)}
                      style={{ backgroundColor: hex }}
                      className={`h-5 w-5 rounded-full transition-transform ${
                        brushColor === hex
                          ? "ring-2 ring-white scale-125"
                          : "opacity-80 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Preset Assets / Templates Strip */}
              <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 shrink-0 pr-1">
                  Assets:
                </span>
                {TEMPLATES_ASSETS.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => handleApplyTemplate(tmpl)}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 shrink-0 hover:bg-[#0099FF] hover:border-[#0099FF] hover:text-white transition-all"
                  >
                    <span>{tmpl.symbol || "✨"}</span>
                    <span>{tmpl.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ================= 4. RESTORED UPLOAD SECTION ("OR UPLOAD YOUR PHOTO") ================= */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0099FF] mb-3">
                OR UPLOAD YOUR PHOTO
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Upload Photo Button Card */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex flex-col items-center justify-center gap-3 rounded-[20px] border-2 border-dashed border-white/20 bg-[#061426]/50 p-8 text-center transition-all duration-300 hover:border-[#0099FF] hover:bg-[#091b33]/80 hover:shadow-[0_0_24px_rgba(0,153,255,0.15)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-transform duration-300 group-hover:scale-110 group-hover:border-[#0099FF] group-hover:bg-[#0099FF]/20">
                    <Upload className="h-6 w-6 text-white/80 group-hover:text-[#0099FF]" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#0099FF]">
                      UPLOAD PHOTO
                    </span>
                    <span className="mt-1 block text-xs text-white/50">
                      PNG, JPG, WEBP • Drag & drop or click
                    </span>
                  </div>
                </button>

                {/* Fuse Photo & Drawing Card */}
                <button
                  onClick={() => fuseInputRef.current?.click()}
                  className="group flex flex-col items-center justify-center gap-3 rounded-[20px] border-2 border-dashed border-white/20 bg-[#061426]/50 p-8 text-center transition-all duration-300 hover:border-[#0099FF] hover:bg-[#091b33]/80 hover:shadow-[0_0_24px_rgba(0,153,255,0.15)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-transform duration-300 group-hover:scale-110 group-hover:border-[#0099FF] group-hover:bg-[#0099FF]/20">
                    <Layers className="h-6 w-6 text-white/80 group-hover:text-[#0099FF]" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#0099FF]">
                      FUSE PHOTO AND DRAWING
                    </span>
                    <span className="mt-1 block text-xs text-white/50">
                      Set photo as canvas background layer
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* ================= 5. RESTORED PRODUCT DESCRIPTION ================= */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0099FF]">
                DESCRIBE YOUR PRODUCT
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add details about your design, colors, text, or any special requests..."
                rows={4}
                className="w-full rounded-[20px] border border-white/15 bg-[#061426] p-5 text-sm text-white placeholder-white/40 focus:border-[#0099FF] focus:outline-none focus:ring-1 focus:ring-[#0099FF] transition-all resize-none"
              />
            </div>

            {/* ================= 6. RESTORED GENERATE CTA BUTTON ================= */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleGenerate}
                className="group inline-flex h-[56px] items-center justify-center gap-3 rounded-full bg-[#0099FF] px-10 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_30px_rgba(0,153,255,0.4)] transition-all duration-300 hover:bg-[#0088EE] hover:shadow-[0_0_50px_rgba(0,153,255,0.75)] hover:scale-105"
              >
                GENERATE →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ================= GENERATE / SUBMISSION MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative max-w-lg w-full rounded-[24px] border border-white/20 bg-[#061426] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-white/50 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0099FF]">
                  <Sparkles className="h-4 w-4" /> DESIGN SUMMARY
                </div>
                <h3 className="mt-2 text-2xl font-bold font-serif text-white">
                  {selectedProduct.title}
                </h3>

                <div className="mt-4 relative aspect-[4/3] w-full overflow-hidden rounded-[16px] border border-white/10 bg-black">
                  <img
                    src={previewDataUrl}
                    alt="Custom design preview"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="mt-4 space-y-2 text-xs text-white/70 border-t border-b border-white/10 py-3">
                  <div className="flex justify-between">
                    <span>Product:</span>
                    <span className="font-semibold text-white">{selectedProduct.title}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-white/60">Selected Styles:</span>
                    {activePills.map((pill) => (
                      <span
                        key={pill}
                        className="rounded-full bg-[#0099FF]/20 px-3 py-0.5 text-xs text-[#0099FF] font-semibold border border-[#0099FF]/30"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                  {description && (
                    <div className="pt-2 text-white/60 italic border-t border-white/5">
                      "{description}"
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white"
                  >
                    Edit Design
                  </button>
                  <button
                    onClick={handleConfirmSubmit}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0099FF] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(0,153,255,0.5)] hover:bg-[#0088EE]"
                  >
                    SUBMIT DESIGN <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0099FF]/20 text-[#0099FF] shadow-[0_0_30px_rgba(0,153,255,0.5)]">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-2xl font-bold font-serif text-white">
                  Design Submitted!
                </h3>
                <p className="mt-2 text-xs text-white/70 max-w-xs">
                  Your custom novelty design has been generated and queued for event production.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BuildNovelty;
