import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-slate-800">Oops!</h1>
        <h2 className="text-4xl font-bold text-white mt-4">
          Something went wrong.
        </h2>
        <p className="text-slate-400 mt-4 text-lg">
          An unexpected error occurred or the page you are looking for could not be found.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-600/30"
        >
          Anasayfaya Dön
        </Link>
      </div>
    </div>
  );
}