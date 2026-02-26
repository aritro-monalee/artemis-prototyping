"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ArrowDownToLine, Trash2, ImageIcon, CheckCircle2 } from "lucide-react";

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
}

const DUMMY_PHOTOS = [
  { id: "d1", name: "site-front-view.jpg", thumb: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=300&h=300&fit=crop&crop=center" },
  { id: "d2", name: "roof-angle-1.jpg", thumb: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=300&h=300&fit=crop&crop=center" },
  { id: "d3", name: "roof-angle-2.jpg", thumb: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=300&fit=crop&crop=center" },
  { id: "d4", name: "electrical-panel.jpg", thumb: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=300&h=300&fit=crop&crop=center" },
  { id: "d5", name: "meter-box.jpg", thumb: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=300&h=300&fit=crop&crop=center" },
];

interface UploadPhotosModalProps {
  title: string;
  onClose: () => void;
  onConfirm: (fileNames: string[]) => void;
}

export function UploadPhotosModal({ title, onClose, onConfirm }: UploadPhotosModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 3.5 * 1024 * 1024;

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const newFiles: UploadedFile[] = [];
    for (const file of Array.from(incoming)) {
      if (file.size > MAX_FILE_SIZE) continue;
      const entry: UploadedFile = { id: crypto.randomUUID(), file };
      if (file.type.startsWith("image/")) {
        entry.preview = URL.createObjectURL(file);
      }
      newFiles.push(entry);
    }
    setFiles((prev) => [...prev, ...newFiles]);
  }, [MAX_FILE_SIZE]);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const removed = prev.find((f) => f.id === id);
      if (removed?.preview) URL.revokeObjectURL(removed.preview);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files);
        e.target.value = "";
      }
    },
    [addFiles]
  );

  const handleUpload = () => {
    setStep(2);
  };

  const handleConfirm = () => {
    const realNames = files.map((f) => f.file.name);
    const dummyNames = DUMMY_PHOTOS.map((p) => p.name);
    onConfirm([...realNames, ...dummyNames]);
  };

  const allPhotos = [
    ...files.map((f) => ({ id: f.id, name: f.file.name, preview: f.preview, thumb: undefined as string | undefined })),
    ...DUMMY_PHOTOS.map((p) => ({ id: p.id, name: p.name, preview: undefined as string | undefined, thumb: p.thumb })),
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="w-[720px] max-w-[90vw] max-h-[85vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
          <h2 className="text-base font-semibold text-[var(--color-text)]">{title}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="flex-1 overflow-y-auto p-6"
            >
              {/* Drop zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative w-full rounded-lg border-2 border-dashed transition-colors ${
                  isDragOver
                    ? "border-[var(--color-brand)] bg-[var(--color-brand)]/[0.06]"
                    : "border-[var(--color-brand)]/30 bg-[var(--color-brand)]/[0.02]"
                } ${files.length > 0 ? "min-h-[200px]" : "min-h-[380px]"} flex flex-col items-center justify-center gap-3`}
              >
                <div className="flex flex-col items-center gap-3 pointer-events-none">
                  <div className="relative">
                    <FileText className="w-12 h-12 text-[var(--color-brand)]/60" strokeWidth={1} />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-brand)]/80 flex items-center justify-center">
                      <ArrowDownToLine className="w-3 h-3 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[var(--color-text)]">Drag your photos here</p>
                  <p className="text-xs text-[var(--color-text-muted)]">3.5 MB max file size.</p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm font-medium text-[var(--color-brand)] underline underline-offset-2 cursor-pointer hover:text-[var(--color-brand-hover)] transition-colors pointer-events-auto"
                >
                  Upload from your device
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileInput}
                />
              </div>

              {/* File list */}
              <AnimatePresence>
                {files.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-2 pt-4">
                      {files.map((entry) => (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
                        >
                          {entry.preview ? (
                            <img
                              src={entry.preview}
                              alt={entry.file.name}
                              className="w-9 h-9 rounded object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded bg-[var(--color-brand)]/10 flex items-center justify-center shrink-0">
                              <ImageIcon className="w-4 h-4 text-[var(--color-brand)]" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[var(--color-text)] truncate">{entry.file.name}</p>
                          </div>
                          <button
                            onClick={() => removeFile(entry.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--color-text-muted)] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="flex-1 overflow-y-auto p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-brand)]" />
                <p className="text-sm font-medium text-[var(--color-text)]">
                  {allPhotos.length} photo{allPhotos.length !== 1 ? "s" : ""} ready to upload
                </p>
              </div>

              {/* 3x3 photo grid */}
              <div className="grid grid-cols-3 gap-3">
                {allPhotos.map((photo, idx) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    className="aspect-square rounded-lg overflow-hidden relative group"
                  >
                    {(photo.preview || photo.thumb) ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={photo.preview || photo.thumb}
                        alt={photo.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#d4c9b8]">
                        <ImageIcon className="w-8 h-8 text-white/60" />
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-2.5 pb-2 pt-6">
                      <p className="text-xs text-white font-medium truncate">{photo.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--color-border)]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[var(--color-text)] bg-white border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          {step === 1 ? (
            <button
              onClick={handleUpload}
              className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-brand)] rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[var(--color-brand-hover)] transition-colors cursor-pointer"
            >
              Upload photos
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-brand)] rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[var(--color-brand-hover)] transition-colors cursor-pointer"
            >
              Upload and mark task as complete
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
