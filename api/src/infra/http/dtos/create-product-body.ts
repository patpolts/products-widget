import {IsBoolean, IsNotEmpty, IsUUID, Matches } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProductBody {
    @ApiProperty({example: 'A Product Title', required: true})
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: 'A Product Description', required: true})
    @IsNotEmpty()
    description: string;

    @ApiProperty({example: 'a-product-slug', required: true, description: 'Slug must be lowercase, contain only letter, numbers and hyphens.'})
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,{
        message: 'Slug must be lowercase, contain only letter, numbers and hyphens.'
    })
    slug: string;

    @ApiProperty({required: true, description: 'A UUID of a category related to the product'})
    @IsNotEmpty()
    @IsUUID()
    categoryId: string;

    @ApiPropertyOptional()
    @ApiProperty({description: 'A optional flag to create a active/deactive product, default to true.'})
    @IsBoolean()
    isActive: boolean;
}
