import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {Department} from "./department";
import {LeaveRequest} from "./leaverequest";

@Entity()
export class Employes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    designation: string;

    @Column()
    phone: number;

    @Column()
    location: string;

    @Column()
    photo: string;

    
    @Column()
    usertype: string;

    @Column()
    repOfficer: number;


    @Column()
    email: string;

    
    @Column()
    password: string;

    
    @ManyToOne(() => Department, department => department.employes)
    department: Department;


    @OneToMany(() => LeaveRequest, request => request.employe)
    leaverequests: LeaveRequest[];

    



}  