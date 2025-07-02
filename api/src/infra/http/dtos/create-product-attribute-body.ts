import { ProductImage } from "@application/entities/products/image";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDecimal, IsInstance, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateProductImageBody } from "./create-product-image-body";

export class CreateProductAttributeBody {
    @IsNotEmpty()
    @IsUUID()
    attributeId: string;

    @IsNotEmpty()
    value: string;

}
