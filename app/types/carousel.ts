import type { ProductImage, PlaceHolderImage } from "./product";

interface CarouselActions {
    onClick: () => void;
} 
type CarouselArrowsTypes = boolean | CarouselActions
type CarouselOrietationTypes = 'horizontal' | 'vertical'
type CarouselLoadingType = "lazy" | "eager"

export interface CarouselAutoplayOptions {
    delay?: number;
    stopOnMouseEnter?: boolean;
    stopOnInteraction?: boolean;
}
export type CarouselAutoplayType = boolean | CarouselAutoplayOptions


export interface CarouselProps {
    ref?: string;
    fade?: boolean;
    loop?: boolean;
    dots?: boolean;
    arrows?: boolean;
    autoplay?: CarouselAutoplayType;
    loading?: CarouselLoadingType;
    fit?: string;
    orientation?: CarouselOrietationTypes;
    delay?: number;
    stopOnMouseEnter?: boolean;
    stopOnInteraction?: boolean;
    carouselClass?: string;
    figureClass?: string;
    imageClass?: string;
    prev?: CarouselArrowsTypes;
    next?: CarouselArrowsTypes;
    select?: boolean;
    prevIcon?: string;
    nextIcon?: string;
    wheelGestures?: boolean;
    thumbnails?: boolean;
    ui?: string;
}