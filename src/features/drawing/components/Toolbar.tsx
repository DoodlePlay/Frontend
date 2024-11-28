import React from 'react';

import playSound from '../../../utils/helpers/playSound';

// 색상 목록 상수 정의
const COLORS = [
  'black',
  'purple',
  'red',
  'blue',
  'orange',
  'green',
  'yellow',
  'lightgreen',
];

// 사이즈 타입 정의
type SizeOption = 5 | 8 | 10;
type ToolOption = 'pencil' | 'eraser' | 'square' | 'paint' | 'circle' | 'clear';
type ColorOption = (typeof COLORS)[number]; // Colors 배열 내의 타입을 지정

interface ToolbarProps {
  selectedTool: ToolOption;
  setSelectedTool: React.Dispatch<React.SetStateAction<ToolOption>>;
  selectedColor: ColorOption;
  setSelectedColor: React.Dispatch<React.SetStateAction<ColorOption>>;
  selectedSize: SizeOption;
  setSelectedSize: React.Dispatch<React.SetStateAction<SizeOption>>;
}

// 툴바 컴포넌트 정의
const Toolbar: React.FC<ToolbarProps> = ({
  selectedTool,
  setSelectedTool,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
}) => {
  return (
    <div className="tall:max-w-[150px] short:max-w-[135px] tall:p-[20px] short:p-[15px] bg-primary-default flex flex-col tall:gap-[20px] short:gap-[5px] justify-between items-center rounded-lg shadow-lg border-[4px] border-black">
      <SizeSelector
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      <ToolSelector
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      <ColorSelector
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
};

// 사이즈 선택기 컴포넌트 정의
interface SizeSelectorProps {
  selectedSize: SizeOption;
  setSelectedSize: React.Dispatch<React.SetStateAction<SizeOption>>;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  selectedSize,
  setSelectedSize,
}) => {
  const sizes: { option: SizeOption }[] = [
    { option: 5 },
    { option: 8 },
    { option: 10 },
  ];

  return (
    <div className="flex w-full flex-row flex-wrap tall:gap-x-[10px] short:gap-x-[5px] justify-between items-center">
      {sizes.map(({ option }) => (
        <div
          key={option}
          className={`flex cursor-pointer rounded-full duration-300 hover:bg-secondary-500 ${
            selectedSize === option ? 'bg-secondary-default' : 'bg-black'
          }`}
          style={{ width: `${option * 2}px `, height: `${option * 2}px` }}
          onClick={() => {
            setSelectedSize(option);
            playSound('/sounds/selectPop.mp3', 1.0);
          }}
        />
      ))}
    </div>
  );
};

// 도구 선택기 컴포넌트 정의
interface ToolSelectorProps {
  selectedTool: ToolOption;
  setSelectedTool: React.Dispatch<React.SetStateAction<ToolOption>>;
}

const ToolSelector: React.FC<ToolSelectorProps> = ({
  selectedTool,
  setSelectedTool,
}) => {
  const tools: ToolOption[] = [
    'pencil',
    'eraser',
    'square',
    'paint',
    'circle',
    'clear',
  ];

  return (
    <div className="flex w-full flex-row flex-wrap tall:gap-x-[10px] short:gap-x-[5px] tall:gap-y-[20px] short:gap-y-[10px] justify-between">
      {tools.map(tool => (
        <ToolItem
          key={tool}
          icon={tool}
          selected={selectedTool === tool}
          onClick={() => {
            setSelectedTool(tool);
            playSound('/sounds/selectPop.mp3', 1.0);
          }}
        />
      ))}
    </div>
  );
};

// 도구 항목 컴포넌트 정의
interface ToolItemProps {
  icon: ToolOption;
  selected: boolean;
  onClick: () => void;
}

