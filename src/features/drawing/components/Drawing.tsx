'use client';

import { useEffect, useState, useRef } from 'react';
import * as fabric from 'fabric';

import TimeBar from './TimeBar';
import Toolbar from './Toolbar';
import ToxicEffect from './ToxicEffect';
import BombEffect from './BombEffect';
import NamePlate from '../../../components/NamePlate/NamePlate';
import KeywordPlate from '../../../components/KeywordPlate/KeywordPlate';
import Settings from '../../../components/Settings/Settings';
import Modal from '../../../components/Modal/Modal';
import useSocketStore from '../../socket/socketStore';

const Drawing: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  // const [gameState, setGameState] = useState(initialGameState);
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

  // TODO: 61번쨰 줄의 gameState 개별관리 코드 없어지면 gameState 별칭 지우기
  const { socket, roomId, gameState, updateGameState } = useSocketStore(); // 소켓 스토어에서 소켓과 roomId를 가져옴
  // 현재 사용자가 그림을 그릴 수 있는 조건
  const canDraw =
    gameState?.currentDrawer === socket?.id &&
    gameState?.gameStatus === 'drawing';

  // 캔버스를 초기화하고, 선택된 도구에 맞게 브러시 설정
  useEffect(() => {
    const canvas = new fabric.Canvas('fabric-canvas', {
      isDrawingMode: selectedTool === 'pencil',
      width: canvasSize.width,
      height: canvasSize.height,
      selection: false,
    });
    canvasRef.current = canvas;
    updateCanvasBrush(); // 그릴 수 있는 경우에만 브러시 업데이트
    disableObjectSelection();

    return () => {
      canvas.dispose();
    };
  }, [canvasSize, gameState?.gameStatus, canDraw]);

  // 모든 객체 선택을 비활성화
  const disableObjectSelection = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.forEachObject(obj => {
        obj.selectable = false; // 객체의 선택 비활성화
        obj.hoverCursor = 'default'; // 마우스 커서도 변경
      });
    }
  };

  // 캔버스에 있는 모든 객체를 JSON 형식으로 저장하는 함수
  const saveCanvasObjects = () => {
    if (canvasRef.current) {
      return JSON.stringify(canvasRef.current.toJSON());
    }
    return null;
  };

  // 리사이즈 핸들러 수정
  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const savedCanvas = saveCanvasObjects();

      if (viewportHeight <= 1000) {
        setCanvasSize({
          width: 730,
          height: viewportHeight * 0.6,
        });
      } else {
        setCanvasSize({ width: 730, height: 600 });
      }

      // 리사이즈 후에 저장된 캔버스 상태를 다시 불러옴
      setTimeout(() => {
        if (canvasRef.current && savedCanvas) {
          canvasRef.current.loadFromJSON(savedCanvas, () => {
            canvasRef.current.renderAll();
            disableObjectSelection();
          });
        }
      }, 0); // 지연 시간 제거
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      setTimeout(() => {
        canvasRef.current.renderAll();
        disableObjectSelection();
      }, 10);
    }
  }, [selectedTool, selectedColor, selectedSize, canvasSize]);

  // 도구나 색상, 크기가 변경될 때 브러시 업데이트
  useEffect(() => {
    removeCanvasEventListeners();
    updateCanvasBrush();
    disableObjectSelection();
  }, [selectedTool, selectedColor, selectedSize, canDraw]);

  // 캔버스에 등록된 이벤트 제거
  const removeCanvasEventListeners = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.off('mouse:down');
      canvas.off('mouse:move');
      canvas.off('mouse:up');
    }
  };

  // 캔버스 브러시 설정
  const updateCanvasBrush = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      canvas.selection = false;
      removeCanvasEventListeners();
      disableObjectSelection();

      if (selectedTool === 'pencil') {
        canvas.isDrawingMode = canDraw;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.color = selectedColor;
        canvas.freeDrawingBrush.width = selectedSize;
        canvas.freeDrawingCursor = `url("/images/drawingCursor.png"), auto`;
      } else if (selectedTool === 'eraser') {
        canvas.isDrawingMode = canDraw;
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

  // 도형 그리기 모드 (사각형, 원)
  const activateDrawingMode = (shape: 'square' | 'circle') => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let isDrawing = canDraw && false;
    let shapeObject: fabric.Object | null = null;
    let startX = 0,
      startY = 0;

    canvas.isDrawingMode = false;
    canvas.selection = false;
    disableObjectSelection(); // 기존 객체 선택 비활성화

    const drawShape = (event: fabric.TPointerEventInfo<MouseEvent>) => {
      if (!isDrawing) {
        const pointer = canvas.getPointer(event.e);
        startX = pointer.x;
        startY = pointer.y;

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

        if (shapeObject) {
          canvas.add(shapeObject);
          disableObjectSelection();
        }

        // 소켓으로 도형 시작 좌표 전송
        socket.emit('drawing', roomId, {
          eventType: 'start',
          shape,
          left: startX,
          top: startY,
          color: selectedColor,
        });
      }
    };

    const resizeShape = (event: fabric.TPointerEventInfo<MouseEvent>) => {
      if (!shapeObject) return;
      const pointer = canvas.getPointer(event.e);

      if (shape === 'square') {
        shapeObject.set({
          width: Math.abs(pointer.x - startX),
          height: Math.abs(pointer.y - startY),
        });
      } else if (shape === 'circle') {
        const radius = Math.sqrt(
          Math.pow(pointer.x - startX, 2) + Math.pow(pointer.y - startY, 2)
        );
        (shapeObject as fabric.Circle).set({ radius });
      }
      canvas.renderAll();

      // 소켓으로 도형의 크기 변화를 전송
      socket.emit('drawing', roomId, {
        eventType: 'move',
        shape,
        left: startX,
        top: startY,
        width: shape === 'square' ? Math.abs(pointer.x - startX) : undefined,
        height: shape === 'square' ? Math.abs(pointer.y - startY) : undefined,
        radius:
          shape === 'circle'
            ? Math.sqrt(
                Math.pow(pointer.x - startX, 2) +
                  Math.pow(pointer.y - startY, 2)
              )
            : undefined,
      });
    };

    const finishShape = () => {
      isDrawing = false;
      shapeObject = null;

      // 소켓으로 도형 종료 이벤트 전송
      socket.emit('drawing', roomId, { eventType: 'end' });
    };

    canvas.on('mouse:down', drawShape);
    canvas.on('mouse:move', resizeShape);
    canvas.on('mouse:up', finishShape);
  };

  // 채우기 모드 (객체에 색 채우기)
  const activateFillMode = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    // 모든 객체를 선택 불가능하게 하고, hover 커서를 기본값으로 설정
    canvas.forEachObject(obj => {
      obj.selectable = false;
      obj.hoverCursor = 'default';
    });

    canvas.on('mouse:down', event => {
      const clickedObject = canvas.findTarget(event.e);

      if (clickedObject && clickedObject instanceof fabric.Object) {
        clickedObject.set({ fill: selectedColor });
        canvas.renderAll();

        socket.emit('drawing', roomId, {
          eventType: 'fill',
          color: selectedColor,
          left: clickedObject.left,
          top: clickedObject.top,
          type: clickedObject.type,
        });
      }
    });
  };

  // 배경 이미지 프리로드
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

  // 게임 상태에 따른 배경 이미지 업데이트
  // TODO : case가 status인데, 추후 조건 변경 status = 'waiting', 'choosing', 'drawing' 3가지로 구분
  const updateBackgroundImage = () => {
    let imgPath = '';
    const currentTime = Date.now();

    switch (gameState?.gameStatus) {
      case 'waiting':
        imgPath = '/images/drawing/waiting.png';
        break;
      case 'choosing':
        if (
          gameState?.selectionDeadline &&
          currentTime >= gameState.selectionDeadline &&
          !gameState.isWordSelected
        ) {
          imgPath = '/images/drawing/timeOver.png';
        } else {
          imgPath =
            gameState?.currentDrawer !== socket?.id
              ? '/images/drawing/breakTime.png'
              : '';
        }
        break;
      default:
        imgPath = '';
    }
    setImageLoaded(false);
    setBackgroundImage(imgPath);
  };

  useEffect(() => {
    updateBackgroundImage();
  }, [gameState]);

  // 게임 상태에 따라 화면에 보여줄 메시지 업데이트
  useEffect(() => {
    if (
      gameState?.gameStatus === 'choosing' &&
      gameState?.currentDrawer === socket?.id
    ) {
      setComment('Choose a word');
    } else {
      setComment('Break Time');
    }
  }, [gameState]);

  const onImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    if (socket) {
      socket.on('itemUsedUpdate', updatedGameState => {
        updateGameState(updatedGameState);
      });
    }

    return () => {
      if (socket) socket.off('itemUsedUpdate');
    };
  }, [updateGameState]);

  useEffect(() => {
    if (gameState?.activeItem) {
      const { activeItem } = gameState;

      if (activeItem === 'LaundryFlip') {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          canvas.getObjects().forEach(obj => {
            obj.set('flipY', !obj.flipY); // 현재 상태 반전
          });
          canvas.renderAll();
        }
      }
    }
  }, [gameState?.activeItem]);

  // socket으로 clear 전송
  useEffect(() => {
    if (selectedTool === 'clear') {
      // clear 도구가 선택되었을 때 소켓으로 전송
      socket.emit('drawing', roomId, { eventType: 'clear', tool: 'clear' });
      if (canvasRef.current) {
        canvasRef.current.clear(); // 로컬 캔버스 클리어
      }
      setSelectedTool('pencil');
    }
  }, [selectedTool, socket, roomId]);

  // 소켓을 통해 그림 데이터를 서버로 전송 및 수신
  useEffect(() => {
    if (!socket || !roomId || !canvasRef.current) return;
    const canvas = canvasRef.current;

    const sendDrawingData = (
      eventType: string,
      x: number | null,
      y: number | null,
      tool: string
    ) => {
      if (!canDraw) return;
      socket.emit('drawing', roomId, {
        eventType,
        x,
        y,
        color: selectedColor,
        size: selectedSize,
        tool,
      });
    };

    // 그림 그리기 상태를 관리하는 변수
    let isDrawing = false;

    // 캔버스 초기화 및 이벤트 리스너 설정
    canvas.on('mouse:down', (event: fabric.TPointerEventInfo<MouseEvent>) => {
      const pointer = canvas.getPointer(event.e);
      isDrawing = true;

      if (selectedTool === 'clear') {
        setSelectedTool('clear'); // clear 후 자동으로 pencil 도구로 변경
      } else if (selectedTool === 'pencil' || selectedTool === 'eraser') {
        sendDrawingData('start', pointer.x, pointer.y, selectedTool);
      }
    });

    canvas.on('mouse:move', (event: fabric.TPointerEventInfo<MouseEvent>) => {
      if (
        !isDrawing ||
        selectedTool === 'clear' ||
        selectedTool === 'paint' ||
        selectedTool === 'square' ||
        selectedTool === 'circle'
      )
        return; // clear일 때는 무시
      const pointer = canvas.getPointer(event.e);
      sendDrawingData('move', pointer.x, pointer.y, selectedTool);
    });

    canvas.on('mouse:up', () => {
      isDrawing = false;
      if (selectedTool !== 'clear') {
        socket.emit('drawing', roomId, { eventType: 'end' });
      }
    });

    socket.on('drawingData', data => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;

      if (data.tool === 'clear') {
        canvas.clear(); // 소켓으로 받은 clear tool 처리
      } else {
        const pointer = new fabric.Point(data.x, data.y);
        const brush = canvas.freeDrawingBrush;

        if (!brush) {
          console.error('Brush is undefined');
          return;
        }

        const eventData = { pointer, e: new MouseEvent('x') };

        if (data.eventType === 'start') {
          if (data.tool === 'eraser') {
            brush.color = '#FFFFFF'; // 지우개 모드일 때는 흰색으로 설정
            brush.width = selectedSize * 2;
          } else {
            brush.color = data.color;
            brush.width = data.size;
          }

          if (typeof brush.onMouseDown === 'function') {
            brush.onMouseDown(pointer, eventData);
          }
        } else if (data.eventType === 'move') {
          if (typeof brush.onMouseMove === 'function') {
            brush.onMouseMove(pointer, eventData);
          }
        } else if (data.eventType === 'end') {
          if (typeof brush.onMouseUp === 'function') {
            brush.onMouseUp(eventData);
          }
        }
      }
    });

    // 소켓을 통해 받은 데이터로 채우기 작업 처리
    socket.on('drawingData', data => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;

      if (data.eventType === 'fill') {
        // 클릭된 객체의 좌표와 유형에 따라 객체를 찾아서 색상을 변경
        canvas.getObjects().forEach(obj => {
          if (
            obj.type === data.type &&
            obj.left === data.left &&
            obj.top === data.top
          ) {
            obj.set({ fill: data.color });
            canvas.renderAll();
          }
        });
      }
    });

    // 상대방이 도형을 그릴 때 좌표를 그대로 반영
    socket.on('drawingData', data => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;

      let shapeObject: fabric.Object | null = null;

      if (data.eventType === 'start') {
        if (data.shape === 'square') {
          shapeObject = new fabric.Rect({
            left: data.left, // 좌표 그대로 사용
            top: data.top, // 좌표 그대로 사용
            originX: 'center',
            originY: 'center',
            width: 0,
            height: 0,
            fill: data.color,
            selectable: false,
          });
        } else if (data.shape === 'circle') {
          shapeObject = new fabric.Circle({
            left: data.left, // 좌표 그대로 사용
            top: data.top, // 좌표 그대로 사용
            originX: 'center',
            originY: 'center',
            radius: 0,
            fill: data.color,
            selectable: false,
          });
        }

        if (shapeObject) {
          canvas.add(shapeObject);
        }

        socket.on('drawingData', moveData => {
          if (!shapeObject) return; // shapeObject가 null일 경우 동작하지 않음

          if (moveData.eventType === 'move') {
            if (moveData.shape === 'square') {
              shapeObject.set({
                width: moveData.width,
                height: moveData.height,
              });
            } else if (moveData.shape === 'circle') {
              (shapeObject as fabric.Circle).set({ radius: moveData.radius });
            }
            canvas.renderAll();
          } else if (moveData.eventType === 'end') {
            shapeObject = null;
          }
        });
      }
    });

    return () => {
      canvas.off('mouse:down');
      canvas.off('mouse:move');
      canvas.off('mouse:up');
      socket.off('drawingData');
    };
  }, [
    socket,
    roomId,
    selectedColor,
    selectedSize,
    selectedTool,
    gameState?.gameStatus,
  ]);

  return (
    <div className="relative rounded-[10px] p-[20px] border-[4px] border-black drop-shadow-drawing bg-white">
      <h1 className="absolute left-0 right-0 top-0 -translate-y-1/2 m-auto z-[39] max-w-[50%]">
        <img
          className="m-auto"
          src="/images/logo.svg"
          alt="Logo"
          draggable={false}
        />
      </h1>
      {/* 정답 단어 KeywordPlate */}
      {gameState?.currentDrawer === socket?.id &&
        gameState?.currentWord && // TODO : 그림 그리는 사람만 보여지기
        gameState?.gameStatus === 'drawing' && (
          <div className="max-w-[40%] absolute top-[40px] left-0 right-0 m-auto text-center z-[20] opacity-[0.9]">
            <KeywordPlate title={gameState?.currentWord} isChoosing={false} />
          </div>
        )}

      <div className="flex flex-col gap-y-[20px] max-w-[780px] w-full h-full relative overflow-hidden">
        <div
          className={`${
            canDraw ? 'hidden' : 'flex'
          } absolute w-full h-full left-0 top-0 z-[11]`}
        ></div>
        <canvas
          id="fabric-canvas"
          className={`rounded-[10px] absolute w-full h-full left-0 top-0 z-10`} // ${isFlipped ? 'transform scale-y-[-1]' : ''}
        />

        {gameState?.items['ToxicCover']?.status && <ToxicEffect />}
        {gameState?.items['GrowingBomb']?.status && <BombEffect />}

        {gameState?.gameStatus === 'drawing' ? (
          ''
        ) : (
          <div
            style={{
              background: `${
                gameState?.gameStatus === 'waiting' && imageLoaded
                  ? 'linear-gradient(180deg, rgba(34,139,34,1) 0%, rgba(187,230,187,1) 30%, rgba(220,215,96,1) 60%, rgba(255,199,0,1) 100%)'
                  : ''
              }`,
            }}
            className="h-full flex flex-col justify-center items-center absolute top-0 left-0 right-0 m-auto z-20"
          >
            <img
              src={backgroundImage}
              onLoad={onImageLoad}
              className={`${comment === '' ? 'max-h-[80%]' : 'max-h-[60%]'} `}
              draggable={false}
              loading="lazy"
              style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
            />
            {imageLoaded && (
              <>
                {gameState?.gameStatus === 'waiting' ? (
                  <NamePlate
                    title="winner"
                    score={200}
                    isDrawingActive
                    isWinner
                  />
                ) : (
                  <p className="text-center font-cherry text-secondary-default text-6xl">
                    {comment}
                  </p>
                )}
              </>
            )}

            {gameState?.gameStatus === 'choosing' &&
            gameState?.currentDrawer === socket?.id ? (
              <>
                <p className="text-center font-cherry text-secondary-default text-6xl">
                  {comment}
                </p>
                <div className="flex space-x-4 mt-4">
                  {gameState?.selectedWords.map((word, index) => (
                    <KeywordPlate key={index} title={word} isChoosing />
                  ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        )}
        <div
          className={`${
            isToolbar ? '' : '-translate-x-full -ml-[25px]'
          } flex justify-between absolute top-0 left-0 z-10 duration-700`}
        >
          {gameState?.gameStatus === 'drawing' &&
            gameState?.currentDrawer === socket?.id && ( // TODO : 그림 그리는 사람만 보여지기
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
          {gameState?.gameStatus === 'drawing' && (
            <ul className="flex flex-col">
              {gameState &&
                Object.entries(gameState?.items).map(
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
          {gameState?.gameStatus === 'drawing' && (
            <TimeBar
              duration={90}
              onComplete={() => console.log('Time Over!')}
              isTimeCut={gameState?.items['TimeCutter']?.status}
            />
          )}
          {gameState?.gameStatus === 'choosing' && (
            <TimeBar
              duration={5}
              onComplete={() => console.log('Time Over!')}
              isTimeCut={false}
            />
          )}
          <div>{gameState?.gameStatus}</div>
        </div>
      </div>
      <Modal
        isOpen={isSettingsModalOpen}
        title="Setting"
        onClose={() => setIsSettingsModalOpen(false)}
      >
        <Settings />
      </Modal>
    </div>
  );
};

export default Drawing;
