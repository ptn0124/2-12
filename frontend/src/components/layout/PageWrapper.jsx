import Navbar from './Navbar';

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col items-center">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow p-4 md:p-6 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
