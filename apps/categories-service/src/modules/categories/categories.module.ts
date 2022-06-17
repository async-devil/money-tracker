import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { typeOrmConfigBase } from "src/database/ormconfig";
import { Category } from "src/entities/category.entity";

import { CategoriesController } from "./categories.controller";
import { CategoriesRepository } from "./categories.repository";
import { CategoriesService } from "./categories.service";

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfigBase()), TypeOrmModule.forFeature([Category])],
	controllers: [CategoriesController],
	providers: [CategoriesService, CategoriesRepository],
	exports: [CategoriesService],
})
export class CategoriesModule {}
