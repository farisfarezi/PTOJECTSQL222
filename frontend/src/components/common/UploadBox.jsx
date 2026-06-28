import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';

export default function UploadBox({
  label,
  onChange,
  error,
  required = false,
  className = '',
  accept = 'image/jpeg, image/png',
  maxSizeMB = 5,
}) {
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File terlalu besar. Maksimal ${maxSizeMB}MB`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    onChange(file);
  };

  const onDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="font-bold text-sm text-text-main">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      
      {!preview ? (
        <div
          className={`relative border-2 border-dashed rounded-card p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
            dragActive ? 'border-primary bg-primary bg-opacity-5' : error ? 'border-error bg-red-50' : 'border-outline hover:border-primary hover:bg-surface-container'
          }`}
          onDragEnter={onDrag}
          onDragLeave={onDrag}
          onDragOver={onDrag}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <UploadCloud size={40} className={`mb-3 ${error ? 'text-error' : 'text-outline'}`} />
          <p className="font-bold text-text-main text-sm text-center">Klik untuk upload atau drag & drop</p>
          <p className="text-xs text-outline mt-1 text-center">Hanya file JPG, PNG (Maks {maxSizeMB}MB)</p>
        </div>
      ) : (
        <div className="relative border rounded-card overflow-hidden bg-background flex items-center p-3 gap-4 border-primary">
          <div className="w-16 h-16 rounded-soft overflow-hidden bg-surface-container flex-shrink-0 border border-border-subtle">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-primary truncate flex items-center gap-2"><ImageIcon size={16}/> Foto Siap Diupload</p>
            <p className="text-xs text-outline mt-0.5">Preview ditampilkan</p>
          </div>
          <button
            type="button"
            onClick={removeFile}
            className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:bg-red-50 hover:text-error transition-all"
          >
            <X size={20} />
          </button>
        </div>
      )}
      
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      {error && <p className="text-error text-xs font-medium mt-1">{error}</p>}
    </div>
  );
}
