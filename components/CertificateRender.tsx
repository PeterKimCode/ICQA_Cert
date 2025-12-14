import React from 'react';
import { Certificate } from '../types';
import { ICQA_NAME } from '../constants';

interface Props {
  data: Certificate;
  isPreview?: boolean;
}

export const CertificateRender: React.FC<Props> = ({ data, isPreview = false }) => {
  // Base dimensions - Standard A4 Landscape-ish ratio for web display
  // Using 1123px width (approx 96 DPI A4 width)
  const BASE_WIDTH = 1123;
  const BASE_HEIGHT = 794;

  // --- COORDINATE CONFIGURATION ---
  const LEFT_MARGIN_LABEL = 80;    // X position for Field Labels
  const LEFT_MARGIN_VALUE = 330;   // X position for Field Values
  const FIELD_BASE_Y = 220;        // Moved down slightly to clear the pre-printed "CERTIFICATE" title in the image
  const FIELD_STEP_Y = 38;         // Fixed Y increment for each field row

  // Layout Zones
  const PHOTO_X = 840;
  const PHOTO_Y = 220;             // Align with fields
  const PHOTO_W = 180;
  const PHOTO_H = 240;

  const PARAGRAPH_Y = 600;         // Fixed Y start for body text
  const PARAGRAPH_X = 80;          // Left/Right margin for body text
  const PARAGRAPH_W = 963;         // 1123 - (80 * 2)

  // --- STYLES ---
  const labelStyle = "font-serif text-gray-700 font-bold text-lg leading-none";
  const valueStyle = "font-serif text-xl font-bold leading-tight block"; 
  const blueText = "text-icqa-blue";
  const redText = "text-icqa-red";
  
  return (
    <div 
      className={`relative bg-white shadow-2xl overflow-hidden print:shadow-none print:m-0 mx-auto select-none`}
      style={{ width: `${BASE_WIDTH}px`, height: `${BASE_HEIGHT}px` }}
    >
      {/* ------------------------------------------------------------
          1. BACKGROUND ZONE (Z-Index: 0)
          Using the provided static image as the template background.
          Assumes 'certificate_bg.png' exists in the public folder.
      ------------------------------------------------------------ */}
      <div className="absolute inset-0 z-[0]">
        <img 
            src="/certificate_bg.png" 
            alt="Certificate Background" 
            className="w-full h-full object-cover"
        />
      </div>

      {/* ------------------------------------------------------------
          2. FIELD ZONE (Z-Index: 10)
          Strict Absolute Positioning
      ------------------------------------------------------------ */}
      
      {/* Row 1: ICQA Number */}
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y, left: LEFT_MARGIN_LABEL }}>
        <span className={labelStyle}>ICQA Number :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y, left: LEFT_MARGIN_VALUE, width: '480px' }}>
        <span className={`${valueStyle} ${redText}`}>{data.icqaNumber}</span>
      </div>

      {/* Row 2: Name */}
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 1), left: LEFT_MARGIN_LABEL }}>
        <span className={labelStyle}>Name :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 1), left: LEFT_MARGIN_VALUE, width: '480px' }}>
        <span className={`${valueStyle} ${blueText} uppercase truncate`}>{data.name}</span>
      </div>

      {/* Row 3: DOB */}
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 2), left: LEFT_MARGIN_LABEL }}>
        <span className={labelStyle}>Date of Birth :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 2), left: LEFT_MARGIN_VALUE, width: '480px' }}>
        <span className={`${valueStyle} text-black`}>{data.dob}</span>
      </div>

      {/* Row 4: NCQA Number */}
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 3), left: LEFT_MARGIN_LABEL }}>
        <span className={labelStyle}>NCQA Number :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 3), left: LEFT_MARGIN_VALUE, width: '480px' }}>
        <span className={`${valueStyle} text-black`}>{data.ncqaNumber}</span>
      </div>

      {/* Row 5: Qualification Type (Truncate 1 line) */}
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 4), left: LEFT_MARGIN_LABEL }}>
        <span className={labelStyle}>Qualification type :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 4), left: LEFT_MARGIN_VALUE, width: '480px' }}>
        <span className={`${valueStyle} ${blueText} truncate`}>{data.qualificationType}</span>
      </div>

      {/* Row 6: Date Issue */}
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 5), left: LEFT_MARGIN_LABEL }}>
        <span className={labelStyle}>Date Issue :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 5), left: LEFT_MARGIN_VALUE, width: '480px' }}>
        <span className={`${valueStyle} text-black`}>{data.issueDate}</span>
      </div>

      {/* Row 7: Education Department (Allow 2 lines) */}
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 6), left: LEFT_MARGIN_LABEL }}>
        <span className={labelStyle}>Education Department :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 6) - 2, left: LEFT_MARGIN_VALUE, width: '480px', height: '50px' }}>
        <span className={`${valueStyle} ${blueText} line-clamp-2 text-lg`}>{data.eduDept}</span>
      </div>

      {/* Row 8: Issuing Office (Allow 2 lines) */}
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 7), left: LEFT_MARGIN_LABEL }}>
        <span className={labelStyle}>Issuing Office :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 7) - 2, left: LEFT_MARGIN_VALUE, width: '480px', height: '50px' }}>
        <span className={`${valueStyle} ${blueText} line-clamp-2 text-lg`}>{data.issuingOffice}</span>
      </div>

      {/* Row 9: Issuing Country */}
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 8), left: LEFT_MARGIN_LABEL }}>
        <span className={labelStyle}>Issuing Country :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 8), left: LEFT_MARGIN_VALUE, width: '480px' }}>
        <span className={`${valueStyle} ${blueText}`}>{data.issuingCountry}</span>
      </div>

      {/* Row 10: Expiration Date (Mandatory Field Position) */}
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 9), left: LEFT_MARGIN_LABEL }}>
        <span className={labelStyle}>Expiration Date :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 9), left: LEFT_MARGIN_VALUE, width: '480px' }}>
        <span className={`${valueStyle} text-black`}>
          {data.expirationDate || 'N/A'}
        </span>
      </div>

      {/* Row 11: Verified Body */}
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 10), left: LEFT_MARGIN_LABEL }}>
        <span className={labelStyle}>Verified Body :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: FIELD_BASE_Y + (FIELD_STEP_Y * 10), left: LEFT_MARGIN_VALUE, width: '480px' }}>
        <span className={`${valueStyle} text-black font-extrabold`}>{ICQA_NAME}</span>
      </div>


      {/* ------------------------------------------------------------
          3. PHOTO ZONE (Z-Index: 20)
      ------------------------------------------------------------ */}
      <div 
        className="absolute z-[20] border-2 border-gray-300 bg-gray-100 shadow-sm flex items-center justify-center overflow-hidden"
        style={{ top: PHOTO_Y, left: PHOTO_X, width: PHOTO_W, height: PHOTO_H }}
      >
        {data.photoUrl ? (
          <img src={data.photoUrl} alt="Recipient" className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400 text-sm font-sans">No Photo</div>
        )}
      </div>


      {/* ------------------------------------------------------------
          4. PARAGRAPH (BODY) ZONE (Z-Index: 10)
          Fixed Box, No overlap with Fields
      ------------------------------------------------------------ */}
      <div 
        className="absolute z-[10] text-center font-serif text-sm leading-relaxed text-gray-800"
        style={{ 
          top: PARAGRAPH_Y, 
          left: PARAGRAPH_X, 
          width: PARAGRAPH_W,
          height: '80px', // Fixed height constraints
          overflow: 'hidden' 
        }}
      >
        <p className="mb-2">
          The above person obtains this certificate by passing the domestic private qualification test and confirms that the obtained private qualification after passing the document examination by the <strong>{ICQA_NAME}</strong> has been replaced with the international private certificate and is being qualified and managed.
        </p>
        <p>
          This certification is issued to <span className="text-icqa-blue font-bold uppercase">{data.name}</span> upon request for whatever legal purpose it may serve him/her best.
        </p>
      </div>

      {/* NOTE: Signatures and Seals are part of the background image 'certificate_bg.png' so they are not rendered here. */}
    </div>
  );
};