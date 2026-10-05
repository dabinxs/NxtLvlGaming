import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Pencil,
  Eraser,
  Type,
  Square,
  Circle,
  Undo2,
  Redo2,
  Trash2,
  Upload,
  Layers,
  MousePointer,
  Sparkles,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  Ruler,
  Palette,
  Download,
  Image as ImageIcon,
  RotateCcw,
  Zap,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Full catalog of Novelties matching the site
export const NOVELTY_PRODUCTS = [
  {
    id: "trucker-hats",
    title: "Custom Trucker Hats",
    tag: "HATS & BEANIES",
    desc: "Design your own trucker hat with custom patches, logos, colors, and details that match your style or event.",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
    mockupType: "hat",
    styles: [
      { id: "hat-color", label: "Hat Color", type: "color", options: ["#041222", "#0052cc", "#ffffff", "#e63946", "#2a9d8f", "#e76f51", "#2b2d42"] },
      { id: "patch", label: "Front Patch", type: "pill", options: ["Embroidered Patch", "Leather Patch", "Woven Label", "Direct Print"] },
      { id: "patch-shape", label: "Patch Shape", type: "pill", options: ["Rectangle", "Oval", "Circle", "Shield", "Custom Hex"] },
      { id: "position", label: "Position", type: "pill", options: ["Center Front", "Left Panel", "Right Side", "Visor"] },
      { id: "size", label: "Patch Size", type: "pill", options: ["Standard (3\")", "Large (4\")", "Compact (2.5\")"] }
    ]
  },
  {
    id: "custom-socks",
    title: "Custom Socks",
    tag: "SOCKS",
    desc: "Create your own custom crew or ankle socks with patterns, logos, custom artwork or text.",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=600&q=80",
    mockupType: "socks",
    styles: [
      { id: "base-color", label: "Base Color", type: "color", options: ["#041222", "#ffffff", "#0052cc", "#e63946", "#ffd166", "#06d6a0"] },
      { id: "pattern", label: "Pattern", type: "pill", options: ["Solid", "Athletic Stripes", "Checkerboard", "Polka Dots", "All-Over Print"] },
      { id: "placement", label: "Placement", type: "pill", options: ["Ankle Cuff", "Side Ribbing", "Top Footbed", "Full Sock"] }
    ]
  },
  {
    id: "custom-bracelets",
    title: "Bead-tastics Custom Bracelets",
    tag: "BRACELETS",
    desc: "Fun, hand-crafted bead bracelets designed by you, featuring custom text, charm accents, and color themes.",
    image: "https://images.unsplash.com/photo-1611591475879-c5ec2b810d7a?auto=format&fit=crop&w=600&q=80",
    mockupType: "bracelet",
    styles: [
      { id: "bracelet-color", label: "Bead Color Theme", type: "color", options: ["#0052cc", "#00f0ff", "#ff007f", "#ffb703", "#ffffff", "#000000"] },
      { id: "bead-style", label: "Bead Finish", type: "pill", options: ["Matte Polymer", "Crystal Glass", "Wooden Beads", "Metallic Silver"] },
      { id: "charm", label: "Charm Accent", type: "pill", options: ["Controller", "Star", "Heart", "Lightning", "Crown"] }
    ]
  },
  {
    id: "pillow-dolls",
    title: "Custom Pillow Dolls",
    tag: "PILLOW DOLLS",
    desc: "Turn your favorite photos, characters or gaming avatars into custom contour plush pillow dolls.",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    mockupType: "pillow",
    styles: [
      { id: "backing-color", label: "Backing Fabric", type: "color", options: ["#041222", "#1e293b", "#ffffff", "#e63946"] },
      { id: "shape", label: "Contour Cut", type: "pill", options: ["Character Outline", "Square Cushion", "Round Circle", "Heart Shape"] }
    ]
  },
  {
    id: "sequence-pillows",
    title: "Custom Sequence Pillows",
    tag: "SEQUENCE PILLOWS",
    desc: "Create interactive reversible sequin pillows with custom photos or artwork revealed on swipe.",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    mockupType: "pillow",
    styles: [
      { id: "sequin-color", label: "Reversible Sequin", type: "color", options: ["#0052cc", "#d4af37", "#c0c0c0", "#e63946", "#8a2be2"] },
      { id: "pillow-size", label: "Size", type: "pill", options: ["Standard 16x16\"", "Large 18x18\"", "Compact 14x14\""] }
    ]
  },
  {
    id: "intention-bracelets",
    title: "Intention Bracelet",
    tag: "BRACELETS",
    desc: "Design a meaningful hand-crafted bracelet with personalized stamped word, cord color, and purpose.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    mockupType: "bracelet",
    styles: [
      { id: "cord-color", label: "Cord Color", type: "color", options: ["#041222", "#8b4513", "#0052cc", "#e63946", "#ffffff"] },
      { id: "tag-material", label: "Plate Material", type: "pill", options: ["Brass Plate", "Stainless Silver", "Rose Gold", "Matte Black"] }
    ]
  },
  {
    id: "laser-keychains",
    title: "Laser-Engraved Keychains",
    tag: "KEYCHAINS",
    desc: "Personalize high-quality wooden, acrylic or metal keychains with custom laser engraving.",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=600&q=80",
    mockupType: "keychain",
    styles: [
      { id: "material", label: "Material", type: "pill", options: ["Walnut Wood", "Clear Acrylic", "Matte Black Metal", "Brushed Brass"] },
      { id: "fob-shape", label: "Fob Shape", type: "pill", options: ["Rectangle", "Circle", "Hotel Key Tag", "Shield"] }
    ]
  },
  {
    id: "stamped-rings",
    title: "Stamped Custom Rings",
    tag: "CUSTOM RINGS",
    desc: "Create custom stamped metallic rings with dates, initials, secret messages, or coordinates.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    mockupType: "ring",
    styles: [
      { id: "metal-finish", label: "Metal Finish", type: "pill", options: ["Silver Stainless", "18K Gold Plated", "Rose Gold", "Matte Black"] },
      { id: "band-width", label: "Band Width", type: "pill", options: ["Narrow (4mm)", "Classic (6mm)", "Wide (8mm)"] }
    ]
  },
  {
    id: "plush-bags",
    title: "Silly Sacks (Plush Bags)",
    tag: "PLUSH BAGS",
    desc: "Bring your imagination to life with custom character plush backpacks, drawstring sacks and pouches.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80",
    mockupType: "bag",
    styles: [
      { id: "bag-color", label: "Plush Color", type: "color", options: ["#0052cc", "#041222", "#e63946", "#ffb703", "#70e000", "#9c27b0"] },
      { id: "bag-type", label: "Bag Style", type: "pill", options: ["Drawstring Sack", "Mini Backpack", "Zipper Pouch"] }
    ]
  }
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

  // Selected style options per product
  const [selectedStyles, setSelectedStyles] = useState({});

  // Dynamic Canvas State
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("brush"); // "brush", "eraser", "text", "shape", "select"
  const [brushColor, setBrushColor] = useState("#0099FF");
  const [brushSize, setBrushSize] = useState(6);
  const [isDrawing, setIsDrawing] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [textItems, setTextItems] = useState([]);
  const [shapeItems, setShapeItems] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [bgImage, setBgImage] = useState(null);

  // History stack for Undo/Redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Product description text
  const [description, setDescription] = useState("");

  // Submission modal state
  const [showModal, setShowModal] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // File upload input refs
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
      const defaults = {};
      selectedProduct.styles.forEach((st) => {
        if (st.options && st.options.length > 0) {
          defaults[st.id] = st.options[0];
        }
      });
      setSelectedStyles(defaults);
    }
  }, [selectedProductId]);

  // Canvas drawing & setup logic
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

  // Redraw canvas background, mockups, images, text, and freehand drawing
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    // 1. Draw subtle studio canvas grid background
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#091424";
    ctx.fillRect(0, 0, w, h);

    // Subtle grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    const gridSize = 24;
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

    // 4. Draw Shapes
    shapeItems.forEach((shape) => {
      ctx.fillStyle = shape.color;
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 3;
      if (shape.type === "rectangle") {
        ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.width / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 5. Draw Text Items
    textItems.forEach((item) => {
      ctx.font = `bold ${item.fontSize || 24}px Inter, sans-serif`;
      ctx.fillStyle = item.color || "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
      ctx.shadowBlur = 6;
      ctx.fillText(item.text, item.x, item.y);
      ctx.shadowBlur = 0; // reset
    });

    // 6. Draw Mockup Template Outline Overlay
    drawMockupOverlay(ctx, w, h, selectedProduct.mockupType, selectedStyles);
  }, [bgImage, uploadedImages, shapeItems, textItems, selectedProduct, selectedStyles]);

  // Draw product mockup vector outlines on top of canvas for realistic preview
  const drawMockupOverlay = (ctx, w, h, mockupType, styles) => {
    ctx.save();
    const primaryColor = styles["hat-color"] || styles["base-color"] || styles["bracelet-color"] || styles["bag-color"] || "#0099FF";

    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);

    if (mockupType === "hat") {
      // Trucker Hat Outline
      const cx = w / 2;
      const cy = h / 2 - 10;

      // Visor / Brim
      ctx.beginPath();
      ctx.ellipse(cx, cy + 80, 150, 40, 0, 0, Math.PI * 2);
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 3;
      ctx.setLineDash([]);
      ctx.stroke();

      // Front Patch Boundary
      ctx.beginPath();
      ctx.roundRect(cx - 90, cy - 60, 180, 110, 12);
      ctx.strokeStyle = "#0099FF";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();

      // Printable Area Label
      ctx.font = "10px sans-serif";
      ctx.fillStyle = "rgba(0, 153, 255, 0.7)";
      ctx.textAlign = "center";
      ctx.fillText("PRINTABLE PATCH AREA", cx, cy - 70);
    } else if (mockupType === "socks") {
      // Sock Pair Outline
      const cx = w / 2;
      ctx.beginPath();
      ctx.roundRect(cx - 100, 40, 80, 240, 20);
      ctx.roundRect(cx + 20, 40, 80, 240, 20);
      ctx.strokeStyle = "rgba(0, 153, 255, 0.5)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
    } else if (mockupType === "pillow") {
      // Cushion Outline
      ctx.beginPath();
      ctx.roundRect(80, 40, w - 160, h - 80, 24);
      ctx.strokeStyle = "rgba(0, 153, 255, 0.5)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
    } else {
      // Standard Product Boundary
      ctx.beginPath();
      ctx.roundRect(40, 30, w - 80, h - 60, 16);
      ctx.strokeStyle = "rgba(0, 153, 255, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
    }

    ctx.restore();
  };

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Handle Mouse / Touch Drawing on Canvas
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (tool === "text") {
      const text = prompt("Enter text to add to canvas:", textInput || "NEXT LEVEL");
      if (text) {
        setTextItems((prev) => [
          ...prev,
          { id: Date.now(), text, x, y, color: brushColor, fontSize: brushSize * 4 },
        ]);
        saveCanvasState();
      }
      return;
    }

    if (tool === "shape") {
      setShapeItems((prev) => [
        ...prev,
        { id: Date.now(), type: "rectangle", x: x - 40, y: y - 30, width: 80, height: 60, color: brushColor },
      ]);
      saveCanvasState();
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

    if (tool === "eraser") {
      ctx.strokeStyle = "#091424"; // Erase using canvas bg
      ctx.lineWidth = brushSize * 2;
    } else {
      ctx.strokeStyle = brushColor;
    }

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
          // Set as background image layer
          setBgImage(img);
        } else {
          // Add as draggable image layer centered on canvas
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

  // Undo / Redo Actions
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

  // Reset Canvas
  const handleResetCanvas = () => {
    if (window.confirm("Are you sure you want to clear the design canvas?")) {
      setBgImage(null);
      setUploadedImages([]);
      setTextItems([]);
      setShapeItems([]);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      setHistory([]);
      setHistoryIndex(-1);
    }
  };

  // Generate / Submit Design Action
  const handleGenerate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    setPreviewDataUrl(dataUrl);
    setShowModal(true);
    setIsSubmitted(false);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setIsSubmitted(false);
      navigate("/novelties");
    }, 2500);
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
        {/* Top Breadcrumb & Page Title */}
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

        {/* ================= MAIN 2-COLUMN WORKSPACE (WIREFRAME COMPOSITION) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT SIDEBAR — NOVELTY PRODUCTS (WIREFRAME MATCH) ================= */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-5 sticky top-28">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 px-1">
              SELECT PRODUCT
            </div>

            {/* Selected Product (Large Highlighted Card at Very Top) */}
            <div className="group relative overflow-hidden rounded-[20px] border-2 border-[#0099FF] bg-gradient-to-b from-[#0a1f3a] to-[#041224] p-4 shadow-[0_0_30px_rgba(0,153,255,0.25)] transition-all duration-300">
              {/* Active Badge */}
              <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 rounded-full bg-[#0099FF] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-[0_0_12px_rgba(0,153,255,0.6)]">
                <Check className="h-3 w-3" /> SELECTED
              </div>

              {/* Large Product Image Preview */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-black/40">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041224] via-transparent to-transparent opacity-80" />
              </div>

              {/* Selected Title & Tag */}
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
                    {/* Thumbnail Image */}
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-[10px] bg-black/50">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover grayscale-[30%] transition-transform duration-300 group-hover:scale-110 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Info */}
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

            {/* 2. STYLE / Customization Options */}
            <div className="flex flex-col gap-3 rounded-[20px] border border-white/10 bg-[#061426]/80 p-5 sm:p-6 backdrop-blur-sm">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0099FF]">
                STYLE CONTROLS
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                {selectedProduct.styles.map((style) => (
                  <div key={style.id} className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                      {style.label}
                    </span>

                    {style.type === "color" ? (
                      <div className="flex items-center gap-2 bg-[#040e1b] rounded-full p-1 border border-white/10">
                        {style.options.map((hex) => (
                          <button
                            key={hex}
                            onClick={() =>
                              setSelectedStyles((prev) => ({
                                ...prev,
                                [style.id]: hex,
                              }))
                            }
                            style={{ backgroundColor: hex }}
                            className={`h-6 w-6 rounded-full transition-transform ${
                              selectedStyles[style.id] === hex
                                ? "ring-2 ring-[#0099FF] ring-offset-2 ring-offset-[#040e1b] scale-110"
                                : "opacity-70 hover:opacity-100"
                            }`}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {style.options &&
                          style.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() =>
                                setSelectedStyles((prev) => ({
                                  ...prev,
                                  [style.id]: opt,
                                }))
                              }
                              className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                                selectedStyles[style.id] === opt
                                  ? "bg-[#0099FF] text-white shadow-[0_0_14px_rgba(0,153,255,0.4)]"
                                  : "bg-[#0a1e38] text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. FUNCTIONAL DRAWING CANVAS (RECTANGULAR STUDIO BOX FROM WIREFRAME) */}
            <div className="relative rounded-[24px] border border-white/15 bg-[#091424] p-4 sm:p-6 shadow-2xl overflow-hidden">
              
              {/* Floating Top Tool Bar inside Canvas Box */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 rounded-full border border-white/10 bg-[#050f1c]/90 px-4 py-2 backdrop-blur-md">
                
                {/* Tools Group */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setTool("select")}
                    title="Select / Move Tool"
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
                    title="Add Text to Canvas"
                    className={`p-2 rounded-full transition-colors ${
                      tool === "text"
                        ? "bg-[#0099FF] text-white"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Type className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setTool("shape")}
                    title="Add Shape"
                    className={`p-2 rounded-full transition-colors ${
                      tool === "shape"
                        ? "bg-[#0099FF] text-white"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Square className="h-4 w-4" />
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
                    className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <Undo2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handleRedo}
                    disabled={historyIndex >= history.length - 1}
                    title="Redo"
                    className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <Redo2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handleResetCanvas}
                    title="Clear Canvas"
                    className="p-2 rounded-full text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Main HTML5 Interactive Canvas Container */}
              <div className="relative flex items-center justify-center rounded-[18px] bg-[#040b15] border border-white/10 overflow-hidden min-h-[380px] sm:min-h-[440px]">
                
                {/* Vertical Brush Size Slider on Left (Matching Wireframe) */}
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

                {/* Bottom Color Palette Bar (Matching Wireframe) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-[#050f1c]/95 px-4 py-2 border border-white/15 backdrop-blur-md">
                  
                  {/* Color Picker Input */}
                  <div className="relative h-6 w-6 overflow-hidden rounded-full border border-white/40 cursor-pointer">
                    <input
                      type="color"
                      value={brushColor}
                      onChange={(e) => setBrushColor(e.target.value)}
                      className="absolute -inset-2 h-10 w-10 cursor-pointer border-none"
                    />
                  </div>

                  {/* Preset Colors */}
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
            </div>

            {/* 4. UPLOAD SECTION ("OR UPLOAD YOUR PHOTO") */}
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

            {/* 5. PRODUCT DESCRIPTION */}
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

            {/* 6. GENERATE CTA BUTTON (BOTTOM-RIGHT WIREFRAME MATCH) */}
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

                {/* Rendered Canvas Preview */}
                <div className="mt-4 relative aspect-[4/3] w-full overflow-hidden rounded-[16px] border border-white/10 bg-black">
                  <img
                    src={previewDataUrl}
                    alt="Custom design preview"
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Specs List */}
                <div className="mt-4 space-y-2 text-xs text-white/70 border-t border-b border-white/10 py-3">
                  <div className="flex justify-between">
                    <span>Product:</span>
                    <span className="font-semibold text-white">{selectedProduct.title}</span>
                  </div>
                  {Object.entries(selectedStyles).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="capitalize">{k.replace("-", " ")}:</span>
                      <span className="font-semibold text-[#0099FF]">{v}</span>
                    </div>
                  ))}
                  {description && (
                    <div className="pt-2 text-white/60 italic border-t border-white/5">
                      "{description}"
                    </div>
                  )}
                </div>

                {/* Modal Buttons */}
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
