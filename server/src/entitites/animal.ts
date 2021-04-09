import { IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Animal extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: string;

    @IsString()
    @Column('text', { nullable: false })
    public commonName: string;

    @IsString()
    @Column('text', { nullable: false })
    public scientificName: string;

    @IsString()
    @Column('text', { nullable: false })
    public classis: string;

    @IsString()
    @Column('text', { nullable: false })
    public status: string;

    @IsString()
    @Column('text', { nullable: true })
    public description?: string;

    @IsString()
    @Column('text', { nullable: true })
    public image?: string;
}
