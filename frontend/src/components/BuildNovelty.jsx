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

  // Image Upload Layers
  const [uploadedImages, setUploadedImages] = useState([]);
  const [bgImage, setBgImage] = useState(null);

  // Loaded Product Template Image Object
  const [productTemplateImg, setProductTemplateImg] = useState(null);

  // History stack for Undo/Redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Canvas Refs (Compact Canvas & Full Sketch Canvas)
  const compactCanvasRef = useRef(null);
  const fullCanvasRef = useRef(null);

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
    setActiveView("front");
    setSearchParams({ product: id });
  };

  // Set default style selections when product changes
  useEffect(() => {
    if (selectedProduct && selectedProduct.styles) {
      setActivePills(selectedProduct.styles.slice(0, 2));
    }
  }, [selectedProductId, selectedProduct]);

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

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setProductTemplateImg(img);
    };
    img.src = imgUrl;
  }, [selectedProduct, activeView]);

  const togglePill = (pillName) => {
    setActivePills((prev) =>
      prev.includes(pillName)
        ? prev.filter((p) => p !== pillName)
        : [...prev, pillName]
    );
  };

  // Active Canvas Ref depending on Full Sketch Mode
  const getActiveCanvas = useCallback(() => {
    return isFullSketchMode ? fullCanvasRef.current : compactCanvasRef.current;
  }, [isFullSketchMode]);

  // Save Canvas State for Undo/Redo
  const saveCanvasState = useCallback(() => {
    const canvas = getActiveCanvas();
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    setHistory((prev) => {
      const newHist = prev.slice(0, historyIndex + 1);
      return [...newHist, dataUrl];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex, getActiveCanvas]);

  // Redraw Canvas (called whenever layers, tool, or view changes)
  const redrawCanvasOnTarget = useCallback(
    (canvas) => {
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

        ctx.drawImage(productTemplateImg, drawX, drawY, drawW, drawH);
        ctx.restore();
      }

      // 3. Draw Fused Background Image if present
      if (bgImage) {
        ctx.drawImage(bgImage, 0, 0, w, h);
      }

      // 4. Draw Uploaded Overlay Images
      uploadedImages.forEach((item) => {
        if (item.imgObj) {
          ctx.drawImage(item.imgObj, item.x, item.y, item.width, item.height);
        }
      });

      // 5. Draw Canvas Layers (Text, Symbols)
      layers.forEach((layer) => {
        if (!layer.visible) return;
        ctx.save();
        if (layer.type === "text") {
          ctx.font = `bold ${layer.fontSize || 28}px sans-serif`;
          ctx.fillStyle = layer.color || "#ffffff";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(layer.text, layer.x, layer.y);
        } else if (layer.type === "sticker") {
          ctx.font = "46px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(layer.symbol || "⭐", layer.x, layer.y);
        }
        ctx.restore();
      });


    },
    [productTemplateImg, bgImage, uploadedImages, layers, selectedProduct]
  );

  const redrawCanvas = useCallback(() => {
    if (compactCanvasRef.current) redrawCanvasOnTarget(compactCanvasRef.current);
    if (fullCanvasRef.current) redrawCanvasOnTarget(fullCanvasRef.current);
  }, [redrawCanvasOnTarget]);

  useEffect(() => {
    redrawCanvas();
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
      return () => clearTimeout(timer);
    }
  }, [redrawCanvas, isFullSketchMode, redrawCanvasOnTarget]);

  // Drawing Event Handlers
  const startDrawing = (e, canvasRefTarget) => {
    const canvas = canvasRefTarget.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    if (tool === "text") {
      const text = prompt("Enter custom text for novelty design:", "NEXT LEVEL");
      if (text) {
        setLayers((prev) => [
          ...prev,
          {
            id: `layer-${Date.now()}`,
            name: text,
            type: "text",
            visible: true,
            text,
            color: brushColor,
            x,
            y,
            fontSize: 28,
          },
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

  const draw = (e, canvasRefTarget) => {
    if (!isDrawing) return;
    const canvas = canvasRefTarget.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

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
        const canvas = getActiveCanvas() || compactCanvasRef.current;
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
      const canvas = getActiveCanvas();
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      redrawCanvas();
      return;
    }

    const canvas = getActiveCanvas() || compactCanvasRef.current;
    const cx = canvas ? canvas.width / 2 : 320;
    const cy = canvas ? canvas.height / 2 : 220;

    if (tmpl.symbol) {
      setLayers((prev) => [
        ...prev,
        {
          id: `layer-${Date.now()}`,
          name: tmpl.name,
          type: "sticker",
          visible: true,
          symbol: tmpl.symbol,
          x: cx,
          y: cy,
        },
      ]);
    } else if (tmpl.text) {
      setLayers((prev) => [
        ...prev,
        {
          id: `layer-${Date.now()}`,
          name: tmpl.name,
          type: "text",
          visible: true,
          text: tmpl.text,
          color: brushColor,
          x: cx,
          y: cy,
          fontSize: 28,
        },
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
        const canvas = getActiveCanvas();
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
        const canvas = getActiveCanvas();
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
    const canvas = getActiveCanvas() || compactCanvasRef.current;
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
                    onClick={() => setIsFullSketchMode(true)}
                    className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#0099FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(0,153,255,0.4)] hover:bg-[#0088EE] hover:scale-105 transition-all"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>VIEW FULL SKETCH ↗</span>
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

                {/* Actual Interactive Compact Canvas */}
                <canvas
                  ref={compactCanvasRef}
                  width={640}
                  height={440}
                  onMouseDown={(e) => startDrawing(e, compactCanvasRef)}
                  onMouseMove={(e) => draw(e, compactCanvasRef)}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={(e) => startDrawing(e, compactCanvasRef)}
                  onTouchMove={(e) => draw(e, compactCanvasRef)}
                  onTouchEnd={stopDrawing}
                  className="w-full max-w-[640px] h-[380px] sm:h-[440px] touch-none cursor-crosshair object-contain"
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

            {/* Middle Product View Angle Buttons (Front / Side / Back for Hats) */}
            {selectedProduct.id === "trucker-hats" && (
              <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-[#040b15] p-1">
                {["front", "side", "back"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setActiveView(v)}
                    className={`rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                      activeView === v
                        ? "bg-[#0099FF] text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {v} View
                  </button>
                ))}
              </div>
            )}

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
                  width={800}
                  height={540}
                  onMouseDown={(e) => startDrawing(e, fullCanvasRef)}
                  onMouseMove={(e) => draw(e, fullCanvasRef)}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={(e) => startDrawing(e, fullCanvasRef)}
                  onTouchMove={(e) => draw(e, fullCanvasRef)}
                  onTouchEnd={stopDrawing}
                  className="w-[800px] h-[540px] touch-none cursor-crosshair object-contain max-w-full max-h-[70vh]"
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
                      className="h-5 w-5 object-contain mb-1 filter invert brightness-200 opacity-90"
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
                      className="h-5 w-5 object-contain mb-1 filter invert brightness-200 opacity-90"
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
                      className="h-5 w-5 object-contain mb-1 filter invert brightness-200 opacity-90"
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

              {/* 3. BOTTOM CARD: Quick Actions (Matching user reference photo 5) */}
              <div className="rounded-2xl border border-white/10 bg-[#040c18] p-3.5 shadow-lg flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                  Quick Actions
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={handleUndo}
                    className="flex flex-col items-center justify-center p-2 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 text-[10px] font-semibold"
                  >
                    <Copy className="h-4 w-4 text-[#0099FF] mb-1" />
                    <span>Duplicate</span>
                  </button>
                  <button
                    onClick={() => {}}
                    className="flex flex-col items-center justify-center p-2 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 text-[10px] font-semibold"
                  >
                    <FlipHorizontal className="h-4 w-4 text-[#0099FF] mb-1" />
                    <span>Flip Horiz</span>
                  </button>
                  <button
                    onClick={() => {}}
                    className="flex flex-col items-center justify-center p-2 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 text-[10px] font-semibold"
                  >
                    <FlipVertical className="h-4 w-4 text-[#0099FF] mb-1" />
                    <span>Flip Vert</span>
                  </button>
                  <button
                    onClick={() => {}}
                    className="flex flex-col items-center justify-center p-2 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 text-[10px] font-semibold"
                  >
                    <Layers className="h-4 w-4 text-[#0099FF] mb-1" />
                    <span>Forward</span>
                  </button>
                  <button
                    onClick={() => {}}
                    className="flex flex-col items-center justify-center p-2 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 text-[10px] font-semibold"
                  >
                    <Layers className="h-4 w-4 text-[#0099FF] mb-1" />
                    <span>Backward</span>
                  </button>
                  <button
                    onClick={() => handleApplyTemplate({ id: "blank" })}
                    className="flex flex-col items-center justify-center p-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-[10px] font-semibold"
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
