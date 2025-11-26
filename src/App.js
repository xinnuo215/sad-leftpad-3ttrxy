import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Home,
  FileText,
  CheckSquare,
  ChevronRight,
  Pencil,
  Plane,
  Coffee,
  Camera,
  Utensils,
  ShoppingBag,
  Train,
  Clock,
  Plus,
  Trash2,
  RefreshCw,
  DollarSign,
  Save,
  Map,
  Snowflake,
  Droplets,
  Wine,
  Sparkles,
  Send,
  Loader2,
  Bot,
  MessageCircle,
} from "lucide-react";

const KyotoTripApp = () => {
  // 控制底部導航列的狀態
  const [activeTab, setActiveTab] = useState("home");
  // 控制哪一天的行程被展開
  const [expandedDay, setExpandedDay] = useState(1);
  // 控制目前正在編輯哪一天 (null 代表沒有在編輯)
  const [editingDayId, setEditingDayId] = useState(null);

  // --- 資料數據 ---

  const initialItinerary = [
    {
      day: 1,
      title: "抵達京都 & 燒肉居酒屋",
      location: "關西機場 → 二條",
      date: "01/15 (四)",
      details: [
        {
          id: 101,
          time: "14:55",
          icon: Plane,
          title: "抵達關西機場 T1",
          desc: "國泰航空 CX564，領取 JR PASS",
        },
        {
          id: 102,
          time: "15:45",
          icon: Train,
          title: "搭乘 Haruka",
          desc: "前往京都車站 (約 80 分鐘)",
        },
        {
          id: 103,
          time: "17:45",
          icon: Home,
          title: "飯店 Check-in",
          desc: "京都二條皇家花園坎瓦斯飯店",
        },
        {
          id: 106,
          time: "18:30",
          icon: ShoppingBag,
          title: "Uniqlo 採買",
          desc: "京都站 Avanti 店或飯店附近採買保暖裝備",
        },
        {
          id: 104,
          time: "19:30",
          icon: Utensils,
          title: "弘燒肉 (Yakiniku Hiro)",
          desc: "高CP值和牛燒肉 (建議預約)，或飯店旁居酒屋",
        },
        {
          id: 105,
          time: "21:30",
          icon: Coffee,
          title: "飯店交誼廳",
          desc: "Canvas Lounge 小酌休息",
        },
      ],
    },
    {
      day: 2,
      title: "琵琶湖滑雪 & 海鮮之夜",
      location: "京都 → 琵琶湖 Valley",
      date: "01/16 (五)",
      details: [
        {
          id: 201,
          time: "09:30",
          icon: Train,
          title: "前往志賀站",
          desc: "搭乘 JR 湖西線 (約40分)，轉巴士至滑雪場",
        },
        {
          id: 202,
          time: "11:00",
          icon: Snowflake,
          title: "琵琶湖 Valley 滑雪場",
          desc: "租借裝備，體驗滑雪或玩雪盆，眺望琵琶湖絕景",
        },
        {
          id: 203,
          time: "13:00",
          icon: Utensils,
          title: "山頂午餐",
          desc: "在「Grill Dining」享用景觀午餐",
        },
        {
          id: 204,
          time: "16:30",
          icon: Train,
          title: "返回京都",
          desc: "搭乘電車返回市區，稍作休息",
        },
        {
          id: 205,
          time: "19:00",
          icon: Utensils,
          title: "五十棲 (Isoya) 集團居酒屋",
          desc: "推薦「Isoya」或「Sakai」，主打自家農場蔬菜與新鮮生魚片 (高CP值)",
        },
        {
          id: 206,
          time: "21:00",
          icon: Wine,
          title: "木屋町小酌",
          desc: "在高瀨川旁找間 Bar 享受夜生活",
        },
      ],
    },
    {
      day: 3,
      title: "療癒溫泉 & 鴨川壽喜燒",
      location: "嵐山/嵯峨野 → 鴨川",
      date: "01/17 (六)",
      details: [
        {
          id: 301,
          time: "10:30",
          icon: Coffee,
          title: "悠閒早午餐",
          desc: "睡到自然醒，飯店附近享用咖啡",
        },
        {
          id: 302,
          time: "12:30",
          icon: Droplets,
          title: "さがの温泉 天山之湯",
          desc: "類似空庭溫泉的超級錢湯，有露天風呂、桑拿與休憩區，徹底放鬆",
        },
        {
          id: 303,
          time: "16:30",
          icon: MapPin,
          title: "嵐山散步",
          desc: "泡完湯後在嵐山大街逛逛，吃點心",
        },
        {
          id: 304,
          time: "18:00",
          icon: MapPin,
          title: "前往鴨川/先斗町",
          desc: "回到市中心，欣賞夜晚的鴨川景色",
        },
        {
          id: 305,
          time: "19:00",
          icon: Utensils,
          title: "壽喜燒 木村 (Kimura)",
          desc: "位於寺町通的老店，CP值極高的A5和牛壽喜燒 (復古氛圍)",
        },
        {
          id: 306,
          time: "21:00",
          icon: Wine,
          title: "Gion Corner 夜生活",
          desc: "祇園或先斗町的小酒館",
        },
      ],
    },
    {
      day: 4,
      title: "二寧坂老街 & 經典寺廟",
      location: "清水寺 → 八坂神社",
      date: "01/18 (日)",
      details: [
        {
          id: 401,
          time: "10:00",
          icon: MapPin,
          title: "清水寺",
          desc: "參觀清水舞台、地主神社求良緣",
        },
        {
          id: 402,
          time: "12:00",
          icon: Utensils,
          title: "午餐：奧丹湯豆腐",
          desc: "或在二寧坂附近的「阿古屋茶屋」吃茶泡飯吃到飽",
        },
        {
          id: 403,
          time: "13:30",
          icon: Camera,
          title: "二寧坂 & 產寧坂",
          desc: "經典老街散策，星巴克榻榻米店打卡",
        },
        {
          id: 404,
          time: "15:30",
          icon: MapPin,
          title: "高台寺 & 八坂神社",
          desc: "沿著石塀小路散步，氣氛極佳",
        },
        {
          id: 405,
          time: "18:00",
          icon: Utensils,
          title: "名代炸豬排 或 居酒屋",
          desc: "推薦「Katsukura」豬排，或四條河原町的熱鬧居酒屋",
        },
        {
          id: 406,
          time: "20:00",
          icon: ShoppingBag,
          title: "Don Quijote 採買",
          desc: "河原町唐吉訶德，採買零食伴手禮",
        },
      ],
    },
    {
      day: 5,
      title: "最後採買與返程",
      location: "京都車站 → 溫暖的家",
      date: "01/19 (一)",
      details: [
        {
          id: 501,
          time: "10:00",
          icon: Home,
          title: "飯店 Check-out",
          desc: "睡到自然醒，寄放行李",
        },
        {
          id: 502,
          time: "11:00",
          icon: ShoppingBag,
          title: "錦市場 / 伊勢丹",
          desc: "最後伴手禮採購，午餐吃拉麵小路",
        },
        {
          id: 503,
          time: "13:15",
          icon: Train,
          title: "搭乘 Haruka",
          desc: "前往關西機場 (預計 14:40 抵達)",
        },
        {
          id: 504,
          time: "16:15",
          icon: Plane,
          title: "班機起飛",
          desc: "國泰航空 CX565",
        },
        {
          id: 505,
          time: "18:30",
          icon: Home,
          title: "抵達台北",
          desc: "平安返家",
        },
      ],
    },
  ];

  const [itineraryData, setItineraryData] = useState(initialItinerary);

  // --- AI Guide 狀態 ---
  const [chatMessages, setChatMessages] = useState([
    {
      role: "model",
      text: "你好！我是你的京都 AI 導遊 🇯🇵✨\n無論是行程建議、交通查詢，或是推薦餐廳，我都可以幫忙喔！",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef(null);

  // 自動捲動到最新訊息
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // --- 行程編輯功能 ---

  const startEditing = (dayId) => {
    setEditingDayId(dayId);
  };

  const saveEditing = () => {
    setEditingDayId(null);
  };

  const updateDayTitle = (dayId, newTitle) => {
    setItineraryData((prevData) =>
      prevData.map((day) => {
        if (day.day !== dayId) return day;
        return { ...day, title: newTitle };
      })
    );
  };

  const updateStop = (dayId, stopId, field, value) => {
    setItineraryData((prevData) =>
      prevData.map((day) => {
        if (day.day !== dayId) return day;
        return {
          ...day,
          details: day.details.map((stop) => {
            if (stop.id !== stopId) return stop;
            return { ...stop, [field]: value };
          }),
        };
      })
    );
  };

  const addStop = (dayId) => {
    setItineraryData((prevData) =>
      prevData.map((day) => {
        if (day.day !== dayId) return day;
        const newId = Math.max(...day.details.map((d) => d.id), 0) + 1;
        return {
          ...day,
          details: [
            ...day.details,
            {
              id: newId,
              time: "12:00",
              icon: MapPin,
              title: "新景點",
              desc: "請輸入描述",
            },
          ],
        };
      })
    );
  };

  const deleteStop = (dayId, stopId) => {
    setItineraryData((prevData) =>
      prevData.map((day) => {
        if (day.day !== dayId) return day;
        return {
          ...day,
          details: day.details.filter((stop) => stop.id !== stopId),
        };
      })
    );
  };

  // --- 記帳狀態 ---
  const [expenses, setExpenses] = useState([]);
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(0.215);
  const [calcAmount, setCalcAmount] = useState("");

  const totalExpenseYen = useMemo(
    () => expenses.reduce((sum, item) => sum + item.amount, 0),
    [expenses]
  );
  const totalExpenseTwd = Math.round(totalExpenseYen * exchangeRate);

  const addExpense = () => {
    if (!newExpenseName || !newExpenseAmount) return;
    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        name: newExpenseName,
        amount: parseInt(newExpenseAmount),
        category: "shopping",
      },
    ]);
    setNewExpenseName("");
    setNewExpenseAmount("");
  };

  // --- 清單狀態 ---
  const [checklist, setChecklist] = useState([
    { id: 1, text: "護照 & 機票", checked: false },
    { id: 2, text: "日幣現金 & 信用卡", checked: false },
    { id: 3, text: "滑雪手套/護目鏡 (可選)", checked: false },
    { id: 4, text: "保暖發熱衣 (Uniqlo)", checked: false },
    { id: 5, text: "網卡 / eSIM", checked: false },
    { id: 6, text: "個人藥品 (酸痛貼布!)", checked: false },
  ]);
  const [newItemText, setNewItemText] = useState("");

  const toggleCheck = (id) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const addChecklistItem = () => {
    if (!newItemText.trim()) return;
    setChecklist([
      ...checklist,
      { id: Date.now(), text: newItemText, checked: false },
    ]);
    setNewItemText("");
  };

  // 導航跳轉函數
  const handleDayClick = (day) => {
    setExpandedDay(day);
    setActiveTab("itinerary");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- AI 處理函數 ---

  const handleSendMessage = async (customMessage = null) => {
    const textToSend = customMessage || inputMessage;
    if (!textToSend.trim()) return;

    if (!customMessage) {
      setChatMessages((prev) => [...prev, { role: "user", text: textToSend }]);
      setInputMessage("");
    } else {
      // 如果是點擊建議按鈕，也顯示在對話中
      setChatMessages((prev) => [...prev, { role: "user", text: textToSend }]);
    }

    setIsAiLoading(true);

    try {
      const apiKey = ""; // Runtime handled
      const itineraryContext = JSON.stringify(itineraryData);

      const systemPrompt = `
        你是一位專業、友善且幽默的京都旅遊達人（AI 導遊）。
        
        用戶目前的行程如下（JSON 格式）：
        ${itineraryContext}

        請根據用戶的問題提供精簡、實用的建議。
        1. 回答要使用繁體中文。
        2. 如果用戶問行程建議，請參考上面的行程資料。
        3. 推薦餐廳或景點時，盡量提供具體名稱。
        4. 語氣要輕鬆，適當使用 emoji ✨🌸🍡。
        5. 不要輸出 Markdown 標題，直接分段回答即可。
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: textToSend }],
              },
            ],
            systemInstruction: {
              parts: [{ text: systemPrompt }],
            },
          }),
        }
      );

      const data = await response.json();
      const aiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "抱歉，我現在有點忙線，請稍後再問我一次！💦";

      setChatMessages((prev) => [...prev, { role: "model", text: aiResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setChatMessages((prev) => [
        ...prev,
        { role: "model", text: "發生連線錯誤，請檢查網路連線 🔌" },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // 快速跳轉到 AI 詢問行程
  const askAiAboutDay = (day) => {
    setActiveTab("guide");
    const question = `請幫我分析 Day ${day} 的行程，這天安排得順路嗎？有沒有附近推薦的美食？✨`;
    handleSendMessage(question);
  };

  // --- 畫面組件 ---

  // 1. 首頁視圖
  const HomeView = () => (
    <>
      {/* 頂部 Header */}
      <div className="relative h-64 w-full">
        <div className="absolute inset-0 bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Kyoto Street"
            className="w-full h-full object-cover opacity-60 grayscale-[50%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        <div className="absolute bottom-6 left-6 text-white z-10">
          <h1 className="text-3xl font-bold tracking-wide drop-shadow-lg mb-1">
            京都五日漫遊
          </h1>
          <div className="flex items-center text-gray-200 text-sm font-medium backdrop-blur-sm bg-white/10 inline-block px-2 py-1 rounded-md border border-white/10">
            <Calendar size={14} className="mr-1.5" />
            <span>2026/01/15 - 01/19</span>
          </div>
        </div>
      </div>

      {/* 每日概要列表 */}
      <div className="px-5 py-6 bg-gray-50 relative rounded-t-3xl -mt-4 z-20 min-h-[500px]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-800" size={20} />
            <h2 className="text-lg font-bold text-gray-800">行程總覽</h2>
          </div>
          <span className="text-xs text-gray-400 font-medium">共 5 天</span>
        </div>

        <div className="space-y-4 pb-24">
          {itineraryData.map((dayItem) => (
            <div
              key={dayItem.day}
              onClick={() => handleDayClick(dayItem.day)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer hover:shadow-md hover:border-gray-300"
            >
              <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 bg-gray-100 rounded-lg border border-gray-200">
                <span className="text-xs font-bold text-gray-500 uppercase">
                  DAY
                </span>
                <span className="text-xl font-bold text-gray-800">
                  {dayItem.day}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center text-xs text-gray-400 mb-1">
                  <Clock size={12} className="mr-1" />
                  <span>{dayItem.date}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 truncate mb-1">
                  {dayItem.title}
                </h3>
                <div className="flex items-center text-xs text-gray-500 truncate">
                  <MapPin
                    size={12}
                    className="mr-1 flex-shrink-0 text-gray-400"
                  />
                  <span className="truncate">{dayItem.location}</span>
                </div>
              </div>

              <div className="flex-shrink-0 text-gray-300">
                <ChevronRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  // 2. 詳細行程視圖
  const ItineraryView = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white sticky top-0 z-30 px-5 py-4 shadow-sm border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">詳細行程</h2>
        <div className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
          Day {expandedDay}
        </div>
      </div>

      <div className="px-5 py-6">
        <div className="relative pl-2">
          {/* 時間軸線 */}
          <div className="absolute left-[9px] top-4 bottom-4 w-[2px] bg-gray-200"></div>

          {itineraryData.map((dayItem) => {
            const isExpanded = expandedDay === dayItem.day;
            const isEditing = editingDayId === dayItem.day;

            return (
              <div key={dayItem.day} className="relative mb-8 last:mb-0 group">
                {/* 左側圓點 */}
                <div
                  className={`absolute left-[3px] top-6 w-3.5 h-3.5 rounded-full border-2 border-white z-10 transition-colors duration-300 ${
                    isExpanded
                      ? "bg-gray-800 scale-110 shadow-md"
                      : "bg-gray-300"
                  }`}
                ></div>

                {/* 卡片本體 */}
                <div
                  className={`ml-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${
                    isExpanded ? "ring-2 ring-gray-100 border-gray-300" : ""
                  }`}
                >
                  <div className="p-5 relative">
                    <div
                      className="flex justify-between items-start cursor-pointer"
                      onClick={() =>
                        !isEditing &&
                        setExpandedDay(isExpanded ? null : dayItem.day)
                      }
                    >
                      <div className="w-full">
                        <span className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-1 block">
                          DAY {dayItem.day}
                        </span>

                        {/* 標題編輯區域 */}
                        {isEditing ? (
                          <input
                            type="text"
                            value={dayItem.title}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                              updateDayTitle(dayItem.day, e.target.value)
                            }
                            className="w-full text-lg font-bold text-gray-900 bg-gray-50 border border-gray-300 rounded px-2 py-1 mb-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                          />
                        ) : (
                          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                            {dayItem.title}
                          </h3>
                        )}

                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin size={14} className="mr-1 text-gray-400" />
                          <span>{dayItem.location}</span>
                        </div>
                        <div className="flex items-center text-gray-400 text-xs mt-1">
                          <Clock size={12} className="mr-1" />
                          <span>{dayItem.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-2">
                        {!isEditing && (
                          <ChevronRight
                            size={16}
                            className={`text-gray-300 transition-transform duration-300 ${
                              isExpanded ? "rotate-90 text-gray-800" : ""
                            }`}
                          />
                        )}
                      </div>
                    </div>

                    {/* 編輯按鈕 */}
                    {isExpanded && (
                      <div className="absolute top-4 right-4">
                        {isEditing ? (
                          <button
                            onClick={saveEditing}
                            className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-md hover:bg-gray-700"
                          >
                            <Save size={12} /> 完成
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing(dayItem.day);
                            }}
                            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs flex items-center gap-1 hover:bg-gray-200"
                          >
                            <Pencil size={12} /> 編輯
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {isExpanded && (
                    <div className="bg-gray-50/80 border-t border-gray-100 p-4 animate-fade-in">
                      {/* AI 快速建議按鈕 */}
                      <button
                        onClick={() => askAiAboutDay(dayItem.day)}
                        className="w-full mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-lg text-xs font-bold shadow-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                      >
                        <Sparkles size={14} className="text-yellow-200" />✨ AI
                        分析今日行程 (Ask Gemini)
                      </button>

                      <div className="space-y-4">
                        {dayItem.details.map((stop, idx) => (
                          <div key={stop.id} className="flex gap-3 relative">
                            {idx !== dayItem.details.length - 1 && (
                              <div className="absolute left-[15px] top-8 bottom-[-16px] w-[1px] bg-gray-200"></div>
                            )}
                            <div className="flex flex-col items-center flex-shrink-0 w-8">
                              <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 shadow-sm z-10">
                                <stop.icon size={14} />
                              </div>
                            </div>

                            <div className="flex-1 pt-1 pb-2">
                              {isEditing ? (
                                <div className="space-y-2 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={stop.time}
                                      onChange={(e) =>
                                        updateStop(
                                          dayItem.day,
                                          stop.id,
                                          "time",
                                          e.target.value
                                        )
                                      }
                                      className="w-16 text-xs font-mono bg-gray-50 border rounded px-1 py-1 text-center"
                                    />
                                    <input
                                      type="text"
                                      value={stop.title}
                                      onChange={(e) =>
                                        updateStop(
                                          dayItem.day,
                                          stop.id,
                                          "title",
                                          e.target.value
                                        )
                                      }
                                      className="flex-1 text-sm font-bold bg-gray-50 border rounded px-2 py-1"
                                    />
                                  </div>
                                  <textarea
                                    value={stop.desc}
                                    onChange={(e) =>
                                      updateStop(
                                        dayItem.day,
                                        stop.id,
                                        "desc",
                                        e.target.value
                                      )
                                    }
                                    className="w-full text-xs text-gray-500 bg-gray-50 border rounded px-2 py-1 resize-none"
                                    rows={2}
                                  />
                                  <div className="text-right">
                                    <button
                                      onClick={() =>
                                        deleteStop(dayItem.day, stop.id)
                                      }
                                      className="text-red-500 text-xs flex items-center justify-end gap-1 ml-auto hover:text-red-700"
                                    >
                                      <Trash2 size={12} /> 刪除
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="flex items-baseline justify-between">
                                    <h4 className="font-bold text-gray-800 text-sm">
                                      {stop.title}
                                    </h4>
                                    <span className="text-xs font-mono text-gray-500 bg-gray-200/50 px-1.5 py-0.5 rounded">
                                      {stop.time}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                    {stop.desc}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* 新增按鈕 */}
                      {isEditing && (
                        <button
                          onClick={() => addStop(dayItem.day)}
                          className="w-full mt-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 text-xs flex items-center justify-center gap-1 hover:bg-gray-100 hover:border-gray-400 transition-colors"
                        >
                          <Plus size={14} /> 新增行程點
                        </button>
                      )}

                      {/* 路線圖區塊 */}
                      {!isEditing && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <div className="bg-gray-100 rounded-xl p-3 flex items-center justify-between border border-gray-200 hover:bg-gray-200 cursor-pointer transition-colors group">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <Map size={20} className="text-gray-600" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-gray-800">
                                  查看當日路線地圖
                                </h4>
                                <p className="text-xs text-gray-500">
                                  Google Maps 導航
                                </p>
                              </div>
                            </div>
                            <ChevronRight
                              size={18}
                              className="text-gray-400 group-hover:text-gray-600 transition-colors"
                            />
                          </div>

                          {/* 模擬地圖預覽圖條 */}
                          <div className="mt-3 flex gap-1 overflow-hidden rounded-lg opacity-60">
                            <div className="h-1.5 w-full bg-gray-300 rounded-full"></div>
                            <div className="h-1.5 w-2/3 bg-gray-300 rounded-full"></div>
                            <div className="h-1.5 w-1/3 bg-gray-300 rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-24"></div>
      </div>
    </div>
  );

  // 3. 記帳視圖
  const AccountingView = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white p-6 pb-12 rounded-b-[2.5rem] shadow-lg relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold tracking-wide">記帳與匯率</h1>
          <DollarSign size={20} className="text-gray-400" />
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 mb-4">
          <div className="flex justify-between items-center text-xs text-gray-300 mb-2">
            <div className="flex items-center gap-1">
              <RefreshCw size={12} />
              <span>匯率換算</span>
            </div>
            <div className="bg-white/20 px-2 py-0.5 rounded text-[10px] text-gray-200">
              匯率: {exchangeRate}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                ¥
              </span>
              <input
                type="number"
                value={calcAmount}
                onChange={(e) => setCalcAmount(e.target.value)}
                placeholder="輸入日幣"
                className="w-full bg-white rounded-lg py-2 pl-7 pr-3 text-gray-800 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <span className="text-white/50">=</span>
            <div className="flex-1 bg-white rounded-lg py-2 px-3 text-gray-800 font-bold text-sm text-center shadow-inner">
              $
              {calcAmount
                ? Math.round(
                    parseInt(calcAmount) * exchangeRate
                  ).toLocaleString()
                : "0"}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center mb-4">
          <span className="text-xs text-gray-400 font-medium">
            總花費 (Total)
          </span>
          <div className="text-4xl font-bold text-gray-800 mt-2 mb-1">
            ¥{totalExpenseYen.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">
            約 TWD {totalExpenseTwd.toLocaleString()}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
          <input
            type="text"
            placeholder="項目 (例: 章魚燒)"
            value={newExpenseName}
            onChange={(e) => setNewExpenseName(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm mb-3 focus:outline-none focus:border-gray-400 focus:bg-white transition-colors"
          />
          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                ¥
              </span>
              <input
                type="number"
                placeholder="0"
                value={newExpenseAmount}
                onChange={(e) => setNewExpenseAmount(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-7 pr-3 py-3 text-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-colors"
              />
            </div>
            <button className="bg-gray-100 text-gray-600 px-4 rounded-lg text-sm font-medium hover:bg-gray-200">
              食
            </button>
          </div>
          <button
            onClick={addExpense}
            className="w-full bg-gray-800 text-white py-3 rounded-xl font-bold shadow-md hover:bg-gray-700 active:scale-[0.98] transition-all"
          >
            新增
          </button>
        </div>

        <div className="space-y-3 pb-24">
          {expenses.length === 0 ? (
            <div className="text-center text-gray-300 py-8 text-sm">
              尚未新增任何花費
            </div>
          ) : (
            expenses.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs">
                    <Utensils size={14} />
                  </div>
                  <span className="font-medium text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">
                    ¥{item.amount.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    NT${" "}
                    {Math.round(item.amount * exchangeRate).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  // 4. 清單視圖
  const ChecklistView = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white p-6 pb-8 rounded-b-3xl shadow-lg relative z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">行李清單</h1>
          <CheckSquare size={20} className="text-gray-400" />
        </div>
      </div>

      <div className="px-5 -mt-4 relative z-20 pb-24">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 pl-4 flex gap-2 items-center mb-6">
          <input
            type="text"
            placeholder="新增物品..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addChecklistItem()}
            className="flex-1 text-sm bg-transparent focus:outline-none py-2 text-gray-800 placeholder-gray-400"
          />
          <button
            onClick={addChecklistItem}
            className="bg-gray-800 text-white w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="space-y-3">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="group bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3 cursor-pointer transition-all active:scale-[0.99] hover:border-gray-300"
            >
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  item.checked
                    ? "bg-gray-800 border-gray-800"
                    : "bg-white border-gray-300 group-hover:border-gray-400"
                }`}
              >
                {item.checked && (
                  <CheckSquare size={14} className="text-white" />
                )}
              </div>
              <span
                className={`text-sm font-medium transition-colors ${
                  item.checked ? "text-gray-400 line-through" : "text-gray-700"
                }`}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 5. AI 導遊視圖 (NEW)
  const AiGuideView = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col h-full">
      <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-6 pb-6 rounded-b-3xl shadow-lg relative z-10 shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-wide flex items-center gap-2">
              <Sparkles size={18} className="text-yellow-300" />
              AI 隨身導遊
            </h1>
            <p className="text-xs text-indigo-200 mt-1">
              由 Gemini 提供即時協助 ✨
            </p>
          </div>
          <Bot size={24} className="text-indigo-200" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32 space-y-4">
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                msg.role === "user"
                  ? "bg-gray-800 text-white rounded-tr-none"
                  : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isAiLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-purple-600" />
              <span className="text-xs text-gray-500">正在思考中...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* 快速提示按鈕 */}
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
        <button
          onClick={() => handleSendMessage("附近有什麼推薦的平價美食嗎？🍜")}
          className="whitespace-nowrap bg-white border border-purple-200 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm active:scale-95"
        >
          🍜 附近美食
        </button>
        <button
          onClick={() => handleSendMessage("請教我幾句實用的日文購物用語 🛍️")}
          className="whitespace-nowrap bg-white border border-purple-200 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm active:scale-95"
        >
          🗣️ 日文教學
        </button>
        <button
          onClick={() =>
            handleSendMessage("明天京都市區的天氣如何？該怎麼穿？🌤️")
          }
          className="whitespace-nowrap bg-white border border-purple-200 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm active:scale-95"
        >
          🌤️ 查詢天氣
        </button>
      </div>

      {/* 輸入框 */}
      <div className="bg-white border-t border-gray-200 p-3 pb-safe shrink-0 absolute bottom-16 w-full max-w-md">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 border border-gray-200 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="詢問任何問題..."
            disabled={isAiLoading}
            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-800 placeholder-gray-400 disabled:opacity-50"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isAiLoading}
            className={`p-1.5 rounded-full transition-colors ${
              inputMessage.trim() && !isAiLoading
                ? "bg-purple-600 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-100">
      {/* 根據 Active Tab 切換內容 */}
      {activeTab === "home" && <HomeView />}
      {activeTab === "itinerary" && <ItineraryView />}
      {activeTab === "notes" && <AccountingView />}
      {activeTab === "list" && <ChecklistView />}
      {activeTab === "guide" && <AiGuideView />}

      {/* 底部導航列 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 max-w-md mx-auto">
        <div className="flex justify-around items-center h-16 px-1">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              activeTab === "home"
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Home size={20} strokeWidth={activeTab === "home" ? 2.5 : 2} />
            <span className="text-[9px] font-medium">首頁</span>
          </button>

          <button
            onClick={() => setActiveTab("itinerary")}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              activeTab === "itinerary"
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Calendar
              size={20}
              strokeWidth={activeTab === "itinerary" ? 2.5 : 2}
            />
            <span className="text-[9px] font-medium">行程</span>
          </button>

          {/* AI Guide Tab (Highlighted) */}
          <button
            onClick={() => setActiveTab("guide")}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              activeTab === "guide"
                ? "text-purple-600"
                : "text-gray-400 hover:text-purple-500"
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                activeTab === "guide" ? "bg-purple-100" : ""
              }`}
            >
              <Sparkles
                size={20}
                strokeWidth={2.5}
                className={
                  activeTab === "guide" ? "text-purple-600 animate-pulse" : ""
                }
              />
            </div>
            <span className="text-[9px] font-bold text-purple-600">
              AI 導遊
            </span>
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              activeTab === "notes"
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FileText size={20} strokeWidth={activeTab === "notes" ? 2.5 : 2} />
            <span className="text-[9px] font-medium">記帳</span>
          </button>

          <button
            onClick={() => setActiveTab("list")}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              activeTab === "list"
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <CheckSquare
              size={20}
              strokeWidth={activeTab === "list" ? 2.5 : 2}
            />
            <span className="text-[9px] font-medium">清單</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KyotoTripApp;
