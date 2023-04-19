import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class Professor {

    @PrimaryColumn()
    nusp: string

    @Column()
    name: string

    @Column()
    department: string

    @Column()
    email: string

    @Column()
    phone: string

}
