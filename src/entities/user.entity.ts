import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as crypt from "bcryptjs";

@Entity("users")
class User {
  @BeforeInsert()
  @BeforeUpdate()
  verifyPass() {
    const verifyPassHash = crypt.getRounds(this.password);

    if (!verifyPassHash) {
      this.password = crypt.hashSync(this.password, 12);
    }
  }

  @BeforeUpdate()
  hashPassUser() {
    this.password = crypt.hashSync(this.password, 12);
  }

  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 45, unique: true })
  email: string;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @Column({ type: "varchar", length: 20 })
  password: string;

  @CreateDateColumn({ type: "date" })
  CreateAt: string;

  @UpdateDateColumn({ type: "date" })
  updateAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deleteAt: string | null | undefined;
}

export default User;
