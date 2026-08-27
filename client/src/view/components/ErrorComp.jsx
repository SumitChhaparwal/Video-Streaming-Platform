import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const ErrorComp = () => {
  const routeErr = useRouteError();

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center max-w-150 mx-auto gap-3 border border-[#ccc] rounded-2xl px-7 py-12 mt-[30vh] max-sm:mx-2">
        <h1 className="text-4xl font-medium tracking-tight">
          {routeErr.status} {routeErr.statusText}
        </h1>
        <h3 className="text-xl">{routeErr.data}</h3>
        <p className="text-lg tracking-tight text-center">
          The requested resource could not found on this server so try different
          route or go back to home page.
        </p>
        <Link to="/">
          <button className="bg-blue-600 text-white px-3 py-1 cursor-pointer hover:bg-blue-500 transition-all duration-300 ease-in">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
export default ErrorComp;
