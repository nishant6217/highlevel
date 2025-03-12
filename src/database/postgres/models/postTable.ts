import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  modelName: "users",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: true,
  deletedAt: true,
})
class Post extends Model<
  InferAttributes<Post, { omit: "id" }>,
  InferCreationAttributes<Post, { omit: "id" }>
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
  content: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  header: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageUrl: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  createdBy: string;

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

export default Post;
