import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Employes} from "./employes";
@Entity()
export class Department {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    photo: string;

    

    @OneToMany(() => Employes, employes => employes.department)
    employes: Employes[];



}