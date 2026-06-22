// 食物营养数据库 (每100g)
// 数据来源：中国食物成分表
const foodDB = {
  // ===== 肉类 =====
  "鸡胸肉": { protein: 31, calories: 167, unit: "g" },
  "鸡腿肉": { protein: 20, calories: 181, unit: "g" },
  "鸡翅": { protein: 17, calories: 194, unit: "g" },
  "鸡肝": { protein: 17, calories: 121, unit: "g" },
  "鸡胗": { protein: 19, calories: 118, unit: "g" },
  "牛肉": { protein: 26, calories: 250, unit: "g" },
  "牛腩": { protein: 18, calories: 215, unit: "g" },
  "牛腱子": { protein: 22, calories: 190, unit: "g" },
  "猪肉": { protein: 20, calories: 395, unit: "g" },
  "猪瘦肉": { protein: 20, calories: 143, unit: "g" },
  "猪里脊": { protein: 20, calories: 155, unit: "g" },
  "羊肉": { protein: 19, calories: 294, unit: "g" },
  "鸭肉": { protein: 16, calories: 240, unit: "g" },
  "鹅肉": { protein: 18, calories: 251, unit: "g" },
  "兔肉": { protein: 19, calories: 162, unit: "g" },
  "腊肉": { protein: 14, calories: 498, unit: "g" },
  "排骨": { protein: 18, calories: 264, unit: "g" },

  // ===== 水产 =====
  "三文鱼": { protein: 20, calories: 208, unit: "g" },
  "三文鱼腩": { protein: 18, calories: 250, unit: "g" },
  "鲑鱼": { protein: 20, calories: 208, unit: "g" },
  "金枪鱼": { protein: 26, calories: 184, unit: "g" },
  "龙利鱼": { protein: 18, calories: 85, unit: "g" },
  "巴沙鱼": { protein: 16, calories: 80, unit: "g" },
  "鳕鱼": { protein: 20, calories: 82, unit: "g" },
  "鲈鱼": { protein: 19, calories: 105, unit: "g" },
  "鲫鱼": { protein: 17, calories: 108, unit: "g" },
  "草鱼": { protein: 17, calories: 113, unit: "g" },
  "带鱼": { protein: 18, calories: 127, unit: "g" },
  "黄花鱼": { protein: 18, calories: 97, unit: "g" },
  "鲳鱼": { protein: 18, calories: 140, unit: "g" },
  "虾": { protein: 18, calories: 93, unit: "g" },
  "虾仁": { protein: 20, calories: 85, unit: "g" },
  "基围虾": { protein: 18, calories: 101, unit: "g" },
  "龙虾": { protein: 19, calories: 90, unit: "g" },
  "螃蟹": { protein: 14, calories: 95, unit: "g" },
  "蟹肉": { protein: 12, calories: 80, unit: "g" },
  "鱿鱼": { protein: 17, calories: 92, unit: "g" },
  "墨鱼": { protein: 15, calories: 83, unit: "g" },
  "生蚝": { protein: 11, calories: 73, unit: "g" },
  "扇贝": { protein: 13, calories: 84, unit: "g" },
  "花甲": { protein: 10, calories: 62, unit: "g" },
  "蛤蜊": { protein: 10, calories: 62, unit: "g" },
  "鱼丸": { protein: 11, calories: 115, unit: "g" },

  // ===== 蛋奶 =====
  "鸡蛋": { protein: 13, calories: 144, unit: "个" },
  "鸡蛋清": { protein: 12, calories: 60, unit: "g" },
  "鸡蛋黄": { protein: 15, calories: 328, unit: "g" },
  "鸭蛋": { protein: 13, calories: 180, unit: "个" },
  "鹌鹑蛋": { protein: 13, calories: 160, unit: "g" },
  "牛奶": { protein: 3, calories: 54, unit: "ml" },
  "纯牛奶": { protein: 3, calories: 54, unit: "ml" },
  "全脂牛奶": { protein: 3, calories: 61, unit: "ml" },
  "脱脂牛奶": { protein: 3.4, calories: 34, unit: "ml" },
  "酸奶": { protein: 3, calories: 72, unit: "g" },
  "希腊酸奶": { protein: 10, calories: 97, unit: "g" },
  "奶酪": { protein: 25, calories: 328, unit: "g" },
  "芝士": { protein: 25, calories: 328, unit: "g" },
  "奶粉": { protein: 26, calories: 478, unit: "g" },

  // ===== 豆制品 =====
  "豆腐": { protein: 8, calories: 81, unit: "g" },
  "嫩豆腐": { protein: 5, calories: 62, unit: "g" },
  "老豆腐": { protein: 9, calories: 98, unit: "g" },
  "豆腐干": { protein: 16, calories: 140, unit: "g" },
  "豆皮": { protein: 19, calories: 260, unit: "g" },
  "千张": { protein: 19, calories: 260, unit: "g" },
  "腐竹": { protein: 45, calories: 459, unit: "g" },
  "豆浆": { protein: 3, calories: 31, unit: "ml" },
  "毛豆": { protein: 13, calories: 131, unit: "g" },
  "黄豆": { protein: 35, calories: 390, unit: "g" },
  "黑豆": { protein: 36, calories: 381, unit: "g" },
  "豌豆": { protein: 7, calories: 105, unit: "g" },
  "扁豆": { protein: 8, calories: 116, unit: "g" },
  "豆腐脑": { protein: 5, calories: 49, unit: "g" },
  "豆奶": { protein: 3, calories: 44, unit: "ml" },

  // ===== 主食 =====
  "米饭": { protein: 2.6, calories: 116, unit: "碗" },
  "白米饭": { protein: 2.6, calories: 116, unit: "碗" },
  "糙米饭": { protein: 2.5, calories: 111, unit: "碗" },
  "杂粮饭": { protein: 3, calories: 120, unit: "碗" },
  "馒头": { protein: 7, calories: 223, unit: "个" },
  "面条": { protein: 8, calories: 280, unit: "碗" },
  "挂面": { protein: 10, calories: 346, unit: "g" },
  "意面": { protein: 13, calories: 350, unit: "g" },
  "通心粉": { protein: 13, calories: 350, unit: "g" },
  "面包": { protein: 8, calories: 266, unit: "片" },
  "全麦面包": { protein: 9, calories: 246, unit: "片" },
  "吐司": { protein: 8, calories: 260, unit: "片" },
  "燕麦": { protein: 14, calories: 367, unit: "g" },
  "燕麦片": { protein: 14, calories: 367, unit: "g" },
  "玉米": { protein: 4, calories: 112, unit: "根" },
  "红薯": { protein: 1, calories: 86, unit: "g" },
  "紫薯": { protein: 1.2, calories: 82, unit: "g" },
  "土豆": { protein: 2, calories: 76, unit: "g" },
  "山药": { protein: 2, calories: 57, unit: "g" },
  "芋头": { protein: 2, calories: 58, unit: "g" },
  "粽子": { protein: 5, calories: 195, unit: "个" },
  "饺子": { protein: 8, calories: 210, unit: "个" },
  "包子": { protein: 8, calories: 200, unit: "个" },
  "馄饨": { protein: 7, calories: 170, unit: "碗" },
  "米粉": { protein: 2, calories: 110, unit: "碗" },
  "米线": { protein: 2, calories: 100, unit: "碗" },
  "粥": { protein: 1, calories: 46, unit: "碗" },
  "白粥": { protein: 1, calories: 46, unit: "碗" },
  "八宝粥": { protein: 3, calories: 130, unit: "碗" },
  "煎饼": { protein: 8, calories: 250, unit: "个" },
  "油条": { protein: 7, calories: 386, unit: "根" },

  // ===== 蔬菜 =====
  "西兰花": { protein: 3.5, calories: 36, unit: "g" },
  "花椰菜": { protein: 2.4, calories: 25, unit: "g" },
  "菠菜": { protein: 2.9, calories: 24, unit: "g" },
  "生菜": { protein: 1.4, calories: 15, unit: "g" },
  "白菜": { protein: 1.5, calories: 17, unit: "g" },
  "娃娃菜": { protein: 1.5, calories: 15, unit: "g" },
  "空心菜": { protein: 2.2, calories: 20, unit: "g" },
  "油麦菜": { protein: 1.5, calories: 15, unit: "g" },
  "小白菜": { protein: 1.5, calories: 15, unit: "g" },
  "芹菜": { protein: 0.8, calories: 16, unit: "g" },
  "黄瓜": { protein: 0.8, calories: 16, unit: "g" },
  "西红柿": { protein: 0.9, calories: 19, unit: "g" },
  "番茄": { protein: 0.9, calories: 19, unit: "g" },
  "胡萝卜": { protein: 1, calories: 37, unit: "g" },
  "白萝卜": { protein: 0.9, calories: 20, unit: "g" },
  "青椒": { protein: 1, calories: 22, unit: "g" },
  "彩椒": { protein: 1, calories: 26, unit: "g" },
  "茄子": { protein: 1.1, calories: 21, unit: "g" },
  "冬瓜": { protein: 0.4, calories: 12, unit: "g" },
  "南瓜": { protein: 0.7, calories: 22, unit: "g" },
  "丝瓜": { protein: 1, calories: 20, unit: "g" },
  "苦瓜": { protein: 1, calories: 19, unit: "g" },
  "莲藕": { protein: 2, calories: 73, unit: "g" },
  "洋葱": { protein: 1.1, calories: 40, unit: "g" },
  "大蒜": { protein: 4.5, calories: 126, unit: "g" },
  "葱": { protein: 1.7, calories: 30, unit: "g" },
  "姜": { protein: 1.3, calories: 41, unit: "g" },
  "豆芽": { protein: 2, calories: 18, unit: "g" },
  "黄豆芽": { protein: 4, calories: 44, unit: "g" },
  "绿豆芽": { protein: 2, calories: 18, unit: "g" },
  "蘑菇": { protein: 3, calories: 22, unit: "g" },
  "香菇": { protein: 2.5, calories: 26, unit: "g" },
  "金针菇": { protein: 2.4, calories: 26, unit: "g" },
  "杏鲍菇": { protein: 3, calories: 31, unit: "g" },
  "木耳": { protein: 12, calories: 205, unit: "g" },
  "海带": { protein: 1.2, calories: 13, unit: "g" },
  "玉米粒": { protein: 4, calories: 112, unit: "g" },
  "秋葵": { protein: 2, calories: 31, unit: "g" },
  "芦笋": { protein: 2.2, calories: 20, unit: "g" },

  // ===== 水果 =====
  "香蕉": { protein: 1.4, calories: 93, unit: "根" },
  "苹果": { protein: 0.3, calories: 52, unit: "个" },
  "橙子": { protein: 0.9, calories: 48, unit: "个" },
  "橘子": { protein: 0.8, calories: 44, unit: "个" },
  "草莓": { protein: 1, calories: 32, unit: "g" },
  "蓝莓": { protein: 0.7, calories: 57, unit: "g" },
  "葡萄": { protein: 0.7, calories: 69, unit: "g" },
  "提子": { protein: 0.5, calories: 70, unit: "g" },
  "西瓜": { protein: 0.6, calories: 30, unit: "g" },
  "哈密瓜": { protein: 0.5, calories: 34, unit: "g" },
  "芒果": { protein: 0.6, calories: 60, unit: "g" },
  "菠萝": { protein: 0.5, calories: 41, unit: "g" },
  "猕猴桃": { protein: 1.1, calories: 61, unit: "个" },
  "火龙果": { protein: 1.1, calories: 55, unit: "g" },
  "牛油果": { protein: 2, calories: 160, unit: "个" },
  "鳄梨": { protein: 2, calories: 160, unit: "个" },
  "榴莲": { protein: 2.6, calories: 147, unit: "g" },
  "荔枝": { protein: 0.8, calories: 66, unit: "g" },
  "龙眼": { protein: 1.2, calories: 71, unit: "g" },
  "樱桃": { protein: 1.1, calories: 46, unit: "g" },
  "梨": { protein: 0.4, calories: 51, unit: "个" },
  "桃子": { protein: 0.9, calories: 39, unit: "个" },
  "柚子": { protein: 0.8, calories: 42, unit: "g" },

  // ===== 坚果 =====
  "花生": { protein: 25, calories: 567, unit: "g" },
  "花生酱": { protein: 25, calories: 588, unit: "g" },
  "核桃": { protein: 14, calories: 627, unit: "g" },
  "杏仁": { protein: 21, calories: 579, unit: "g" },
  "腰果": { protein: 18, calories: 553, unit: "g" },
  "开心果": { protein: 20, calories: 560, unit: "g" },
  "松子": { protein: 14, calories: 673, unit: "g" },
  "夏威夷果": { protein: 8, calories: 718, unit: "g" },
  "榛子": { protein: 14, calories: 613, unit: "g" },
  "芝麻": { protein: 18, calories: 559, unit: "g" },
  "芝麻酱": { protein: 17, calories: 586, unit: "g" },

  // ===== 油脂调料 =====
  "植物油": { protein: 0, calories: 884, unit: "g" },
  "橄榄油": { protein: 0, calories: 884, unit: "g" },
  "花生油": { protein: 0, calories: 884, unit: "g" },
  "黄油": { protein: 0.5, calories: 717, unit: "g" },
  "猪油": { protein: 0, calories: 897, unit: "g" },
  "沙拉酱": { protein: 0.5, calories: 400, unit: "g" },
  "番茄酱": { protein: 1, calories: 83, unit: "g" },
  "蜂蜜": { protein: 0.3, calories: 304, unit: "g" },
  "白糖": { protein: 0, calories: 387, unit: "g" },
  "红糖": { protein: 0.7, calories: 373, unit: "g" },

  // ===== 零食饮品 =====
  "蛋白粉": { protein: 80, calories: 400, unit: "勺" },
  "乳清蛋白": { protein: 80, calories: 400, unit: "勺" },
  "增肌粉": { protein: 30, calories: 500, unit: "勺" },
  "能量棒": { protein: 15, calories: 250, unit: "根" },
  "蛋白棒": { protein: 20, calories: 200, unit: "根" },
  "巧克力": { protein: 5, calories: 546, unit: "g" },
  "黑巧克力": { protein: 8, calories: 550, unit: "g" },
  "薯片": { protein: 5, calories: 536, unit: "g" },
  "饼干": { protein: 8, calories: 433, unit: "g" },
  "苏打饼干": { protein: 8, calories: 408, unit: "g" },
  "可乐": { protein: 0, calories: 42, unit: "ml" },
  "果汁": { protein: 0.3, calories: 48, unit: "ml" },
  "运动饮料": { protein: 0, calories: 26, unit: "ml" },
  "咖啡": { protein: 0.2, calories: 2, unit: "ml" },

  // ===== 预制/料理 =====
  "炒饭": { protein: 8, calories: 180, unit: "碗" },
  "蛋炒饭": { protein: 10, calories: 200, unit: "碗" },
  "炒面": { protein: 9, calories: 200, unit: "碗" },
  "炒粉": { protein: 8, calories: 190, unit: "碗" },
  "盖浇饭": { protein: 15, calories: 300, unit: "份" },
  "盒饭": { protein: 18, calories: 350, unit: "份" },
  "麻辣烫": { protein: 15, calories: 250, unit: "碗" },
  "火锅": { protein: 20, calories: 400, unit: "份" },
  "烧烤": { protein: 22, calories: 300, unit: "份" },
  "烤串": { protein: 18, calories: 250, unit: "份" },
  "红烧肉": { protein: 18, calories: 400, unit: "份" },
  "红烧牛肉": { protein: 25, calories: 300, unit: "份" },
  "宫保鸡丁": { protein: 18, calories: 280, unit: "份" },
  "鱼香肉丝": { protein: 15, calories: 250, unit: "份" },
  "糖醋里脊": { protein: 18, calories: 350, unit: "份" },
  "水煮鱼": { protein: 20, calories: 280, unit: "份" },
  "酸菜鱼": { protein: 18, calories: 250, unit: "份" },
  "烤鱼": { protein: 22, calories: 300, unit: "份" },
  "麻辣香锅": { protein: 18, calories: 350, unit: "份" },
  "黄焖鸡": { protein: 22, calories: 280, unit: "份" },
  "炸鸡": { protein: 18, calories: 350, unit: "份" },
  "炸鸡腿": { protein: 18, calories: 300, unit: "个" },
  "薯条": { protein: 3, calories: 312, unit: "份" },
  "汉堡": { protein: 18, calories: 350, unit: "个" },
  "披萨": { protein: 12, calories: 280, unit: "片" },
  "三明治": { protein: 15, calories: 250, unit: "个" },
  "寿司": { protein: 6, calories: 150, unit: "个" },
  "沙拉": { protein: 5, calories: 100, unit: "份" },
  "鸡胸肉沙拉": { protein: 25, calories: 200, unit: "份" },
  "牛肉沙拉": { protein: 22, calories: 220, unit: "份" },
  "凯撒沙拉": { protein: 12, calories: 250, unit: "份" },
  "汤": { protein: 3, calories: 60, unit: "碗" },
  "鸡汤": { protein: 5, calories: 80, unit: "碗" },
  "排骨汤": { protein: 6, calories: 120, unit: "碗" },
  "紫菜蛋花汤": { protein: 4, calories: 40, unit: "碗" },
  "馄饨汤": { protein: 7, calories: 150, unit: "碗" },
};

