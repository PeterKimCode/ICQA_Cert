import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CertificateService } from '../services/dataService';
import { isExpired } from '../utils';
import { Search, Shield, ArrowRight } from 'lucide-react';

export const GuestSearch: React.FC = () => {
  const [name, setName] = useState('');
  const [icqaNumber, setIcqaNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cert = CertificateService.getByNumberAndName(icqaNumber, name);

    if (!cert) {
      setError('Certificate not found. Please check the Name and ICQA Number.');
      return;
    }

    if (isExpired(cert.expirationDate) || cert.status === 'REVOKED' || cert.status === 'EXPIRED') {
      setError('This certificate has expired or is invalid.');
      return;
    }

    // Success - navigate to view
    navigate(`/guest/view/${cert.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <Shield className="w-8 h-8 text-blue-900" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Certificate Verification</h1>
            <p className="text-sm text-gray-500">International Civil Qualification Association</p>
          </div>
        </div>

        <div className="p-8">
          <p className="mb-6 text-gray-600 text-sm">
            Please enter the exact Name and ICQA Number as they appear on the certificate to verify authenticity and view details.
          </p>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 text-sm">
              <p className="font-bold">Verification Failed</p>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSearch} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                ICQA Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g., GC01-24"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={icqaNumber}
                onChange={(e) => setIcqaNumber(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g., AN CHANG NAM"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Verify Certificate <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded border border-gray-200">
            <p className="font-bold mb-2 text-gray-700">Demo Certificates:</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-gray-200 pb-1">
                <span className="font-semibold text-green-700">Active</span>
                <span className="font-mono text-gray-800">GC01-24 / AN CHANG NAM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-red-700">Expired</span>
                <span className="font-mono text-gray-800">GC02-99 / JANE DOE</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
            <a href="/" className="text-sm text-blue-600 hover:underline">Back to Staff Login</a>
        </div>
      </div>
    </div>
  );
};