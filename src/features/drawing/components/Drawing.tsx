'use client';

import { useEffect, useState, useRef } from 'react';
import * as fabric from 'fabric';

import TimeBar from './TimeBar';
import Toolbar from './Toolbar';

type QuizState = 'breakTime' | 'timeOver' | 'success' | 'wait' | 'choose';

const initialItemsState = {
  ToxicCover: false,
  GrowingBomb: false,
  PhantomReverse: false,
  LaundryFlip: false,
  TimeCutter: false,
};

const Drawing: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [items, setItems] = useState(initialItemsState);
  const [quizState, setQuizState] = useState<QuizState>('wait');
  const [comment, setComment] = useState('');
  const [selectedTool, setSelectedTool] = useState<
    'pencil' | 'eraser' | 'square' | 'paint' | 'circle' | 'clear'
  >('pencil');
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const [selectedSize, setSelectedSize] = useState<5 | 8 | 10>(5);
  const [isToolbar, setIsToolbar] = useState(true);
  const [canvasSize, setCanvasSize] = useState({ width: 730, height: 600 });

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
          width: viewportHeight * 0.73,
          height: viewportHeight * 0.6,
        });
      } else {
        setCanvasSize({ width: 730, height: 600 });
      }
    };

    handleResize(); // 초기 실행
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

  // 상황에 따른 이미지를 출력합니다.
  const getBackgroundImage = () => {
    switch (quizState) {
      case 'breakTime':
        return '/images/drawing/breakTime.png';
      case 'timeOver':
        return '/images/drawing/timeOver.png';
      case 'success':
        return '/images/drawing/success.png';
      default:
        return '';
    }
  };

  // 상황에 따른 comment를 설정하는 useEffect
  useEffect(() => {
    switch (quizState) {
      case 'timeOver':
        setComment("Time's up");
        break;
      case 'breakTime':
        setComment('Break Time');
        break;
      case 'choose':
        setComment('Choose a word');
        break;
      default:
        setComment('');
    }
  }, [quizState]);

  // Todo: 타임오버 상태로 전환
  const onTimeUp = () => {
    // setQuizState('timeOver');
    console.log('Time Over!');
  };

  // Todo: 정답화면 상태로 전환
  const onSuccess = () => {
    // setQuizState('success');
    console.log('Good!');
  };

  // Todo: 쉬는시간 상태로 전환
  const onBreakTime = () => {
    // setQuizState('breakTime');
    console.log('Break Time');
  };

  const onToolbar = () => {
    if (isToolbar === true) {
      setIsToolbar(false);
    } else {
      setIsToolbar(true);
    }
  };

  //Test 상황
  items.ToxicCover = true;
  items.LaundryFlip = true;

  return (
    <div className="relative">
      <h1 className="absolute left-0 right-0 top-0 -translate-y-1/2 m-auto z-30">
        <img
          className="m-auto"
          src="/images/Logo.svg"
          alt="Logo"
          draggable={false}
        />
      </h1>
      <div className="flex flex-col gap-y-[20px] bg-white drop-shadow-drawing max-w-[780px] w-full h-full relative p-[20px] rounded-[10px] border-[4px] border-black overflow-hidden">
        <canvas
          id="fabric-canvas"
          className="rounded-[10px] absolute w-full h-full left-0 top-0 z-10"
        />
        <div className="flex flex-col justify-center items-center absolute top-0 left-0 right-0 m-auto z-20">
          <img
            src={getBackgroundImage()}
            className={`${comment === undefined ? 'w-4/5' : 'w-3/5'}`}
            draggable={false}
          />
          <p className="text-center font-cherry text-secondary-default text-6xl">
            {comment}
          </p>
        </div>
        <div
          className={`${
            isToolbar ? '' : '-translate-x-full -ml-[25px]'
          } max-w-[740px] flex justify-between absolute top-[20px] left-[20px] z-10 duration-700`}
        >
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
              isToolbar ? '' : 'rotate-[900deg]'
            }  absolute w-[30px] h-[30px] left-full top-1/2 -translate-y-1/2 ml-3 cursor-pointer duration-700`}
            onClick={onToolbar}
          >
            <img
              src="/images/drawing/toolbarController.svg"
              alt="toolbar-controller"
              draggable={false}
            />
          </div>
        </div>
        <ul className="flex flex-col max-w-[70px] absolute top-[20px] right-[20px] z-10">
          {items.ToxicCover && (
            <li>
              <img
                src="/images/drawing/toxicCover.png"
                alt="Toxic Cover"
                draggable={false}
              />
            </li>
          )}
          {items.GrowingBomb && (
            <li>
              <img
                src="/images/drawing/growingBomb.png"
                alt="Growing Bomb"
                draggable={false}
              />
            </li>
          )}
          {items.PhantomReverse && (
            <li>
              <img
                src="/images/drawing/phantomReverse.png"
                alt="Phantom Reverse"
                draggable={false}
              />
            </li>
          )}
          {items.LaundryFlip && (
            <li>
              <img
                src="/images/drawing/laundryFlip.png"
                alt="Laundry Flip"
                draggable={false}
              />
            </li>
          )}
          {items.TimeCutter && (
            <li>
              <img
                src="/images/drawing/timeCutter.png"
                alt="Time Cutter"
                draggable={false}
              />
            </li>
          )}
        </ul>
        <div className="max-w-[740px] absolute left-0 right-0 bottom-[20px] m-auto z-20">
          <TimeBar duration={10} onComplete={onTimeUp} />
        </div>
      </div>
    </div>
  );
};

export default Drawing;
