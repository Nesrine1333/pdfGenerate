import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColisService } from './colis.service';
import { Colis } from './colis.entity';
import { ColisController } from './colis.controller';


@Module({

    imports: [TypeOrmModule.forFeature([Colis])],
    providers: [ColisService],
    controllers: [ColisController],
    exports: [TypeOrmModule],

})
export class ColisModule {}
