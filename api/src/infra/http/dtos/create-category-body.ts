import {IsBoolean, IsNotEmpty, IsOptional, IsUUID, Matches } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCategoryBody {
    @ApiProperty({example: 'A Category Title', required: true})
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: 'A Category Description'})
    @ApiPropertyOptional()
    @IsOptional()
    description?: string;

    @ApiProperty({example: 'a-category-slug', required: true, description: 'Slug must be lowercase, contain only letter, numbers and hyphens.'})
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,{
        message: 'Slug must be lowercase, contain only letter, numbers and hyphens.'
    })
    slug: string;

    @ApiProperty({required: true, description: 'A UUID of a category related to the product'})
    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    parentId?: string;

    @ApiPropertyOptional()
    @ApiPropertyOptional()
    @ApiProperty({description: 'A optional flag to create a active/deactive category, default to true.'})
    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}