// 常见数量词映射
const quantityMap = {
  "碗": { protein: 0.9, calories: 0.9, desc: "碗" },    // 米饭按碗算时用 0.9x
  "个": { protein: 1, calories: 1, desc: "个" },
  "根": { protein: 1, calories: 1, desc: "根" },
  "片": { protein: 1, calories: 1, desc: "片" },
  "份": { protein: 1, calories: 1, desc: "份" },
  "勺": { protein: 1, calories: 1, desc: "勺" },
  "ml": { protein: 0.01, calories: 0.01, desc: "ml" },
};

// 解析食物输入字符串，提取食物名称和重量
function parseFoodInput(text) {
  const items = [];
  if (!text) return items;

  // 按常见分隔符分割
  const segments = text.split(/[+,，、/／\n]/).map(s => s.trim()).filter(Boolean);

  for (const seg of segments) {
    // 尝试匹配: 名称 + 数字 + 单位
    // 支持 g/克/斤/两/ml/碗/个/根/片/份/勺
    const match = seg.match(/^(.+?)\s*[（(]?\s*(\d+(?:\.\d+)?)\s*(g|克|斤|两|ml|碗|个|根|片|份|勺|根|条)[）)]?\s*$/);
    if (match) {
      const [, name, amountStr, unit] = match;
      const amount = parseFloat(amountStr);
      items.push({ name: name.trim(), amount, unit });
      continue;
    }

    // 尝试匹配: 名称 + 数字(默认g)
    const match2 = seg.match(/^(.+?)\s*(\d+(?:\.\d+)?)\s*$/);
    if (match2) {
      const [, name, amountStr] = match2;
      items.push({ name: name.trim(), amount: parseFloat(amountStr), unit: "g" });
      continue;
    }

    // 尝试匹配数量词在前: 数字+单位+名称 (如 1碗米饭)
    const match3 = seg.match(/^(\d+(?:\.\d+)?)\s*(碗|个|根|片|份|勺|根|条|ml)\s*(.+)$/);
    if (match3) {
      const [, amountStr, unit, name] = match3;
      items.push({ name: name.trim(), amount: parseFloat(amountStr), unit });
      continue;
    }

    // 纯名称，按1份算(100g)
    items.push({ name: seg.trim(), amount: 100, unit: "g" });
  }

  return items;
}

