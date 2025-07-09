export default function HeaderUI() {
    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-6 py-8 w-full">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-col">
                        <h1 className="text-4xl lg:text-5xl  text-white mb-2">
                            🌤️ Dashboard Meteorológico
                        </h1>
                        <p className="text-white text-lg">
                            Información climática en tiempo real ✨
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}