const items = [
  {
    id: 'ToxicCover',
    image: '/images/drawing/toxic-cover.png',
    isActive: false,
  },
  {
    id: 'GrowingBomb',
    image: '/images/drawing/growing-bomb.png',
    isActive: true,
  },
  {
    id: 'PhantomReverse',
    image: '/images/drawing/phantom-reverse.png',
    isActive: true,
  },
  {
    id: 'LaundryFlip',
    image: '/images/drawing/laundry-flip.png',
    isActive: false,
  },
  {
    id: 'TimeCutter',
    image: '/images/drawing/time-cutter.png',
    isActive: true,
  },
];

const ItemBox = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-primary-default p-4 rounded-lg border-black border-[4px] drop-shadow-drawing">
      <h2 className="text-green-800 text-2xl font-bold mb-2">ITEM</h2>
      <div className="flex justify-between w-full">
        {items.map(item => (
          <div key={item.id} className="relative w-20 h-20 mx-2">
            <img
              src={item.image}
              alt={item.id}
              className={`w-full h-full object-contain ${
                item.isActive ? '' : 'opacity-50'
              }`}
            />
            {!item.isActive && (
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/images/drawing/inactive-cross.png" alt="inactive" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemBox;
