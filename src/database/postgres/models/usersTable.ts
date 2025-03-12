import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  modelName: "users",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: true,
  deletedAt: true,
})
class User extends Model<
  InferAttributes<User, { omit: "id" }>,
  InferCreationAttributes<User, { omit: "id" }>
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt?: Date;
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt?: Date;
  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  deletedAt?: Date;
}

export default User;
