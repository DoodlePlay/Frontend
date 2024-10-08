'use client';

import { useEffect, useState, useRef } from 'react';
import * as fabric from 'fabric';

import TimeBar from './TimeBar';
import Toolbar from './Toolbar';
import NamePlate from '../../../components/NamePlate/NamePlate';
import Settings from '../../../components/Settings/Settings';
import Modal from '../../../components/Modal/Modal';

type QuizState =
  | 'breakTime'
  | 'timeOver'
  | 'success'
  | 'waiting'
  | 'choosing'
  | 'drawing'
  | 'create';

const initialGameState = {
  host: '',
  gameStatus: 'create' as QuizState,
  currentDrawer: '22202',
  currentWord: '사자',
  totalWords: ['사자', '호랑이' /* ... 추가적인 단어들 */],
  selectedWords: [] as string[],
  isWordSelected: false,
  selectionDeadline: null as number | null,
  maxRound: 3,
  round: 3,
  turn: 1,
  turnDeadline: null as number | null,
  correctAnswerCount: 0,
  items: {
    ToxicCover: { user: null, status: true },
    GrowingBomb: { user: null, status: false },
    PhantomReverse: { user: null, status: false },
    LaundryFlip: { user: null, status: false },
    TimeCutter: { user: null, status: false },
  },
  order: [] as string[],
  participants: {} as Record<
    string,
    {
      nickname: string;
      score: number;
      clickedAvatarIndex: string;
      isVideoOn: boolean;
      isFlipped: boolean;
    }
  >,
};

