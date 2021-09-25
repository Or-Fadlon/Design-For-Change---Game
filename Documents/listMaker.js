function mergeToJason(feelList, doList, linkList) {
  if (feelList.length != doList.length || doList.length != linkList.length)
    return "Fail!!";

  let jsonText = '{\n"DoFeelList": [\n';

  for (let i = 0; i < doList.length; i++) {
    jsonText += "{\n";
    jsonText += '"feel": "' + feelList[i] + '",\n';
    jsonText += '"do":  "' + doList[i] + '",\n';
    jsonText += '"link": "' + linkList[i] + '"\n';
    jsonText += "}";

    if (i != doList.length - 1) jsonText += ",\n";
    else jsonText += "\n]\n";
  }

  return jsonText + "}";
}

let feelList = [
  "רצינו דשא סינתטי למגרש המשחקים",
  "אנשים שקופים",
  "חוסר שיוון מגדרי",
  "כלבים משוטטים",
  "מי מכין את הכריכים הנמצאים מידי בוקר על דלת בית הספר?",
  "אין נגישות לממתקים מתי שרוצים",
  "קשיי המעבר בין הגן לבית הספר",
  "בזבוז מזון ואכילה לא בריאה",
  "ילדים באים בלי מצב רוח לבית הספר",
  "לא נעים לטייל בפארק סביב האגם",
  "בעיית תקשורת עם סבתי החרשת",
  "לא קוראים ספרים",
  "סבל התרנגולות",
  "כובד תיקי בית ספר",
  "רחובות לא נגישים לבעלי נכויות",
  "בדידות בהפסקות",
  "קושי להסתגל לכתה א",
];

let doList = [
  "קמפיין חיסכון מים וחשמל",
  "עיצוב חלוק עבודה",
  "הקמת קבוצת כדורגל תחרותית",
  "הקמת פינת ליטוף",
  "גידול ירקות כתרומה לעמותה",
  "הקמת בוסתן קהילתי",
  "הפסקה פעילה",
  "ניצול יעיל של שאריות מזון כקומפוסט",
  "ספר מתכונים",
  "עיצוב פחי אשפה",
  "לומדים ומלמדים שפה חדשה",
  "הפיכה לספרייה",
  "גיוס רשתות שיווק גדולות לשיווק המוצר שלהם",
  "בניית מערכת שיעורי בית דיגיטליים",
  "הקמת סיירת נגישות",
  "הקמת תחנת חברות",
  "עיצוב מרחב שלם בבית הספר",
];

let linkList = [
  "ASRb4pgbB0M",
  "2x66mDMtko8",
  "mZeeiJ1_dkw",
  "Wk5SEbaUq5s",
  "1j674KlPTSc",
  "WoXJHHcy9ZE",
  "4Bq7cVX9gw4",
  "EL8TRhZACyc",
  "xI_JqHSbMMY",
  "KTRPCeScVhU",
  "UDa5Dts2efc",
  "F3rfy-A0XLA",
  "XXnKdEXKJj0",
  "7OyPdjEOLiE",
  "zF02oaBOJrI",
  "FbGUFJEy_F8",
  "T18aHQZM-Dc",
];

console.log(mergeToJason(feelList, doList, linkList));
