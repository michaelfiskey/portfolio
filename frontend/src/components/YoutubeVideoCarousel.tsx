import { useState, useCallback } from 'react';
interface YoutubeVideoCarouselProps {
    title: string,
    videoUrls: string[]
    className?: string
}

const YoutubeVideoCarousel = ( { title, videoUrls, className }: YoutubeVideoCarouselProps ) => {

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const handlePreviousVideo = useCallback(() => {
        setCurrentVideoIndex((prev) => (prev - 1 + videoUrls.length) % videoUrls.length);
    }, [videoUrls.length]);

    const handleNextVideo = useCallback(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videoUrls.length);
    }, [videoUrls.length]);

    const currentVideo = videoUrls[currentVideoIndex];

    return (
        <div className={className ? className : "rounded-2xl border border-warm-350 bg-warm-50 p-5 mb-5"}>
            <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-sm uppercase tracking-[0.2em] text-warm-700 mb-3">{title}</h3>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handlePreviousVideo}
                        aria-label="Show previous video"
                        className="h-9 w-9 rounded-full border border-[#b39879] text-[#6f5134] hover:bg-[#e2d3be] transition-colors"
                    >
                        &lt;
                    </button>
                    <button
                        type="button"
                        onClick={handleNextVideo}
                        aria-label="Show next video"
                        className="h-9 w-9 rounded-full border border-[#b39879] text-[#6f5134] hover:bg-[#e2d3be] transition-colors"
                    >
                        &gt;
                    </button>
                </div>
            </div>

            <div className="aspect-video overflow-hidden rounded-xl border border-[#cab393] bg-[#d5c2a8]">
                <iframe
                    src={`https://www.youtube.com/embed/${currentVideo}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="h-full w-full"
                />
            </div>

            <span className="mt-3 flex items-center justify-end gap-3 text-xs text-warm-700">
                {currentVideoIndex + 1} / {videoUrls.length}
            </span>
        </div>
    )
}
export default YoutubeVideoCarousel;