import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ImportationsService } from './importations.service';
import { Prisma } from '@prisma/client';

@Controller('importations')
export class ImportationsController {
  constructor(private readonly importationsService: ImportationsService) {}

  @Post()
  async create(
    @Body()
    createImportationDto: Prisma.ImportationsCreateInput & {
      supplier_id: number;
    },
  ) {
    try {
      const { supplier_id, import_items, ...imprt } = createImportationDto;
      if (
        !import_items ||
        (import_items as Prisma.Import_ItemsCreateInput[]).length === 0
      ) {
        throw new BadRequestException(
          'There is no import_items provided for the importation',
        );
      }
      const imprtDto: Prisma.ImportationsCreateInput = {
        ...imprt,
        import_items: {
          createMany: {
            data: import_items as Prisma.Import_ItemsCreateManyImportationInput[],
          },
        },
        supplier: {
          connect: { supplier_id: supplier_id },
        },
      };

      const importation = await this.importationsService.create(imprtDto);
      return importation;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Creating importation failed');
    }
  }

  @Get()
  async findAll() {
    try {
      const importation = await this.importationsService.findAll();
      return importation;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Fetching importations failed');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const importation = await this.importationsService.findOne(+id);
      return importation;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Fetching importation failed');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateImportationDto: Prisma.ImportationsUpdateInput,
  ) {
    try {
      const importation = await this.importationsService.update(
        +id,
        updateImportationDto,
      );
      return importation;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Updating importation failed');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const importation = await this.importationsService.remove(+id);
      return importation;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Removing importation failed');
    }
  }
}
