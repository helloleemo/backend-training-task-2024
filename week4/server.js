require("dotenv").config()
const http = require("http")
const AppDataSource = require("./db")
const { write } = require("fs")

/* 測試型別的小工具 */
function isUndefined(value) {
  return value === undefined
}
function isNotValidSting(value) {
  return typeof value !== "string" || value.trim().length === 0 || value === ""
}
function isNotValidInteger(value) {
  return typeof value !== "number" || value < 0 || value % 1 !== 0
}


/* CRUD */

const requestListener = async (req, res) => {

  // 處理CORS問題
  const headers = {
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": "application/json"
  }
  let body = ""
  req.on("data", (chunk) => {
    body += chunk
  })

  // 處理路由
  // CreditPackage
  if (req.url === "/api/credit-package" && req.method === "GET") {
    try {
      const packages = await AppDataSource.getRepository("CreditPackage").find({
        select: ["id", "name", "credit_amount", "price"]
      })
      res.writeHead(200, headers) // 要寫在瀏覽器裡Network回傳的Headers當中
      res.write(JSON.stringify({ //寫在Response裡的內容
        status: "success",
        data: packages
      }))
      res.end() // 終止Response
    } catch (error) {
      res.writeHead(500, headers)
      res.write(JSON.stringify({
        status: "error",
        message: "伺服器錯誤"
      }))
      res.end()
    }
  } else if (req.url === "/api/credit-package" && req.method === "POST") {
    req.on("end", async () => {
      try {
        const data = JSON.parse(body)
        // 防呆機制
        if (isUndefined(data.name) || isNotValidSting(data.name) ||
          isUndefined(data.credit_amount) || isNotValidInteger(data.credit_amount) ||
          isUndefined(data.price) || isNotValidInteger(data.price)) {
          res.writeHead(400, headers)
          res.write(JSON.stringify({
            status: "failed",
            message: "欄位未填寫正確"
          }))
          res.end()
          return
        }
        // 資料重複
        const creditPackageRepo = await AppDataSource.getRepository("CreditPackage")
        const existPackage = await creditPackageRepo.find({
          where: { // 找重複的資料
            name: data.name
          }
        })
        if (existPackage.length > 0) {
          res.writeHead(409, headers)
          res.write(JSON.stringify({
            status: "failed",
            message: "資料重複"
          }))
          res.end()
          return
        }
        const newPackage = await creditPackageRepo.create({
          name: data.name,
          credit_amount: data.credit_amount,
          price: data.price
        })
        const result = await creditPackageRepo.save(newPackage)
        res.writeHead(200, headers)
        res.write(JSON.stringify({
          status: "success",
          data: result
        }))
        res.end()
      } catch (error) {
        console.error(error)
        res.writeHead(500, headers)
        res.write(JSON.stringify({
          status: "error",
          message: "伺服器錯誤"
        }))
        res.end()
      }
    })
  } else if (req.url.startsWith("/api/credit-package/") && req.method === "DELETE") {
    try {
      const packageId = req.url.split("/").pop()
      if (isUndefined(packageId) || isNotValidSting(packageId)) {
        res.writeHead(400, headers)
        res.write(JSON.stringify({
          status: "failed",
          message: "ID錯誤"
        }))
        res.end()
        return
      }
      const result = await AppDataSource.getRepository("CreditPackage").delete(packageId)
      if (result.affected === 0) {
        res.writeHead(400, headers)
        res.write(JSON.stringify({
          status: "failed",
          message: "ID錯誤"
        }))
        res.end()
        return
      }
      res.writeHead(200, headers)
      res.write(JSON.stringify({
        status: "success",
        message: "成功刪除！"

      }))
      res.end()
    } catch (error) {
      console.error(error)
      res.writeHead(500, headers)
      res.write(JSON.stringify({
        status: "error",
        message: "伺服器錯誤"
      }))
      res.end()
    }
  } else if (req.method === "OPTIONS") {
    res.writeHead(200, headers)
    res.end()
  }
  // Skill
  else if (req.url === "/api/coaches/skill" && req.method === "GET") {
    try {
      const skills = await AppDataSource.getRepository("Skill").find({
        select: ["id", "name",]
      })
      res.writeHead(200, headers)
      res.write(JSON.stringify({
        status: "success",
        data: skills
      }))
      res.end()
    }
    catch (error) {
      res.writeHead(500, headers)
      res.write(JSON.stringify({
        status: "error",
        message: "伺服器錯誤"
      }))
      res.end()
    }


  } else if (req.url === "/api/coaches/skill" && req.method === "POST") {
    req.on("end", async () => {
      try {
        // 1. 檢查skill格式
        const data = JSON.parse(body)
        if (isUndefined(data.name) || isNotValidSting(data.name)) {
          res.writeHead(400, headers)
          res.write(JSON.stringify({
            status: "false",
            message: "欄位未填寫正確"
          }))
          res.end()
          return
        }
        // 2. 檢查是否重複的skill
        const skillRepo = await AppDataSource.getRepository("Skill");
        const existSkill = await skillRepo.find({
          where: {
            name: data.name
          }
        })
        if (existSkill.length > 0) {
          res.writeHead(409, headers)
          res.write(JSON.stringify({
            status: "failed",
            message: "資料重複"
          }))
          res.end()
          return
        }
        // 3. 1+2都正確才新增
        const newSkill = await skillRepo.create({
          name: data.name,
        })
        const result = await skillRepo.save(newSkill)
        res.writeHead(200, headers)
        res.write(JSON.stringify({
          status: "success",
          data: result
        }))
        res.end()
      }
      catch (error) {
        console.error(error)
        res.writeHead(500, headers)
        res.write(JSON.stringify({
          status: "error",
          message: "伺服器錯誤"
        }))
        res.end()
      }
    })
  } else if (req.url.startsWith("/api/coaches/skill/") && req.method === "DELETE") {
    try {
      const skillId = req.url.split("/").pop()
      if (isUndefined(skillId) || isNotValidSting(skillId)) {
        res.writeHead(400, headers)
        res.write(JSON.stringify({
          status: "failed",
          message: "ID錯誤"
        }))
        res.end()
        return
      }
      const result = await AppDataSource.getRepository("Skill").delete(skillId)
      if (result.affected === 0) {

        res.writeHead(400, headers)
        res.write(JSON.stringify({
          status: "failed",
          message: "ID錯誤"
        }))
        res.end()
        return
      }
      res.writeHead(200, headers)
      res.write(JSON.stringify({
        status: "success",
        message: "成功刪除"
      }))
      res.end()
    } catch (error) {
      res.writeHead(500, headers)
      res.write(JSON.stringify({
        status: "error",
        message: "伺服器錯誤"
      }))
      res.end()
    }
  } else {
    res.writeHead(404, headers)
    res.write(JSON.stringify({
      status: "failed",
      message: "無此網站路由"
    }))
    res.end()
  }
}

const server = http.createServer(requestListener)

async function startServer() {
  await AppDataSource.initialize()
  console.log("資料庫連接成功")
  server.listen(process.env.PORT)
  console.log(`伺服器啟動成功, port: ${process.env.PORT}`)
  return server;
}

module.exports = startServer();
