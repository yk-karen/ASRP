import React, { useRef, useEffect, useState } from 'react';
import { Camera, X, Scan, RefreshCw, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScannerModal = ({ isOpen, onClose, onScanComplete }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, streaming, scanning, processing, success, error
  const [detectedData, setDetectedData] = useState(null);

  useEffect(() => {
    if (isOpen && !stream) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setStatus('idle');
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStatus('streaming');
    } catch (err) {
      console.error("Error accessing camera:", err);
      setStatus('error');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (status !== 'streaming') return;
    
    setStatus('processing');
    
    // Mocking AI processing delay
    setTimeout(() => {
      const mockResults = [
        { name: 'Organic Cotton Tee', category: 'Clothing', confidence: 0.98, estimatedAge: 'New' },
        { name: 'Multivitamin Pack', category: 'Pharmacy', confidence: 0.95, estimatedAge: '60d' },
        { name: 'Wireless Bluetooth Mouse', category: 'Electronics', confidence: 0.92, estimatedAge: 'New' }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setDetectedData(randomResult);
      setStatus('success');
    }, 2500);
  };

  const handleConfirm = () => {
    onScanComplete(detectedData);
    handleClose();
  };

  const handleClose = () => {
    stopCamera();
    setStatus('idle');
    setDetectedData(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <Scan size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">AI Inventory Scanner</h3>
              <p className="text-xs text-muted">Point camera at product to extract details</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <div className="relative aspect-video rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-border shadow-inner">
            {status === 'error' ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle size={48} className="text-rose-500 mb-4" />
                <h4 className="font-bold">Camera Access Denied</h4>
                <p className="text-sm text-muted mt-2">Please ensure you've granted camera permissions in your browser settings.</p>
                <button onClick={startCamera} className="mt-6 btn-primary flex items-center gap-2">
                  <RefreshCw size={18} /> Retry Access
                </button>
              </div>
            ) : status === 'processing' ? (
              <div className="h-full flex flex-col items-center justify-center bg-slate-900">
                <div className="relative w-64 h-64 border-2 border-primary/30 rounded-full flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-t-2 border-primary rounded-full"
                  />
                  <div className="text-center">
                    <Loader2 size={32} className="text-primary mx-auto animate-spin" />
                    <p className="text-white font-bold mt-4">Analyzing Image...</p>
                    <p className="text-blue-200/50 text-[10px] uppercase tracking-widest mt-1">AI Computation Active</p>
                  </div>
                </div>
              </div>
            ) : status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-8">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={32} />
                </motion.div>
                <h4 className="text-xl font-bold">Product Detected!</h4>
                <div className="mt-6 w-full max-w-sm card bg-white dark:bg-slate-800 shadow-xl border-emerald-500/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-emerald-500 uppercase">Detection Result</p>
                      <h5 className="font-bold text-lg mt-1">{detectedData.name}</h5>
                      <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-md text-muted mt-2 inline-block">
                        {detectedData.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-muted uppercase">Confidence</p>
                      <p className="text-lg font-black text-emerald-500">{(detectedData.confidence * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                playsInline
              />
            )}

            {/* Overlay Lines */}
            {status === 'streaming' && (
              <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                  animate={{ y: [0, 240, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(30,58,138,0.8)]"
                />
                <div className="absolute inset-0 border-[40px] border-black/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/30 rounded-3xl" />
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-4">
            {status === 'success' ? (
              <>
                <button 
                  onClick={() => setStatus('streaming')}
                  className="flex-1 py-4 font-bold rounded-2xl border-2 border-border hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Regenerate
                </button>
                <button 
                  onClick={handleConfirm}
                  className="flex-[2] py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Add to Inventory
                </button>
              </>
            ) : (
              <button 
                onClick={handleCapture}
                disabled={status !== 'streaming'}
                className="w-full py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 hover:bg-black dark:hover:bg-white transition-all transform active:scale-[0.98]"
              >
                <Camera size={20} />
                {status === 'idle' ? 'Initializing...' : 'Capture & Identify'}
              </button>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-border flex justify-center items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs font-semibold text-muted tracking-tight">AI Model v4.2 Core Activated • Ready for identification</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ScannerModal;