const ToolItem: React.FC<ToolItemProps> = ({ icon, selected, onClick }) => {
  const getIconSvg = (icon: ToolOption) => {
    switch (icon) {
      case 'pencil':
        return <PencilIcon selected={selected} />;
      case 'eraser':
        return <EraserIcon selected={selected} />;
      case 'square':
        return <SquareIcon selected={selected} />;
      case 'circle':
        return <CircleIcon selected={selected} />;
      case 'paint':
        return <PaintIcon selected={selected} />;
      case 'clear':
        return <ClearIcon selected={selected} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`max-w-1/2 p-[10px] flex items-center justify-center rounded-[5px] cursor-pointer transition-all duration-300 ${
        selected ? 'bg-primary-300' : ' hover:bg-primary-400'
      }`}
      onClick={onClick}
    >
      {getIconSvg(icon)}
    </div>
  );
};

// 색상 선택기 컴포넌트 정의
interface ColorSelectorProps {
  selectedColor: ColorOption;
  setSelectedColor: React.Dispatch<React.SetStateAction<ColorOption>>;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <div className="flex w-full flex-row flex-wrap tall:gap-x-[10px] short:gap-x-[5px] tall:gap-y-[20px] short:gap-y-[10px] justify-between">
      {COLORS.map(color => (
        <ColorItem
          key={color}
          color={color}
          selected={selectedColor === color}
          onClick={() => {
            setSelectedColor(color);
            playSound('/sounds/selectPop.mp3', 1.0);
          }}
        />
      ))}
    </div>
  );
};

// 색상 항목 컴포넌트 정의
interface ColorItemProps {
  color: ColorOption;
  selected: boolean;
  onClick: () => void;
}

