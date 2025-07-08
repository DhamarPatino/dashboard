

export default function HeaderUI() {
    
    return (
        <div className="bg-gradient-to-r from-sky-400/90 to-blue-500/90 backdrop-blur-md border-b border-sky-200/50 shadow-lg w-full">
            <div className="max-w-7xl mx-auto px-6 py-8 w-full">
                <div className="flex flex-row items-center justify-between w-full">
                    {/* Agrupa título y subtítulo */}
                    <div className="flex flex-col">
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                            🌤️ Dashboard Meteorológico
                        </h1>
                        <p className="text-sky-100 text-lg">
                            Información climática en tiempo real ✨
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}