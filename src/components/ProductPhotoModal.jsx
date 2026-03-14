import React, { useRef, useEffect, useState } from 'react';
import { Camera, X, RefreshCw, CheckCircle2, AlertCircle, Loader2, FlipHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductPhotoModal = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, streaming, captured
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    if (isOpen) {
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
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
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
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      setStatus('captured');
      stopCamera();
    }
  };

  const handleConfirm = () => {
    onCapture(capturedImage);
    handleClose();
  };

  const handleClose = () => {
    stopCamera();
    setStatus('idle');
    setCapturedImage(null);
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
        className="relative w-full max-w-xl bg-bg-card rounded-[2rem] overflow-hidden shadow-2xl border border-border"
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <Camera size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-text-main">Capture Product Photo</h3>
              <p className="text-xs text-text-muted">Take a real-time photo of your product</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-text-muted">
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <div className="relative aspect-video rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-border shadow-inner flex items-center justify-center">
            {status === 'error' ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle size={48} className="text-rose-500 mb-4" />
                <h4 className="font-bold text-text-main">Camera Access Denied</h4>
                <p className="text-sm text-text-muted mt-2">Please ensure you've granted camera permissions.</p>
                <button onClick={startCamera} className="mt-6 btn-primary flex items-center gap-2">
                  <RefreshCw size={18} /> Retry Access
                </button>
              </div>
            ) : status === 'captured' ? (
              <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
            ) : (
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                playsInline
              />
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="mt-8 flex gap-4">
            {status === 'captured' ? (
              <>
                <button 
                  onClick={() => {
                    setCapturedImage(null);
                    startCamera();
                  }}
                  className="flex-1 py-4 font-bold rounded-2xl border-2 border-border text-text-main hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Retake Photo
                </button>
                <button 
                  onClick={handleConfirm}
                  className="flex-[2] py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Use This Photo
                </button>
              </>
            ) : (
              <button 
                onClick={handleCapture}
                disabled={status !== 'streaming'}
                className="w-full py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 hover:bg-black dark:hover:bg-white transition-all transform active:scale-[0.98]"
              >
                <Camera size={20} />
                Capture Now
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPhotoModal;