const ColorItem: React.FC<ColorItemProps> = ({ color, selected, onClick }) => {
  return (
    <div
      className={`max-w-1/2 p-[10px] flex items-center justify-center rounded-[5px] cursor-pointer transition-all duration-300 hover:bg-primary-400 ${
        selected ? 'bg-primary-300' : ' hover:bg-primary-400'
      }`}
      onClick={onClick}
    >
      <svg
        width="25"
        height="26"
        viewBox="0 0 25 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.58249 1.95976C7.84334 2.18531 8.1324 2.33837 8.44965 2.41892C8.76691 2.49948 9.08771 2.50351 9.41202 2.43101C9.72223 2.36656 10.0148 2.22962 10.2898 2.02018C10.5577 1.80268 10.7762 1.53686 10.9454 1.22269C11.0371 1.05353 11.1605 0.916585 11.3156 0.811864C11.4777 0.707144 11.6469 0.654785 11.8232 0.654785C12.1052 0.654785 12.352 0.771588 12.5635 1.0052C12.7679 1.23075 12.8701 1.50463 12.8701 1.82685V1.85101C12.856 2.44712 13.0041 2.99086 13.3143 3.48224C13.6245 3.96556 14.0334 4.29181 14.541 4.46097C15.0487 4.63014 15.5492 4.60194 16.0427 4.37639C16.5292 4.15889 16.9064 3.79237 17.1743 3.27683C17.273 3.09961 17.3999 2.95864 17.555 2.85392C17.7172 2.7492 17.8899 2.69683 18.0732 2.69683C18.3552 2.69683 18.5984 2.80961 18.8029 3.03516C19.0073 3.26072 19.1096 3.5346 19.1096 3.85681C19.1166 4.31597 19.2224 4.74291 19.4268 5.13763C19.6313 5.53234 19.9062 5.84247 20.2517 6.06803C20.5972 6.30163 20.9708 6.42649 21.3727 6.4426C21.7675 6.45066 22.1447 6.34997 22.5042 6.14053C22.6523 6.05192 22.8109 6.00761 22.9801 6.00761C23.2692 6.00761 23.5124 6.12442 23.7098 6.35802C23.9143 6.59163 24.0165 6.87357 24.0165 7.20384C24.0165 7.45356 23.9531 7.68314 23.8262 7.89258C23.7063 8.09397 23.5441 8.23493 23.3397 8.31549C22.825 8.53299 22.4267 8.91159 22.1447 9.4513C21.8627 9.99102 21.764 10.575 21.8486 11.2034C21.9261 11.8236 22.1694 12.3432 22.5783 12.7621C22.9872 13.189 23.4666 13.4186 24.0165 13.4508C24.2915 13.4669 24.5241 13.5878 24.7145 13.8133C24.9048 14.0469 25 14.3208 25 14.635C25 14.9652 24.8978 15.2472 24.6933 15.4808C24.4889 15.7144 24.2421 15.8312 23.9531 15.8312C23.7768 15.8312 23.6041 15.7748 23.4349 15.662C23.1387 15.4606 22.8109 15.3438 22.4514 15.3116C22.0989 15.2875 21.7569 15.3479 21.4255 15.4929L21.1506 15.5654C20.7205 15.6056 20.3328 15.7627 19.9873 16.0366C19.6348 16.3185 19.3704 16.681 19.1942 17.1241C19.025 17.5671 18.965 18.0344 19.0144 18.5257C19.0637 19.0091 19.2188 19.4441 19.4797 19.8307C19.5996 20.0079 19.6701 20.2053 19.6912 20.4228C19.7476 21.0914 19.9873 21.6553 20.4103 22.1144C20.8404 22.5736 21.348 22.8072 21.9332 22.8152C22.2152 22.8233 22.4549 22.9441 22.6523 23.1777C22.8497 23.4114 22.9484 23.6893 22.9484 24.0115C22.9484 24.3417 22.8462 24.6197 22.6417 24.8452C22.4372 25.0788 22.194 25.1956 21.912 25.1956C21.6371 25.1956 21.4009 25.0949 21.2035 24.8935C21.0061 24.6841 20.8933 24.4304 20.8651 24.1323C20.8157 23.4637 20.576 22.8998 20.1459 22.4407C19.7159 21.9896 19.2083 21.756 18.6231 21.7398C18.3904 21.7237 18.193 21.6432 18.0309 21.4982C17.6995 21.2162 17.3294 21.0431 16.9205 20.9786C16.5116 20.9222 16.1168 20.9826 15.7361 21.1599C15.3553 21.3451 15.0416 21.6271 14.7948 22.0057C14.541 22.3682 14.3859 22.787 14.3295 23.2623C14.2943 23.5523 14.1779 23.794 13.9805 23.9873C13.7902 24.1806 13.5646 24.2773 13.3037 24.2773C13.1063 24.2773 12.9265 24.2209 12.7644 24.1081C12.6022 23.9954 12.4753 23.8463 12.3837 23.6611C12.144 23.1536 11.795 22.779 11.3367 22.5373C10.8855 22.2876 10.4096 22.2151 9.90905 22.3198C9.41554 22.4326 8.99605 22.6984 8.65059 23.1173C8.30513 23.5443 8.1042 24.0437 8.0478 24.6156C8.0196 24.9056 7.90679 25.1513 7.70938 25.3527C7.51198 25.5541 7.27932 25.6548 7.01142 25.6548C6.72941 25.6548 6.48617 25.538 6.28172 25.3044C6.07726 25.0788 5.97504 24.8009 5.97504 24.4706C5.97504 24.2129 6.03849 23.9873 6.16539 23.794C6.39805 23.4154 6.53553 22.9925 6.57783 22.5253C6.61308 22.058 6.5461 21.611 6.3769 21.184C6.20769 20.7571 5.95741 20.4067 5.62605 20.1328C5.2947 19.8589 4.92808 19.6938 4.52622 19.6374C4.26536 19.6052 4.04681 19.4763 3.87056 19.2507C3.6943 19.0252 3.60617 18.7593 3.60617 18.4532C3.60617 18.0988 3.72603 17.8008 3.96574 17.5591C4.21954 17.3094 4.41695 17.0113 4.55795 16.6649C4.69896 16.3266 4.76946 15.9641 4.76946 15.5775C4.77651 15.1988 4.71305 14.8364 4.5791 14.49C4.44514 14.1436 4.25479 13.8415 4.00803 13.5837C3.76832 13.3501 3.64848 13.0561 3.64848 12.7017C3.64848 12.5164 3.69077 12.3311 3.77538 12.1458C3.98688 11.6947 4.07501 11.2114 4.03976 10.6959C4.00451 10.1884 3.85292 9.72922 3.58502 9.31839C3.31006 8.90756 2.96108 8.60951 2.53807 8.42424C2.12211 8.24702 1.69204 8.21077 1.24788 8.31549L1.03637 8.33966C0.747313 8.33966 0.504079 8.22285 0.306673 7.98925C0.102218 7.75564 0 7.4737 0 7.14343C0 6.82121 0.102218 6.5433 0.306673 6.30969C0.504079 6.07608 0.747313 5.95928 1.03637 5.95928C1.26903 5.95928 1.48053 6.03983 1.67089 6.20094C2.05865 6.53927 2.49224 6.72454 2.97166 6.75677C3.46517 6.78093 3.91638 6.63996 4.32529 6.33386L4.50508 6.23719C5.04794 6.00359 5.45685 5.59679 5.73181 5.0168C6.00677 4.42875 6.08079 3.81251 5.95389 3.16807L5.93274 2.91433C5.93274 2.59212 6.03144 2.3142 6.22884 2.08059C6.4333 1.84699 6.68005 1.73018 6.96911 1.73018C7.19472 1.73018 7.39918 1.80671 7.58249 1.95976Z"
          fill={color}
        ></path>
      </svg>
    </div>
  );
};

