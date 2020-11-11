import warningPic from '../assets/img/undraw_warning_cyit.svg'
const NotFound = () => {
  return (
    <div className="bg-gray-200 w-screen h-screen flex flex-col items-center justify-center">
      <h2>404 Page Not Found</h2>
      <img
        alt="warningPic"
        src={warningPic}
        className="w-1/3 full justify-center items-center my-6" />
    </div>
  );
};

export default NotFound;