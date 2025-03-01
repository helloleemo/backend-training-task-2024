// 題目 - 樂呵呵健身房
// 樂呵呵健身房目前有 8 位會員

const members = ["Alice", "Bob", "Charlie", "Diana", "Evan", "Fiona", "George", "Hannah"];


// 第一階段：新增課程購買記錄（優惠定價）
// 撰寫函式 addPurchaseRecord，用於新增會員購買課程的記錄，並依購買數量套用優惠價格：

// 購買數量 / 單價 (每堂課)

// 1-10 堂 / 1500 元
// 11-20 堂 / 1300 元
// 21 堂以上 / 1100 元

// 記錄內容：

// 會員名稱 (name)：字串
// 購買課程數量 (courses)：數字
// 課程單價（自動計算）
// 總金額（courses × 單價）

/*
    控制在16毫秒以內，超過會卡卡的
    如果太多，返回就切斷ex. pagination, 
    排序在後端sql排好回傳比較好，因為前端可以做但會比較久
    有的前端會被要求不要做計算，因為會卡卡的 
*/

let purchaseRecords = [];
function addPurchaseRecord(name, courses) {
    if (typeof name !== 'string' || name === '' || courses <= 0 || typeof courses !== 'number') {
        console.log('輸入錯誤，請輸入有效的會員名稱和課程數量。');
        return;
    }
    const pricePerCourse = getPricePerCourse(courses);
    const record = pushToRecords(name, courses, pricePerCourse);
    purchaseRecords.push(record);
    consoleLog(record.name, record.courses, record.totalCost);
}

function consoleLog(name, courses, totalCost) {
    console.log(`新增購買記錄成功！會員 ${name} 購買 ${courses} 堂課，總金額為 ${totalCost} 元。`);
}


/*
    重複的程式碼可以抽出來 
*/
function pushToRecords(name, courses, pricePerCourse) {
    return {
        name: name,
        courses: courses,
        totalCost: courses * pricePerCourse,
    }
}

/*
    將可能變動的邏輯抽出來寫，維護上比較好處理
*/

function getPricePerCourse(courses) {
    if (courses <= 10 && courses > 0) return 1500;
    if (courses <= 20 && courses > 10) return 1300;
    return 1100;
}


addPurchaseRecord("Alice", 4);
addPurchaseRecord("Bob", 12);
addPurchaseRecord("Charlie", 25);
addPurchaseRecord("Hannah", 50);
addPurchaseRecord("名稱", "課程數量");

console.log(purchaseRecords);

// 功能要求：
// 使用陣列 purchaseRecords 儲存每筆記錄。
// 如果輸入無效（如名稱為空或數值不正確），提示輸入錯誤，並不儲存該記錄。
// 成功新增後，印出「新增購買記錄成功！會員 [會員名稱] 購買 [數量] 堂課，總金額為 [金額] 元。」
// 舉例：
// addPurchaseRecord("Alice", 4); >> 印出 console.log 文字為 新增購買記錄成功！會員 Alice 購買 4 堂課，總金額為 6000 元。
// addPurchaseRecord("Bob", 12); >> 印出 console.log 文字為 新增購買記錄成功！會員 Bob 購買 12 堂課，總金額為 15600 元。
// addPurchaseRecord("Charlie", 25); >> 印出 console.log 文字為 新增購買記錄成功！會員 Charlie 購買 25 堂課，總金額為 27500 元。
// addPurchaseRecord("Hannah", 50); >> 印出 console.log 文字為 新增購買記錄成功！會員 Hannah 購買 50 堂課，總金額為 55000 元。
// addPurchaseRecord("名稱", “課程數量”); >> 印出 console.log 文字為 輸入錯誤，請輸入有效的會員名稱和課程數量。


// 第二階段：計算目前的總營業額
// 新增函式 calculateTotalPrice，計算目前的總營業額為多少。
// 印出 console.log 文字為 目前總營業額為 ${totalPrice} 元


function calculateTotalPrice(records) {
    let totalPrice = 0;
    records.forEach(item => {
        totalPrice += item.totalCost;
        // console.log(totalPrice);
    })
    console.log(`目前總營業額為 ${totalPrice} 元`);
}

calculateTotalPrice(purchaseRecords);


// 第三階段：篩選出還沒有購課的會員
function filterNoPurchaseMember() {
    const noPurchaseMembers = members.filter(member => {
        const purchasedMember = purchaseRecords.filter(record => record.name === member);
        return purchasedMember.length === 0; 
    });

    console.log(`未購買課程的會員有：${noPurchaseMembers.join("、")}。`);
};

filterNoPurchaseMember();

// 新增函式 filterNoPurchaseMember，篩選特定條件的會員記錄。例如：未購買過課程的會員，並依序列出
// 印出 console.log 文字為 未購買課程的會員有：.......