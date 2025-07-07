import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsUUID, Matches } from "class-validator";

export class UpdateCategoryBody {
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
    parentId?: string;

    @ApiProperty({type: Date, description: 'Activate/deactivate the category. '})
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