// 在数据库中查找食物（支持模糊匹配）
function findFood(name) {
  // 精确匹配
  if (foodDB[name]) return foodDB[name];

  // 去掉尾部常见词再找
  const cleaned = name.replace(/[的肉块条片丁粒丝末泥蓉汁汤饭面糕饼卷团丸肠酥排]?$/, "");
  if (foodDB[cleaned]) return foodDB[cleaned];

  // 包含匹配
  const keys = Object.keys(foodDB);
  for (const key of keys) {
    if (name.includes(key) || key.includes(name)) {
      return foodDB[key];
    }
  }

  // 拼音或部分匹配
  for (const key of keys) {
    if (key.length >= 2 && name.includes(key.substring(0, 2))) {
      return foodDB[key];
    }
  }

  return null;
}

/**
 * 根据食物描述自动计算蛋白质和热量
 * @param {string} foodText - 用户输入的食物描述
 * @returns {{ protein: number, calories: number, details: Array }}
 */
export function autoCalculateNutrition(foodText) {
  const items = parseFoodInput(foodText);
  let totalProtein = 0;
  let totalCalories = 0;
  const details = [];

  for (const item of items) {
    const food = findFood(item.name);
    if (food) {
      let factor = item.amount / 100;
      const unit = item.unit;

      if (food.unit === "碗") {
        factor = item.amount * 1.5;
      } else if (food.unit === "个" && (unit === "个" || !unit)) {
        const servingSize = {
          "鸡蛋": 50, "鸡蛋清": 40, "鸡蛋黄": 20, "鸭蛋": 60, "鹌鹑蛋": 10,
          "香蕉": 120, "苹果": 200, "橙子": 200, "芒果": 300, "猕猴桃": 80,
          "牛油果": 150, "鳄梨": 150, "桃子": 200, "梨": 250,
          "包子": 100, "馒头": 100, "面包": 50, "吐司": 50,
          "汉堡": 200, "三明治": 200, "披萨片": 100, "寿司": 30,
          "粽子": 150, "玉米": 200, "红薯": 200, "鸡腿": 120,
          "鸡翅": 50, "炸鸡腿": 150,
        };
        const w = servingSize[food.name] || 50;
        factor = (item.amount * w) / 100;
      } else if (food.unit === "根" && (unit === "根" || !unit)) {
        const w = { "香蕉": 120, "玉米": 200, "红薯": 200, "油条": 100, "蛋白棒": 40, "能量棒": 40, "烤串": 30 }[food.name] || 100;
        factor = (item.amount * w) / 100;
      } else if (food.unit === "勺") {
        const w = { "蛋白粉": 30, "乳清蛋白": 30, "增肌粉": 50, "花生酱": 15, "蜂蜜": 15 }[food.name] || 20;
        factor = (item.amount * w) / 100;
      } else if (food.unit === "片") {
        const w = { "面包": 50, "吐司": 50, "全麦面包": 50, "披萨": 100, "奶酪": 20, "芝士": 20 }[food.name] || 30;
        factor = (item.amount * w) / 100;
      } else if (food.unit === "份") {
        const w = {
          "炒饭": 300, "蛋炒饭": 300, "炒面": 300, "炒粉": 300,
          "盖浇饭": 400, "盒饭": 500, "沙拉": 200, "鸡胸肉沙拉": 300,
          "牛肉沙拉": 300, "凯撒沙拉": 250, "麻辣烫": 400, "火锅": 500,
          "烧烤": 300, "烤串": 200, "红烧肉": 200, "红烧牛肉": 250,
          "宫保鸡丁": 250, "鱼香肉丝": 250, "糖醋里脊": 250, "水煮鱼": 400,
          "酸菜鱼": 400, "烤鱼": 400, "麻辣香锅": 350, "黄焖鸡": 300,
          "炸鸡": 200, "薯条": 150, "汤": 250, "鸡汤": 300, "排骨汤": 300,
        };
        const w2 = w[food.name] || 250;
        factor = (item.amount * w2) / 100;
      }

      if (unit === "ml" && !["碗", "个", "根", "片", "份", "勺"].includes(food.unit)) {
        factor = item.amount / 100;
      }

      const p = Math.round((food.protein || 0) * factor * 10) / 10;
      const c = Math.round((food.calories || 0) * factor * 10) / 10;
      totalProtein += p;
      totalCalories += c;
      details.push({
        name: item.name,
        amount: item.amount,
        unit: unit,
        protein: p,
        calories: c,
        matched: item.name,
      });
    } else {
      details.push({
        name: item.name,
        amount: item.amount,
        unit: item.unit,
        protein: 0,
        calories: 0,
        matched: null,
      });
    }
  }

  return {
    protein: Math.round(totalProtein * 10) / 10,
    calories: Math.round(totalCalories * 10) / 10,
    details,
  };
}

/**
 * 根据食物文本快速估算（简化版，用于实时预览）
 */
export function quickEstimate(foodText) {
  if (!foodText || foodText.trim().length < 2) return null;
  const result = autoCalculateNutrition(foodText);
  if (result.details.some(d => d.matched)) {
    return result;
  }
  return null;
}

/**
 * 获取食物建议列表（用于输入提示）
 */
export function getFoodSuggestions(query) {
  if (!query || query.length < 1) return [];
  const q = query.toLowerCase();
  const matches = [];
  const keys = Object.keys(foodDB);
  for (const key of keys) {
    if (key.toLowerCase().includes(q)) {
      matches.push({ name: key, ...foodDB[key] });
      if (matches.length >= 8) break;
    }
  }
  return matches;
}
