import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateProductImageBody } from "./create-product-image-body";

export class CreateProductSkuBody {
    @IsNotEmpty()
    @IsUUID()
    productId: string;

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsString()
    size: string;

    @IsString()
    color: string;

    @IsString()
    dimensions: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateProductImageBody)
    images?: CreateProductImageBody[]
}
