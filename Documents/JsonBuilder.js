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
  "קושי בקריאת תפריט",
  "חוסר הבנה של בעיות המתבגרים",
  "בזבוז מזון",
  "חשש מהעדר תעסוקה",
  "ילדים באים בלי חשק לביה'ס",
  "צורך לנטרל סטיגמות על זקנים",
  "חוסר שוויון מגדרי",
  "חוסר ידע על אתרי הכפר",
  "קשיי המעבר בין הגן לביה'ס",
  "כלבים עם נכויות לבעלים חסרי אמצעים",
  "בדידות בהפסקות",
  "תלמידים מפחדים להגיע לביה'ס",
  "תנאי מחייה של חיות המשק",
  "קושי של זקנים עם טכנולוגיה",
  "כובד תיקי בית ספר",
  "תחושת בדידות חברתית ",
  "חסר מקום נעים לקריאה בהפסקה",
  "חוסר רצון לבוא ללימודים",
  "חוסר מודעות לתחרות הטניס לנכים",
  "יחס לא נעים בין תלמידים"
];

let doList = [
  "הפקת תפריט קולי",
  "הפקת הצגה",
  "שימוש בשאריות מזון לקומפוסט",
  "סדנאות להגשמת חלומות",
  "ספר מתכונים",
  "אימוץ ותיקי העיר בבית הספר",
  "הקמת קבוצת כדורגל ",
  "שילוט רחובות",
  "הפסקה פעילה",
  "גיוס כספים לרכישת מדפסת תלת מימד",
  "הקמת תחנת חברות ",
  "הטמעת תכנית בטיחות בדרכים ",
  "חלב חופש",
  "קו חם לבעיות טכנולוגיות",
  "בניית מערכת לשיעורים דיגיטליים",
  "הקמת תנועת הנוער \”צליל מיוחד\”",
  "בניית ספריה על גלגלים",
  "ארגון פעילויות חברתיות כיתתיות",
  "הפקת מסע פרסום ",
  "תחנות בבי'ס לעידוד מפגשים"
];

let linkList = [
  "ZHJeKr5CWJ0",
  "enEzeZnyAVg",
  "EL8TRhZACyc",
  "x1goC5TbKe4",
  "xI_JqHSbMMY",
  "p48hLkJZ7kE",
  "mZeeiJ1_dkw",
  "HyIb1vTciQk",
  "4Bq7cVX9gw4",
  "VVsfgHLAr2c",
  "FbGUFJEy_F8",
  "1xWgPMgaf_E",
  "Tv8lKHBtX2I",
  "qF48FTmaX10",
  "7OyPdjEOLiE",
  "4J_Km0TD9q8",
  "HhCXn_dJoDI",
  "E5KaYHFxj2M",
  "BagLuOaThIc",
  "yPIlcdiwPIg"
];

console.log(mergeToJason(feelList, doList, linkList));
