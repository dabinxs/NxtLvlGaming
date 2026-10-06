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
  Lock,
  Unlock,
  Copy,
  FlipHorizontal,
  FlipVertical,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Box,
  Sliders,
  Grid,
  RotateCcw,
  Star,
  Heart,
  Flame,
  Zap,
  Crown,
  Gamepad2,
  Trophy,
  Compass,
  Tag,
  FolderPlus,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Full Catalog of 10 Novelties with High-Quality Product Templates & View Modes
export const NOVELTY_PRODUCTS = [
  {
    id: "trucker-hats",
    title: "Custom Trucker Hats",
    tag: "HATS & BEANIES",
    desc: "Design your own trucker hat with custom patches, logos, colors, and details that match your style or event.",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
    mockupType: "hat",
    views: ["Preview", "Front", "Back", "Side"],
    printableLabel: "PRINTABLE PATCH AREA",
    styles: ["Front Patch", "Hat Color", "Patch Shape", "Text", "Graphics", "Position", "Size", "Others"],
  },
  {
    id: "hats-beanies",
    title: "Hats & Beanies",
    tag: "HATS & BEANIES",
    desc: "Custom knit beanies and winter caps with embroidered patches or woven labels.",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80",
    mockupType: "beanie",
    views: ["Preview", "Front", "Back"],
    printableLabel: "EMBROIDERY CUFF AREA",
    styles: ["Fold Cuff", "Knit Color", "Embroidered Logo", "Pom Pom", "Text", "Others"],
  },
  {
    id: "custom-socks",
    title: "Custom Socks",
    tag: "SOCKS",
    desc: "Create your own custom crew or ankle socks with patterns, logos, custom artwork or text.",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=600&q=80",
    mockupType: "socks",
    views: ["Preview", "Front", "Back"],
    printableLabel: "PRINTABLE SOCK REGION",
    styles: ["Base Color", "Pattern", "Text", "Graphics", "Logo", "Placement", "Others"],
  },
  {
    id: "custom-bracelets",
    title: "Bead-tastics Custom Bracelets",
    tag: "BRACELETS",
    desc: "Fun, hand-crafted bead bracelets designed by you, featuring custom text, charm accents, and color themes.",
    image: "https://images.unsplash.com/photo-1611591475879-c5ec2b810d7a?auto=format&fit=crop&w=600&q=80",
    mockupType: "bracelet",
    views: ["Preview", "Front", "Back"],
    printableLabel: "CHARM & LETTER BEAD AREA",
    styles: ["Bracelet Color", "Bead Style", "Text", "Charm", "Pattern", "Others"],
  },
  {
    id: "pillow-dolls",
    title: "Custom Pillow Dolls",
    tag: "PILLOW DOLLS",
    desc: "Turn your favorite photos, characters or gaming avatars into custom contour plush pillow dolls.",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    mockupType: "pillow",
    views: ["Preview", "Front", "Back"],
    printableLabel: "FRONT PRINTABLE AREA",
    styles: ["Pillow Color", "Artwork", "Text", "Image", "Shape", "Others"],
  },
  {
    id: "sequence-pillows",
    title: "Custom Sequence Pillows",
    tag: "SEQUENCE PILLOWS",
    desc: "Create interactive reversible sequin pillows with custom photos or artwork revealed on swipe.",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    mockupType: "pillow",
    views: ["Preview", "Front", "Back"],
    printableLabel: "SEQUIN REVEAL AREA",
    styles: ["Sequin Color", "Hidden Artwork", "Text", "Size", "Others"],
  },
  {
    id: "intention-bracelets",
    title: "Intention Bracelet",
    tag: "BRACELETS",
    desc: "Design a meaningful hand-crafted bracelet with personalized stamped word, cord color, and purpose.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    mockupType: "bracelet",
    views: ["Preview", "Front", "Back"],
    printableLabel: "STAMPED PLATE REGION",
    styles: ["Cord Color", "Plate Material", "Stamped Word", "Finish", "Others"],
  },
  {
    id: "laser-keychains",
    title: "Laser-Engraved Keychains",
    tag: "KEYCHAINS",
    desc: "Personalize high-quality wooden, acrylic or metal keychains with custom laser engraving.",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=600&q=80",
    mockupType: "keychain",
    views: ["Preview", "Front", "Back"],
    printableLabel: "LASER ENGRAVING AREA",
    styles: ["Material", "Fob Shape", "Engraved Text", "Logo", "Others"],
  },
  {
    id: "stamped-rings",
    title: "Stamped Custom Rings",
    tag: "CUSTOM RINGS",
    desc: "Create custom stamped metallic rings with dates, initials, secret messages, or coordinates.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    mockupType: "ring",
    views: ["Preview", "Front", "Back"],
    printableLabel: "RING STAMPING SURFACE",
    styles: ["Metal Finish", "Stamped Message", "Band Width", "Font Style", "Others"],
  },
  {
    id: "plush-bags",
    title: "Silly Sacks (Plush Bags)",
    tag: "PLUSH BAGS",
    desc: "Bring your imagination to life with custom character plush backpacks, drawstring sacks and pouches.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80",
    mockupType: "bag",
    views: ["Preview", "Front", "Back"],
    printableLabel: "CUSTOM FRONT PANEL",
    styles: ["Plush Color", "Bag Style", "Name Patch", "Character Type", "Others"],
  },
];

