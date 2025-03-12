import { InferAttributes, InferCreationAttributes } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import SampleTable from "./sampleTable";

@Table({
  modelName: "sampleTableJoinChecks",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
  deletedAt: false,
})
class SampleTableJoinCheck extends Model<
  InferAttributes<SampleTableJoinCheck, { omit: "id" }>,
  InferCreationAttributes<SampleTableJoinCheck, { omit: "id" }>
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => SampleTable)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  sampleTableId: number;

  @BelongsTo(() => SampleTable, {
    foreignKey: "sampleTableId",
    targetKey: "id",
  })
  sampleTable: SampleTable;
}

export default SampleTableJoinCheck;
