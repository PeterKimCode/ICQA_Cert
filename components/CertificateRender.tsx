import React from 'react';
import { Certificate } from '../types';
import { ICQA_NAME } from '../constants';

interface Props {
  data: Certificate;
  isPreview?: boolean;
}

export const CertificateRender: React.FC<Props> = ({ data, isPreview = false }) => {
  // 1. Base Premise: 2480 x 1748 px (300 DPI A4 Landscape-ish)
  const BASE_WIDTH = 2480;
  const BASE_HEIGHT = 1748;

  // --- COORDINATE CONFIGURATION (Anchor: Top-Left) ---
  // Adjusted for requested spacing:
  // - Shifted Labels and Values RIGHT (More left space)
  // - Shifted Photo LEFT (More right space)
  const LABEL_X = 340; 
  const VALUE_X = 740;
  
  // Font Sizes adjusted for 2480px width
  const FONT_LABEL = "30px";
  const FONT_VALUE = "32px"; 
  const FONT_NAME = "40px"; // Name is bold and prominent
  const FONT_ICQA = "36px"; // ICQA Number prominent
  const FONT_PARAGRAPH = "26px"; // Body text

  // Line Height
  const LEADING_NORMAL = "34px"; 
  const LEADING_DOUBLE = "34px"; 

  // Max width for fields next to photo to avoid overlap
  // Photo X = 1600. Value X = 740. Gap = 1600 - 740 = 860.
  // Safety margin ~40px -> Max Width = 820px.
  const MAX_TEXT_WIDTH = '820px';

  return (
    <div 
      className={`relative bg-white shadow-2xl overflow-hidden print:shadow-none print:m-0 mx-auto select-none`}
      style={{ 
        width: `${BASE_WIDTH}px`, 
        height: `${BASE_HEIGHT}px`,
        fontSmooth: 'always',
        WebkitFontSmoothing: 'antialiased'
      }}
    >
      {/* ------------------------------------------------------------
          1. BACKGROUND ZONE (Z-Index: 0)
          Static image: certificate_bg.png
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
          Strict Absolute Positioning based on spec table
      ------------------------------------------------------------ */}
      
      {/* Row 1: ICQA Number (Red) y: 420 */}
      <div className="absolute z-[10]" style={{ top: '420px', left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>ICQA Number :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: '416px', left: `${VALUE_X}px`, width: '500px', height: '34px' }}>
        <span className="font-serif font-bold text-icqa-red block" style={{ fontSize: FONT_ICQA, lineHeight: LEADING_NORMAL }}>
          {data.icqaNumber}
        </span>
      </div>

      {/* Row 2: Name (Blue, Bold) y: 470 */}
      <div className="absolute z-[10]" style={{ top: '470px', left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Name :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: '464px', left: `${VALUE_X}px`, width: MAX_TEXT_WIDTH, height: '34px' }}>
        <span className="font-serif font-bold text-icqa-blue uppercase truncate block" style={{ fontSize: FONT_NAME, lineHeight: LEADING_NORMAL }}>
          {data.name}
        </span>
      </div>

      {/* Row 3: DOB (Black) y: 520 */}
      <div className="absolute z-[10]" style={{ top: '520px', left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Date of Birth :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: '520px', left: `${VALUE_X}px`, width: '500px', height: '34px' }}>
        <span className="font-serif font-bold text-black block" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {data.dob}
        </span>
      </div>

      {/* Row 4: NCQA Number (Black) y: 570 */}
      <div className="absolute z-[10]" style={{ top: '570px', left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>NCQA Number :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: '570px', left: `${VALUE_X}px`, width: '500px', height: '34px' }}>
        <span className="font-serif font-bold text-black block" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {data.ncqaNumber}
        </span>
      </div>

      {/* Row 5: Qualification Type (Blue) y: 620 */}
      <div className="absolute z-[10]" style={{ top: '620px', left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Qualification type :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: '620px', left: `${VALUE_X}px`, width: MAX_TEXT_WIDTH, height: '34px' }}>
        <span className="font-serif font-bold text-icqa-blue truncate block" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {data.qualificationType}
        </span>
      </div>

      {/* Row 6: Date Issue (Black) y: 670 */}
      <div className="absolute z-[10]" style={{ top: '670px', left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Date Issue :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: '670px', left: `${VALUE_X}px`, width: '500px', height: '34px' }}>
        <span className="font-serif font-bold text-black block" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {data.issueDate}
        </span>
      </div>

      {/* Row 7: Education Dept (Blue, 2 lines) y: 720, h: 68 */}
      <div className="absolute z-[10]" style={{ top: '720px', left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Education Department :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: '716px', left: `${VALUE_X}px`, width: MAX_TEXT_WIDTH, height: '68px' }}>
        <span className="font-serif font-bold text-icqa-blue block line-clamp-2" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_DOUBLE }}>
          {data.eduDept}
        </span>
      </div>

      {/* Row 8: Issuing Office (Blue, 2 lines) y: 790, h: 68 */}
      <div className="absolute z-[10]" style={{ top: '790px', left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Issuing Office :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: '786px', left: `${VALUE_X}px`, width: MAX_TEXT_WIDTH, height: '68px' }}>
        <span className="font-serif font-bold text-icqa-blue block line-clamp-2" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_DOUBLE }}>
          {data.issuingOffice}
        </span>
      </div>

      {/* Row 9: Issuing Country (Blue) y: 860 */}
      <div className="absolute z-[10]" style={{ top: '860px', left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Issuing Country :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: '860px', left: `${VALUE_X}px`, width: '500px', height: '34px' }}>
        <span className="font-serif font-bold text-icqa-blue block" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {data.issuingCountry}
        </span>
      </div>

      {/* Row 10: Expiration Date (Black) y: 910 */}
      <div className="absolute z-[10]" style={{ top: '910px', left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Expiration Date :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: '910px', left: `${VALUE_X}px`, width: '500px', height: '34px' }}>
        <span className="font-serif font-bold text-black block" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {data.expirationDate || 'N/A'}
        </span>
      </div>

      {/* Row 11: Verified Body (Black) y: 960 */}
      {/* Verified Body is below the photo (Photo ends at 940), so it can extend full width if needed */}
      <div className="absolute z-[10]" style={{ top: '960px', left: `${LABEL_X}px` }}>
        <span className="font-serif font-bold text-gray-600 block leading-none" style={{ fontSize: FONT_LABEL }}>Verified Body :</span>
      </div>
      <div className="absolute z-[10]" style={{ top: '960px', left: `${VALUE_X}px`, width: '1000px', height: '34px' }}>
        <span className="font-serif font-extrabold text-black block tracking-tight" style={{ fontSize: FONT_VALUE, lineHeight: LEADING_NORMAL }}>
          {ICQA_NAME}
        </span>
      </div>


      {/* ------------------------------------------------------------
          3. PHOTO ZONE (Z-Index: 20)
          x: 1600 (Moved left from 1700), y: 420, w: 420, h: 520
      ------------------------------------------------------------ */}
      <div 
        className="absolute z-[20] bg-gray-50 flex items-center justify-center overflow-hidden"
        style={{ top: '420px', left: '1600px', width: '420px', height: '520px' }}
      >
        {data.photoUrl ? (
          <img src={data.photoUrl} alt="Recipient" className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-300 text-2xl font-sans p-4 text-center">Photo Area</div>
        )}
      </div>


      {/* ------------------------------------------------------------
          4. PARAGRAPH (BODY) ZONE (Z-Index: 10)
          Center aligned relative to the page generally looks best, 
          but we ensure it clears the side margins.
      ------------------------------------------------------------ */}
      <div 
        className="absolute z-[10] text-center font-serif text-gray-700"
        style={{ 
          top: '1020px', 
          left: '520px',  // Keep centered on the document
          width: '1440px',
          height: '180px', 
          fontSize: FONT_PARAGRAPH,
          lineHeight: '1.6',
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

    </div>
  );
};