const PRESET_COLORS = [
  "#0099FF", // Next Level Blue
  "#ffffff", // White
  "#000000", // Black
  "#6b7280", // Gray
  "#ef4444", // Red
  "#f97316", // Orange
  "#eab308", // Yellow
  "#22c55e", // Green
  "#06b6d4", // Cyan
  "#8b5cf6", // Purple
  "#ec4899", // Pink
];

// Preset Templates / Assets for Bottom Strip
const TEMPLATES_ASSETS = [
  { id: "blank", name: "Blank", icon: "Blank" },
  { id: "nextlvl", name: "NEXT LEVEL", icon: "Text", type: "text", text: "NEXT LEVEL" },
  { id: "controller", name: "Gaming", icon: "Gamepad", type: "sticker", symbol: "🎮" },
  { id: "flame", name: "Flame", icon: "Flame", type: "sticker", symbol: "🔥" },
  { id: "star", name: "Star", icon: "Star", type: "shape", shapeType: "star" },
  { id: "nl-badge", name: "NL Logo", icon: "Badge", type: "text", text: "NXT LVL" },
  { id: "smiley", name: "Smiley", icon: "Smile", type: "sticker", symbol: "😊" },
  { id: "heart", name: "Heart", icon: "Heart", type: "shape", shapeType: "heart" },
  { id: "trophy", name: "Trophy", icon: "Trophy", type: "sticker", symbol: "🏆" },
  { id: "zap", name: "Lightning", icon: "Zap", type: "sticker", symbol: "⚡" },
  { id: "crown", name: "Crown", icon: "Crown", type: "sticker", symbol: "👑" },
];

