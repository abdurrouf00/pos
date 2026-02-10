"use client"
import { useState, useEffect } from "react"
import { Trash2, Users, Clock, ShieldAlert, UserPlus, Search, Play, Pause, X, Phone, User as UserIcon, Calendar, Tag, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const CoundownList = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [data, setData] = useState([
        { id: "001", name: "tasbin,imtiha", phone: "01812896599", "Ticket-type": "Custom", date: "09/02/2026", time: "15:53:54", timeLeft: 60, hasStarted: false, isPaused: false },
        { id: "002", name: "sohan,joayana", phone: "01790611766", "Ticket-type": "Deluxe", date: "09/02/2026", time: "15:54:35", timeLeft: 60, hasStarted: false, isPaused: false },
        { id: "003", name: "ALIZA,", phone: "01673684008", "Ticket-type": "Custom", date: "09/02/2026", time: "16:19:10", timeLeft: 60, hasStarted: false, isPaused: false },
        { id: "004", name: "adiba,mifta,afiyana", phone: "01850614241", "Ticket-type": "Custom", date: "09/02/2026", time: "16:24:21", timeLeft: 60, hasStarted: false, isPaused: false },
        { id: "005", name: "altya,toukib", phone: "01810293208", "Ticket-type": "Offer", date: "09/02/2026", time: "16:29:53", timeLeft: 60, hasStarted: false, isPaused: false },
        { id: "006", name: "ayan,munha", phone: "01324316744", "Ticket-type": "Deluxe", date: "09/02/2026", time: "16:30:47", timeLeft: 60, hasStarted: false, isPaused: false },
        { id: "007", name: "altya,toukib", phone: "01810293208", "Ticket-type": "Offer", date: "09/02/2026", time: "16:29:53", timeLeft: 60, hasStarted: false, isPaused: false },
        { id: "008", name: "ayan,munha", phone: "01324316744", "Ticket-type": "Deluxe", date: "09/02/2026", time: "16:30:47", timeLeft: 60, hasStarted: false, isPaused: false },
        { id: "009", name: "altya,toukib", phone: "01810293208", "Ticket-type": "Offer", date: "09/02/2026", time: "16:29:53", timeLeft: 60, hasStarted: false, isPaused: false },
        { id: "010", name: "ayan,munha", phone: "01324316744", "Ticket-type": "Deluxe", date: "09/02/2026", time: "16:30:47", timeLeft: 60, hasStarted: false, isPaused: false },
    ])

    // Timer Interval
    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => prevData.map(item => {
                if (item.hasStarted && !item.isPaused && item.timeLeft > 0) {
                    return { ...item, timeLeft: item.timeLeft - 1 }
                }
                return item
            }))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const handleDelete = (id) => setData(prev => prev.filter(item => item.id !== id))
    
    const handleToggleAction = (id) => {
        setData(prev => prev.map(item => {
            if (item.id === id) {
                if (!item.hasStarted) {
                    return { ...item, hasStarted: true, isPaused: false }
                } else {
                    return { ...item, isPaused: !item.isPaused }
                }
            }
            return item
        }))
    }

    const formatTimeLeft = (seconds, hasStarted) => {
        if (!hasStarted) return "00:00:00"
        const h = Math.floor(seconds / 60) // Keeping original logic
        const m = Math.floor((seconds % 60) / 60)
        const s = seconds % 60
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    }

    const getStatusInfo = (item) => {
        if (item.isPaused) return { label: "Holded", color: "bg-slate-200 text-slate-600 border-slate-300" }
        if (!item.hasStarted) return { label: "Inactive", color: "bg-slate-100 text-slate-500 border-slate-200" }
        if (item.timeLeft <= 0) return { label: "Expired", color: "bg-red-100 text-red-600 border-red-200" }
        if (item.timeLeft <= 30) return { label: "Warning", color: "bg-amber-100 text-amber-600 border-amber-200" }
        return { label: "Safe", color: "bg-emerald-100 text-emerald-600 border-emerald-200" }
    }

    const [filterStatus, setFilterStatus] = useState("All")

    const sortedData = [...data].filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             item.phone.includes(searchTerm) ||
                             item.id.includes(searchTerm)
        
        const matchesStatus = filterStatus === "All" || 
                             (filterStatus === "Active" && item.hasStarted && !item.isPaused) ||
                             (filterStatus === "Holded" && item.isPaused)
        
        return matchesSearch && matchesStatus
    }).sort((a, b) => {
        const aExpired = a.hasStarted && a.timeLeft <= 0;
        const bExpired = b.hasStarted && b.timeLeft <= 0;

        // Expired items go to the end
        if (aExpired && !bExpired) return 1;
        if (!aExpired && bExpired) return -1;

        // For non-expired (or both expired), sort by time left ascending
        return a.timeLeft - b.timeLeft;
    });

    return (
        <div className="flex flex-col gap-6 p-6 bg-slate-50 min-h-screen font-sans">
            
            {/* Header Section */}
            
               
                <div className="flex gap-3 w-full md:w-auto justify-between">
                    <button 
                        onClick={() => setData(prev => prev.filter(item => !(item.hasStarted && item.timeLeft <= 0)))}
                        className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                    >
                        Clear expired Data
                    </button>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                    >
                        <RotateCcw size={14} />
                        Refresh
                    </button>
                </div>
          

            {/* Stats Cards */}
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
                {[
                    { label: "Active Entries", val: data.filter(i => i.hasStarted && !i.isPaused && i.timeLeft > 0).length, icon: Users, color: "blue" },
                    { label: "Within Time", val: data.filter(i => i.timeLeft > 30).length, icon: Clock, color: "emerald" },
                    { label: "Expired", val: data.filter(i => i.timeLeft <= 0 && i.hasStarted).length, icon: ShieldAlert, color: "red" },
                    { label: "Total Generated", val: data.length, icon: UserPlus, color: "amber" }
                ].map((stat, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx} 
                        className={`bg-${stat.color}-50 border border-${stat.color}-100 p-5 rounded-2xl shadow-sm flex flex-col items-center justify-center relative overflow-hidden group`}
                    >
                        
                        <div className={`p-2 bg-${stat.color}-100 text-${stat.color}-600 rounded-xl mb-2`}>
                            <stat.icon size={22} />
                        </div>
                        <span className={`text-2xl md:text-4xl font-black text-${stat.color}-700`}>{stat.val}</span>
                        <span className={`text-[9px] md:text-[11px] font-bold text-${stat.color}-500 uppercase tracking-widest mt-1`}>{stat.label}</span>
                    </motion.div>
                ))}
            </div>

            {/* Control & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by name, phone or ID..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-12 py-3 md:py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-xs md:text-sm font-medium"
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200">
                    {["All", "Active", "Holded"].map((status) => (
                        <button 
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-3 md:px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${
                                filterStatus === status 
                                ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                                : "text-slate-500 hover:bg-slate-50"
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>


            {/* Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                <AnimatePresence>
                    {sortedData.map((item) => {
                        const status = getStatusInfo(item)
                        return (
                            <motion.div
                                layout="position"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ 
                                    layout: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                    scale: { duration: 0.2 }
                                }}
                                key={item.id}
                                className="group bg-white border border-slate-100 rounded-xl p-3 md:p-5 shadow-sm  relative flex flex-col gap-3 md:gap-4 overflow-hidden"
                            >
                              
                                {/* Card Header */}
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1 md:gap-2">
                                            <span className="text-[8px] md:text-[10px] font-black text-sky-500 uppercase tracking-tighter">ID: #{item.id}</span>
                                            <span className={`px-1.5 md:px-2 py-0.5 rounded-lg text-[7px] md:text-[9px] font-black uppercase border ${status.color}`}>
                                                {status.label}
                                            </span>
                                        </div>
                                        
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(item.id)}
                                        className="text-slate-300 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-1 md:p-2 rounded-xl "
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                {/* User Info */}
                                <div className="flex flex-col gap-0.5 md:gap-1 ">
                                    <h3 className="text-xs md:text-sm font-black uppercase line-clamp-1">
                                        {item.name}
                                    </h3>
                                    <div className="flex items-center gap-1 text-sky-500 text-[10px] md:text-xs font-bold">
                                        <Phone size={12} className="text-gray-400" />
                                        <span>{item.phone}</span>
                                    </div>
                                </div>
                                
                                {/* Countdown Timer */}
                                <div className="bg-slate-100 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center relative overflow-hidden">
                                    
                                    <p className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Time Left</p>
                                    <p className={`text-xl md:text-3xl font-mono font-black tracking-widest ${
                                        item.timeLeft <= 0 ? 'text-red-500' : 
                                        item.timeLeft <= 30 ? 'text-amber-500' : 
                                        'text-emerald-500'
                                    }`}>
                                        {formatTimeLeft(item.timeLeft, item.hasStarted)}
                                    </p>
                                    {item.isPaused && (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                                            <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-widest">On Hold</span>
                                        </div>
                                    )}
                                </div>

                                {/* Details & Actions */}
                                <div className="flex flex-col gap-2 mt-auto pt-2 border-t border-slate-50">
                                    <div className="flex items-center justify-between text-[8px] md:text-[10px] font-bold text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={10} />
                                            <span>{item.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={10} />
                                            <span>{item.time}</span>
                                        </div>
                                    </div>
                                    
                                    {(() => {
                                        const isExpired = item.hasStarted && item.timeLeft <= 0;
                                        return (
                                            <button 
                                                onClick={() => !isExpired && handleToggleAction(item.id)}
                                                disabled={isExpired}
                                                className={`flex items-center justify-center gap-2 w-full py-2 md:py-2.5 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-wider transition-all shadow-sm active:scale-95 ${
                                                    isExpired 
                                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none'
                                                    : item.hasStarted && !item.isPaused 
                                                        ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-sky-200/50' 
                                                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200/50'
                                                }`}
                                            >
                                                {isExpired ? (
                                                    "Expired"
                                                ) : item.hasStarted && !item.isPaused ? (
                                                    <>
                                                        <Pause size={12} fill="currentColor" />
                                                        Hold
                                                    </>
                                                ) : (
                                                    <>
                                                        <Play size={12} fill="currentColor" />
                                                        {item.hasStarted ? 'Resume' : 'Active'}
                                                    </>
                                                )}
                                            </button>
                                        );
                                    })()}
                                </div>

                                {/* Progress Bar (Visual indicator of time passing) */}
                                {item.hasStarted && (
                                    <div className="absolute bottom-0 left-0 h-1 bg-slate-100 w-full overflow-hidden">
                                        <motion.div 
                                            className={`h-full ${
                                                item.timeLeft <= 0 ? 'bg-red-500' : 
                                                item.timeLeft <= 30 ? 'bg-amber-500' : 
                                                'bg-emerald-500'
                                            }`}
                                            initial={{ width: "100%" }}
                                            animate={{ width: `${(item.timeLeft / 60) * 100}%` }}
                                            transition={{ duration: 1, ease: "linear" }}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

            {sortedData.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <div className="p-4 bg-slate-50 rounded-full mb-4">
                        <Users className="text-slate-300" size={48} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">No matching entries found</h3>
                    <p className="text-sm text-slate-400 mt-1">Try adjusting your search or add a new entry</p>
                </div>
            )}
         
        </div>
    )
}

export default CoundownList
