import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProductSkuBody {
    @ApiProperty({example: 'A Product Id', required: true})
    @IsNotEmpty()
    @IsUUID()
    productId: string;

    @ApiProperty({example: 'A Sku code', required: true})
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty({example: 'A optional size to product sku'})
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    size?: string;

    @ApiProperty({example: 'A optional color to product sku'})
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    color?: string;

    @ApiProperty({example: 'A optional dimension to product sku'})
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    dimensions?: string;

    @ApiProperty({example: 'The product sku price', required: true})
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({example: 'The product sku stock', required: true})
    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @ApiProperty({example: 'A soft delete field, when set to a valid date deactivate the sku product'})
    @ApiPropertyOptional()
    @IsOptional()
    deletedAt?: Date | null;

}
