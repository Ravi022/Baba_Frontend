import React, { useState } from "react";
import StickyTable from "../../Home/Components/StickyTable/StickyTable";

const urls = [
  {
    id: 1,
    url: "https://organization-frontend.vercel.app/sitemap.xml...",
  },
  {
    id: 2,
    url: "https://organization-frontend.vercel.app/",
  },
  {
    id: 3,
    url: "https://organization-frontend.vercel.app/login",
  },
  {
    id: 4,
    url: "https://organization-frontend.vercel.app/signUp",
  },
  {
    id: 5,
    url: "https://organization-frontend.vercel.app/importantTasks",
  },
  {
    id: 6,
    url: "https://organization-frontend.vercel.app/completedTasks",
  },
  {
    id: 7,
    url: "https://organization-frontend.vercel.app/incompleteTasks",
  },
];

const urls1 = [
  {
    id: 1,
    url: 'Usage of hard-coded secret [CWE-798]\nhttps://docs.bearer.com/reference/rules/javascript_express_hardcoded_secret\nTo ignore this finding, run: bearer ignore add fe941bddfa7f22115cd2197b4f414fc4_0\n\nFile: Organization-backend/src/routes/user.js:99\n\n 99         const claims = { username, jti: jwt.sign({}, "ravi022") };',
  },
  {
    id: 2,
    url: 'Usage of hard-coded secret [CWE-798]\nhttps://docs.bearer.com/reference/rules/javascript_express_hardcoded_secret\nTo ignore this finding, run: bearer ignore add fe941bddfa7f22115cd2197b4f414fc4_1\n\nFile: Organization-backend/src/routes/user.js:101\n\n 101         const token = jwt.sign(claims, "ravi022", { expiresIn: "30d" });',
  },
  {
    id: 3,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_0\n\nFile: Organization-backend/src/routes/tasks.js:14\n\n 14     const newTask = new Tasks({ title: title, desc: desc });",
  },
  {
    id: 4,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_1\n\nFile: Organization-backend/src/routes/tasks.js:17\n\n 17     await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });",
  },
  {
    id: 5,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_2\n\nFile: Organization-backend/src/routes/tasks.js:32\n\n 32     const userData = await User.findById(id).populate({",
  },
  {
    id: 6,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_3\n\nFile: Organization-backend/src/routes/tasks.js:36\n\n 36     await User.findOne({ id });",
  },
  {
    id: 7,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_4\n\nFile: Organization-backend/src/routes/tasks.js:53\n\n 53     await Tasks.findByIdAndDelete(id);",
  },
  {
    id: 8,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_5\n\nFile: Organization-backend/src/routes/tasks.js:54\n\n 54     await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });",
  },
  {
    id: 9,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_6\n\nFile: Organization-backend/src/routes/tasks.js:73\n\n 73     await Tasks.findByIdAndUpdate(id, { title: title, desc: desc });",
  },
  {
    id: 10,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_7\n\nFile: Organization-backend/src/routes/tasks.js:90\n\n 90     const taskData = await Tasks.findById(id);",
  },
  {
    id: 11,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_8\n\nFile: Organization-backend/src/routes/tasks.js:92\n\n 92     await Tasks.findByIdAndUpdate(id, { important: !ImpTask });",
  },
  {
    id: 12,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_9\n\nFile: Organization-backend/src/routes/tasks.js:109\n\n 109     const taskData = await Tasks.findById(id);",
  },
  {
    id: 13,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_10\n\nFile: Organization-backend/src/routes/tasks.js:112\n\n 112     await Tasks.findByIdAndUpdate(id, { complete: !completeTask });",
  },
  {
    id: 14,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_11\n\nFile: Organization-backend/src/routes/tasks.js:129\n\n 129     const Data = await User.findById(id).populate({",
  },
  {
    id: 15,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_12\n\nFile: Organization-backend/src/routes/tasks.js:135\n\n 135     await User.findOne({ id });",
  },
  {
    id: 16,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_13\n\nFile: Organization-backend/src/routes/tasks.js:151\n\n 151     const completedData = await User.findById(id).populate({",
  },
  {
    id: 17,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_14\n\nFile: Organization-backend/src/routes/tasks.js:157\n\n 157     await User.findOne({ id });",
  },
  {
    id: 18,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_15\n\nFile: Organization-backend/src/routes/tasks.js:174\n\n 174     const Data = await User.findById(id).populate({",
  },
  {
    id: 19,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_16\n\nFile: Organization-backend/src/routes/tasks.js:180\n\n 180     await User.findOne({ id });",
  },
  {
    id: 20,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add 1034b9252cb169957d5d0b47e6793527_0\n\nFile: Organization-backend/src/routes/user.js:16\n\n 16         const existingEmail = await User.findOne({ email });",
  },
  {
    id: 21,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add 1034b9252cb169957d5d0b47e6793527_1\n\nFile: Organization-backend/src/routes/user.js:29\n\n 29       const existingUser = await User.findOne({ username });",
  },
  {
    id: 22,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add 1034b9252cb169957d5d0b47e6793527_2\n\nFile: Organization-backend/src/routes/user.js:42\n\n 42       const newUser = new User({\n 43         username,\n 44         email,\n 45         password: hashPass,\n 46       });",
  },
  {
    id: 23,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add 1034b9252cb169957d5d0b47e6793527_3\n\nFile: Organization-backend/src/routes/user.js:81\n\n 81     const existingUser = await User.findOne({ username: username });",
  },
  {
    id: 24,
    url: 'Leakage of hard-coded secret in JWT [CWE-798]\nhttps://docs.bearer.com/reference/rules/javascript_lang_jwt_hardcoded_secret\nTo ignore this finding, run: bearer ignore add 27b57ef0ae4a801f1518aa5548b0253c_0\n\nFile: Organization-backend/src/routes/user.js:99\n\n 99         const claims = { username, jti: jwt.sign({}, "ravi022") };',
  },
  {
    id: 25,
    url: 'Leakage of hard-coded secret in JWT [CWE-798]\nhttps://docs.bearer.com/reference/rules/javascript_lang_jwt_hardcoded_secret\nTo ignore this finding, run: bearer ignore add 27b57ef0ae4a801f1518aa5548b0253c_1\n\nFile: Organization-backend/src/routes/user.js:101\n\n 101         const token = jwt.sign(claims, "ravi022", { expiresIn: "30d" });',
  },
];
const urls3 = [
  {
    id: 1,
    url: 'Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add 3c3ff53da77f5394b8cfea792621e39b_0\n\nFile: Organization-backend/App.js:24\n\n 24   console.log("Server is running on port :", ` ${port}`);',
  },
  {
    id: 2,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add 966cb84a5793adc5858d74eb179be6ba_0\n\nFile: Organization-backend/src/middlewares/logMiddleware.js:5\n\n 5 console.log(logDir);",
  },
  {
    id: 3,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add 966cb84a5793adc5858d74eb179be6ba_1\n\nFile: Organization-backend/src/middlewares/logMiddleware.js:31\n\n 31                 console.error('Failed to write to log file:', err);",
  },
  {
    id: 4,
    url: 'Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add bb06c8faa4bfb626bbca5accf1bb6421_0\n\nFile: Organization-backend/src/routes/auth.js:14\n\n 14       console.log("Error:", err);',
  },
  {
    id: 5,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add c459a2b8a5003761c6233f53238e661d_0\n\nFile: Organization-backend/src/routes/tasks.js:10\n\n 10   console.log(req.body.title, req.body.desc);",
  },
  {
    id: 6,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add c459a2b8a5003761c6233f53238e661d_1\n\nFile: Organization-backend/src/routes/tasks.js:20\n\n 20     console.error(error);",
  },
  {
    id: 7,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add c459a2b8a5003761c6233f53238e661d_2\n\nFile: Organization-backend/src/routes/tasks.js:39\n\n 39     console.error(error);",
  },
  {
    id: 8,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add c459a2b8a5003761c6233f53238e661d_3\n\nFile: Organization-backend/src/routes/tasks.js:60\n\n 60     console.error(error);",
  },
  {
    id: 9,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add c459a2b8a5003761c6233f53238e661d_4\n\nFile: Organization-backend/src/routes/tasks.js:78\n\n 78     console.error(error);",
  },
  {
    id: 10,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add c459a2b8a5003761c6233f53238e661d_5\n\nFile: Organization-backend/src/routes/tasks.js:97\n\n 97     console.error(error);",
  },
  {
    id: 11,
    url: 'Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add c459a2b8a5003761c6233f53238e661d_6\n\nFile: Organization-backend/src/routes/tasks.js:106\n\n 106   console.log("req.params :", req.params);',
  },
  {
    id: 12,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add c459a2b8a5003761c6233f53238e661d_7\n\nFile: Organization-backend/src/routes/tasks.js:111\n\n 111     console.log(completeTask);",
  },
  {
    id: 13,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add c459a2b8a5003761c6233f53238e661d_8\n\nFile: Organization-backend/src/routes/tasks.js:113\n\n 113     console.log(!completeTask);",
  },
  {
    id: 14,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add c459a2b8a5003761c6233f53238e661d_9\n\nFile: Organization-backend/src/routes/tasks.js:118\n\n 118     console.error(error);",
  },
  {
    id: 15,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add c459a2b8a5003761c6233f53238e661d_10\n\nFile: Organization-backend/src/routes/tasks.js:140\n\n 140     console.error(error);",
  },
  {
    id: 16,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add c459a2b8a5003761c6233f53238e661d_11\n\nFile: Organization-backend/src/routes/tasks.js:162\n\n 162     console.error(error);",
  },
  {
    id: 17,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add c459a2b8a5003761c6233f53238e661d_12\n\nFile: Organization-backend/src/routes/tasks.js:185\n\n 185     console.error(error);",
  },
  {
    id: 18,
    url: "Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add 5147a7619c9e92bd1a265c381308ab76_0\n\nFile: Organization-backend/src/routes/user.js:60\n\n 60     console.error(error);",
  },
  {
    id: 19,
    url: 'Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add 5147a7619c9e92bd1a265c381308ab76_1\n\nFile: Organization-backend/src/routes/user.js:114\n\n 114     console.error("Error in /log-in route:", error);',
  },
  {
    id: 20,
    url: 'Leakage of information in logger message [CWE-532]\nhttps://docs.bearer.com/reference/rules/javascript_lang_logger_leak\nTo ignore this finding, run: bearer ignore add fe09ca30548dc1a6a5edac8d53ca26d4_0\n\nFile: Organization-backend/src/utils/ConnectMongo.js:11\n\n 11     console.log("error", error);\n=====================================\n\n87 checks, 50 findings',
  },
  {
    id: 21,
    url: "20 (CWE-532)\nWARNING: 0\n\nNeed help or want to discuss the output? Join the Community https://discord.gg/eaHZBJUXRF",
  },
];
const urls2 = [
  {
    id: 1,
    url: "Unsanitized user input in format string [CWE-134]\nhttps://docs.bearer.com/reference/rules/javascript_lang_format_string_using_user_input\nTo ignore this finding, run: bearer ignore add d8374c77de2e76db0e969b91c60f143e_0\n\nFile: Organization-backend/src/routes/tasks.js:10\n\n 10   console.log(req.body.title, req.body.desc);",
  },
  {
    id: 2,
    url: "Unsanitized user input in format string [CWE-134]\nhttps://docs.bearer.com/reference/rules/javascript_lang_format_string_using_user_input\nTo ignore this finding, run: bearer ignore add d8374c77de2e76db0e969b91c60f143e_1\n\nFile: Organization-backend/src/routes/tasks.js:111\n\n 111     console.log(completeTask);",
  },
  {
    id: 3,
    url: 'Leakage of sensitive data in JWT [CWE-312]\nhttps://docs.bearer.com/reference/rules/javascript_lang_jwt\nTo ignore this finding, run: bearer ignore add 374aae60ddba19ffcaab438ae003fcc5_0\n\nFile: Organization-backend/src/routes/user.js:101\n\n 101         const token = jwt.sign(claims, "ravi022", { expiresIn: "30d" });',
  },
  {
    id: 4,
    url: "3 (CWE-134, CWE-312)",
  },
];
const urls4 = [
  {
    id: 1,
    url: "Missing Helmet configuration on HTTP headers [CWE-693]\nhttps://docs.bearer.com/reference/rules/javascript_express_helmet_missing\nTo ignore this finding, run: bearer ignore add 926b1ddc88bfa9d59f285d1f1ca68cc6_0\n\nFile: Organization-backend/App.js:2\n\n 2 const app = express();",
  },
  {
    id: 2,
    url: "Missing server configuration to reduce server fingerprinting [CWE-693]\nhttps://docs.bearer.com/reference/rules/javascript_express_reduce_fingerprint\nTo ignore this finding, run: bearer ignore add 8e04536c3b9dd37386998bb41b8fd62f_0\n\nFile: Organization-backend/App.js:2\n\n 2 const app = express();",
  },
  {
    id: 3,
    url: "2 (CWE-693)",
  },
];

const urls11 = [
  {
    id: 7,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_4\n\nFile: Organization-backend/src/routes/tasks.js:53\n\n 53     await Tasks.findByIdAndDelete(id);",
  },
  {
    id: 8,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_5\n\nFile: Organization-backend/src/routes/tasks.js:54\n\n 54     await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });",
  },
  {
    id: 9,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_6\n\nFile: Organization-backend/src/routes/tasks.js:73\n\n 73     await Tasks.findByIdAndUpdate(id, { title: title, desc: desc });",
  },
  {
    id: 10,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_7\n\nFile: Organization-backend/src/routes/tasks.js:90\n\n 90     const taskData = await Tasks.findById(id);",
  },
  {
    id: 11,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_8\n\nFile: Organization-backend/src/routes/tasks.js:92\n\n 92     await Tasks.findByIdAndUpdate(id, { important: !ImpTask });",
  },
  {
    id: 12,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_9\n\nFile: Organization-backend/src/routes/tasks.js:109\n\n 109     const taskData = await Tasks.findById(id);",
  },
  {
    id: 13,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_10\n\nFile: Organization-backend/src/routes/tasks.js:112\n\n 112     await Tasks.findByIdAndUpdate(id, { complete: !completeTask });",
  },
  {
    id: 14,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_11\n\nFile: Organization-backend/src/routes/tasks.js:129\n\n 129     const Data = await User.findById(id).populate({",
  },
  {
    id: 15,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_12\n\nFile: Organization-backend/src/routes/tasks.js:135\n\n 135     await User.findOne({ id });",
  },
  {
    id: 16,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_13\n\nFile: Organization-backend/src/routes/tasks.js:151\n\n 151     const completedData = await User.findById(id).populate({",
  },
  {
    id: 17,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_14\n\nFile: Organization-backend/src/routes/tasks.js:157\n\n 157     await User.findOne({ id });",
  },
  {
    id: 18,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_15\n\nFile: Organization-backend/src/routes/tasks.js:174\n\n 174     const Data = await User.findById(id).populate({",
  },
  {
    id: 19,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add d5562fffcd653cf4d99e0a03c660c237_16\n\nFile: Organization-backend/src/routes/tasks.js:180\n\n 180     await User.findOne({ id });",
  },
  {
    id: 20,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add 1034b9252cb169957d5d0b47e6793527_0\n\nFile: Organization-backend/src/routes/user.js:16\n\n 16         const existingEmail = await User.findOne({ email });",
  },
  {
    id: 21,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add 1034b9252cb169957d5d0b47e6793527_1\n\nFile: Organization-backend/src/routes/user.js:29\n\n 29       const existingUser = await User.findOne({ username });",
  },
  {
    id: 22,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add 1034b9252cb169957d5d0b47e6793527_2\n\nFile: Organization-backend/src/routes/user.js:42\n\n 42       const newUser = new User({\n 43         username,\n 44         email,\n 45         password: hashPass,\n 46       });",
  },
  {
    id: 23,
    url: "Unsanitized input in NoSQL query [CWE-943]\nhttps://docs.bearer.com/reference/rules/javascript_express_nosql_injection\nTo ignore this finding, run: bearer ignore add 1034b9252cb169957d5d0b47e6793527_3\n\nFile: Organization-backend/src/routes/user.js:81\n\n 81     const existingUser = await User.findOne({ username: username });",
  },
  {
    id: 24,
    url: 'Leakage of hard-coded secret in JWT [CWE-798]\nhttps://docs.bearer.com/reference/rules/javascript_lang_jwt_hardcoded_secret\nTo ignore this finding, run: bearer ignore add 27b57ef0ae4a801f1518aa5548b0253c_0\n\nFile: Organization-backend/src/routes/user.js:99\n\n 99         const claims = { username, jti: jwt.sign({}, "ravi022") };',
  },
  {
    id: 25,
    url: 'Leakage of hard-coded secret in JWT [CWE-798]\nhttps://docs.bearer.com/reference/rules/javascript_lang_jwt_hardcoded_secret\nTo ignore this finding, run: bearer ignore add 27b57ef0ae4a801f1518aa5548b0253c_1\n\nFile: Organization-backend/src/routes/user.js:101\n\n 101         const token = jwt.sign(claims, "ravi022", { expiresIn: "30d" });',
  },
  {
    id: 26,
    url: "25 (CWE-798, CWE-943)",
  },
];

const urls22 = [
  {
    id: 1,
    url: "Unsanitized user input in format string [CWE-134]\nhttps://docs.bearer.com/reference/rules/javascript_lang_format_string_using_user_input\nTo ignore this finding, run: bearer ignore add d8374c77de2e76db0e969b91c60f143e_0\n\nFile: Organization-backend/src/routes/tasks.js:10\n\n 10   console.log(req.body.title, req.body.desc);",
  },
  {
    id: 2,
    url: "Unsanitized user input in format string [CWE-134]\nhttps://docs.bearer.com/reference/rules/javascript_lang_format_string_using_user_input\nTo ignore this finding, run: bearer ignore add d8374c77de2e76db0e969b91c60f143e_1\n\nFile: Organization-backend/src/routes/tasks.js:111\n\n 111     console.log(completeTask);",
  },
  {
    id: 3,
    url: 'Leakage of sensitive data in JWT [CWE-312]\nhttps://docs.bearer.com/reference/rules/javascript_lang_jwt\nTo ignore this finding, run: bearer ignore add 374aae60ddba19ffcaab438ae003fcc5_0\n\nFile: Organization-backend/src/routes/user.js:101\n\n 101         const token = jwt.sign(claims, "ravi022", { expiresIn: "30d" });',
  },
  {
    id: 4,
    url: "3 (CWE-134, CWE-312)",
  },
];
const urls111 = [
  {
    id: 1,
    url: "OWASP-API7 Identification and Authentication Failures",
  },
  {
    id: 2,
    url: "CWE not found in OWASP Top 10 API mapping",
  },
  {
    id: 3,
    url: "CWE not found in OWASP Top 10 API mapping",
  },
  {
    id: 4,
    url: "OWASP-API4 Insecure Design",
  },
  {
    id: 5,
    url: "CWE not found in OWASP Top 10 API mapping",
  },
  {
    id: 6,
    url: "OWASP-API9 Security Logging and Monitoring Failures",
  },
];

export default function Scanner() {
  const [popUp, setpopUp] = useState("");
  return (
    <div className="absolute bg-gray-900 w-full h-[80vh] flex justify-center items-center">
      {/* First half */}
      <div className="w-1/2 h-full  p-4 overflow-y-scroll">
        <h2 className="text-white text-xl mb-4 w-full flex flex-row justify-center">Owasp Top 10</h2>
        <div className="flex flex-col justify-center items-center gap-6">
          <StickyTable
            rows={urls111}
            setpopUp={setpopUp}
            popUp={popUp}
            label={"Owasp Top 10"}
          />
        </div>
      </div>

      {/* Second half */}
      {/* <div className="w-1/2 h-full p-4 overflow-y-scroll">
        <h2 className="text-white text-xl mb-4 ">Previous Scan History</h2>
        <div className="flex flex-col gap-6">
          <StickyTable
            rows={urls11}
            setpopUp={setpopUp}
            popUp={popUp}
            label={"Critical"}
          />
          <StickyTable
            rows={urls22}
            setpopUp={setpopUp}
            popUp={popUp}
            label={"High"}
          />
          <StickyTable
            rows={urls4}
            setpopUp={setpopUp}
            popUp={popUp}
            label={"Medium"}
          />
          <StickyTable
            rows={urls3}
            setpopUp={setpopUp}
            popUp={popUp}
            label={"Low"}
          />
        </div>
      </div> */}
    </div>
  );
}
