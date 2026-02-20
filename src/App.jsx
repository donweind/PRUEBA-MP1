import React, { useState, useRef, useMemo } from 'react';
import { 
  LayoutDashboard, 
  BarChartHorizontal, 
  Download, 
  Upload, 
  ImagePlus, 
  CheckSquare, 
  Save,
  Trash2,
  GitMerge,
  ArrowDownCircle,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  BarChart2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// --- DATOS INICIALES ---
const getAnalysisTasks = (parentId) => [
  { id: `${parentId}-a1`, text: "Cambio de transmisor EH (Maq. Parada)", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" },
  { id: `${parentId}-a2`, text: "Cambio de reparto de cargas / Humectar el fieltro", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" },
  { id: `${parentId}-a3`, text: "Inspección Encoders (Formador, Fieltro, Succión, F.P.)", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" },
  { id: `${parentId}-a4`, text: "Inspección de los Difusores de la Caja de Entrada", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" },
  { id: `${parentId}-a5`, text: "Abrir para Inspeccionar la Bomba 2 (Válvula)", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" },
  { id: `${parentId}-a6`, text: "Sellar fuga de pasta en F.P. (Soldadura en frío)", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" },
  { id: `${parentId}-a7`, text: "Validar GAP cabecero / Formador y Yankee / Prensa", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" },
  { id: `${parentId}-a8`, text: "Validar diámetros Rodillo Accionador", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" }
];

const initialTasks = [
  {
    id: 1,
    title: "Cambio a 14.5 g",
    status: "Pendiente",
    observations: "",
    photo: null,
    isExpanded: true, // Nuevo estado para contraer/expandir
    checklist: [
      { id: "1-1", type: "standard", text: "Monitorear F.P", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" },
      { id: "1-2", type: "standard", text: "Monitorear Bomba 2", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" },
      { id: "1-3", type: "standard", text: "Monitorear Caja Entrada", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" },
      { id: "1-4", type: "standard", text: "Monitorear Prensa", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" },
      { id: "1-5", type: "standard", text: "Monitorear Sincronismo", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" },
      { id: "1-6", type: "standard", text: "Insp. Motores con el Estroboscopio", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" },
      { id: "1-7", type: "standard", text: "Dejar Prensa: 72 kN/m -> 70 -> 71 (+1)", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" }
    ]
  },
  {
    id: 2,
    title: "Incremento de Gramaje (Vel 1650 mpm)",
    status: "Pendiente",
    observations: "",
    photo: null,
    isExpanded: true,
    checklist: [
      { 
        id: "2-1", type: "branching", text: "14.5g -> PASAR A 16.5 g/m²", 
        phenomenon: null, phenomenonText: "Análisis (Condición Prensa / Yankee)", noPhenomenonText: "Pasar al siguiente gramaje (16.5g)", 
        isCompleted: false, observation: "", photo: null, startTime: "", endTime: "", analysisTasks: getAnalysisTasks("2-1"),
        velocidad: "", condicionPrensa: "", presionYankee: "", tp: "", velocidadGT: "", cht: "", ref: "", pope: "", yankee: "", prensaNipco: "", campana: "", hic: "", cs: ""
      },
      { 
        id: "2-2", type: "branching", text: "16.5g -> PASAR A 18.5 g/m²", 
        phenomenon: null, phenomenonText: "Análisis", noPhenomenonText: "Pasar al siguiente gramaje (20g)", 
        isCompleted: false, observation: "", photo: null, startTime: "", endTime: "", analysisTasks: getAnalysisTasks("2-2"),
        velocidad: "", condicionPrensa: "", presionYankee: "", tp: "", velocidadGT: "", cht: "", ref: "", pope: "", yankee: "", prensaNipco: "", campana: "", hic: "", cs: ""
      },
      { 
        id: "2-3", type: "branching", text: "18.5g -> PASAR A 20 g/m²", 
        phenomenon: null, phenomenonText: "Análisis", noPhenomenonText: "Pasar al siguiente gramaje (26g)", 
        isCompleted: false, observation: "", photo: null, startTime: "", endTime: "", analysisTasks: getAnalysisTasks("2-3"),
        velocidad: "", condicionPrensa: "", presionYankee: "", tp: "", velocidadGT: "", cht: "", ref: "", pope: "", yankee: "", prensaNipco: "", campana: "", hic: "", cs: ""
      },
      { 
        id: "2-4", type: "branching", text: "20g -> PASAR A 26 g/m²", 
        phenomenon: null, phenomenonText: "Análisis (ACR) -> ACCIÓN INMEDIATA (Poner en funcionamiento Caja Pickup)", noPhenomenonText: "PARADA DE EMERGENCIA (*Antes de parar: Cambiar Yankee DCS - Inspección)", 
        isCompleted: false, observation: "", photo: null, startTime: "", endTime: "", analysisTasks: getAnalysisTasks("2-4"),
        velocidad: "", condicionPrensa: "", presionYankee: "", tp: "", velocidadGT: "", cht: "", ref: "", pope: "", yankee: "", prensaNipco: "", campana: "", hic: "", cs: ""
      }
    ]
  },
  {
    id: 3,
    title: "En el Arranque",
    status: "Pendiente",
    observations: "",
    photo: null,
    isExpanded: true,
    checklist: [
      { id: "3-1", type: "standard", text: "Subir Vel. en Arranque para ver sincronismo", isCompleted: false, observation: "", photo: null, startTime: "", endTime: "" }
    ]
  }
];

// Arreglo de los parámetros extras que pediste para mostrarlos dinámicamente
const block2ExtraFields = [
  { key: 'velocidad', label: 'Veloc. Máquina' },
  { key: 'condicionPrensa', label: 'Cond. Prensa' },
  { key: 'presionYankee', label: 'Presión Yankee' },
  { key: 'tp', label: 'TP' },
  { key: 'velocidadGT', label: 'Velocidad GT' },
  { key: 'cht', label: 'CH/T' },
  { key: 'ref', label: 'REF' },
  { key: 'pope', label: 'POPE' },
  { key: 'yankee', label: 'YANKEE' },
  { key: 'prensaNipco', label: 'Prensa NIPCO' },
  { key: 'campana', label: 'CAMPANA' },
  { key: 'hic', label: 'HIC' },
  { key: 'cs', label: 'CS' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState(initialTasks);
  const [downloadVersion, setDownloadVersion] = useState(1);
  const fileInputRef = useRef(null);

  // --- MANEJO DE JSON ---
  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `Prueba MP1 V${downloadVersion}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    setDownloadVersion(prevVersion => prevVersion + 1);
  };

  const handleUploadJSON = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTasks = JSON.parse(e.target.result);
          setTasks(importedTasks);
          alert("Datos cargados exitosamente.");
        } catch (error) {
          alert("Error al leer el archivo JSON.");
        }
      };
      reader.readAsText(file);
    }
  };

  // --- ACTUALIZACIONES DE ESTADO ---
  const updateTask = (taskId, field, value) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, [field]: value } : t));
  };

  const updateChecklistItem = (taskId, checklistId, field, value) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const updatedChecklist = t.checklist.map(c => 
          c.id === checklistId ? { ...c, [field]: value } : c
        );
        return { ...t, checklist: updatedChecklist };
      }
      return t;
    }));
  };

  const toggleChecklistItem = (taskId, checklistId) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const updatedChecklist = t.checklist.map(c => 
          c.id === checklistId ? { ...c, isCompleted: !c.isCompleted } : c
        );
        
        const allCompleted = updatedChecklist.every(c => {
          if (c.type === 'branching' && c.phenomenon === true && c.analysisTasks) {
             return c.isCompleted && c.analysisTasks.every(a => a.isCompleted);
          }
          return c.isCompleted;
        });
        const someCompleted = updatedChecklist.some(c => c.isCompleted) || 
                              updatedChecklist.some(c => c.analysisTasks && c.analysisTasks.some(a => a.isCompleted));
        
        let newStatus = t.status;
        if (allCompleted) newStatus = "Completado";
        else if (someCompleted) newStatus = "En Proceso";
        else newStatus = "Pendiente";
        return { ...t, checklist: updatedChecklist, status: newStatus };
      }
      return t;
    }));
  };

  const completeAllInTask = (taskId) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const updatedChecklist = t.checklist.map(c => ({ ...c, isCompleted: true }));
        return { ...t, checklist: updatedChecklist, status: "Completado" };
      }
      return t;
    }));
  };

  const handleChecklistPhotoUpload = (taskId, checklistId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateChecklistItem(taskId, checklistId, 'photo', reader.result);
      reader.readAsDataURL(file);
    }
  };

  // --- FUNCIONES PARA ANÁLISIS ANIDADOS ---
  const updateAnalysisTask = (taskId, checklistId, analysisId, field, value) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const updatedChecklist = t.checklist.map(c => {
          if (c.id === checklistId && c.analysisTasks) {
            const updatedAnalysis = c.analysisTasks.map(a =>
              a.id === analysisId ? { ...a, [field]: value } : a
            );
            return { ...c, analysisTasks: updatedAnalysis };
          }
          return c;
        });
        return { ...t, checklist: updatedChecklist };
      }
      return t;
    }));
  };

  const toggleAnalysisTask = (taskId, checklistId, analysisId) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const updatedChecklist = t.checklist.map(c => {
          if (c.id === checklistId && c.analysisTasks) {
            const updatedAnalysis = c.analysisTasks.map(a =>
              a.id === analysisId ? { ...a, isCompleted: !a.isCompleted } : a
            );
            return { ...c, analysisTasks: updatedAnalysis };
          }
          return c;
        });
        
        const allCompleted = updatedChecklist.every(c => {
          if (c.type === 'branching' && c.phenomenon === true && c.analysisTasks) {
             return c.isCompleted && c.analysisTasks.every(a => a.isCompleted);
          }
          return c.isCompleted;
        });
        const someCompleted = updatedChecklist.some(c => c.isCompleted) || 
                              updatedChecklist.some(c => c.analysisTasks && c.analysisTasks.some(a => a.isCompleted));
        
        let newStatus = t.status;
        if (allCompleted) newStatus = "Completado";
        else if (someCompleted) newStatus = "En Proceso";
        else newStatus = "Pendiente";

        return { ...t, checklist: updatedChecklist, status: newStatus };
      }
      return t;
    }));
  };

  const handleAnalysisPhotoUpload = (taskId, checklistId, analysisId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateAnalysisTask(taskId, checklistId, analysisId, 'photo', reader.result);
      reader.readAsDataURL(file);
    }
  };

  // --- CÁLCULOS GANTT ---
  const { ganttItems, minTime, totalDuration } = useMemo(() => {
    let items = [];
    let minT = Infinity;
    let maxT = 0;

    tasks.forEach(t => {
      t.checklist.forEach(c => {
        if (c.startTime && c.endTime) {
          const s = new Date(c.startTime).getTime();
          const e = new Date(c.endTime).getTime();
          if (s < e) {
            items.push({ taskTitle: t.title, stepText: c.text, start: s, end: e, isCompleted: c.isCompleted, phenomenon: c.phenomenon });
            if (s < minT) minT = s;
            if (e > maxT) maxT = e;
          }
        }
        if (c.type === 'branching' && c.phenomenon === true && c.analysisTasks) {
          c.analysisTasks.forEach(a => {
            if (a.startTime && a.endTime) {
              const s = new Date(a.startTime).getTime();
              const e = new Date(a.endTime).getTime();
              if (s < e) {
                items.push({ taskTitle: `Análisis (${c.text})`, stepText: a.text, start: s, end: e, isCompleted: a.isCompleted, phenomenon: null });
                if (s < minT) minT = s;
                if (e > maxT) maxT = e;
              }
            }
          });
        }
      });
    });

    if (items.length === 0) {
      const now = new Date().getTime();
      return { ganttItems: [], minTime: now, totalDuration: 3600000 * 8 };
    }

    const duration = maxT - minT;
    const padding = duration * 0.05;
    return {
      ganttItems: items,
      minTime: minT - padding,
      totalDuration: duration + (padding * 2)
    };
  }, [tasks]);

  // --- DATOS PARA GRÁFICOS ANALÍTICOS ---
  const chartData = useMemo(() => {
    const block2 = tasks.find(t => t.id === 2);
    if (!block2) return [];

    return block2.checklist.map(item => {
      const labelParts = item.text.split('PASAR A ');
      const label = labelParts.length > 1 ? labelParts[1] : item.text;

      return {
        name: label,
        velocidad: parseFloat(item.velocidad) || 0,
        condicionPrensa: parseFloat(item.condicionPrensa) || 0,
        presionYankee: parseFloat(item.presionYankee) || 0,
        tp: parseFloat(item.tp) || 0,
        velocidadGT: parseFloat(item.velocidadGT) || 0,
        cht: parseFloat(item.cht) || 0,
        ref: parseFloat(item.ref) || 0,
        pope: parseFloat(item.pope) || 0,
        yankee: parseFloat(item.yankee) || 0,
        prensaNipco: parseFloat(item.prensaNipco) || 0,
        campana: parseFloat(item.campana) || 0,
        hic: parseFloat(item.hic) || 0,
        cs: parseFloat(item.cs) || 0,
      };
    });
  }, [tasks]);

  const getTaskProgress = (checklist) => {
    if (!checklist || checklist.length === 0) return 0;
    let total = 0;
    let completed = 0;
    
    checklist.forEach(c => {
      total++;
      if (c.isCompleted) completed++;
      if (c.type === 'branching' && c.phenomenon === true && c.analysisTasks) {
        c.analysisTasks.forEach(a => {
          total++;
          if (a.isCompleted) completed++;
        });
      }
    });
    
    return Math.round((completed / total) * 100);
  };

  const formatDateLabel = (timestamp) => {
    const d = new Date(timestamp);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  // Paleta de colores para los gráficos dinámicos
  const colorPalette = [
    { text: 'text-blue-600', bgSoft: 'bg-blue-100', bgHard: 'bg-blue-500', bgHover: 'group-hover:bg-blue-400', textDark: 'text-blue-800' },
    { text: 'text-indigo-600', bgSoft: 'bg-indigo-100', bgHard: 'bg-indigo-500', bgHover: 'group-hover:bg-indigo-400', textDark: 'text-indigo-800' },
    { text: 'text-teal-600', bgSoft: 'bg-teal-100', bgHard: 'bg-teal-500', bgHover: 'group-hover:bg-teal-400', textDark: 'text-teal-800' },
    { text: 'text-orange-600', bgSoft: 'bg-orange-100', bgHard: 'bg-orange-500', bgHover: 'group-hover:bg-orange-400', textDark: 'text-orange-800' },
    { text: 'text-purple-600', bgSoft: 'bg-purple-100', bgHard: 'bg-purple-500', bgHover: 'group-hover:bg-purple-400', textDark: 'text-purple-800' },
    { text: 'text-emerald-600', bgSoft: 'bg-emerald-100', bgHard: 'bg-emerald-500', bgHover: 'group-hover:bg-emerald-400', textDark: 'text-emerald-800' },
    { text: 'text-rose-600', bgSoft: 'bg-rose-100', bgHard: 'bg-rose-500', bgHover: 'group-hover:bg-rose-400', textDark: 'text-rose-800' },
    { text: 'text-amber-600', bgSoft: 'bg-amber-100', bgHard: 'bg-amber-500', bgHover: 'group-hover:bg-amber-400', textDark: 'text-amber-800' },
    { text: 'text-cyan-600', bgSoft: 'bg-cyan-100', bgHard: 'bg-cyan-500', bgHover: 'group-hover:bg-cyan-400', textDark: 'text-cyan-800' },
    { text: 'text-pink-600', bgSoft: 'bg-pink-100', bgHard: 'bg-pink-500', bgHover: 'group-hover:bg-pink-400', textDark: 'text-pink-800' },
    { text: 'text-fuchsia-600', bgSoft: 'bg-fuchsia-100', bgHard: 'bg-fuchsia-500', bgHover: 'group-hover:bg-fuchsia-400', textDark: 'text-fuchsia-800' },
    { text: 'text-lime-600', bgSoft: 'bg-lime-100', bgHard: 'bg-lime-500', bgHover: 'group-hover:bg-lime-400', textDark: 'text-lime-800' },
    { text: 'text-sky-600', bgSoft: 'bg-sky-100', bgHard: 'bg-sky-500', bgHover: 'group-hover:bg-sky-400', textDark: 'text-sky-800' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-gray-800 font-sans pb-10">
      {/* HEADER PRINCIPAL */}
      <header className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 w-full xl:w-auto">
            <div className="bg-white p-2 rounded-lg text-slate-900 font-bold leading-none text-center shadow-sm">
              <span className="block text-xs uppercase tracking-wider">Fabricación</span>
              <span className="block text-sm">Cañete</span>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-wider text-blue-50">CONTROL MP1</h1>
              <p className="text-slate-400 text-xs font-medium">Softys - Incrementos y Análisis</p>
            </div>
          </div>
          
          <div className="flex gap-2 w-full xl:w-auto overflow-x-auto pb-1 xl:pb-0">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold transition-all whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              <LayoutDashboard size={18} /> Estatus
            </button>
            <button 
              onClick={() => setActiveTab('gantt')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold transition-all whitespace-nowrap ${activeTab === 'gantt' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              <BarChartHorizontal size={18} /> Gantt
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold transition-all whitespace-nowrap ${activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              <TrendingUp size={18} /> Dashboard Analítico
            </button>
            <button 
              onClick={() => setActiveTab('flow')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold transition-all whitespace-nowrap ${activeTab === 'flow' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              <GitMerge size={18} /> Flujo Planeado
            </button>
            
            <div className="w-px bg-slate-700 mx-2 hidden xl:block"></div>
            
            <button 
              onClick={handleDownloadJSON}
              className="flex items-center gap-2 px-4 py-2 rounded-md font-bold bg-green-600 hover:bg-green-500 text-white transition-all whitespace-nowrap"
            >
              <Download size={18} /> Guardar
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 rounded-md font-bold bg-slate-700 hover:bg-slate-600 text-white transition-all whitespace-nowrap"
            >
              <Upload size={18} /> Cargar
            </button>
            <input type="file" accept=".json" ref={fileInputRef} onChange={handleUploadJSON} className="hidden" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 py-8">
        
        {/* =========================================
            PESTAÑA 1: DASHBOARD (PASO A PASO)
            ========================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {tasks.map((task) => {
              const progress = getTaskProgress(task.checklist);
              
              return (
                <div key={task.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  
                  {/* Cabecera del Task */}
                  <div className="bg-slate-50 p-5 border-b border-slate-200 flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center justify-between md:justify-start gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Bloque {task.id}</span>
                          <h3 className="font-extrabold text-xl text-slate-800">{task.title}</h3>
                        </div>
                        {/* Botón Acordeón (Colapsar/Expandir) */}
                        <button 
                          onClick={() => updateTask(task.id, 'isExpanded', !task.isExpanded)}
                          className="flex items-center gap-1 text-slate-500 hover:text-blue-700 text-xs font-bold bg-white px-3 py-1.5 rounded-md border border-slate-300 shadow-sm transition-all"
                        >
                          {task.isExpanded ? <><ChevronUp size={16}/> Ocultar Detalles</> : <><ChevronDown size={16}/> Mostrar Detalles</>}
                        </button>
                      </div>

                      <div className="flex items-center gap-4 mt-3">
                        <div className="w-full max-w-xs bg-slate-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-slate-600">{progress}% Completado</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:items-end gap-3 shrink-0">
                       {/* Botón Guardar Todo en Uno para el Bloque 1 */}
                       {task.id === 1 && (
                         <button 
                            onClick={() => completeAllInTask(task.id)}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-sm transition-colors"
                         >
                           <CheckCircle2 size={16} /> Validar Todo el Bloque
                         </button>
                       )}
                       
                       <select 
                          value={task.status}
                          onChange={(e) => updateTask(task.id, 'status', e.target.value)}
                          className={`p-2 border rounded-lg font-bold text-sm outline-none shadow-sm w-full md:w-auto ${
                            task.status === 'Completado' ? 'bg-green-100 border-green-300 text-green-800' :
                            task.status === 'En Proceso' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' :
                            'bg-slate-100 border-slate-300 text-slate-800'
                          }`}
                        >
                          <option value="Pendiente">⏳ Pendiente</option>
                          <option value="En Proceso">⚙️ En Proceso</option>
                          <option value="Completado">✅ Completado</option>
                        </select>
                    </div>
                  </div>

                  {/* Checklist Detallado (Se oculta si el Acordeón está cerrado) */}
                  {task.isExpanded && (
                    <div className="p-5 space-y-6 bg-white animate-fade-in">
                      {task.checklist.map((item) => (
                        <div key={item.id} className={`p-5 rounded-xl border-2 transition-all shadow-sm ${item.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200 hover:border-blue-300'}`}>
                          
                          {/* Fila 1: Título y Validar (Check) */}
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 border-b border-slate-100 pb-4">
                            <h4 className={`text-lg font-bold ${item.isCompleted ? 'text-green-700 line-through opacity-70' : 'text-slate-800'}`}>
                              {item.text}
                            </h4>
                            
                            <button 
                              onClick={() => toggleChecklistItem(task.id, item.id)}
                              className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-sm ${
                                item.isCompleted 
                                ? 'bg-green-600 text-white hover:bg-green-700 ring-2 ring-green-300' 
                                : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700 border border-slate-300'
                              }`}
                            >
                              {item.isCompleted ? <CheckCircle2 size={18} /> : <CheckSquare size={18} />}
                              {item.isCompleted ? 'Paso Validado' : 'Validar Paso'}
                            </button>
                          </div>

                          {/* Fila de Parámetros Extensos para Bloque 2 */}
                          {task.id === 2 && (
                            <div className="mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100 shadow-inner">
                              <p className="text-xs font-bold text-blue-700 uppercase mb-3 flex items-center gap-2">
                                <BarChart2 size={14}/> Registro de Parámetros de Máquina
                              </p>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
                                {block2ExtraFields.map((field, idx) => (
                                  <div key={idx}>
                                    <span className="text-[9px] font-bold text-slate-500 uppercase block truncate" title={field.label}>{field.label}</span>
                                    <input 
                                      type="number" step="0.1"
                                      value={item[field.key] || ""}
                                      onChange={(e) => updateChecklistItem(task.id, item.id, field.key, e.target.value)}
                                      className="w-full mt-1 p-1.5 text-xs font-medium border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                      placeholder="---"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Fila 2 (BIFURCACIÓN): Lógica especial para el PASO 2 */}
                          {item.type === 'branching' && (
                            <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <AlertTriangle size={14} className="text-orange-500"/> Decisión Crítica Requerida
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Botón SI HAY FENÓMENO */}
                                <button 
                                  onClick={() => updateChecklistItem(task.id, item.id, 'phenomenon', true)}
                                  disabled={item.phenomenon === false}
                                  className={`relative p-4 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                                    item.phenomenon === true 
                                    ? 'bg-red-50 border-red-500 shadow-md ring-4 ring-red-100' 
                                    : item.phenomenon === false 
                                      ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-200 grayscale'
                                      : 'bg-white border-red-200 hover:border-red-400 hover:bg-red-50 cursor-pointer'
                                  }`}
                                >
                                  {item.phenomenon === true && <div className="absolute top-2 right-2 text-red-600"><CheckCircle2 size={20}/></div>}
                                  <span className={`text-lg font-black mb-1 ${item.phenomenon === true ? 'text-red-700' : 'text-slate-700'}`}>
                                    🚨 SÍ HAY FENÓMENO
                                  </span>
                                  <span className={`text-sm font-semibold ${item.phenomenon === true ? 'text-red-900' : 'text-slate-500'}`}>
                                    {item.phenomenonText}
                                  </span>
                                </button>

                                {/* Botón NO HAY FENÓMENO */}
                                <button 
                                  onClick={() => updateChecklistItem(task.id, item.id, 'phenomenon', false)}
                                  disabled={item.phenomenon === true}
                                  className={`relative p-4 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                                    item.phenomenon === false 
                                    ? 'bg-green-50 border-green-500 shadow-md ring-4 ring-green-100' 
                                    : item.phenomenon === true 
                                      ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-200 grayscale'
                                      : 'bg-white border-green-200 hover:border-green-400 hover:bg-green-50 cursor-pointer'
                                  }`}
                                >
                                  {item.phenomenon === false && <div className="absolute top-2 right-2 text-green-600"><CheckCircle2 size={20}/></div>}
                                  <span className={`text-lg font-black mb-1 ${item.phenomenon === false ? 'text-green-700' : 'text-slate-700'}`}>
                                    ✅ NO HAY FENÓMENO
                                  </span>
                                  <span className={`text-sm font-semibold ${item.phenomenon === false ? 'text-green-900' : 'text-slate-500'}`}>
                                    {item.noPhenomenonText}
                                  </span>
                                </button>
                              </div>
                              
                              {/* Reiniciar selección */}
                              {item.phenomenon !== null && (
                                <div className="mt-3 text-right">
                                  <button 
                                    onClick={() => updateChecklistItem(task.id, item.id, 'phenomenon', null)} 
                                    className="text-xs font-bold text-slate-400 hover:text-slate-700 underline"
                                  >
                                    Deshacer selección de fenómeno
                                  </button>
                                </div>
                              )}

                              {/* DESPLIEGUE CONDICIONAL DE TENDENCIAS/ANÁLISIS */}
                              {item.phenomenon === true && item.analysisTasks && (
                                <div className="mt-6 border-t-2 border-red-200 pt-6 animate-fade-in bg-red-50/50 -mx-4 px-4 pb-4 rounded-b-xl shadow-inner">
                                  <h5 className="text-red-800 font-extrabold mb-4 flex items-center gap-2">
                                     <AlertTriangle size={18} /> Protocolo de Análisis Requerido (Desplegado por Fenómeno)
                                  </h5>
                                  <div className="space-y-4">
                                    {item.analysisTasks.map((analysis) => (
                                      <div key={analysis.id} className={`p-4 rounded-xl border transition-all shadow-sm ${analysis.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-red-200 hover:border-red-300'}`}>
                                        
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 border-b border-slate-100 pb-4">
                                          <h6 className={`text-sm font-bold ${analysis.isCompleted ? 'text-green-700 line-through opacity-70' : 'text-slate-800'}`}>
                                            {analysis.text}
                                          </h6>
                                          <button 
                                            onClick={() => toggleAnalysisTask(task.id, item.id, analysis.id)}
                                            className={`flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg font-bold text-xs transition-all shadow-sm ${
                                              analysis.isCompleted 
                                              ? 'bg-green-600 text-white hover:bg-green-700' 
                                              : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-700 border border-slate-300'
                                            }`}
                                          >
                                            {analysis.isCompleted ? <CheckCircle2 size={16} /> : <CheckSquare size={16} />}
                                            {analysis.isCompleted ? 'Análisis Validado' : 'Validar Análisis'}
                                          </button>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                                          {/* Tiempos de Análisis */}
                                          <div className="lg:col-span-3">
                                              <div className="space-y-2">
                                                <div>
                                                  <span className="text-[9px] font-bold text-slate-400 uppercase">Inicio</span>
                                                  <input 
                                                    type="datetime-local" value={analysis.startTime}
                                                    onChange={(e) => updateAnalysisTask(task.id, item.id, analysis.id, 'startTime', e.target.value)}
                                                    className="w-full mt-1 p-1.5 text-xs border border-slate-300 rounded outline-none"
                                                  />
                                                </div>
                                                <div>
                                                  <span className="text-[9px] font-bold text-slate-400 uppercase">Fin</span>
                                                  <input 
                                                    type="datetime-local" value={analysis.endTime}
                                                    onChange={(e) => updateAnalysisTask(task.id, item.id, analysis.id, 'endTime', e.target.value)}
                                                    className="w-full mt-1 p-1.5 text-xs border border-slate-300 rounded outline-none"
                                                  />
                                                </div>
                                              </div>
                                          </div>

                                          {/* Observaciones de Análisis */}
                                          <div className="lg:col-span-6 flex flex-col">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase mb-1">Observaciones / Medidas</span>
                                            <textarea
                                              value={analysis.observation || ""}
                                              onChange={(e) => updateAnalysisTask(task.id, item.id, analysis.id, 'observation', e.target.value)}
                                              placeholder="Anota datos del transmisor, presiones, gaps, etc..."
                                              className="w-full flex-grow p-2 border border-slate-300 rounded text-xs outline-none resize-none"
                                            ></textarea>
                                          </div>

                                          {/* Foto de Análisis */}
                                          <div className="lg:col-span-3 flex flex-col">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase mb-1">Evidencia</span>
                                            {analysis.photo ? (
                                              <div className="relative group w-full h-[60px] bg-black rounded overflow-hidden">
                                                <img src={analysis.photo} alt={`Evidencia`} className="absolute inset-0 w-full h-full object-cover opacity-90" />
                                                <button 
                                                  onClick={() => updateAnalysisTask(task.id, item.id, analysis.id, 'photo', null)}
                                                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                  <Trash2 size={12} />
                                                </button>
                                              </div>
                                            ) : (
                                              <div className="w-full h-[60px] border border-dashed border-slate-300 rounded flex flex-col items-center justify-center text-slate-400 bg-slate-50 hover:bg-red-50 cursor-pointer relative">
                                                <input 
                                                  type="file" accept="image/*" 
                                                  onChange={(e) => handleAnalysisPhotoUpload(task.id, item.id, analysis.id, e)}
                                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <span className="text-[9px] font-bold text-center">Subir Foto</span>
                                              </div>
                                            )}
                                          </div>
                                        </div>

                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Fila 3: Tiempos, Observaciones, Evidencias */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            
                            {/* Columna TIEMPOS */}
                            <div className="lg:col-span-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                               <label className="block text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-1">
                                  <Clock size={14} /> Cronología (Genera el Gantt)
                                </label>
                                <div className="space-y-3">
                                  <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Inicio Real</span>
                                    <input 
                                      type="datetime-local" 
                                      value={item.startTime}
                                      onChange={(e) => updateChecklistItem(task.id, item.id, 'startTime', e.target.value)}
                                      className="w-full mt-1 p-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                  </div>
                                  <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Fin Real</span>
                                    <input 
                                      type="datetime-local" 
                                      value={item.endTime}
                                      onChange={(e) => updateChecklistItem(task.id, item.id, 'endTime', e.target.value)}
                                      className="w-full mt-1 p-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                  </div>
                                </div>
                            </div>

                            {/* Columna OBSERVACIONES */}
                            <div className="lg:col-span-6 flex flex-col">
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                                <Save size={14} /> Observaciones / Mediciones de este paso
                              </label>
                              <textarea
                                value={item.observation || ""}
                                onChange={(e) => updateChecklistItem(task.id, item.id, 'observation', e.target.value)}
                                placeholder="Escribe resultados, qué válvula se tocó, parámetros, etc..."
                                className="w-full flex-grow p-3 border border-slate-300 rounded-lg text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-inner"
                              ></textarea>
                            </div>

                            {/* Columna FOTO */}
                            <div className="lg:col-span-3 flex flex-col">
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                                <ImagePlus size={14} /> Evidencia
                              </label>
                              {item.photo ? (
                                <div className="relative group w-full h-full min-h-[100px] bg-black rounded-lg overflow-hidden border border-slate-300">
                                  <img src={item.photo} alt={`Evidencia`} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-opacity" />
                                  <button 
                                    onClick={() => updateChecklistItem(task.id, item.id, 'photo', null)}
                                    className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow-md"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              ) : (
                                <div className="w-full h-full min-h-[100px] border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 bg-slate-50 hover:bg-blue-50 hover:border-blue-400 transition-colors cursor-pointer relative">
                                  <input 
                                    type="file" accept="image/*" 
                                    onChange={(e) => handleChecklistPhotoUpload(task.id, item.id, e)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <ImagePlus size={24} className="mb-2" />
                                  <span className="text-[10px] font-bold px-2 text-center uppercase">Añadir Foto</span>
                                </div>
                              )}
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* =========================================
            PESTAÑA 2: GANTT DINÁMICO
            ========================================= */}
        {activeTab === 'gantt' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 animate-fade-in">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2 flex items-center gap-2">
              <BarChartHorizontal className="text-blue-600" /> Diagrama Gantt Generado en Tiempo Real
            </h2>
            <p className="text-slate-500 mb-8 font-medium">Este gráfico se construye automáticamente basándose en las fechas y horas reales que ingreses en el estatus de cada paso.</p>
            
            {ganttItems.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
                <Clock size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-600">No hay datos de tiempo todavía</h3>
                <p className="text-slate-500">Regresa a "Estatus" y asigna Fecha/Hora de Inicio y Fin a los puntos para verlos graficados aquí.</p>
              </div>
            ) : (
              <div className="relative border border-slate-200 rounded-xl overflow-x-auto bg-slate-50 p-6">
                <div className="min-w-[800px]">
                  {/* Axis Header (Min/Max based) */}
                  <div className="relative h-8 border-b-2 border-slate-300 mb-6 flex justify-between text-xs font-bold text-slate-500">
                    <span>{formatDateLabel(minTime)}</span>
                    <span>{formatDateLabel(minTime + totalDuration / 2)}</span>
                    <span>{formatDateLabel(minTime + totalDuration)}</span>
                  </div>

                  {/* Render Items */}
                  <div className="space-y-4">
                    {ganttItems.map((item, idx) => {
                      const leftPercent = ((item.start - minTime) / totalDuration) * 100;
                      const widthPercent = ((item.end - item.start) / totalDuration) * 100;
                      
                      let barColor = "bg-blue-500";
                      if (item.phenomenon === true) barColor = "bg-red-500";
                      else if (item.phenomenon === false) barColor = "bg-green-500";
                      else if (item.isCompleted) barColor = "bg-indigo-500";

                      return (
                        <div key={idx} className="relative h-12 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center group">
                          {/* Etiqueta izquierda fija */}
                          <div className="w-1/3 min-w-[250px] px-4 font-bold text-sm text-slate-700 truncate border-r border-slate-100 z-10 bg-white/90">
                            <span className="text-[10px] text-slate-400 block uppercase tracking-wider">{item.taskTitle}</span>
                            {item.stepText}
                          </div>
                          
                          {/* Área de la barra (2/3 del espacio) */}
                          <div className="w-2/3 h-full relative">
                            <div 
                              className={`absolute top-2 bottom-2 rounded-md shadow ${barColor} hover:opacity-80 transition-opacity flex items-center px-2 cursor-help`}
                              style={{ left: `${leftPercent}%`, width: `${Math.max(widthPercent, 1)}%` }}
                              title={`Inicio: ${formatDateLabel(item.start)} - Fin: ${formatDateLabel(item.end)}`}
                            >
                               <span className="text-white text-[10px] font-bold truncate opacity-0 group-hover:opacity-100 transition-opacity">
                                  {formatDateLabel(item.start)} - {formatDateLabel(item.end)}
                               </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================
            PESTAÑA 3: DASHBOARD ANALÍTICO (GRÁFICOS)
            ========================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center gap-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <TrendingUp className="text-indigo-600" size={28} /> Dashboard de Análisis de Tendencias
            </h2>
            <p className="text-slate-500 font-medium px-2">Visualización automática de los parámetros registrados en los incrementos de gramaje.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              
              {/* Iteramos automáticamente sobre los 13 nuevos campos para crear sus gráficos */}
              {block2ExtraFields.map((fieldConfig, mapIdx) => {
                 // Calculamos el valor máximo de ese campo específico para escalar la gráfica
                 const maxVal = Math.max(...chartData.map(d => d[fieldConfig.key]), 10);
                 const colors = colorPalette[mapIdx % colorPalette.length]; // Asignamos un color distinto a cada gráfico
                 
                 return (
                    <div key={fieldConfig.key} className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 flex flex-col h-[280px]">
                      <h3 className={`text-xs font-black uppercase mb-4 flex items-center gap-1.5 ${colors.textDark}`}>
                        <BarChart2 size={16} className={colors.text} /> {fieldConfig.label}
                      </h3>
                      
                      <div className="flex-grow flex items-end justify-around gap-2 mt-auto">
                        {chartData.map((d, i) => {
                          // Altura porcentual dinámica
                          const heightPercent = d[fieldConfig.key] > 0 ? (d[fieldConfig.key] / maxVal) * 100 : 5;
                          
                          return (
                            <div key={i} className="flex flex-col items-center w-full h-full justify-end group cursor-pointer">
                               <div className={`w-full max-w-[32px] ${colors.bgSoft} rounded-t-md relative flex justify-center items-end h-full`}>
                                  <div
                                    className={`w-full ${colors.bgHard} rounded-t-md transition-all duration-1000 ${colors.bgHover}`}
                                    style={{ height: `${heightPercent}%` }}
                                  >
                                    <span className={`absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-bold ${colors.textDark} bg-white shadow-sm border border-slate-100 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10`}>
                                      {d[fieldConfig.key] || 0}
                                    </span>
                                  </div>
                               </div>
                               {/* Etiqueta X (Nombre de salto de gramaje) */}
                               <span className="text-[9px] text-center mt-2 font-bold text-slate-500 h-6 line-clamp-2 leading-tight px-1">
                                 {d.name}
                               </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                 );
              })}

            </div>
          </div>
        )}

        {/* =========================================
            PESTAÑA 4: FLUJO PLANEADO (DIAGRAMA)
            ========================================= */}
        {activeTab === 'flow' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 animate-fade-in overflow-x-auto">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-8 flex items-center gap-2">
              <GitMerge className="text-purple-600" /> Flujo de Planeación: Incremento de Gramajes
            </h2>

            <div className="min-w-[800px] flex flex-col items-center pb-10">
              
              <div className="bg-slate-800 text-white font-black px-8 py-4 rounded-xl shadow-lg border-2 border-slate-900 text-xl text-center">
                INICIO: 14.5 g/m² <br/><span className="text-sm font-medium text-slate-300">Velocidad: 1650 mpm</span>
              </div>
              <ArrowDownCircle size={32} className="text-slate-400 my-2" />

              {[
                { from: "14.5g", to: "16.5g", action1: "Análisis: Condición Prensa, Yankee", action2: "Sube gramaje" },
                { from: "16.5g", to: "18.5g", action1: "Análisis", action2: "Sube gramaje" },
                { from: "18.5g", to: "20g", action1: "Análisis", action2: "Sube gramaje" }
              ].map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="w-full max-w-4xl grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-5 flex justify-end">
                      <div className="bg-red-50 border-2 border-red-500 p-4 rounded-xl text-right shadow-sm w-full md:w-4/5">
                        <span className="text-red-700 font-black block text-sm">🚨 SI HAY FENÓMENO</span>
                        <span className="text-slate-600 font-medium text-sm">{step.action1}</span>
                      </div>
                    </div>
                    
                    <div className="col-span-2 flex flex-col items-center">
                      <div className="bg-blue-100 text-blue-900 font-black px-4 py-3 rounded-full border-2 border-blue-300 shadow-md text-center text-sm w-full max-w-[120px]">
                        PASAR A<br/>{step.to}
                      </div>
                    </div>

                    <div className="col-span-5 flex justify-start">
                      <div className="bg-green-50 border-2 border-green-500 p-4 rounded-xl text-left shadow-sm w-full md:w-4/5">
                        <span className="text-green-700 font-black block text-sm">✅ NO HAY FENÓMENO</span>
                        <span className="text-slate-600 font-medium text-sm">{step.action2} al siguiente ({step.to})</span>
                      </div>
                    </div>
                  </div>
                  <ArrowDownCircle size={32} className="text-slate-400 my-2" />
                </React.Fragment>
              ))}

              <div className="w-full max-w-4xl grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5 flex justify-end">
                    <div className="bg-orange-100 border-2 border-orange-500 p-4 rounded-xl text-right shadow-md w-full">
                      <span className="text-orange-700 font-black block text-sm">🚨 SI HAY FENÓMENO</span>
                      <span className="text-slate-800 font-bold text-sm block mb-1">Análisis (ACR)</span>
                      <div className="bg-orange-500 text-white font-bold p-2 rounded text-xs inline-block mt-2">
                        ACCIÓN INMEDIATA: Poner en funcionamiento Caja Pickup
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex flex-col items-center">
                    <div className="bg-slate-800 text-white font-black px-4 py-3 rounded-full border-2 border-slate-900 shadow-md text-center text-sm w-full max-w-[120px]">
                      PASAR A<br/>26 g/m²
                    </div>
                  </div>

                  <div className="col-span-5 flex justify-start">
                    <div className="bg-red-100 border-2 border-red-600 p-4 rounded-xl text-left shadow-md w-full">
                      <span className="text-red-700 font-black block text-sm">✅ NO HAY FENÓMENO</span>
                      <div className="bg-red-600 text-white font-black p-2 rounded text-sm inline-block mt-1 mb-2">
                        PARADA DE EMERGENCIA
                      </div>
                      <span className="text-slate-700 font-bold text-xs block">
                        * Antes de Parar:<br/>Cambiar el Yankee DCS e Inspeccionar
                      </span>
                    </div>
                  </div>
              </div>

            </div>
          </div>
        )}

      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}