const Drawing: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [gameState, setGameState] = useState(initialGameState);
  const [comment, setComment] = useState('');
  const [selectedTool, setSelectedTool] = useState<
    'pencil' | 'eraser' | 'square' | 'paint' | 'circle' | 'clear'
  >('pencil');
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const [selectedSize, setSelectedSize] = useState<5 | 8 | 10>(5);
  const [isToolbar, setIsToolbar] = useState(true);
  const [canvasSize, setCanvasSize] = useState({ width: 730, height: 600 });
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [imageLoaded, setImageLoaded] = useState(false); // 이미지 로딩 상태 추가
  const [backgroundImage, setBackgroundImage] = useState(''); // 배경 이미지 경로 상태

  const quizStates: QuizState[] = [
    'drawing',
    'breakTime',
    'timeOver',
    'success',
    'waiting',
    'choosing',
  ];

  // 캔버스 초기화
  useEffect(() => {
    const canvas = new fabric.Canvas('fabric-canvas', {
      isDrawingMode: selectedTool === 'pencil',
      width: canvasSize.width,
      height: canvasSize.height,
      selection: false,
    });
    canvasRef.current = canvas;
    updateCanvasBrush();

    return () => {
      canvas.dispose();
    };
  }, [canvasSize]);

  // 뷰포트 크기에 따라 캔버스 크기 조정
  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;

      if (viewportHeight <= 1000) {
        setCanvasSize({
          width: 730,
          height: viewportHeight * 0.6,
        });
      } else {
        setCanvasSize({ width: 730, height: 600 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 도구나 색상, 크기가 변경될 때 브러시 업데이트
  useEffect(() => {
    removeCanvasEventListeners();
    updateCanvasBrush();
  }, [selectedTool, selectedColor, selectedSize]);

  const removeCanvasEventListeners = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.off('mouse:down');
      canvas.off('mouse:move');
      canvas.off('mouse:up');
    }
  };

  const updateCanvasBrush = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      canvas.isDrawingMode = false;
      canvas.selection = false;
      removeCanvasEventListeners();

      if (selectedTool === 'pencil') {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.color = selectedColor;
        canvas.freeDrawingBrush.width = selectedSize;
        canvas.freeDrawingCursor = `url("/images/drawingCursor.png"), auto`;
      } else if (selectedTool === 'eraser') {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.color = '#FFFFFF';
        canvas.freeDrawingBrush.width = selectedSize * 2;
        canvas.freeDrawingCursor = `url("/images/eraser.png"), auto`;
      } else if (selectedTool === 'square') {
        activateDrawingMode('square');
      } else if (selectedTool === 'circle') {
        activateDrawingMode('circle');
      } else if (selectedTool === 'paint') {
        activateFillMode();
      } else if (selectedTool === 'clear') {
        canvas.clear();
        setSelectedTool('pencil');
      } else {
        canvas.isDrawingMode = false;
      }
    }
  };

  const activateDrawingMode = (shape: 'square' | 'circle') => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let isDrawing = false;
    let shapeObject: fabric.Object | null = null;

    canvas.isDrawingMode = false;
    canvas.selection = false;
    canvas.forEachObject(obj => {
      obj.selectable = false;
    });

    const drawShape = (event: any) => {
      if (!isDrawing) {
        const pointer = canvas.getPointer(event.e);
        const startX = pointer.x;
        const startY = pointer.y;

        if (shape === 'square') {
          shapeObject = new fabric.Rect({
            left: startX,
            top: startY,
            originX: 'center',
            originY: 'center',
            width: 0,
            height: 0,
            fill: selectedColor,
            selectable: false,
          });
        } else if (shape === 'circle') {
          shapeObject = new fabric.Circle({
            left: startX,
            top: startY,
            originX: 'center',
            originY: 'center',
            radius: 0,
            fill: selectedColor,
            selectable: false,
          });
        }

        canvas.add(shapeObject);
        isDrawing = true;
      }
    };

    const resizeShape = (event: any) => {
      if (!shapeObject) return;
      const pointer = canvas.getPointer(event.e);
      if (shape === 'square') {
        shapeObject.set({
          width: Math.abs(pointer.x - shapeObject.left!),
          height: Math.abs(pointer.y - shapeObject.top!),
        });
      } else if (shape === 'circle') {
        const radius = Math.sqrt(
          Math.pow(pointer.x - shapeObject.left!, 2) +
            Math.pow(pointer.y - shapeObject.top!, 2)
        );
        (shapeObject as fabric.Circle).set({ radius });
      }
      canvas.renderAll();
    };

    const finishShape = () => {
      isDrawing = false;
      shapeObject = null;
    };

    canvas.on('mouse:down', drawShape);
    canvas.on('mouse:move', resizeShape);
    canvas.on('mouse:up', finishShape);
  };

  const activateFillMode = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    canvas.forEachObject(obj => {
      obj.selectable = false;
      obj.hoverCursor = 'default';
    });

    canvas.on('mouse:down', event => {
      const clickedObject = canvas.findTarget(event.e);
      if (clickedObject && clickedObject instanceof fabric.Object) {
        clickedObject.set({ fill: selectedColor });
        canvas.renderAll();
      }
    });
  };

  const preloadImages = () => {
    const images = [
      '/images/drawing/breakTime.png',
      '/images/drawing/timeOver.png',
      '/images/drawing/success.png',
      '/images/drawing/waiting.png',
    ];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  };

  useEffect(() => {
    preloadImages();
  }, []);

  const updateBackgroundImage = () => {
    let imgPath = '';
    switch (gameState.gameStatus) {
      case 'breakTime':
        imgPath = '/images/drawing/breakTime.webp';
        break;
      case 'timeOver':
        imgPath = '/images/drawing/timeOver.webp';
        break;
      case 'success':
        imgPath = '/images/drawing/success.webp';
        break;
      case 'waiting':
        imgPath = '/images/drawing/waiting.webp';
        break;
      default:
        imgPath = '';
    }
    setImageLoaded(false); // 로딩 상태 초기화
    setBackgroundImage(imgPath);
  };

  useEffect(() => {
    updateBackgroundImage();
  }, [gameState.gameStatus]);

  // 상황에 따른 comment를 설정하는 useEffect
  useEffect(() => {
    switch (gameState.gameStatus) {
      case 'timeOver':
        setComment("Time's up");
        break;
      case 'breakTime':
        setComment('Break Time');
        break;
      case 'choosing':
        setComment('Choose a word');
        break;
      default:
        setComment('');
    }
  }, [gameState.gameStatus]);

  // QuizState 변경 버튼 핸들러
  const onStateChange = () => {
    const currentIndex = quizStates.indexOf(gameState.gameStatus);
    const nextIndex = (currentIndex + 1) % quizStates.length;
    setImageLoaded(false); // 이미지 로딩 상태 초기화
    setGameState(prev => ({
      ...prev,
      gameStatus: quizStates[nextIndex],
    }));

    canvasRef.current.clear();
  };

  const onImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="relative rounded-[10px] p-[20px] border-[4px] border-black drop-shadow-drawing bg-white">
      <h1 className="absolute left-0 right-0 top-0 -translate-y-1/2 m-auto z-[39] max-w-1/2">
        <img
          className="m-auto"
          src="/images/Logo.svg"
          alt="Logo"
          draggable={false}
        />
      </h1>
      {/* 정답 단어 NamePlate */}
      {gameState.currentDrawer &&
        gameState.currentWord &&
        gameState.gameStatus === 'drawing' && (
          <div className="max-w-[40%] absolute top-[40px] left-0 right-0 m-auto text-center z-[20] opacity-[0.9]">
            <NamePlate title={gameState.currentWord} />
          </div>
        )}

      <div className="flex flex-col gap-y-[20px] max-w-[780px] w-full h-full relative overflow-hidden">
        <canvas
          id="fabric-canvas"
          className="rounded-[10px] absolute w-full h-full left-0 top-0 z-10"
        />
        {gameState.gameStatus === 'drawing' ? (
          ''
        ) : (
          <div
            style={{
              background: `${
                gameState.gameStatus === 'waiting' && imageLoaded
                  ? 'linear-gradient(180deg, rgba(34,139,34,1) 0%, rgba(187,230,187,1) 30%, rgba(220,215,96,1) 60%, rgba(255,199,0,1) 100%)'
                  : ''
              }`,
            }}
            className="h-full flex flex-col justify-center items-center absolute top-0 left-0 right-0 m-auto z-20"
          >
            <img
              src={backgroundImage}
              onLoad={onImageLoad}
              className={`${comment === undefined ? 'w-4/5' : 'w-3/5'}`}
              draggable={false}
              loading="lazy"
              style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
            />

            {imageLoaded && (
              <>
                {gameState.gameStatus === 'waiting' ? (
                  <NamePlate title="winner" score={200} />
                ) : (
                  <p className="text-center font-cherry text-secondary-default text-6xl">
                    {comment}
                  </p>
                )}
              </>
            )}

            {gameState.gameStatus === 'choosing' && (
              <>
                <p className="text-center font-cherry text-secondary-default text-6xl">
                  {comment}
                </p>
                <div className="flex space-x-4 mt-4">
                  {gameState.totalWords.map((word, index) => (
                    <NamePlate key={index} title={word} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div
          className={`${
            isToolbar ? '' : '-translate-x-full -ml-[25px]'
          } flex justify-between absolute top-0 left-0 z-10 duration-700`}
        >
          {gameState.currentDrawer && gameState.gameStatus === 'drawing' && (
            <>
              <Toolbar
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
              <div
                className={`${
                  isToolbar ? 'ml-3' : 'rotate-[900deg] ml-[30px]'
                }  absolute w-[30px] h-[30px] left-full top-1/2 -translate-y-1/2  cursor-pointer duration-700`}
                onClick={() => setIsToolbar(!isToolbar)}
              >
                <img
                  src="/images/drawing/toolbarController.svg"
                  alt="toolbar-controller"
                  draggable={false}
                />
              </div>
            </>
          )}
        </div>
        <div className="absolute top-0 right-0 z-40 max-w-[70px] flex flex-wrap gap-[10px]">
          <div
            className="w-full cursor-pointer"
            onClick={() => setIsSettingsModalOpen(true)}
          >
            <img
              src="/images/drawing/settingIcon.png"
              alt="setting"
              draggable={false}
            />
          </div>
          {gameState.gameStatus === 'drawing' && (
            <ul className="flex flex-col">
              {Object.entries(gameState.items).map(
                ([key, item]) =>
                  item.status && (
                    <li key={key}>
                      <img
                        src={`/images/drawing/items/${key}.png`}
                        alt={key}
                        draggable={false}
                      />
                    </li>
                  )
              )}
            </ul>
          )}
        </div>

        <div className="w-full max-w-[740px] absolute left-0 right-0 bottom-[20px] m-auto z-20">
          {gameState.gameStatus === 'choosing' ||
            (gameState.gameStatus === 'drawing' && (
              <TimeBar
                duration={10}
                onComplete={() => console.log('Time Over!')}
              />
            ))}
        </div>
      </div>
      <Modal
        isOpen={isSettingsModalOpen}
        title="Setting"
        onClose={() => setIsSettingsModalOpen(false)}
      >
        <Settings />
      </Modal>
      {/* 상태 변경 버튼 */}
      <button
        onClick={onStateChange}
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-2 rounded z-50"
      >
        Change State
      </button>
    </div>
  );
};

export default Drawing;