const PencilIcon: React.FC<{ selected: boolean }> = ({ selected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 26"
    fill={selected ? '#228B22' : '#FFE999'}
    className="w-[25px] h-[25px]"
  >
    <path d="M24.3982 17.3228C24.8328 17.7557 25.032 18.2787 24.9958 18.8918C25.032 19.4689 24.8328 19.9739 24.3982 20.4067L19.7802 25.0055C19.3456 25.4384 18.8204 25.6548 18.2047 25.6548C17.6614 25.6548 17.1725 25.4384 16.7378 25.0055L1.36275 9.69424V5.09544L0.602145 4.33799C0.167514 3.90516 -0.0316919 3.38216 0.00452741 2.76898C-0.0316919 2.15581 0.149404 1.65085 0.547816 1.25409C0.982448 0.821258 1.50763 0.622878 2.12335 0.658947C2.73908 0.622878 3.26426 0.821258 3.69889 1.25409L4.51383 2.06564L9.02312 2.01154L24.3982 17.3228ZM15.1623 20.3526L19.7802 15.7538L18.259 14.2389L13.6411 18.8377L15.1623 20.3526ZM3.53591 8.77448L4.40517 9.64014L9.02312 5.04133L8.15386 4.17568L3.53591 4.22978V8.77448ZM12.1199 17.3228L16.7378 12.724L10.5987 6.61034L5.98071 11.2091L12.1199 17.3228Z" />
  </svg>
);

const EraserIcon: React.FC<{ selected: boolean }> = ({ selected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 26"
    fill={selected ? '#228B22' : '#FFE999'}
    className="w-[25px] h-[26px]"
  >
    <path d="M0.837207 7.67067L8.88224 1.23524C9.96145 0.377178 10.9589 0.470445 11.8746 1.51504L24.3346 15.7849C25.283 16.8295 25.2176 17.7808 24.1384 18.6389L16.0933 25.0743C15.0468 25.9324 14.0494 25.8391 13.101 24.7945L0.640986 10.5247C-0.274709 9.48006 -0.209302 8.52873 0.837207 7.67067ZM10.2558 2.80213L2.21075 9.23756L8.44074 16.4005L16.4858 9.90909L10.2558 2.80213Z" />
  </svg>
);

const SquareIcon: React.FC<{ selected: boolean }> = ({ selected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29 29"
    stroke={selected ? '#228B22' : '#FFE999'}
    className="w-[25px] h-[25px]"
  >
    <rect x="2" y="2" width="25" height="25" strokeWidth="3" fill="none" />
  </svg>
);

const CircleIcon: React.FC<{ selected: boolean }> = ({ selected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29 29"
    fill="none"
    stroke={selected ? '#228B22' : '#FFE999'}
    className="w-[25px] h-[25px]"
  >
    {/* Circle Icon Path */}
    <circle cx="14.5" cy="14.5" r="12.5" strokeWidth="3" />
  </svg>
);

const PaintIcon: React.FC<{ selected: boolean }> = ({ selected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 26"
    fill={selected ? '#228B22' : '#FFE999'}
    stroke="none"
    className="w-[25px] h-[26px]"
  >
    {/* Paint Icon Path */}
    <path d="M6.50478 19.8206C6.50478 20.7806 6.18413 21.6081 5.54281 22.3032C4.93203 22.9984 4.16856 23.3459 3.25239 23.3459C2.36676 23.3459 1.60329 22.9984 0.961975 22.3032C0.320659 21.6081 0 20.7806 0 19.8206V12.77C0 11.81 0.320659 10.9659 0.961975 10.2377L1.55748 9.74118L7.97065 5.81864L12.0476 1.34992C12.9027 0.423074 13.7578 0.423074 14.6129 1.34992L15.1168 1.8961L17.6362 1.49888H17.682C19.6976 1.46577 21.0566 2.14436 21.759 3.53463H21.8048C22.5377 4.85869 22.4003 6.48067 21.3925 8.40056L21.3467 8.45022L21.3009 8.59917L23.6829 11.1811C25.4236 13.0679 25.4389 14.9381 23.7287 16.7918L16.8575 24.2397C15.1168 26.1265 13.376 26.1265 11.6353 24.2397L6.50478 18.6786V19.8206ZM3.89371 12.9686L12.9638 22.7998L15.5748 22.8494L22.4461 15.4016C23.3012 14.4747 23.2859 13.5313 22.4003 12.5714L20.1557 10.1384C19.3311 11.0983 18.3233 11.959 17.1323 12.7203L14.6587 13.912C14.5976 14.6402 14.3227 15.2526 13.8341 15.7491C13.315 16.3119 12.6736 16.5932 11.9102 16.5932C11.1467 16.5932 10.5054 16.3119 9.98622 15.7491C9.43652 15.1533 9.16167 14.4582 9.16167 13.6637C9.16167 12.8362 9.42125 12.141 9.94041 11.5783C10.4901 11.0156 11.1467 10.7177 11.9102 10.6846C12.6736 10.6846 13.3302 10.9825 13.8799 11.5783L14.2006 11.9755C14.8724 11.7107 15.5443 11.3797 16.2162 10.9825L18.873 8.74813L13.3302 2.74019L3.89371 12.9686ZM20.2015 4.52768C19.7434 3.79944 18.9188 3.45187 17.7278 3.48497L16.6742 3.58428L19.9266 7.1096C20.4152 6.11655 20.5069 5.25591 20.2015 4.52768Z" />
  </svg>
);

const ClearIcon: React.FC<{ selected: boolean }> = ({ selected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23 28"
    fill="none"
    stroke={selected ? '#228B22' : '#FFE999'}
    className="w-[23px] h-[28px]"
  >
    {/* Clear/Delete Icon Path */}
    <path
      d="M19.9001 8.27246H3.1001V26.6548H19.9001V8.27246Z"
      strokeWidth="2"
    />
    <path d="M22 4.5957H1V8.27217H22V4.5957Z" strokeWidth="2" />
    <path d="M4.5 1.65479L18.5 1.65479" strokeWidth="2" />
    <path d="M5.37512 4.15479L5.28773 4.59793" strokeWidth="2" />
    <path d="M5.20007 8.27246V26.6548" strokeWidth="2" />
    <path d="M9.3999 8.27246V26.6548" strokeWidth="2" />
    <path d="M13.6001 8.27246V26.6548" strokeWidth="2" />
    <path d="M17.7999 8.27246V26.6548" strokeWidth="2" />
    <line x1="5.87512" y1="2.48804" x2="5.87512" y2="4.1547" />
    <line x1="5" y1="2.48804" x2="5" y2="4.1547" />
    <line x1="18.1249" y1="2.48804" x2="18.1249" y2="4.1547" />
    <line x1="17.25" y1="2.48804" x2="17.25" y2="4.1547" />
  </svg>
);

export default Toolbar;
