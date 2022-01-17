import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity({ name: 'customPokemon' })
export default class CustomPokemon {
  @PrimaryGeneratedColumn()
  idCustomPokemon: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'decimal', precision: 3, scale: 2 })
  height: number;

  @Column({ nullable: false, type: 'decimal', precision: 6, scale: 3 })
  weight: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
