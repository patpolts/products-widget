import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {IsBoolean,IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, } from "class-validator";

export class CreateProductSkuImageBody {
    @ApiProperty({example: 'The product id related to image'})
    @IsNotEmpty()
    @IsUUID()
    productId: string;
    
    @ApiProperty({example: 'The id of the image'})
    @IsUUID()
    skuId: string;

    @ApiProperty({example: 'The url of the image'})
    @IsNotEmpty()
    url: string;

    @ApiProperty({example: 'The alt text of the image'})
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    altText?: string;

    @ApiProperty({example: 'Set the image as prodct front'})
    @IsBoolean()
    featured: boolean;

    @ApiProperty({example: 'Set position of the image'})
    @IsInt()
    position: number;

}
