import { Module } from '@nestjs/common';
import { DestinatairesService } from './destinataires.service';
import { DestinatairesController } from './destinataires.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destinataire } from './destinataires.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Destinataire])],
  controllers: [DestinatairesController],
  providers: [DestinatairesService],
  exports: [DestinatairesService],
})
export class DestinatairesModule {}