const BuildNovelty = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Selected novelty product
  const selectedIdFromUrl = searchParams.get("product");
  const [selectedProductId, setSelectedProductId] = useState(
    selectedIdFromUrl || "trucker-hats"
  );

  const selectedProduct =
    NOVELTY_PRODUCTS.find((p) => p.id === selectedProductId) ||
    NOVELTY_PRODUCTS[0];

  // Selected view mode: "Preview", "Front", "Back", "Side"
  const [currentView, setCurrentView] = useState("Preview");

  // Selected active tool: "select", "draw", "text", "image", "shape", "stickers", "eraser"
  const [activeTool, setActiveTool] = useState("select");

  // Canvas Settings (Left Sidebar Brush/Object Settings)
  const [brushSize, setBrushSize] = useState(15);
  const [brushOpacity, setBrushOpacity] = useState(100);
  const [brushColor, setBrushColor] = useState("#0099FF");
  const [zoomLevel, setZoomLevel] = useState(100);

  // Text Tool State
  const [textInput, setTextInput] = useState("");
  const [fontFamily, setFontFamily] = useState("sans-serif");

  // Active Layers / Canvas Objects
  const [layers, setLayers] = useState([
    { id: "layer-1", name: "Text", type: "text", visible: true, locked: false, text: "NEXT LEVEL", color: "#ffffff", x: 320, y: 200, fontSize: 28 },
  ]);
  const [selectedLayerId, setSelectedLayerId] = useState("layer-1");

  // Product Selector Drawer
  const [showProductDrawer, setShowProductDrawer] = useState(false);

  // Drawing & Canvas Refs
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // History stack for Undo/Redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Description and Modal State
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef(null);

  // Handle Product Switch
  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
    setSearchParams({ product: id });
    setCurrentView("Preview");
    setShowProductDrawer(false);
  };

  // Canvas Drawing Logic
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

    // 1. Dark Blueprint Grid Background matching media_1791286666040.png
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

    // 2. Draw Product Mockup Outline Template in Center
    drawProductMockup(ctx, w, h, selectedProduct.mockupType, currentView);

    // 3. Draw Active Layers (Text, Images, Shapes, Stickers)
    layers.forEach((layer) => {
      if (!layer.visible) return;

      ctx.save();
      if (layer.type === "text") {
        ctx.font = `bold ${layer.fontSize || 24}px ${fontFamily}, sans-serif`;
        ctx.fillStyle = layer.color || "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(layer.text, layer.x, layer.y);
      } else if (layer.type === "sticker") {
        ctx.font = "42px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(layer.symbol || "⭐", layer.x, layer.y);
      } else if (layer.type === "image" && layer.imgObj) {
        ctx.drawImage(layer.imgObj, layer.x - 50, layer.y - 50, 100, 100);
      } else if (layer.type === "shape") {
        ctx.fillStyle = layer.color || "#0099FF";
        if (layer.shapeType === "star") {
          ctx.beginPath();
          ctx.arc(layer.x, layer.y, 30, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(layer.x - 30, layer.y - 30, 60, 60);
        }
      }
      ctx.restore();
    });

    // 4. Draw Active Bounding Box for Selected Object (Matching media_1791286666040.png)
    const selectedLayer = layers.find((l) => l.id === selectedLayerId);
    if (selectedLayer && selectedLayer.visible) {
      const bx = selectedLayer.x;
      const by = selectedLayer.y;

      ctx.save();
      ctx.strokeStyle = "#0099FF";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(bx - 90, by - 55, 180, 110);

      // Draw handles on 4 corners & 4 midpoints
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#0099FF";
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      const handles = [
        [bx - 90, by - 55],
        [bx + 90, by - 55],
        [bx - 90, by + 55],
        [bx + 90, by + 55],
        [bx, by - 55],
        [bx, by + 55],
        [bx - 90, by],
        [bx + 90, by],
      ];
      handles.forEach(([hx, hy]) => {
        ctx.beginPath();
        ctx.arc(hx, hy, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      ctx.restore();
    }
  }, [layers, selectedLayerId, selectedProduct, currentView, fontFamily]);

  // Vector Product Mockup Renderer (Clean plain templates with no watermarks)
  const drawProductMockup = (ctx, w, h, mockupType, view) => {
    ctx.save();
    const cx = w / 2;
    const cy = h / 2;

    if (mockupType === "hat") {
      // High Quality Trucker Hat Template SVG Representation
      // Crown Back Mesh
      ctx.beginPath();
      ctx.arc(cx, cy - 20, 175, Math.PI * 0.85, Math.PI * 0.15, false);
      ctx.fillStyle = "#091a33";
      ctx.fill();
      ctx.strokeStyle = "#1a2e4d";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Front White Panel
      ctx.beginPath();
      ctx.ellipse(cx, cy - 20, 140, 115, 0, Math.PI, 0, false);
      ctx.fillStyle = "#f0f4f8";
      ctx.fill();
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Curved Navy Visor / Brim
      ctx.beginPath();
      ctx.ellipse(cx, cy + 95, 175, 42, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#081427";
      ctx.fill();
      ctx.strokeStyle = "#0099FF";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Top Button
      ctx.beginPath();
      ctx.arc(cx, cy - 135, 10, 0, Math.PI * 2);
      ctx.fillStyle = "#081427";
      ctx.fill();

      // Printable Patch Area Dashed Outline & Pill Label (Matching media_1791286666040.png)
      ctx.beginPath();
      ctx.roundRect(cx - 100, cy - 65, 200, 120, 14);
      ctx.strokeStyle = "#0099FF";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.stroke();

      // Printable Area Blue Badge Pill Tag
      ctx.fillStyle = "#0099FF";
      ctx.beginPath();
      ctx.roundRect(cx - 75, cy - 88, 150, 22, 11);
      ctx.fill();

      ctx.font = "bold 9px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(selectedProduct.printableLabel, cx, cy - 73);

      // "Start designing" center placeholder when layers empty
      if (layers.length === 0) {
        ctx.font = "14px sans-serif";
        ctx.fillStyle = "#94a3b8";
        ctx.fillText("Start designing", cx, cy + 5);
      }
    } else if (mockupType === "beanie") {
      // Beanie Knit Cap
      ctx.beginPath();
      ctx.roundRect(cx - 130, cy - 130, 260, 220, [100, 100, 10, 10]);
      ctx.fillStyle = "#0d1f38";
      ctx.fill();
      ctx.strokeStyle = "#0099FF";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Fold Cuff
      ctx.beginPath();
      ctx.roundRect(cx - 140, cy + 30, 280, 80, 12);
      ctx.fillStyle = "#1e293b";
      ctx.fill();
      ctx.strokeStyle = "#0099FF";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();

      // Badge Label
      ctx.fillStyle = "#0099FF";
      ctx.beginPath();
      ctx.roundRect(cx - 75, cy + 10, 150, 20, 10);
      ctx.fill();

      ctx.font = "bold 9px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(selectedProduct.printableLabel, cx, cy + 23);
    } else {
      // Standard Generic Product Mockup Frame
      ctx.beginPath();
      ctx.roundRect(cx - 150, cy - 110, 300, 220, 20);
      ctx.fillStyle = "#0b182d";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,153,255,0.4)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.stroke();

      // Badge Label
      ctx.fillStyle = "#0099FF";
      ctx.beginPath();
      ctx.roundRect(cx - 85, cy - 130, 170, 22, 11);
      ctx.fill();

      ctx.font = "bold 9px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(selectedProduct.printableLabel, cx, cy - 115);
    }

    ctx.restore();
  };

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Canvas Interactions
  const startDrawing = (e) => {
    if (activeTool !== "draw" && activeTool !== "eraser") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setIsDrawing(true);
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
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
    ctx.strokeStyle = activeTool === "eraser" ? "#070d19" : brushColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvasState();
    }
  };

  // Add Template / Sticker to Canvas
  const handleApplyTemplate = (tmpl) => {
    if (tmpl.id === "blank") {
      setLayers([]);
      setSelectedLayerId(null);
      return;
    }

    const newLayer = {
      id: `layer-${Date.now()}`,
      name: tmpl.name,
      type: tmpl.type || "text",
      visible: true,
      locked: false,
      text: tmpl.text || tmpl.name,
      symbol: tmpl.symbol,
      shapeType: tmpl.shapeType,
      color: brushColor,
      x: 320,
      y: 200,
      fontSize: 26,
    };
    setLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  // Add Text Layer
  const handleAddText = () => {
    if (!textInput.trim()) return;
    const newLayer = {
      id: `layer-${Date.now()}`,
      name: `Text: ${textInput}`,
      type: "text",
      visible: true,
      locked: false,
      text: textInput,
      color: brushColor,
      x: 320,
      y: 200,
      fontSize: 26,
    };
    setLayers((prev) => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
    setTextInput("");
  };

  // Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const newLayer = {
          id: `layer-${Date.now()}`,
          name: `Image (${file.name})`,
          type: "image",
          visible: true,
          locked: false,
          imgObj: img,
          x: 320,
          y: 200,
        };
        setLayers((prev) => [...prev, newLayer]);
        setSelectedLayerId(newLayer.id);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Layer Operations
  const toggleLayerVisibility = (id) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  };

  const deleteLayer = (id) => {
    setLayers((prev) => prev.filter((l) => l.id !== id));
    if (selectedLayerId === id) setSelectedLayerId(null);
  };

  const duplicateLayer = (id) => {
    const target = layers.find((l) => l.id === id);
    if (!target) return;
    const copy = {
      ...target,
      id: `layer-${Date.now()}`,
      name: `${target.name} Copy`,
      x: target.x + 15,
      y: target.y + 15,
    };
    setLayers((prev) => [...prev, copy]);
    setSelectedLayerId(copy.id);
  };

  // Generate Action
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
    <div className="min-h-screen bg-[#050b14] text-white font-sans selection:bg-[#0099FF] selection:text-white flex flex-col justify-between">
      <Navbar />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      <main className="pt-24 pb-12 px-3 sm:px-6 max-w-[1720px] mx-auto w-full flex-1">
        
        {/* ================= 1. TOP TOOLBAR (MATCHING media_1791286666040.png EXACTLY) ================= */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-[#14233c] bg-[#091322] px-4 py-2.5 shadow-xl">
          
          {/* Left Tools Group */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            
            {/* Select Tool */}
            <button
              onClick={() => setActiveTool("select")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTool === "select"
                  ? "bg-[#0066FF] text-white shadow-[0_0_16px_rgba(0,102,255,0.5)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <MousePointer className="h-4 w-4" /> Select
            </button>

            {/* Draw Tool */}
            <button
              onClick={() => setActiveTool("draw")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTool === "draw"
                  ? "bg-[#0066FF] text-white shadow-[0_0_16px_rgba(0,102,255,0.5)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Pencil className="h-4 w-4" /> Draw
            </button>

            {/* Text Tool */}
            <button
              onClick={() => setActiveTool("text")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTool === "text"
                  ? "bg-[#0066FF] text-white shadow-[0_0_16px_rgba(0,102,255,0.5)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Type className="h-4 w-4" /> Text
            </button>

            {/* Image Tool */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-xs font-bold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <ImageIcon className="h-4 w-4" /> Image
            </button>

            {/* Shape Tool */}
            <button
              onClick={() => setActiveTool("shape")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTool === "shape"
                  ? "bg-[#0066FF] text-white shadow-[0_0_16px_rgba(0,102,255,0.5)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Square className="h-4 w-4" /> Shape
            </button>

            {/* Eraser Tool */}
            <button
              onClick={() => setActiveTool("eraser")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTool === "eraser"
                  ? "bg-[#0066FF] text-white shadow-[0_0_16px_rgba(0,102,255,0.5)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Eraser className="h-4 w-4" /> Eraser
            </button>
          </div>

          {/* Center/Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Undo / Redo */}
            <div className="flex items-center gap-1 border-r border-white/10 pr-3">
              <button
                onClick={() => {}}
                title="Undo"
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              >
                <Undo2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => {}}
                title="Redo"
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              >
                <Redo2 className="h-4 w-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
              <button
                onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                className="text-white/60 hover:text-white"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="text-xs font-semibold text-white min-w-[40px] text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(200, z + 10))}
                className="text-white/60 hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Fit to Screen */}
            <button
              onClick={() => setZoomLevel(100)}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10"
            >
              <Maximize2 className="h-3.5 w-3.5" /> Fit
            </button>

            {/* Clear Canvas */}
            <button
              onClick={() => setLayers([])}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear
            </button>
          </div>
        </div>

        {/* ================= MAIN STUDIO LAYOUT (3-COLUMN CANVAS WORKSPACE) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          
          {/* ================= 2. LEFT SIDEBAR — SETTINGS & LAYERS ================= */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Product Switcher Bar */}
            <div className="flex items-center justify-between rounded-[18px] border border-[#14233c] bg-[#091322] p-3.5">
              <div className="min-w-0">
                <span className="block text-[9px] font-bold uppercase tracking-widest text-[#0099FF]">
                  ACTIVE NOVELTY
                </span>
                <h2 className="text-sm font-bold text-white truncate font-serif">
                  {selectedProduct.title}
                </h2>
              </div>
              <button
                onClick={() => setShowProductDrawer(!showProductDrawer)}
                className="rounded-xl bg-[#0066FF] px-3 py-1.5 text-xs font-bold text-white shadow-[0_0_12px_rgba(0,102,255,0.4)] hover:bg-[#0052cc]"
              >
                Switch
              </button>
            </div>

            {/* Contextual Settings Panel (Brush Settings / Text Settings) */}
            <div className="rounded-[20px] border border-[#14233c] bg-[#091322] p-5 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  {activeTool === "draw"
                    ? "Brush Settings"
                    : activeTool === "text"
                    ? "Text Settings"
                    : "Context Settings"}
                </h3>
                <ChevronUp className="h-4 w-4 text-white/40" />
              </div>

              {activeTool === "text" ? (
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter custom text..."
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2 text-xs text-white focus:border-[#0099FF] focus:outline-none"
                  />
                  <button
                    onClick={handleAddText}
                    className="rounded-xl bg-[#0066FF] py-2 text-xs font-bold text-white hover:bg-[#0052cc]"
                  >
                    Add Text to Canvas
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Brush Size Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-white/70 mb-1.5 font-medium">
                      <span>Size</span>
                      <span className="text-white font-bold">{brushSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="50"
                      value={brushSize}
                      onChange={(e) => setBrushSize(Number(e.target.value))}
                      className="w-full accent-[#0066FF] cursor-pointer"
                    />
                  </div>

                  {/* Brush Opacity Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-white/70 mb-1.5 font-medium">
                      <span>Opacity</span>
                      <span className="text-white font-bold">{brushOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={brushOpacity}
                      onChange={(e) => setBrushOpacity(Number(e.target.value))}
                      className="w-full accent-[#0066FF] cursor-pointer"
                    />
                  </div>

                  {/* Color Selection */}
                  <div>
                    <span className="block text-xs text-white/70 mb-2 font-medium">
                      Color
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {PRESET_COLORS.slice(0, 6).map((hex) => (
                        <button
                          key={hex}
                          onClick={() => setBrushColor(hex)}
                          style={{ backgroundColor: hex }}
                          className={`h-6 w-6 rounded-full transition-transform ${
                            brushColor === hex
                              ? "ring-2 ring-[#0066FF] ring-offset-2 ring-offset-[#091322] scale-110"
                              : "opacity-80 hover:opacity-100"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Layers Panel (Matching media_1791286666040.png Exactly) */}
            <div className="rounded-[20px] border border-[#14233c] bg-[#091322] p-5 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Layers
                </h3>
                <ChevronUp className="h-4 w-4 text-white/40" />
              </div>

              {/* Layer List Items */}
              <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                {layers.length === 0 ? (
                  <span className="text-xs text-white/40 italic py-2">
                    No active layers
                  </span>
                ) : (
                  layers.map((layer) => (
                    <div
                      key={layer.id}
                      onClick={() => setSelectedLayerId(layer.id)}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs cursor-pointer transition-all ${
                        selectedLayerId === layer.id
                          ? "bg-[#0066FF]/20 border border-[#0066FF]/50 text-white"
                          : "bg-white/5 border border-transparent text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLayerVisibility(layer.id);
                          }}
                          className="text-white/50 hover:text-white"
                        >
                          {layer.visible ? (
                            <Eye className="h-3.5 w-3.5 text-[#0099FF]" />
                          ) : (
                            <EyeOff className="h-3.5 w-3.5 text-white/30" />
                          )}
                        </button>
                        <Type className="h-3.5 w-3.5 text-white/60 shrink-0" />
                        <span className="truncate font-medium">{layer.name}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateLayer(layer.id);
                          }}
                          title="Duplicate"
                          className="text-white/40 hover:text-white p-1"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteLayer(layer.id);
                          }}
                          title="Delete"
                          className="text-red-400/60 hover:text-red-400 p-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ================= 3. CENTER CANVAS (MAIN PRODUCT WORKSPACE) ================= */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            <div className="relative rounded-[24px] border border-[#14233c] bg-[#070d19] p-2 sm:p-4 shadow-2xl flex items-center justify-center min-h-[460px] sm:min-h-[520px] overflow-hidden">
              <canvas
                ref={canvasRef}
                width={640}
                height={520}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full max-w-[640px] h-[460px] sm:h-[520px] touch-none cursor-crosshair object-contain"
              />
            </div>

            {/* ================= 5. STICKER / ASSET STRIP BELOW CANVAS ================= */}
            <div className="rounded-[20px] border border-[#14233c] bg-[#091322] p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Templates / Stickers (Optional)
                </span>
                <div className="flex items-center gap-1 text-white/50">
                  <button className="p-1 hover:text-white">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="p-1 hover:text-white">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Horizontal Asset Carousel Strip */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1 custom-scrollbar">
                {TEMPLATES_ASSETS.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => handleApplyTemplate(tmpl)}
                    className="flex flex-col items-center justify-center gap-1.5 h-20 w-20 shrink-0 rounded-2xl border border-white/10 bg-black/40 p-2 text-center transition-all duration-300 hover:border-[#0099FF] hover:bg-[#0099FF]/10 hover:scale-105"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white">
                      {tmpl.symbol ? (
                        <span className="text-xl">{tmpl.symbol}</span>
                      ) : tmpl.icon === "Flame" ? (
                        <Flame className="h-5 w-5 text-orange-400" />
                      ) : tmpl.icon === "Star" ? (
                        <Star className="h-5 w-5 text-yellow-400" />
                      ) : tmpl.icon === "Heart" ? (
                        <Heart className="h-5 w-5 text-red-500" />
                      ) : (
                        <Sparkles className="h-5 w-5 text-[#0099FF]" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-white/80 truncate w-full">
                      {tmpl.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ================= 4. RIGHT SIDEBAR — VIEWS, PALETTE & QUICK ACTIONS ================= */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Product View Selector Panel */}
            <div className="rounded-[20px] border border-[#14233c] bg-[#091322] p-5 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Product View
                </h3>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {selectedProduct.views.map((v) => (
                  <button
                    key={v}
                    onClick={() => setCurrentView(v)}
                    className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2.5 text-center transition-all ${
                      currentView === v
                        ? "bg-[#0066FF] text-white shadow-[0_0_14px_rgba(0,102,255,0.4)]"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Box className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase">{v}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Panel */}
            <div className="rounded-[20px] border border-[#14233c] bg-[#091322] p-5 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Color Palette
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {/* Color Picker Wheel */}
                <div className="relative h-7 w-7 overflow-hidden rounded-full border border-white/40 cursor-pointer">
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
                    className={`h-6 w-6 rounded-full transition-transform ${
                      brushColor === hex
                        ? "ring-2 ring-white scale-125"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions Panel (Matching media_1791286666040.png Grid Exactly) */}
            <div className="rounded-[20px] border border-[#14233c] bg-[#091322] p-5 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Quick Actions
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => selectedLayerId && duplicateLayer(selectedLayerId)}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-all hover:bg-white/10"
                >
                  <Copy className="h-4 w-4 text-white/70" />
                  <span className="text-[9px] font-bold text-white/80">Duplicate</span>
                </button>

                <button
                  onClick={() => {}}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-all hover:bg-white/10"
                >
                  <FlipHorizontal className="h-4 w-4 text-white/70" />
                  <span className="text-[9px] font-bold text-white/80">Flip Horiz</span>
                </button>

                <button
                  onClick={() => {}}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-all hover:bg-white/10"
                >
                  <FlipVertical className="h-4 w-4 text-white/70" />
                  <span className="text-[9px] font-bold text-white/80">Flip Vert</span>
                </button>

                <button
                  onClick={() => {}}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-all hover:bg-white/10"
                >
                  <ChevronUp className="h-4 w-4 text-white/70" />
                  <span className="text-[9px] font-bold text-white/80">Bring Fwd</span>
                </button>

                <button
                  onClick={() => {}}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-all hover:bg-white/10"
                >
                  <ChevronDown className="h-4 w-4 text-white/70" />
                  <span className="text-[9px] font-bold text-white/80">Send Back</span>
                </button>

                <button
                  onClick={() => selectedLayerId && deleteLayer(selectedLayerId)}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center transition-all hover:bg-red-500/20"
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                  <span className="text-[9px] font-bold text-red-400">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 6. PRODUCT DESCRIPTION & FINAL GENERATE CTA ================= */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end rounded-[24px] border border-[#14233c] bg-[#091322] p-6 shadow-2xl">
          <div className="lg:col-span-8 flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-[0.15em] text-[#0099FF]">
              DESCRIBE YOUR PRODUCT
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about your design, colors, text, or any special requests..."
              rows={3}
              className="w-full rounded-2xl border border-white/15 bg-black/40 p-4 text-xs text-white placeholder-white/40 focus:border-[#0099FF] focus:outline-none transition-all resize-none"
            />
          </div>

          <div className="lg:col-span-4 flex justify-end">
            <button
              onClick={handleGenerate}
              className="w-full sm:w-auto inline-flex h-[56px] items-center justify-center gap-3 rounded-full bg-[#0066FF] px-10 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_30px_rgba(0,102,255,0.5)] transition-all duration-300 hover:bg-[#0052cc] hover:scale-105"
            >
              GENERATE / SUBMIT DESIGN →
            </button>
          </div>
        </div>
      </main>

      {/* ================= SLIDE-OUT NOVELTY PRODUCT BROWSER DRAWER ================= */}
      {showProductDrawer && (
        <div className="fixed inset-0 z-50 flex justify-start bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#091322] border-r border-white/15 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <h3 className="text-lg font-bold font-serif text-white uppercase">
                  Select Novelty Product
                </h3>
                <button
                  onClick={() => setShowProductDrawer(false)}
                  className="p-1 text-white/60 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {NOVELTY_PRODUCTS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectProduct(item.id)}
                    className={`flex items-center gap-4 rounded-2xl p-3 text-left transition-all ${
                      selectedProductId === item.id
                        ? "border-2 border-[#0099FF] bg-[#0099FF]/20 text-white shadow-[0_0_20px_rgba(0,153,255,0.3)]"
                        : "border border-white/10 bg-white/5 opacity-70 hover:opacity-100 hover:bg-white/10 text-white/80"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-14 w-16 rounded-xl object-cover"
                    />
                    <div>
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-[#0099FF]">
                        {item.tag}
                      </span>
                      <h4 className="text-sm font-bold text-white font-serif">
                        {item.title}
                      </h4>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUBMISSION MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="relative max-w-lg w-full rounded-[28px] border border-white/20 bg-[#091322] p-6 sm:p-8 shadow-2xl">
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

                <div className="mt-4 relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-white/10 bg-[#070d19]">
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
                  <div className="flex justify-between">
                    <span>Selected View:</span>
                    <span className="font-semibold text-[#0099FF]">{currentView}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Layers Count:</span>
                    <span className="font-semibold text-white">{layers.length} Active Layer(s)</span>
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
                    className="inline-flex items-center gap-2 rounded-full bg-[#0066FF] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(0,102,255,0.5)] hover:bg-[#0052cc]"
                  >
                    SUBMIT DESIGN <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0066FF]/20 text-[#0066FF] shadow-[0_0_30px_rgba(0,102,255,0.5)]">
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
