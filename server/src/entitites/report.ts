import { IsNumber, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Report extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @IsString()
    @Column('text', { nullable: false })
    public commonName: string;

    @IsNumber()
    @Column('int', { nullable: false })
    public animalId: number;

}
