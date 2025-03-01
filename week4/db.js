// db.js
const { DataSource, EntitySchema } = require("typeorm")

/** 定義資料表（實體）：CreditPackage, Skill  */
const CreditPackage = new EntitySchema({
  name: "CreditPackage",
  tableName: "CREDIT_PACKAGE",
  columns: { //欄位
    id: {
      primary: true, //不可撞名，primary key
      type: "uuid",
      generated: "uuid",
      nullable: false // 不可空值
    },
    name: {
      type: "varchar", // 字串
      length: 50,
      nullable: false,
      unique: true // 不能重複
    },
    credit_amount: {
      type: "integer", // 數字（整數）
      nullable: false
    },
    price: {
      type: "numeric", // 數字
      precision: 10,
      scale: 2,
      nullable: false
    },
    createdAt: {
      type: "timestamp", // 時間格式
      createDate: true,
      name: "created_at",
      nullable: false
    }
  }
})

const Skill = new EntitySchema({ // 資料表格式
  name: "Skill",
  tableName: "SKILL",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
      nullable: false
    },
    name: {
      type: "varchar",
      length: 50,
      nullable: false,
      unique: true // 不能重複
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
      name: "created_at",
      nullable: false
    }
  }
})

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "test",
  database: process.env.DB_DATABASE || "test",
  entities: [CreditPackage, Skill], // 實體 資料表
  synchronize: true // 啟動是否重新建立表結構（實務上會是false，練習為了測試用true）
})


// 透過 entities 陣列將所有 EntitySchema 加入。

// 啟動時 TypeORM 會根據這些設定自動建立或更新表結構（若 synchronize: true）。

// 之後就能使用 AppDataSource.getRepository("CreditPackage") 或 AppDataSource.getRepository("Skill") 進行 CRUD。

// 讓別人可以使用db服務
module.exports = AppDataSource

