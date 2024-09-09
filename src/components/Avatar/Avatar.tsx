interface AvatarProps {
  isVideoOn?: boolean;
  isClicked?: boolean;
  size?: string;
  backgroundColor?: string;
  src?: string;
}

const Avatar = ({
  isVideoOn = false,
  isClicked = false,
  size = "w-[100px] h-[100px]",
  backgroundColor = "bg-white",
  src = "/images/avatars/27470372_7309700-removebg-preview (1) 1.svg",
}: AvatarProps) => {
  return (
    <div
      className={`overflow-hidden outline outline-3 outline-black rounded-full ${size} ${backgroundColor} ${
        isClicked ? "bg-primary-default" : "bg-white"
      }`}
    >
      {isVideoOn ? (
        <video></video>
      ) : (
        <img src={src} alt="Avatar" className="w-full h-full object-cover scale-110 translate-y-3" />
      )}
    </div>
  );
};
export default Avatar;
