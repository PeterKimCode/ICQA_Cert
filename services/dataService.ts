import { Certificate, CertificateSearchParams, CertificateStatus } from '../types';
import { INITIAL_CERTIFICATES } from '../constants';

const STORAGE_KEY = 'icqa_certificates_v1';

const getCertificates = (): Certificate[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CERTIFICATES));
    return INITIAL_CERTIFICATES;
  }
  return JSON.parse(stored);
};

const saveCertificates = (certs: Certificate[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
};

export const CertificateService = {
  getAll: (params?: CertificateSearchParams): Certificate[] => {
    let certs = getCertificates();
    
    if (params?.query) {
      const q = params.query.toLowerCase();
      certs = certs.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.icqaNumber.toLowerCase().includes(q) ||
        c.qualificationType.toLowerCase().includes(q)
      );
    }

    if (params?.status && params.status !== 'ALL') {
      certs = certs.filter(c => c.status === params.status);
    }

    return certs;
  },

  getById: (id: string): Certificate | undefined => {
    return getCertificates().find(c => c.id === id);
  },

  getByNumberAndName: (icqaNumber: string, name: string): Certificate | undefined => {
    return getCertificates().find(c => 
      c.icqaNumber.trim().toUpperCase() === icqaNumber.trim().toUpperCase() && 
      c.name.trim().toUpperCase() === name.trim().toUpperCase()
    );
  },

  create: (cert: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>): Certificate => {
    const certs = getCertificates();
    const newCert: Certificate = {
      ...cert,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    certs.unshift(newCert); // Add to top
    saveCertificates(certs);
    return newCert;
  },

  update: (id: string, updates: Partial<Certificate>): Certificate => {
    const certs = getCertificates();
    const index = certs.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Certificate not found");

    const updatedCert = { ...certs[index], ...updates, updatedAt: new Date().toISOString() };
    certs[index] = updatedCert;
    saveCertificates(certs);
    return updatedCert;
  },

  delete: (id: string) => {
    let certs = getCertificates();
    certs = certs.filter(c => c.id !== id);
    saveCertificates(certs);
  }
};