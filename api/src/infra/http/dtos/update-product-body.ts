import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsUUID, Matches } from "class-validator";

export class UpdateProductBody {
    @ApiProperty()
    @ApiPropertyOptional()
    @IsOptional()
    name?: string;

    @ApiProperty()
    @ApiPropertyOptional()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @ApiPropertyOptional()
    @IsOptional()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,{
        message: 'Slug must be lowercase, contain only letter, numbers and hyphens.'
    })
    slug?: string;

    @ApiProperty()
    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @ApiProperty({type: Date, description: 'When set to Date deactivate the product. When set to null activate the product'})
    @ApiPropertyOptional()
    @IsOptional()
    deletedAt?: Date | null;
}
