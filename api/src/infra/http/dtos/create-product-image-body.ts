import {IsBoolean,IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, } from "class-validator";

export class CreateProductImageBody {
    @IsNotEmpty()
    @IsUUID()
    productId: string;
    
    @IsOptional()
    @IsUUID()
    imageId?: string;
    
    @IsOptional()
    @IsUUID()
    skuId?: string;

    @IsNotEmpty()
    url: string;

    @IsString()
    altText: string;

    @IsBoolean()
    featured: boolean;

    @IsInt()
    position: number;

}
