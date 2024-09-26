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
  const [selectedSize, setSelectedSize] = useState<number>(5);
  const [toolbarState, setToolbarState] = useState(true);

  //Test 상황
  items.ToxicCover = true;
  items.LaundryFlip = true;

  // 캔버스 초기화
  useEffect(() => {
    const canvas = new fabric.Canvas('fabric-canvas', {
      isDrawingMode: selectedTool === 'pencil',
      width: 730,
      height: 620,
      selection: false,
    });
    canvasRef.current = canvas;

    // 처음 로드 시 도구에 따라 브러시를 설정합니다.
    updateCanvasBrush();

    return () => {
      canvas.dispose();
    };
  }, []);

  // 도구나 색상, 크기가 변경될 때 브러시 업데이트
  useEffect(() => {
    removeCanvasEventListeners(); // 이전 도구에 설정된 이벤트 리스너 제거
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

      // 초기화: 모든 도구의 기본 상태 설정
      canvas.isDrawingMode = false; // 도형을 그릴 때는 드로잉 모드를 끈다.
      canvas.selection = false;
      removeCanvasEventListeners(); // 모든 기존 이벤트 리스너 제거

      if (selectedTool === 'pencil') {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.color = selectedColor;
        canvas.freeDrawingBrush.width = selectedSize;
        canvas.hoverCursor = 'default';
      } else if (selectedTool === 'eraser') {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.color = '#FFFFFF';
        canvas.freeDrawingBrush.width = selectedSize * 2;
      } else if (selectedTool === 'square') {
        activateDrawingMode('square');
      } else if (selectedTool === 'circle') {
        activateDrawingMode('circle');
      } else if (selectedTool === 'paint') {
        activateFillMode();
      } else if (selectedTool === 'clear') {
        canvas.clear(); // 모든 객체 제거
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
    // 도형 그리기 모드에서 모든 객체 선택 비활성화
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
            width: 0,
            height: 0,
            fill: selectedColor,
            selectable: false,
          });
        } else if (shape === 'circle') {
          shapeObject = new fabric.Circle({
            left: startX,
            top: startY,
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

    // 모든 객체의 선택을 비활성화
    canvas.forEachObject(obj => {
      obj.selectable = false;
      obj.hoverCursor = 'default'; // 커서 변경을 막기 위해 기본 커서로 설정
    });

    // fill 도구 활성화
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
        return '/images/drawing/break-time.png';
      case 'timeOver':
        return '/images/drawing/time-over.png';
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
  const handleTimeUp = () => {
    // setQuizState('timeOver');
    console.log('Time Over!');
  };

  // Todo: 정답화면 상태로 전환
  const handleSuccess = () => {
    // setQuizState('success');
    console.log('Good!');
  };

  // Todo: 쉬는시간 상태로 전환
  const handleBreakTime = () => {
    // setQuizState('breakTime');
    console.log('Break Time');
  };

  const handleToolbar = () => {
    if (toolbarState === true) {
      setToolbarState(false);
    } else {
      setToolbarState(true);
    }
  };

  return (
    <div className="relative">
      <h1 className="absolute left-0 right-0 top-0 -translate-y-1/2 m-auto z-30">
        <img
          className="m-auto"
          src="/images/Logo.svg"
          alt="Logo"
          loading="lazy"
        />
      </h1>
      <div className="flex flex-col gap-y-[20px] bg-white drop-shadow-drawing max-w-[780px] min-h-[630px] w-full h-full relative p-[20px] rounded-[10px] border-[4px] border-black overflow-hidden">
        <canvas
          id="fabric-canvas"
          className="rounded-[10px] absolute w-full h-full left-0 top-0 z-10"
        />
        <div className="flex flex-col justify-center items-center absolute top-0 left-0 right-0 m-auto z-20">
          <img
            src={getBackgroundImage()}
            className={`${comment === undefined ? 'w-4/5' : 'w-3/5'}`}
          />
          <p className="text-center font-cherry text-secondary-default text-6xl">
            {comment}
          </p>
        </div>
        <div
          className={`${
            toolbarState ? '' : '-translate-x-full -ml-[25px]'
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
              toolbarState ? '' : 'rotate-[900deg]'
            }  absolute w-[30px] h-[30px] left-full top-1/2 -translate-y-1/2 ml-3 cursor-pointer duration-700`}
            onClick={handleToolbar}
          >
            <img
              src="/images/drawing/toolbarController.svg"
              alt="toolbar-controller"
            />
          </div>
        </div>
        <ul className="flex flex-col max-w-[70px] absolute top-[20px] right-[20px] z-10">
          {items.ToxicCover && (
            <li>
              <img src="/images/drawing/toxic-cover.png" alt="Toxic Cover" />
            </li>
          )}
          {items.GrowingBomb && (
            <li>
              <img src="/images/drawing/growing-bomb.png" alt="Growing Bomb" />
            </li>
          )}
          {items.PhantomReverse && (
            <li>
              <img
                src="/images/drawing/phantom-reverse.png"
                alt="Phantom Reverse"
              />
            </li>
          )}
          {items.LaundryFlip && (
            <li>
              <img src="/images/drawing/laundry-flip.png" alt="Laundry Flip" />
            </li>
          )}
          {items.TimeCutter && (
            <li>
              <img src="/images/drawing/time-cutter.png" alt="Time Cutter" />
            </li>
          )}
        </ul>
        <div className="max-w-[740px] absolute left-0 right-0 bottom-[20px] m-auto z-20">
          <TimeBar duration={10} onComplete={handleTimeUp} />
        </div>
      </div>
    </div>
  );
};

export default Drawing;
