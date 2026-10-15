import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MousePointer,
  Pencil,
  Type,
  Image as ImageIcon,
  Square,
  Circle,
  Smile,
  Eraser,
  Undo2,
  Redo2,
  Maximize2,
  Minimize2,
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
  Box,
  Flame,
  Star,
  Heart,
  Zap,
  Crown,
  Sticker,
  RotateCcw,
  Download,
  CheckCircle2,
  Palette,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { supabase, CMS_MEDIA_BUCKET } from "../lib/supabase";

// Interactive 2D Full RGB Spectrum Color Picker (Matching user reference)
const RGBSpectrumPicker = ({ activeColor, onChangeColor, onClose }) => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pickerPos, setPickerPos] = useState({ x: 90, y: 50 });
  const [brightness, setBrightness] = useState(1);
  const [hexInput, setHexInput] = useState(activeColor);

  useEffect(() => {
    setHexInput(activeColor);
  }, [activeColor]);

  // Draw 2D RGB Spectrum canvas
  const drawSpectrum = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    // 1. Horizontal Hue Gradient (Red -> Yellow -> Green -> Cyan -> Blue -> Magenta -> Red)
    const hueGrad = ctx.createLinearGradient(0, 0, w, 0);
    hueGrad.addColorStop(0, "#ff0000");
    hueGrad.addColorStop(0.17, "#ffff00");
    hueGrad.addColorStop(0.33, "#00ff00");
    hueGrad.addColorStop(0.5, "#00ffff");
    hueGrad.addColorStop(0.67, "#0000ff");
    hueGrad.addColorStop(0.83, "#ff00ff");
    hueGrad.addColorStop(1, "#ff0000");

    ctx.fillStyle = hueGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Vertical White Gradient (Top transparent, bottom solid white)
    const whiteGrad = ctx.createLinearGradient(0, 0, 0, h);
    whiteGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
    whiteGrad.addColorStop(1, "rgba(255, 255, 255, 1)");
    ctx.fillStyle = whiteGrad;
    ctx.fillRect(0, 0, w, h);

    // 3. Dark Shade Overlay for Brightness slider
    if (brightness < 1) {
      ctx.fillStyle = `rgba(0, 0, 0, ${1 - brightness})`;
      ctx.fillRect(0, 0, w, h);
    }

    // 4. Target Circle Marker 'O'
    ctx.save();
    ctx.beginPath();
    ctx.arc(pickerPos.x, pickerPos.y, 8, 0, Math.PI * 2);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(pickerPos.x, pickerPos.y, 7, 0, Math.PI * 2);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }, [pickerPos, brightness]);

  useEffect(() => {
    drawSpectrum();
  }, [drawSpectrum]);

  const pickColorAt = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(canvas.width, clientX - rect.left));
    const y = Math.max(0, Math.min(canvas.height, clientY - rect.top));

    setPickerPos({ x, y });

    const ctx = canvas.getContext("2d");
    const pixel = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
    const hex =
      "#" +
      [pixel[0], pixel[1], pixel[2]]
        .map((c) => c.toString(16).padStart(2, "0"))
        .join("");

    onChangeColor(hex);
  };

  const getRgbFromHex = (hexStr) => {
    const cleanHex = (hexStr || "#0099ff").replace("#", "");
    const r = parseInt(cleanHex.slice(0, 2), 16) || 0;
    const g = parseInt(cleanHex.slice(2, 4), 16) || 0;
    const b = parseInt(cleanHex.slice(4, 6), 16) || 0;
    return { r, g, b };
  };

  const currentRgb = getRgbFromHex(activeColor);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-[#061224] p-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-md w-[260px] animate-in fade-in duration-150 z-40">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0099FF]">
          EDIT RGB SPECTRUM
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white text-xs font-bold px-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* 2D Spectrum Box & Brightness Slider (Matching user reference) */}
      <div className="flex items-stretch gap-2.5">
        <div className="relative rounded-lg border border-white/20 overflow-hidden shrink-0 cursor-crosshair">
          <canvas
            ref={canvasRef}
            width={170}
            height={130}
            onMouseDown={(e) => {
              setIsDragging(true);
              pickColorAt(e.clientX, e.clientY);
            }}
            onMouseMove={(e) => {
              if (isDragging) pickColorAt(e.clientX, e.clientY);
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={(e) => {
              setIsDragging(true);
              if (e.touches[0]) pickColorAt(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              if (isDragging && e.touches[0])
                pickColorAt(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchEnd={() => setIsDragging(false)}
            className="w-[170px] h-[130px] block touch-none"
          />
        </div>

        {/* Color Swatch & Vertical Lightness Slider */}
        <div className="flex flex-col justify-between items-center gap-2 flex-1">
          <div
            style={{ backgroundColor: activeColor }}
            className="w-full h-8 rounded-lg border border-white/30 shadow-inner"
            title="Active Color Preview"
          />
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.02"
            value={brightness}
            onChange={(e) => setBrightness(parseFloat(e.target.value))}
            className="h-[84px] w-2 accent-[#0099FF] cursor-pointer"
            style={{ writingMode: "vertical-lr", direction: "rtl" }}
            title="Brightness / Shade Slider"
          />
        </div>
      </div>

      {/* RGB & HEX Value Inputs */}
      <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-white/80 bg-[#030914] p-2 rounded-lg border border-white/10">
        <div>
          <span className="text-white/40 font-sans font-bold mr-1">RGB:</span>
          <span>
            {currentRgb.r}, {currentRgb.g}, {currentRgb.b}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-white/40 font-sans font-bold">HEX:</span>
          <input
            type="text"
            value={hexInput}
            onChange={(e) => {
              setHexInput(e.target.value);
              if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                onChangeColor(e.target.value);
              }
            }}
            className="w-16 rounded bg-white/10 px-1 py-0.5 text-[10px] text-white font-mono uppercase text-center border border-white/20 focus:outline-none focus:border-[#0099FF]"
          />
        </div>
      </div>
    </div>
  );
};

// Full Catalog of 10 Novelty Products with Plain Templates
export const NOVELTY_PRODUCTS = [
  {
    id: "trucker-hats",
    title: "Custom Trucker Hats",
    tag: "HATS & BEANIES",
    desc: "Design your own trucker hat with custom patches, logos, colors, and details that match your style or event.",
    image: "/novelty-templates/hat-front.jpg",
    sideImage: "/novelty-templates/hat-side.jpg",
    backImage: "/novelty-templates/hat-back.jpg",
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
    id: "hats-beanies",
    title: "Hats & Beanies",
    tag: "HEADWEAR",
    desc: "Custom knit beanies and cuff caps with embroidered patches, woven labels, or printed logos.",
    image: "/novelty-templates/beanie.jpg",
    mockupType: "beanie",
    printableLabel: "EMBROIDERY / PATCH REGION",
    styles: [
      "Cuff Patch",
      "Beanie Color",
      "Knit Pattern",
      "Text",
      "Emblem",
      "Others",
    ],
  },
  {
    id: "custom-socks",
    title: "Custom Socks",
    tag: "SOCKS",
    desc: "Create your own custom crew or ankle socks with patterns, logos, custom artwork or text.",
    image: "/novelty-templates/socks.jpg",
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
    image: "/novelty-templates/bead-bracelet.jpg",
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
    image: "/novelty-templates/pillow-doll.jpg",
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
    image: "/novelty-templates/sequin-pillow.jpg",
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
    image: "/novelty-templates/intention-bracelet.jpg",
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
    image: "/novelty-templates/keychain.jpg",
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
    image: "/novelty-templates/ring.jpg",
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
    image: "/novelty-templates/plush-bag.jpg",
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

// Preset Templates / Assets for Bottom Strip & Full Sketch Studio
const TEMPLATES_ASSETS = [
  { id: "blank", name: "Clear", symbol: null },
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

const getDesignObjectBounds = (object, ctx) => {
  if (!object) return null;
  if (object.imgObj) {
    return { x: object.x, y: object.y, width: object.width, height: object.height };
  }
  if (object.type === "text") {
    ctx.save();
    ctx.font = `bold ${object.fontSize || 28}px sans-serif`;
    const width = Math.max(40, ctx.measureText(object.text || "").width + 12);
    ctx.restore();
    return { x: object.x - width / 2, y: object.y - (object.fontSize || 28) / 2 - 6, width, height: (object.fontSize || 28) + 12 };
  }
  return { x: object.x - 30, y: object.y - 30, width: 60, height: 60 };
};

const pointInsideDesignObject = (point, object, bounds) => {
  const centerX = bounds.x + bounds.width / 2;
  const centerY = bounds.y + bounds.height / 2;
  const radians = -((object.rotation || 0) * Math.PI) / 180;
  const dx = point.x - centerX;
  const dy = point.y - centerY;
  const localX = dx * Math.cos(radians) - dy * Math.sin(radians) + centerX;
  const localY = dx * Math.sin(radians) + dy * Math.cos(radians) + centerY;
  return localX >= bounds.x && localX <= bounds.x + bounds.width && localY >= bounds.y && localY <= bounds.y + bounds.height;
};

const getCanvasPoint = (event, canvas) => {
  const rect = canvas.getBoundingClientRect();
  const scale = Math.min(rect.width / canvas.width, rect.height / canvas.height);
  const offsetX = (rect.width - canvas.width * scale) / 2;
  const offsetY = (rect.height - canvas.height * scale) / 2;
  return {
    x: (event.clientX - rect.left - offsetX) / scale,
    y: (event.clientY - rect.top - offsetY) / scale,
  };
};

const getOrderedDesignObjects = (images, layers) => [
  ...images.map((object, index) => ({ object, kind: "image", fallbackOrder: index })),
  ...layers.map((object, index) => ({ object, kind: "layer", fallbackOrder: images.length + index })),
]
  .sort((a, b) => (a.object.zIndex ?? a.fallbackOrder) - (b.object.zIndex ?? b.fallbackOrder))
  .map(({ object, kind }) => ({ ...object, objectKind: kind }));

const drawTexturedTriangle = (ctx, image, sourcePoints, targetPoints) => {
  const [s0, s1, s2] = sourcePoints;
  const [t0, t1, t2] = targetPoints;
  const sx1 = s1.x - s0.x; const sy1 = s1.y - s0.y;
  const sx2 = s2.x - s0.x; const sy2 = s2.y - s0.y;
  const determinant = sx1 * sy2 - sx2 * sy1;
  if (!determinant) return;
  const tx1 = t1.x - t0.x; const ty1 = t1.y - t0.y;
  const tx2 = t2.x - t0.x; const ty2 = t2.y - t0.y;
  const a = (tx1 * sy2 - tx2 * sy1) / determinant;
  const c = (tx2 * sx1 - tx1 * sx2) / determinant;
  const b = (ty1 * sy2 - ty2 * sy1) / determinant;
  const d = (ty2 * sx1 - ty1 * sx2) / determinant;
  const e = t0.x - a * s0.x - c * s0.y;
  const f = t0.y - b * s0.x - d * s0.y;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(t0.x, t0.y); ctx.lineTo(t1.x, t1.y); ctx.lineTo(t2.x, t2.y);
  ctx.closePath(); ctx.clip();
  ctx.transform(a, b, c, d, e, f);
  ctx.drawImage(image, 0, 0);
  ctx.restore();
};

const drawWrappedArtwork = (ctx, image, x, y, width, height, warp) => {
  const columns = 10; const rows = 7;
  const map = (u, v) => ({
    x: x + u * width + warp * (v - 0.5) * width * 0.22,
    y: y + v * height + warp * Math.sin(Math.PI * u) * (0.5 - v) * height * 1.15,
  });
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const u0 = column / columns; const u1 = (column + 1) / columns;
      const v0 = row / rows; const v1 = (row + 1) / rows;
      const s00 = { x: u0 * image.width, y: v0 * image.height };
      const s10 = { x: u1 * image.width, y: v0 * image.height };
      const s01 = { x: u0 * image.width, y: v1 * image.height };
      const s11 = { x: u1 * image.width, y: v1 * image.height };
      const p00 = map(u0, v0); const p10 = map(u1, v0);
      const p01 = map(u0, v1); const p11 = map(u1, v1);
      drawTexturedTriangle(ctx, image, [s00, s10, s11], [p00, p10, p11]);
      drawTexturedTriangle(ctx, image, [s00, s11, s01], [p00, p11, p01]);
    }
  }
};

const getDefaultSurfaceTransform = (productId) => ({
  x: 0,
  y: 0,
  zoom: 1.8,
  rotation: 0,
  warp: ["trucker-hats", "hats-beanies"].includes(productId) ? 0.2 : ["custom-bracelets", "intention-bracelets", "stamped-rings"].includes(productId) ? 0.28 : 0.1,
});

const BuildNovelty = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Selected novelty product state
  const selectedIdFromUrl = searchParams.get("product");
  const [selectedProductId, setSelectedProductId] = useState(
    selectedIdFromUrl || "trucker-hats"
  );
  const [advancedProductPreview, setAdvancedProductPreview] = useState(false);
  const [surfaceTransform, setSurfaceTransform] = useState(() => getDefaultSurfaceTransform(selectedIdFromUrl || "trucker-hats"));
  const surfaceDragRef = useRef(null);

  const selectedProduct =
    NOVELTY_PRODUCTS.find((p) => p.id === selectedProductId) ||
    NOVELTY_PRODUCTS[0];

  // Product View Mode (for hats: front, side, back)
  const [activeView, setActiveView] = useState("front");

  // Full Sketch Mode Toggle
  const [isFullSketchMode, setIsFullSketchMode] = useState(false);

  // Active style pills
  const [activePills, setActivePills] = useState([]);

  // Active Tool: "select", "brush", "eraser", "text", "shape", "sticker"
  const [tool, setTool] = useState("brush");
  const [brushColor, setBrushColor] = useState("#0099FF");
  const [brushSize, setBrushSize] = useState(6);
  const [isDrawing, setIsDrawing] = useState(false);

  // RGB Spectrum Color Picker Popover States
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFullColorPicker, setShowFullColorPicker] = useState(false);

  // Active Canvas Layers
  const [layers, setLayers] = useState([]);
  const [selectedLayerId, setSelectedLayerId] = useState(null);
  const dragRef = useRef(null);

  // Image Upload Layers
  const [uploadedImages, setUploadedImages] = useState([]);
  const [bgImage, setBgImage] = useState(null);

  // Loaded Product Template Image Object
  const [productTemplateImg, setProductTemplateImg] = useState(null);

  // History stack for Undo/Redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);
  const saveCanvasStateRef = useRef(null);
  const skipNextHistoryCaptureRef = useRef(false);
  const historyCaptureTimerRef = useRef(null);

  // Canvas Refs (Compact Canvas & Full Sketch Canvas)
  const compactCanvasRef = useRef(null);
  const fullCanvasRef = useRef(null);
  const drawingLayerCanvasRef = useRef(null);

  // Description and Modal State
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSavingDesign, setIsSavingDesign] = useState(false);
  const [designError, setDesignError] = useState("");
  const [savedDesign, setSavedDesign] = useState(null);

  // File Upload Refs
  const fileInputRef = useRef(null);
  const fuseInputRef = useRef(null);

  // Sync selected product with URL search param
  const resetCanvasHistory = useCallback(() => {
    clearTimeout(historyCaptureTimerRef.current);
    historyRef.current = [];
    historyIndexRef.current = -1;
    setHistory([]);
    setHistoryIndex(-1);
  }, []);

  const resetProductDesign = useCallback(() => {
    resetCanvasHistory();
    setLayers([]);
    setUploadedImages([]);
    setBgImage(null);
    setSelectedLayerId(null);
    setDescription("");
    setPreviewDataUrl("");
    setSavedDesign(null);
    setIsSubmitted(false);
    setAdvancedProductPreview(false);
    if (drawingLayerCanvasRef.current) {
      const ctx = drawingLayerCanvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, drawingLayerCanvasRef.current.width, drawingLayerCanvasRef.current.height);
    }
  }, [resetCanvasHistory]);

  const handleSelectProduct = (id) => {
    if (id === selectedProductId) return;
    resetProductDesign();
    setSurfaceTransform(getDefaultSurfaceTransform(id));
    setSelectedProductId(id);
    setActiveView("front");
    setSearchParams({ product: id });
  };

  const selectedImage = uploadedImages.find((image) => image.id === selectedLayerId) || null;
  const selectedBackgroundImage = bgImage?.imgObj && bgImage.id === selectedLayerId ? bgImage : null;
  const selectedDesignLayer = layers.find((layer) => layer.id === selectedLayerId) || null;
  const selectedDesignObject = selectedImage || selectedBackgroundImage || selectedDesignLayer;
  const selectedDesignName = selectedImage?.name || selectedBackgroundImage?.name || selectedDesignLayer?.name || selectedDesignLayer?.text || selectedDesignLayer?.symbol || "No object selected";

  const updateSelectedObject = (updates) => {
    if (!selectedLayerId) return;
    if (selectedImage) {
      setUploadedImages((current) => current.map((image) => image.id === selectedLayerId ? { ...image, ...updates } : image));
    } else if (selectedBackgroundImage) {
      setBgImage((current) => current?.id === selectedLayerId ? { ...current, ...updates } : current);
    } else {
      setLayers((current) => current.map((layer) => layer.id === selectedLayerId ? { ...layer, ...updates } : layer));
    }
  };
  const getNextDesignZIndex = () => getOrderedDesignObjects(uploadedImages, layers).length;

  useEffect(() => {
    const productParam = searchParams.get("product");
    const nextProductId = NOVELTY_PRODUCTS.some((product) => product.id === productParam)
      ? productParam
      : NOVELTY_PRODUCTS[0].id;
    if (nextProductId !== selectedProductId) {
      resetProductDesign();
      setSurfaceTransform(getDefaultSurfaceTransform(nextProductId));
      setSelectedProductId(nextProductId);
      setActiveView("front");
    }
  }, [resetProductDesign, searchParams, selectedProductId]);

  // Set default style selections when product changes
  useEffect(() => {
    if (selectedProduct && selectedProduct.styles) {
      setActivePills(selectedProduct.styles.slice(0, 2));
    }
  }, [selectedProduct]);

  // Load Plain Product Template Image
  useEffect(() => {
    let imgUrl = selectedProduct.image;
    if (selectedProduct.id === "trucker-hats") {
      if (activeView === "side" && selectedProduct.sideImage) {
        imgUrl = selectedProduct.sideImage;
      } else if (activeView === "back" && selectedProduct.backImage) {
        imgUrl = selectedProduct.backImage;
      }
    }

    let isCurrent = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (isCurrent) setProductTemplateImg(img);
    };
    img.onerror = () => {
      if (isCurrent) setProductTemplateImg(null);
    };
    img.src = imgUrl;
    return () => {
      isCurrent = false;
    };
  }, [selectedProduct, activeView]);

  const togglePill = (pillName) => {
    setActivePills((prev) =>
      prev.includes(pillName)
        ? prev.filter((p) => p !== pillName)
        : [...prev, pillName]
    );
  };

  const duplicateSelectedLayer = () => {
    const source = selectedDesignObject || layers[layers.length - 1];
    if (!source) return;
    const copy = {
      ...source,
      id: `${source.imgObj ? "image" : "layer"}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: `${source.name || source.text || source.symbol || "Design"} copy`,
      x: source.x + 24,
      y: source.y + 24,
      zIndex: getNextDesignZIndex(),
    };
    if (source.imgObj) setUploadedImages((current) => [...current, copy]);
    else setLayers((current) => [...current, copy]);
    setSelectedLayerId(copy.id);
  };

  const flipSelectedLayer = (axis) => {
    if (!selectedLayerId) return;
    updateSelectedObject({ [axis]: !selectedDesignObject?.[axis] });
  };

  const moveSelectedLayer = (direction) => {
    if (!selectedLayerId) return;
    if (selectedBackgroundImage) return;
    const stack = getOrderedDesignObjects(uploadedImages, layers);
    const index = stack.findIndex((object) => object.id === selectedLayerId);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= stack.length) return;
    [stack[index], stack[nextIndex]] = [stack[nextIndex], stack[index]];
    const ordered = stack.map((object, zIndex) => ({ ...object, zIndex }));
    setUploadedImages(ordered.filter((object) => object.objectKind === "image").map(({ objectKind, ...object }) => object));
    setLayers(ordered.filter((object) => object.objectKind === "layer").map(({ objectKind, ...object }) => object));
  };

  const deleteSelectedLayer = () => {
    if (!selectedLayerId) return;
    if (selectedBackgroundImage) setBgImage(null);
    else if (selectedImage) setUploadedImages((current) => current.filter((image) => image.id !== selectedLayerId));
    else setLayers((current) => current.filter((layer) => layer.id !== selectedLayerId));
    setSelectedLayerId(null);
  };

  // Active Canvas Ref depending on Full Sketch Mode
  const getActiveCanvas = useCallback(() => {
    return isFullSketchMode ? fullCanvasRef.current : compactCanvasRef.current;
  }, [isFullSketchMode]);

  const getDrawingLayerCanvas = useCallback(() => {
    if (!drawingLayerCanvasRef.current) {
      const layerCanvas = document.createElement("canvas");
      layerCanvas.width = 640;
      layerCanvas.height = 440;
      drawingLayerCanvasRef.current = layerCanvas;
    }
    return drawingLayerCanvasRef.current;
  }, []);

  // Save Canvas State for Undo/Redo
  const saveCanvasState = useCallback(() => {
    const canvas = getActiveCanvas();
    if (!canvas) return;
    try {
      const snapshot = {
        image: canvas.toDataURL("image/png"),
        layers,
        uploadedImages,
        bgImage,
        drawing: getDrawingLayerCanvas().toDataURL("image/png"),
      };
      const currentIndex = historyIndexRef.current;
      const nextHistory = historyRef.current.slice(0, currentIndex + 1);
      const previous = nextHistory[nextHistory.length - 1];
      if (
        previous?.image === snapshot.image &&
        previous?.layers === snapshot.layers &&
        previous?.uploadedImages === snapshot.uploadedImages &&
        previous?.bgImage === snapshot.bgImage
      ) return;
      nextHistory.push(snapshot);
      historyRef.current = nextHistory;
      historyIndexRef.current = nextHistory.length - 1;
      setHistory(nextHistory);
      setHistoryIndex(historyIndexRef.current);
    } catch (error) {
      console.error("Unable to save novelty design history", error);
    }
  }, [bgImage, getActiveCanvas, getDrawingLayerCanvas, layers, uploadedImages]);

  useEffect(() => {
    saveCanvasStateRef.current = saveCanvasState;
  }, [saveCanvasState]);

  // Redraw Canvas (called whenever layers, tool, or view changes)
  const redrawCanvasOnTarget = useCallback(
    (canvas, includeSelection = true) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const h = canvas.height;

      // 1. Clear background & draw subtle studio grid
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#070d19";
      ctx.fillRect(0, 0, w, h);

      // Studio Blueprint Grid Lines
      ctx.strokeStyle = "#0d1b30";
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

      // 2. Draw Plain Realistic Product Template Photo
      let productBounds = null;
      if (productTemplateImg) {
        ctx.save();
        // Fit template image neatly in center
        const imgAspect = productTemplateImg.width / productTemplateImg.height;
        const canvasAspect = w / h;
        let drawW, drawH, drawX, drawY;

        if (imgAspect > canvasAspect) {
          drawW = w * 0.82;
          drawH = drawW / imgAspect;
        } else {
          drawH = h * 0.82;
          drawW = drawH * imgAspect;
        }
        drawX = (w - drawW) / 2;
        drawY = (h - drawH) / 2;
        productBounds = { x: drawX, y: drawY, width: drawW, height: drawH };

        ctx.drawImage(productTemplateImg, drawX, drawY, drawW, drawH);
        ctx.restore();
      }

      // Product preview maps the customer's full design into a print area on
      // the chosen item. The studio canvas remains available for free placement.
      if (advancedProductPreview && productBounds) {
        const { x, y, width, height } = productBounds;
        const printAreas = {
          "trucker-hats": [0.27, 0.19, 0.46, 0.36],
          "hats-beanies": [0.25, 0.2, 0.5, 0.4],
          "custom-socks": [0.28, 0.15, 0.44, 0.68],
          "custom-bracelets": [0.27, 0.38, 0.46, 0.24],
          "pillow-dolls": [0.25, 0.25, 0.5, 0.5],
          "sequence-pillows": [0.2, 0.25, 0.6, 0.48],
          "intention-bracelets": [0.3, 0.38, 0.4, 0.24],
          "laser-keychains": [0.28, 0.22, 0.44, 0.52],
          "stamped-rings": [0.28, 0.35, 0.44, 0.3],
          "plush-bags": [0.22, 0.23, 0.56, 0.54],
        };
        const [left, top, areaWidth, areaHeight] = printAreas[selectedProductId] || [0.22, 0.22, 0.56, 0.56];
        const printX = x + width * left;
        const printY = y + height * top;
        const printW = width * areaWidth;
        const printH = height * areaHeight;
        ctx.save();
        ctx.beginPath();
        if (selectedProductId === "trucker-hats" || selectedProductId === "hats-beanies") {
          ctx.moveTo(printX + printW * 0.08, printY);
          ctx.quadraticCurveTo(printX + printW * 0.5, printY - printH * 0.08, printX + printW * 0.92, printY);
          ctx.lineTo(printX + printW, printY + printH * 0.9);
          ctx.quadraticCurveTo(printX + printW * 0.5, printY + printH, printX, printY + printH * 0.9);
        } else {
          ctx.roundRect(printX, printY, printW, printH, Math.min(printW, printH) * 0.12);
        }
        ctx.closePath();
        ctx.clip();
        ctx.translate(printX, printY);
        ctx.scale(printW / w, printH / h);
      }

      // 3. Draw Fused Background Image if present
      if (bgImage) {
        if (bgImage.imgObj) {
          const centerX = bgImage.x + bgImage.width / 2;
          const centerY = bgImage.y + bgImage.height / 2;
          const cropZoom = Math.max(1, bgImage.cropZoom || 1);
          const sourceWidth = bgImage.imgObj.naturalWidth / cropZoom;
          const sourceHeight = bgImage.imgObj.naturalHeight / cropZoom;
          const sourceX = (bgImage.imgObj.naturalWidth - sourceWidth) * (bgImage.cropOffsetX ?? 0.5);
          const sourceY = (bgImage.imgObj.naturalHeight - sourceHeight) * (bgImage.cropOffsetY ?? 0.5);
          ctx.save();
          ctx.globalAlpha = bgImage.opacity ?? 1;
          ctx.translate(centerX, centerY);
          ctx.rotate(((bgImage.rotation || 0) * Math.PI) / 180);
          ctx.scale(bgImage.flipX ? -1 : 1, bgImage.flipY ? -1 : 1);
          ctx.translate(-centerX, -centerY);
          if (bgImage.visible !== false) ctx.drawImage(bgImage.imgObj, sourceX, sourceY, sourceWidth, sourceHeight, bgImage.x, bgImage.y, bgImage.width, bgImage.height);
          ctx.restore();
        } else {
          ctx.drawImage(bgImage, 0, 0, w, h);
        }
      }

      // 4. Draw uploaded images, text, and stickers in their layer-stack order.
      getOrderedDesignObjects(uploadedImages, layers).forEach((item) => {
        if (item.objectKind === "image" && item.imgObj && item.visible !== false) {
          const centerX = item.x + item.width / 2;
          const centerY = item.y + item.height / 2;
          ctx.save();
          ctx.globalAlpha = item.opacity ?? 1;
          ctx.translate(centerX, centerY);
          ctx.rotate(((item.rotation || 0) * Math.PI) / 180);
          ctx.scale(item.flipX ? -1 : 1, item.flipY ? -1 : 1);
          ctx.translate(-centerX, -centerY);
          const cropZoom = Math.max(1, item.cropZoom || 1);
          const sourceWidth = item.imgObj.naturalWidth / cropZoom;
          const sourceHeight = item.imgObj.naturalHeight / cropZoom;
          const sourceX = (item.imgObj.naturalWidth - sourceWidth) * (item.cropOffsetX ?? 0.5);
          const sourceY = (item.imgObj.naturalHeight - sourceHeight) * (item.cropOffsetY ?? 0.5);
          ctx.drawImage(item.imgObj, sourceX, sourceY, sourceWidth, sourceHeight, item.x, item.y, item.width, item.height);
          ctx.restore();
        } else if (item.objectKind === "layer" && item.visible !== false) {
          ctx.save();
          if (item.type === "text") {
            ctx.font = `bold ${item.fontSize || 28}px sans-serif`;
            ctx.fillStyle = item.color || "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
          } else if (item.type === "sticker") {
            ctx.font = "46px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
          }
          ctx.translate(item.x, item.y);
          ctx.rotate(((item.rotation || 0) * Math.PI) / 180);
          ctx.scale(item.flipX ? -1 : 1, item.flipY ? -1 : 1);
          ctx.globalAlpha = item.opacity ?? 1;
          ctx.fillText(item.type === "text" ? item.text : item.symbol || "⭐", 0, 0);
          ctx.restore();
        }
      });

      const drawingLayer = getDrawingLayerCanvas();
      ctx.drawImage(drawingLayer, 0, 0, w, h);

      if (advancedProductPreview && productBounds) ctx.restore();

      if (!advancedProductPreview && includeSelection && tool === "select" && selectedDesignObject && selectedDesignObject.visible !== false) {
        const bounds = getDesignObjectBounds(selectedDesignObject, ctx);
        const centerX = bounds.x + bounds.width / 2;
        const centerY = bounds.y + bounds.height / 2;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(((selectedDesignObject.rotation || 0) * Math.PI) / 180);
        ctx.strokeStyle = "#43b5ff";
        ctx.lineWidth = 2;
        ctx.setLineDash([7, 4]);
        ctx.strokeRect(-bounds.width / 2, -bounds.height / 2, bounds.width, bounds.height);
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(0, -bounds.height / 2);
        ctx.lineTo(0, -bounds.height / 2 - 26);
        ctx.stroke();
        [[-bounds.width / 2, -bounds.height / 2], [bounds.width / 2, -bounds.height / 2], [-bounds.width / 2, bounds.height / 2], [bounds.width / 2, bounds.height / 2]].forEach(([x, y]) => {
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
          ctx.strokeStyle = "#168fff";
          ctx.stroke();
        });
        ctx.beginPath();
        ctx.arc(0, -bounds.height / 2 - 26, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#168fff";
        ctx.fill();
        ctx.restore();
      }


    },
    [getDrawingLayerCanvas, productTemplateImg, bgImage, uploadedImages, layers, selectedDesignObject, tool, advancedProductPreview, selectedProductId]
  );

  const redrawCanvas = useCallback(() => {
    if (compactCanvasRef.current) redrawCanvasOnTarget(compactCanvasRef.current);
    if (fullCanvasRef.current) redrawCanvasOnTarget(fullCanvasRef.current);
  }, [redrawCanvasOnTarget]);
  const redrawCanvasLatestRef = useRef(redrawCanvas);
  redrawCanvasLatestRef.current = redrawCanvas;

  useEffect(() => {
    redrawCanvas();
    if (dragRef.current) return () => clearTimeout(historyCaptureTimerRef.current);
    historyCaptureTimerRef.current = setTimeout(() => {
      if (skipNextHistoryCaptureRef.current) {
        skipNextHistoryCaptureRef.current = false;
        return;
      }
      saveCanvasStateRef.current?.();
    }, 80);
    if (isFullSketchMode) {
      const timer = setTimeout(() => {
        if (fullCanvasRef.current) {
          redrawCanvasOnTarget(fullCanvasRef.current);
          if (compactCanvasRef.current) {
            const ctx = fullCanvasRef.current.getContext("2d");
            ctx.drawImage(
              compactCanvasRef.current,
              0,
              0,
              fullCanvasRef.current.width,
              fullCanvasRef.current.height
            );
          }
        }
      }, 50);
      return () => {
        clearTimeout(timer);
        clearTimeout(historyCaptureTimerRef.current);
      };
    }
    return () => clearTimeout(historyCaptureTimerRef.current);
  }, [redrawCanvas, isFullSketchMode, redrawCanvasOnTarget]);

  // Drawing Event Handlers
  const startDrawing = (e, canvasRefTarget) => {
    const canvas = canvasRefTarget.current;
    if (!canvas) return;
    if (e.cancelable) e.preventDefault();
    canvas.setPointerCapture?.(e.pointerId);
    const { x, y } = getCanvasPoint(e, canvas);

    if (tool === "select") {
      const ctx = canvas.getContext("2d");
      const point = { x, y };
      let selectedHandleMode = null;
      let selectedResizeHandle = null;
      if (selectedDesignObject && selectedDesignObject.visible !== false) {
        const selectedBounds = getDesignObjectBounds(selectedDesignObject, ctx);
        const selectedCenterX = selectedBounds.x + selectedBounds.width / 2;
        const selectedCenterY = selectedBounds.y + selectedBounds.height / 2;
        const selectedRadians = -((selectedDesignObject.rotation || 0) * Math.PI) / 180;
        const selectedDx = x - selectedCenterX;
        const selectedDy = y - selectedCenterY;
        const selectedLocal = {
          x: selectedDx * Math.cos(selectedRadians) - selectedDy * Math.sin(selectedRadians) + selectedCenterX,
          y: selectedDx * Math.sin(selectedRadians) + selectedDy * Math.cos(selectedRadians) + selectedCenterY,
        };
        if (Math.hypot(selectedLocal.x - selectedCenterX, selectedLocal.y - (selectedBounds.y - 26)) <= 13) {
          selectedHandleMode = "rotate";
        } else {
          selectedResizeHandle = [
            { name: "nw", x: selectedBounds.x, y: selectedBounds.y },
            { name: "ne", x: selectedBounds.x + selectedBounds.width, y: selectedBounds.y },
            { name: "sw", x: selectedBounds.x, y: selectedBounds.y + selectedBounds.height },
            { name: "se", x: selectedBounds.x + selectedBounds.width, y: selectedBounds.y + selectedBounds.height },
          ].find((handle) => Math.hypot(selectedLocal.x - handle.x, selectedLocal.y - handle.y) <= 14)?.name;
          if (selectedResizeHandle) selectedHandleMode = "resize";
        }
      }
      const hitDesignObject = getOrderedDesignObjects(uploadedImages, layers).reverse().find((object) => object.visible !== false && pointInsideDesignObject(point, object, getDesignObjectBounds(object, ctx)));
      const hitBackground = bgImage?.imgObj && bgImage.visible !== false && pointInsideDesignObject(point, bgImage, getDesignObjectBounds(bgImage, ctx)) ? bgImage : null;
      const hit = selectedHandleMode ? selectedDesignObject : hitDesignObject || hitBackground || null;
      setSelectedLayerId(hit?.id || null);
      if (!hit) { dragRef.current = null; return; }

      const bounds = getDesignObjectBounds(hit, ctx);
      const centerX = bounds.x + bounds.width / 2;
      const centerY = bounds.y + bounds.height / 2;
      const radians = -((hit.rotation || 0) * Math.PI) / 180;
      const dx = x - centerX;
      const dy = y - centerY;
      const localPoint = {
        x: dx * Math.cos(radians) - dy * Math.sin(radians) + centerX,
        y: dx * Math.sin(radians) + dy * Math.cos(radians) + centerY,
      };
      const rotateHandle = Math.hypot(localPoint.x - centerX, localPoint.y - (bounds.y - 26)) <= 13;
      const resizeHandle = [
        { name: "nw", x: bounds.x, y: bounds.y },
        { name: "ne", x: bounds.x + bounds.width, y: bounds.y },
        { name: "sw", x: bounds.x, y: bounds.y + bounds.height },
        { name: "se", x: bounds.x + bounds.width, y: bounds.y + bounds.height },
      ].find((handle) => Math.hypot(localPoint.x - handle.x, localPoint.y - handle.y) <= 14)?.name;
      const mode = hit.id === selectedLayerId ? (selectedHandleMode || (rotateHandle ? "rotate" : resizeHandle ? "resize" : "move")) : "move";
      dragRef.current = {
        id: hit.id,
        mode,
        resizeHandle: selectedResizeHandle || resizeHandle,
        startX: x,
        startY: y,
        origin: { ...hit },
        startAngle: Math.atan2(y - centerY, x - centerX),
      };
      return;
    }

    if (tool === "text") {
      const text = prompt("Enter custom text for novelty design:", "NEXT LEVEL");
      if (text) {
        const layer = {
            id: `layer-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            name: text,
            type: "text",
            visible: true,
            text,
            color: brushColor,
            x,
            y,
            fontSize: 28,
            rotation: 0,
            opacity: 1,
            flipX: false,
            flipY: false,
            visible: true,
            zIndex: getNextDesignZIndex(),
          };
        setLayers((prev) => [...prev, layer]);
        setSelectedLayerId(layer.id);
        setTool("select");
      }
      return;
    }

    if (tool === "brush" || tool === "eraser") {
      setIsDrawing(true);
      const drawingLayer = getDrawingLayerCanvas();
      const ctx = drawingLayer.getContext("2d");
      const scaleX = drawingLayer.width / canvas.width;
      const scaleY = drawingLayer.height / canvas.height;
      ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
      ctx.lineWidth = brushSize * ((scaleX + scaleY) / 2);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = brushColor;
      ctx.beginPath();
      ctx.moveTo(x * scaleX, y * scaleY);
    }
  };

  const draw = (e, canvasRefTarget) => {
    const canvas = canvasRefTarget.current;
    if (!canvas) return;
    if (e.cancelable && (isDrawing || dragRef.current)) e.preventDefault();
    const { x, y } = getCanvasPoint(e, canvas);

    if (dragRef.current) {
      const drag = dragRef.current;
      const original = drag.origin;
      if (drag.mode === "move") {
        const values = { x: original.x + (x - drag.startX), y: original.y + (y - drag.startY) };
        if (original.imgObj) {
          values.x = Math.min(canvas.width - 12, Math.max(12 - original.width, values.x));
          values.y = Math.min(canvas.height - 12, Math.max(12 - original.height, values.y));
        } else {
          values.x = Math.min(canvas.width - 12, Math.max(12, values.x));
          values.y = Math.min(canvas.height - 12, Math.max(12, values.y));
        }
        if (bgImage?.id === drag.id) setBgImage((current) => current?.id === drag.id ? { ...current, ...values } : current);
        else if (uploadedImages.some((image) => image.id === drag.id)) setUploadedImages((current) => current.map((image) => image.id === drag.id ? { ...image, ...values } : image));
        else setLayers((current) => current.map((layer) => layer.id === drag.id ? { ...layer, ...values } : layer));
      } else if (drag.mode === "rotate") {
        const bounds = getDesignObjectBounds(original, canvas.getContext("2d"));
        const angle = Math.atan2(y - (bounds.y + bounds.height / 2), x - (bounds.x + bounds.width / 2));
        const rawRotation = (original.rotation || 0) + ((angle - drag.startAngle) * 180) / Math.PI;
        const rotation = ((rawRotation + 180) % 360 + 360) % 360 - 180;
        if (bgImage?.id === drag.id) setBgImage((current) => current?.id === drag.id ? { ...current, rotation } : current);
        else if (uploadedImages.some((image) => image.id === drag.id)) setUploadedImages((current) => current.map((image) => image.id === drag.id ? { ...image, rotation } : image));
        else setLayers((current) => current.map((layer) => layer.id === drag.id ? { ...layer, rotation } : layer));
      } else if (drag.mode === "resize") {
        const bounds = getDesignObjectBounds(original, canvas.getContext("2d"));
        const resizeFromLeft = drag.resizeHandle === "nw" || drag.resizeHandle === "sw";
        const resizeFromTop = drag.resizeHandle === "nw" || drag.resizeHandle === "ne";
        const width = Math.max(24, bounds.width + (resizeFromLeft ? drag.startX - x : x - drag.startX));
        const height = Math.max(24, bounds.height + (resizeFromTop ? drag.startY - y : y - drag.startY));
        const widthChange = Math.abs(x - drag.startX) / bounds.width;
        const heightChange = Math.abs(y - drag.startY) / bounds.height;
        const factor = Math.max(0.1, widthChange >= heightChange ? width / bounds.width : height / bounds.height);
        const values = original.imgObj
          ? {
              width: Math.max(24, original.width * factor),
              height: Math.max(24, original.height * factor),
              x: resizeFromLeft ? original.x + original.width - Math.max(24, original.width * factor) : original.x,
              y: resizeFromTop ? original.y + original.height - Math.max(24, original.height * factor) : original.y,
            }
          : { fontSize: Math.max(12, (original.fontSize || 28) * factor) };
        if (bgImage?.id === drag.id) setBgImage((current) => current?.id === drag.id ? { ...current, ...values } : current);
        else if (uploadedImages.some((image) => image.id === drag.id)) setUploadedImages((current) => current.map((image) => image.id === drag.id ? { ...image, ...values } : image));
        else setLayers((current) => current.map((layer) => layer.id === drag.id ? { ...layer, ...values } : layer));
      }
      return;
    }
    if (!isDrawing) return;

    const drawingLayer = getDrawingLayerCanvas();
    const ctx = drawingLayer.getContext("2d");
    const scaleX = drawingLayer.width / canvas.width;
    const scaleY = drawingLayer.height / canvas.height;
    ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
    ctx.lineWidth = brushSize * ((scaleX + scaleY) / 2);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor;
    ctx.lineTo(x * scaleX, y * scaleY);
    ctx.stroke();
    redrawCanvasOnTarget(canvas);
  };

  const stopDrawing = () => {
    if (dragRef.current) {
      dragRef.current = null;
      setTimeout(() => saveCanvasStateRef.current?.(), 60);
      return;
    }
    if (isDrawing) {
      setIsDrawing(false);
      const drawingCtx = getDrawingLayerCanvas().getContext("2d");
      drawingCtx.globalCompositeOperation = "source-over";
      redrawCanvasLatestRef.current?.();
      saveCanvasState();
    }
  };

  // Image Upload Handlers
  const handlePhotoUpload = (e, isFuse = false) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    e.target.value = "";

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = getActiveCanvas() || compactCanvasRef.current;
        if (!canvas) return;

        if (isFuse) {
          const aspect = img.width / img.height;
          const targetW = Math.min(canvas.width * 0.82, canvas.height * 0.82 * aspect);
          const targetH = targetW / aspect;
          const id = `background-${Date.now()}-${Math.random().toString(16).slice(2)}`;
          setBgImage({
            id,
            name: `${file.name.replace(/\.[^.]+$/, "") || "Uploaded background"} background`,
            imgObj: img,
            x: canvas.width / 2 - targetW / 2,
            y: canvas.height / 2 - targetH / 2,
            width: targetW,
            height: targetH,
            rotation: 0,
            opacity: 1,
            flipX: false,
            flipY: false,
            cropZoom: 1,
            cropOffsetX: 0.5,
            cropOffsetY: 0.5,
            visible: true,
            zIndex: -1,
          });
          setSelectedLayerId(id);
        } else {
          const aspect = img.width / img.height;
          const targetW = 160;
          const targetH = targetW / aspect;
          const id = `image-${Date.now()}-${Math.random().toString(16).slice(2)}`;
          setUploadedImages((prev) => [
            ...prev,
            {
              id,
              name: file.name.replace(/\.[^.]+$/, "") || "Uploaded image",
              imgObj: img,
              x: canvas.width / 2 - targetW / 2,
              y: canvas.height / 2 - targetH / 2,
              width: targetW,
              height: targetH,
              rotation: 0,
              opacity: 1,
              flipX: false,
              flipY: false,
              cropZoom: 1,
              cropOffsetX: 0.5,
              cropOffsetY: 0.5,
              zIndex: getNextDesignZIndex(),
            },
          ]);
          setSelectedLayerId(id);
        }
        setTool("select");
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
      setSelectedLayerId(null);
      const drawingLayer = getDrawingLayerCanvas();
      drawingLayer.getContext("2d").clearRect(0, 0, drawingLayer.width, drawingLayer.height);
      return;
    }

    const canvas = getActiveCanvas() || compactCanvasRef.current;
    const cx = canvas ? canvas.width / 2 : 320;
    const cy = canvas ? canvas.height / 2 : 220;

    if (tmpl.symbol || tmpl.text) {
      const layer = tmpl.symbol ? {
          id: `layer-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          name: tmpl.name,
          type: "sticker",
          visible: true,
          symbol: tmpl.symbol,
          x: cx,
          y: cy,
        } : {
          id: `layer-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          name: tmpl.name,
          type: "text",
          visible: true,
          text: tmpl.text,
          color: brushColor,
          x: cx,
          y: cy,
          fontSize: 28,
          rotation: 0,
          opacity: 1,
          flipX: false,
          flipY: false,
          visible: true,
          zIndex: getNextDesignZIndex(),
        };
      setLayers((prev) => [...prev, layer]);
      setSelectedLayerId(layer.id);
      setTool("select");
    }
  };

  // Undo / Redo
  const restoreHistorySnapshot = (index) => {
    const snapshot = historyRef.current[index];
    if (!snapshot) return;
    skipNextHistoryCaptureRef.current = true;
    historyIndexRef.current = index;
    setHistoryIndex(index);
    setLayers(snapshot.layers);
    setUploadedImages(snapshot.uploadedImages);
    setBgImage(snapshot.bgImage);
    const drawingLayer = getDrawingLayerCanvas();
    const drawingCtx = drawingLayer.getContext("2d");
    drawingCtx.clearRect(0, 0, drawingLayer.width, drawingLayer.height);
    const drawingImage = new Image();
    drawingImage.onload = () => {
      drawingCtx.clearRect(0, 0, drawingLayer.width, drawingLayer.height);
      drawingCtx.drawImage(drawingImage, 0, 0, drawingLayer.width, drawingLayer.height);
      redrawCanvas();
    };
    drawingImage.src = snapshot.drawing;
    setTimeout(() => {
      skipNextHistoryCaptureRef.current = false;
    }, 200);
  };

  const handleUndo = () => {
    const nextIndex = historyIndexRef.current - 1;
    if (nextIndex >= 0) restoreHistorySnapshot(nextIndex);
  };

  const handleRedo = () => {
    const nextIndex = historyIndexRef.current + 1;
    if (nextIndex < historyRef.current.length) restoreHistorySnapshot(nextIndex);
  };

  // Generate / Submit
  const handleGenerate = () => {
    const canvas = getActiveCanvas() || compactCanvasRef.current;
    if (!canvas) return;
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    redrawCanvasOnTarget(exportCanvas, false);
    setPreviewDataUrl(exportCanvas.toDataURL("image/png"));
    setShowModal(true);
    setIsSubmitted(false);
  };

  const renderObjectControls = (variant = "compact") => {
    if (!selectedDesignObject) return null;
    const selectedPhoto = selectedImage || selectedBackgroundImage;
    const isImage = Boolean(selectedPhoto);
    const imageAspect = isImage ? selectedPhoto.imgObj.naturalWidth / selectedPhoto.imgObj.naturalHeight : 1;
    const maxWidth = 640;
    const controlClass = variant === "compact"
      ? "rounded-xl border border-white/10 bg-[#050f1c] p-4"
      : "rounded-xl border border-white/10 bg-[#040c18] p-3.5";
    return (
      <section className={controlClass} aria-label="Selected object controls">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#38adff]">Selected {isImage ? "image" : selectedDesignObject.type}</p>
            <p className="mt-1 max-w-56 truncate text-xs font-semibold text-white" title={selectedDesignName}>{selectedDesignName}</p>
          </div>
          <span className="text-[10px] text-white/45">Drag to move · corners to resize · top handle to rotate</span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/55">
            Rotation <span className="text-[#38adff]">{Math.round(selectedDesignObject.rotation || 0)}°</span>
            <input type="range" min="-180" max="180" step="1" value={Math.max(-180, Math.min(180, selectedDesignObject.rotation || 0))} onChange={(e) => updateSelectedObject({ rotation: Number(e.target.value) })} className="w-full accent-[#0099FF]" />
          </label>
          <label className="grid gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/55">
            Opacity <span className="text-[#38adff]">{Math.round((selectedDesignObject.opacity ?? 1) * 100)}%</span>
            <input type="range" min="0.1" max="1" step="0.01" value={selectedDesignObject.opacity ?? 1} onChange={(e) => updateSelectedObject({ opacity: Number(e.target.value) })} className="w-full accent-[#0099FF]" />
          </label>
          {isImage ? (
            <>
              <label className="grid gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/55 sm:col-span-2">
                Image size <span className="text-[#38adff]">{Math.round(selectedPhoto.width)} px</span>
                <input type="range" min="24" max={maxWidth} step="1" value={Math.max(24, Math.min(maxWidth, selectedPhoto.width))} onChange={(e) => { const width = Number(e.target.value); updateSelectedObject({ width, height: width / imageAspect }); }} className="w-full accent-[#0099FF]" />
              </label>
              <label className="grid gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/55 sm:col-span-2">
                Crop zoom <span className="text-[#38adff]">{(selectedPhoto.cropZoom || 1).toFixed(1)}×</span>
                <input type="range" min="1" max="3" step="0.05" value={selectedPhoto.cropZoom || 1} onChange={(e) => updateSelectedObject({ cropZoom: Number(e.target.value) })} className="w-full accent-[#0099FF]" />
              </label>
              <label className="grid gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/55">
                Crop left / right
                <input type="range" min="0" max="1" step="0.01" disabled={(selectedPhoto.cropZoom || 1) <= 1} value={selectedPhoto.cropOffsetX ?? 0.5} onChange={(e) => updateSelectedObject({ cropOffsetX: Number(e.target.value) })} className="w-full accent-[#0099FF] disabled:opacity-30" />
              </label>
              <label className="grid gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/55">
                Crop up / down
                <input type="range" min="0" max="1" step="0.01" disabled={(selectedPhoto.cropZoom || 1) <= 1} value={selectedPhoto.cropOffsetY ?? 0.5} onChange={(e) => updateSelectedObject({ cropOffsetY: Number(e.target.value) })} className="w-full accent-[#0099FF] disabled:opacity-30" />
              </label>
            </>
          ) : selectedDesignObject.type === "text" ? (
            <label className="grid gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/55 sm:col-span-2">
              Text size <span className="text-[#38adff]">{Math.round(selectedDesignObject.fontSize || 28)} px</span>
              <input type="range" min="12" max="128" step="1" value={Math.max(12, Math.min(128, selectedDesignObject.fontSize || 28))} onChange={(e) => updateSelectedObject({ fontSize: Number(e.target.value) })} className="w-full accent-[#0099FF]" />
            </label>
          ) : null}
          <label className="grid grid-cols-[auto_1fr] items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/55">
            Position X
            <input type="number" value={Math.round(selectedDesignObject.x)} onChange={(e) => updateSelectedObject({ x: Number(e.target.value) || 0 })} className="min-w-0 rounded-md border border-white/10 bg-black/20 px-2 py-1.5 text-white" />
          </label>
          <label className="grid grid-cols-[auto_1fr] items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/55">
            Position Y
            <input type="number" value={Math.round(selectedDesignObject.y)} onChange={(e) => updateSelectedObject({ y: Number(e.target.value) || 0 })} className="min-w-0 rounded-md border border-white/10 bg-black/20 px-2 py-1.5 text-white" />
          </label>
        </div>
      </section>
    );
  };

  const renderLayersPanel = () => {
    const allObjects = [...(bgImage?.imgObj ? [bgImage] : []), ...getOrderedDesignObjects(uploadedImages, layers).reverse()];
    return (
      <section className="rounded-2xl border border-white/10 bg-[#040c18] p-3.5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Layers</span>
          <span className="text-[10px] text-white/35">{allObjects.length}</span>
        </div>
        <div className="max-h-48 space-y-1 overflow-y-auto custom-scrollbar">
          {allObjects.length ? allObjects.map((object) => (
            <div key={object.id} className={`flex items-center gap-1 rounded-lg border px-1.5 ${object.id === selectedLayerId ? "border-[#168fff]/50 bg-[#168fff]/10" : "border-white/5 bg-white/[0.02]"}`}>
              <button onClick={() => { setSelectedLayerId(object.id); setTool("select"); }} className="min-w-0 flex-1 truncate px-1.5 py-2 text-left text-[10px] text-white/80">{object.name || object.text || object.symbol || "Uploaded image"}</button>
              <button aria-label={`${object.visible === false ? "Show" : "Hide"} ${object.name || object.text || "layer"}`} onClick={() => {
                if (bgImage?.id === object.id) setBgImage((current) => current?.id === object.id ? { ...current, visible: current.visible === false } : current);
                else if (uploadedImages.some((image) => image.id === object.id)) setUploadedImages((current) => current.map((image) => image.id === object.id ? { ...image, visible: image.visible === false } : image));
                else setLayers((current) => current.map((layer) => layer.id === object.id ? { ...layer, visible: layer.visible === false } : layer));
              }} className="rounded p-1 text-white/45 hover:bg-white/10 hover:text-white">{object.visible === false ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}</button>
            </div>
          )) : <p className="py-3 text-center text-[10px] text-white/35">Add text, stickers, or graphics to build layers.</p>}
        </div>
      </section>
    );
  };

  const handleConfirmSubmit = async () => {
    setIsSavingDesign(true);
    setDesignError("");
    try {
      const submissionId = crypto.randomUUID();
      const sourceImage = new Image();
      sourceImage.src = previewDataUrl;
      await sourceImage.decode();
      const scale = Math.min(1, 1600 / Math.max(sourceImage.naturalWidth, sourceImage.naturalHeight));
      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = Math.max(1, Math.round(sourceImage.naturalWidth * scale));
      exportCanvas.height = Math.max(1, Math.round(sourceImage.naturalHeight * scale));
      exportCanvas.getContext("2d").drawImage(sourceImage, 0, 0, exportCanvas.width, exportCanvas.height);
      const imageBlob = await new Promise((resolve, reject) => exportCanvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not export the design image.")), "image/jpeg", 0.88));
      const storagePath = `novelty-designs/${submissionId}.jpg`;
      const { error: uploadError } = await supabase.storage.from(CMS_MEDIA_BUCKET).upload(storagePath, imageBlob, {
        contentType: "image/jpeg", cacheControl: "3600", upsert: false,
      });
      if (uploadError) throw uploadError;
      const { data: imageData } = supabase.storage.from(CMS_MEDIA_BUCKET).getPublicUrl(storagePath);
      const { data: authData } = await supabase.auth.getUser();
      const design = {
        id: submissionId,
        productId: selectedProduct.id,
        productTitle: selectedProduct.title,
        imageUrl: imageData.publicUrl,
        imagePath: storagePath,
        styles: activePills,
        description,
        submittedByEmail: authData.user?.email || "",
        createdAt: new Date().toISOString(),
      };
      const { error: insertError } = await supabase.from("novelty_design_submissions").insert({
        id: submissionId,
        product_id: selectedProduct.id,
        product_title: selectedProduct.title,
        image_url: imageData.publicUrl,
        image_path: storagePath,
        styles: activePills,
        description,
        submitted_by_email: authData.user?.email || null,
        status: "new",
      });
      if (insertError) throw insertError;
      sessionStorage.setItem("nxtlvl-selected-novelty-design", JSON.stringify(design));
      const savedDesigns = JSON.parse(sessionStorage.getItem("nxtlvl-novelty-designs") || "[]");
      sessionStorage.setItem("nxtlvl-novelty-designs", JSON.stringify([...savedDesigns.filter((item) => item.id !== design.id), design]));
      setSavedDesign(design);
      setIsSubmitted(true);
    } catch (error) {
      setDesignError(error.message || "Could not save your design. Please try again.");
    } finally {
      setIsSavingDesign(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040c17] text-white font-sans selection:bg-[#0099FF] selection:text-white flex flex-col justify-between">
      <Navbar topOnly />

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

            {/* 2. STYLE SECTION */}
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
              
              {/* Floating Top Tool Bar inside Canvas Box with VIEW FULL SKETCH Button */}
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

                {/* Canvas Actions & VIEW FULL SKETCH ↗ */}
                <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                  <button
                    onClick={() => setAdvancedProductPreview((current) => !current)}
                    aria-pressed={advancedProductPreview}
                    title="Preview your design mapped onto the selected novelty"
                    className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors ${advancedProductPreview ? "border-[#0099FF] bg-[#0099FF]/20 text-white" : "border-white/10 text-white/60 hover:bg-white/10 hover:text-white"}`}
                  >
                    {advancedProductPreview ? "PRODUCT PREVIEW ON" : "ADVANCED PRODUCT PREVIEW"}
                  </button>
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

                  {/* PROMINENT VIEW FULL SKETCH BUTTON */}
                  <button
                  onClick={() => { if (advancedProductPreview) setAdvancedProductPreview(false); setIsFullSketchMode(true); }}
                    className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#0099FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(0,153,255,0.4)] hover:bg-[#0088EE] hover:scale-105 transition-all"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>VIEW FULL SKETCH ↗</span>
                  </button>
                </div>
              </div>

              {/* Main HTML5 Interactive Canvas Container */}
              <div className="relative flex items-center justify-center rounded-[18px] bg-[#040b15] border border-white/10 overflow-hidden min-h-[380px] sm:min-h-[440px]">
                {advancedProductPreview && <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full border border-[#43b5ff]/35 bg-[#061426]/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#9ed6ff]">Artwork mapped to {selectedProduct.title} · switch off to edit</div>}
                
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

                {/* Actual Interactive Compact Canvas */}
                <canvas
                  ref={compactCanvasRef}
                  width={640}
                  height={440}
                  onPointerDown={advancedProductPreview ? undefined : (e) => startDrawing(e, compactCanvasRef)}
                  onPointerMove={advancedProductPreview ? undefined : (e) => draw(e, compactCanvasRef)}
                  onPointerUp={advancedProductPreview ? undefined : stopDrawing}
                  onPointerCancel={advancedProductPreview ? undefined : stopDrawing}
                  className={`w-full max-w-[640px] h-[380px] sm:h-[440px] touch-none object-contain ${advancedProductPreview ? "cursor-default" : tool === "select" ? "cursor-move" : "cursor-crosshair"}`}
                />

                {/* Bottom Color Palette Bar with Edit RGB Spectrum Button */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
                  {showColorPicker && (
                    <div className="mb-3">
                      <RGBSpectrumPicker
                        activeColor={brushColor}
                        onChangeColor={setBrushColor}
                        onClose={() => setShowColorPicker(false)}
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2 rounded-full bg-[#050f1c]/95 px-4 py-2 border border-white/15 backdrop-blur-md shadow-2xl">
                    <button
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full transition-all border ${
                        showColorPicker
                          ? "bg-[#0099FF] text-white border-[#0099FF] shadow-[0_0_12px_rgba(0,153,255,0.5)]"
                          : "bg-white/5 text-[#0099FF] border-white/10 hover:bg-[#0099FF]/20 hover:text-white"
                      }`}
                      title="Edit RGB Spectrum Color"
                    >
                      <Palette className="h-3.5 w-3.5" />
                      <span>EDIT RGB</span>
                    </button>

                    <div className="h-4 w-px bg-white/15 mx-1" />

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

              {renderObjectControls("compact")}

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
                      ADD BACKGROUND PHOTO
                    </span>
                    <span className="mt-1 block text-xs text-white/50">
                      Place behind artwork, then move, crop, or resize it
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

      {/* ================= DEDICATED FULL SKETCH STUDIO MODE OVERLAY ================= */}
      {isFullSketchMode && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#040c17] text-white animate-in fade-in duration-200">
          
          {/* FULL SKETCH TOP TOOLBAR */}
          <div className="h-16 border-b border-white/10 bg-[#061426] px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFullSketchMode(false)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>← BACK TO CUSTOMIZER</span>
              </button>

              <div className="h-6 w-px bg-white/10 hidden sm:block" />

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0099FF]">
                  FULL SKETCH STUDIO
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white leading-none">
                  {selectedProduct.title}
                </h3>
              </div>
            </div>



            {/* Right Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-30"
                title="Undo"
              >
                <Undo2 className="h-4 w-4" />
              </button>

              <button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-30"
                title="Redo"
              >
                <Redo2 className="h-4 w-4" />
              </button>

              <button
                onClick={() => handleApplyTemplate({ id: "blank" })}
                className="p-2.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                title="Clear Workspace"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <button
                onClick={() => setIsFullSketchMode(false)}
                className="inline-flex items-center gap-2 rounded-full bg-[#0099FF] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(0,153,255,0.4)] hover:bg-[#0088EE]"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>SAVE SKETCH</span>
              </button>
            </div>
          </div>

          {/* MAIN FULL SKETCH WORKSPACE BODY */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* LEFT TOOLBOX SIDEBAR */}
            <div className="w-64 border-r border-white/10 bg-[#061222] p-4 flex flex-col gap-6 shrink-0 overflow-y-auto custom-scrollbar">
              {/* Tool Selector */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-2">
                  TOOLS
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "select", name: "Select", icon: MousePointer },
                    { id: "brush", name: "Draw", icon: Pencil },
                    { id: "text", name: "Text", icon: Type },
                    { id: "eraser", name: "Eraser", icon: Eraser },
                  ].map((t) => {
                    const Icon = t.icon;
                    const isActive = tool === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTool(t.id)}
                        className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-semibold transition-all ${
                          isActive
                            ? "border-[#0099FF] bg-[#0099FF]/20 text-white shadow-[0_0_12px_rgba(0,153,255,0.3)]"
                            : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{t.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brush Size Controls */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-bold text-white/70">
                  <span>BRUSH SIZE</span>
                  <span className="text-[#0099FF]">{brushSize}px</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="36"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full accent-[#0099FF] cursor-pointer"
                />
              </div>

              {/* Color Palette */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    COLOR PALETTE
                  </span>
                  <button
                    onClick={() => setShowFullColorPicker(!showFullColorPicker)}
                    className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                      showFullColorPicker
                        ? "bg-[#0099FF] text-white border-[#0099FF]"
                        : "bg-[#0099FF]/10 text-[#0099FF] border-[#0099FF]/30 hover:bg-[#0099FF]/20"
                    }`}
                  >
                    <Palette className="h-3 w-3" />
                    <span>Edit RGB</span>
                  </button>
                </div>

                {showFullColorPicker && (
                  <div className="mb-3">
                    <RGBSpectrumPicker
                      activeColor={brushColor}
                      onChangeColor={setBrushColor}
                      onClose={() => setShowFullColorPicker(false)}
                    />
                  </div>
                )}

                <div className="grid grid-cols-4 gap-2">
                  {PRESET_COLORS.map((hex) => (
                    <button
                      key={hex}
                      onClick={() => setBrushColor(hex)}
                      style={{ backgroundColor: hex }}
                      className={`h-9 w-full rounded-lg border border-white/20 transition-transform ${
                        brushColor === hex ? "ring-2 ring-white scale-110" : "hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Image Upload in Sidebar */}
              <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 p-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10"
                >
                  <Upload className="h-4 w-4 text-[#0099FF]" />
                  <span>Upload Graphic</span>
                </button>
              </div>
            </div>

            {/* CENTER FULL CANVAS AREA */}
            <div className="flex-1 flex flex-col items-center justify-center bg-[#030912] p-6 relative overflow-hidden">
              <div className="relative rounded-2xl border border-white/15 bg-[#070e1b] p-4 shadow-2xl">
                <canvas
                  ref={fullCanvasRef}
                  width={640}
                  height={440}
                  onPointerDown={advancedProductPreview ? undefined : (e) => startDrawing(e, fullCanvasRef)}
                  onPointerMove={advancedProductPreview ? undefined : (e) => draw(e, fullCanvasRef)}
                  onPointerUp={advancedProductPreview ? undefined : stopDrawing}
                  onPointerCancel={advancedProductPreview ? undefined : stopDrawing}
                  className={`w-[800px] h-[540px] touch-none object-contain max-w-full max-h-[70vh] ${advancedProductPreview ? "cursor-default" : tool === "select" ? "cursor-move" : "cursor-crosshair"}`}
                />
              </div>

              {/* Bottom Sticker / Asset Carousel Strip */}
              <div className="mt-4 flex items-center gap-3 overflow-x-auto max-w-full px-4 py-2 rounded-full border border-white/10 bg-[#061222]/90 backdrop-blur-md custom-scrollbar">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 shrink-0">
                  STICKERS:
                </span>
                {TEMPLATES_ASSETS.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => handleApplyTemplate(tmpl)}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/90 hover:bg-[#0099FF] hover:border-[#0099FF] hover:text-white transition-all shrink-0"
                  >
                    <span>{tmpl.symbol || "✨"}</span>
                    <span>{tmpl.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT SIDEBAR (Matching media_1791298023510.png & media_1791297977842.png) */}
            <div className="w-72 border-l border-white/10 bg-[#061222] p-4 flex flex-col gap-5 shrink-0 overflow-y-auto custom-scrollbar">
              
              {/* 1. TOP CARD: Product View Switcher Box (Matching user reference photo 4 & 5) */}
              <div className="rounded-2xl border border-white/10 bg-[#040c18] p-3.5 shadow-lg">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2.5">
                  PRODUCT VIEW
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  {/* Preview Button */}
                  <button
                    onClick={() => setActiveView("front")}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                      activeView === "front" || activeView === "preview"
                        ? "border-[#0099FF] bg-[#0099FF]/20 text-[#0099FF] shadow-[0_0_12px_rgba(0,153,255,0.3)]"
                        : "border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Box className="h-5 w-5 mb-1" />
                    <span className="text-[10px] font-bold">Preview</span>
                  </button>

                  {/* Front Button */}
                  <button
                    onClick={() => setActiveView("front")}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                      activeView === "front"
                        ? "border-[#0099FF] bg-[#0099FF]/20 text-[#0099FF] shadow-[0_0_12px_rgba(0,153,255,0.3)]"
                        : "border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <img
                      src="/icons/cap-front-icon.png"
                      alt="Front"
                      style={{
                        filter:
                          activeView === "front"
                            ? "brightness(0) saturate(100%) invert(48%) sepia(98%) saturate(1800%) hue-rotate(182deg)"
                            : "brightness(0) invert(1)",
                        opacity: activeView === "front" ? 1 : 0.85,
                      }}
                      className="h-5 w-5 object-contain mb-1 transition-all"
                    />
                    <span className="text-[10px] font-bold">Front</span>
                  </button>

                  {/* Back Button */}
                  <button
                    onClick={() => setActiveView("back")}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                      activeView === "back"
                        ? "border-[#0099FF] bg-[#0099FF]/20 text-[#0099FF] shadow-[0_0_12px_rgba(0,153,255,0.3)]"
                        : "border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <img
                      src="/icons/cap-back-icon.png"
                      alt="Back"
                      style={{
                        filter:
                          activeView === "back"
                            ? "brightness(0) saturate(100%) invert(48%) sepia(98%) saturate(1800%) hue-rotate(182deg)"
                            : "brightness(0) invert(1)",
                        opacity: activeView === "back" ? 1 : 0.85,
                      }}
                      className="h-5 w-5 object-contain mb-1 transition-all"
                    />
                    <span className="text-[10px] font-bold">Back</span>
                  </button>

                  {/* Side Button */}
                  <button
                    onClick={() => setActiveView("side")}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                      activeView === "side"
                        ? "border-[#0099FF] bg-[#0099FF]/20 text-[#0099FF] shadow-[0_0_12px_rgba(0,153,255,0.3)]"
                        : "border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <img
                      src="/icons/cap-side-icon.png"
                      alt="Side"
                      style={{
                        filter:
                          activeView === "side"
                            ? "brightness(0) saturate(100%) invert(48%) sepia(98%) saturate(1800%) hue-rotate(182deg)"
                            : "brightness(0) invert(1)",
                        opacity: activeView === "side" ? 1 : 0.85,
                      }}
                      className="h-5 w-5 object-contain mb-1 transition-all"
                    />
                    <span className="text-[10px] font-bold">Side</span>
                  </button>
                </div>
              </div>

              {/* 2. MIDDLE CARD: Color Palette */}
              <div className="rounded-2xl border border-white/10 bg-[#040c18] p-3.5 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Color Palette
                  </span>
                  <button
                    onClick={() => setShowFullColorPicker(!showFullColorPicker)}
                    className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                      showFullColorPicker
                        ? "bg-[#0099FF] text-white border-[#0099FF]"
                        : "bg-[#0099FF]/10 text-[#0099FF] border-[#0099FF]/30 hover:bg-[#0099FF]/20"
                    }`}
                  >
                    <Palette className="h-3 w-3" />
                    <span>Edit RGB</span>
                  </button>
                </div>

                {showFullColorPicker && (
                  <div className="mb-3">
                    <RGBSpectrumPicker
                      activeColor={brushColor}
                      onChangeColor={setBrushColor}
                      onClose={() => setShowFullColorPicker(false)}
                    />
                  </div>
                )}

                <div className="grid grid-cols-4 gap-2">
                  {PRESET_COLORS.map((hex) => (
                    <button
                      key={hex}
                      onClick={() => setBrushColor(hex)}
                      style={{ backgroundColor: hex }}
                      className={`h-7 w-full rounded-lg border border-white/20 transition-transform ${
                        brushColor === hex ? "ring-2 ring-white scale-110" : "hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {renderLayersPanel()}
              {renderObjectControls("full")}

              {/* 3. BOTTOM CARD: Quick Actions (Matching user reference photo 5) */}
              <div className="rounded-2xl border border-white/10 bg-[#040c18] p-3.5 shadow-lg flex flex-col gap-2">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Quick Actions</span>
                  <span className="max-w-32 truncate text-[10px] text-white/50" title={selectedDesignName}>
                    {selectedDesignName}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={duplicateSelectedLayer}
                    disabled={!selectedLayerId}
                    className="flex flex-col items-center justify-center p-2 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 text-[10px] font-semibold"
                  >
                    <Copy className="h-4 w-4 text-[#0099FF] mb-1" />
                    <span>Duplicate</span>
                  </button>
                  <button
                    onClick={() => flipSelectedLayer("flipX")}
                    disabled={!selectedLayerId}
                    className="flex flex-col items-center justify-center p-2 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 text-[10px] font-semibold"
                  >
                    <FlipHorizontal className="h-4 w-4 text-[#0099FF] mb-1" />
                    <span>Flip Horiz</span>
                  </button>
                  <button
                    onClick={() => flipSelectedLayer("flipY")}
                    disabled={!selectedLayerId}
                    className="flex flex-col items-center justify-center p-2 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 text-[10px] font-semibold"
                  >
                    <FlipVertical className="h-4 w-4 text-[#0099FF] mb-1" />
                    <span>Flip Vert</span>
                  </button>
                  <button
                    onClick={() => moveSelectedLayer(1)}
                    disabled={!selectedLayerId}
                    className="flex flex-col items-center justify-center p-2 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 text-[10px] font-semibold"
                  >
                    <Layers className="h-4 w-4 text-[#0099FF] mb-1" />
                    <span>Forward</span>
                  </button>
                  <button
                    onClick={() => moveSelectedLayer(-1)}
                    disabled={!selectedLayerId}
                    className="flex flex-col items-center justify-center p-2 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 text-[10px] font-semibold"
                  >
                    <Layers className="h-4 w-4 text-[#0099FF] mb-1" />
                    <span>Backward</span>
                  </button>
                  <button
                    onClick={deleteSelectedLayer}
                    disabled={!selectedLayerId}
                    className="flex flex-col items-center justify-center p-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-30 text-[10px] font-semibold"
                  >
                    <Trash2 className="h-4 w-4 text-red-400 mb-1" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

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
                    disabled={isSavingDesign}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0099FF] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(0,153,255,0.5)] hover:bg-[#0088EE]"
                  >
                    {isSavingDesign ? "SAVING DESIGN…" : "GET DESIGN"} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {designError && <p role="alert" className="mt-3 text-right text-xs text-red-300">{designError}</p>}
              </>
            ) : (
              <div className="py-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0099FF]/20 text-[#0099FF]"><Check className="h-6 w-6" /></div>
                <h3 className="mt-4 text-2xl font-bold font-serif text-white">Your design is ready</h3>
                <p className="mt-2 text-sm text-white/65">Choose how you’d like to get your {savedDesign?.productTitle || "novelty"}.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button onClick={() => navigate(`/quote?novelty=${encodeURIComponent(savedDesign?.id || "")}`)} className="rounded-2xl border border-[#168fff]/50 bg-[#0785ef]/15 p-4 text-left hover:bg-[#0785ef]/25">
                    <strong className="block text-sm text-white">ONSITE</strong><span className="mt-1 block text-xs text-white/60">Add quantities, then build your event quote.</span>
                  </button>
                  <button onClick={() => navigate(`/novelty-order?design=${encodeURIComponent(savedDesign?.id || "")}`)} className="rounded-2xl border border-white/15 bg-white/5 p-4 text-left hover:bg-white/10">
                    <strong className="block text-sm text-white">DROPSHIPPING</strong><span className="mt-1 block text-xs text-white/60">Shop designs, quantities, and delivery address.</span>
                  </button>
                </div>
                <button onClick={() => { setShowModal(false); setIsSubmitted(false); navigate("/novelties"); }} className="mt-4 w-full py-2 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white">Maybe later</button>
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
