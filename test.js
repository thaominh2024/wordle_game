const word = process.argv[2] || "apple"; // Lấy từ bạn nhập từ terminal, mặc định là 'apple'

async function testDefinition(targetWord) {
  console.log(`--- Đang tra từ: ${targetWord.toUpperCase()} ---`);
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${targetWord}`);
    const data = await response.json();
    
    if (data[0]) {
      const definition = data[0].meanings[0].definitions[0].definition;
      console.log(`✅ Định nghĩa: ${definition}`);
      
      // Thử dịch sang tiếng Việt luôn
      const resTrans = await fetch(`https://api.mymemory.translated.net/get?q=${targetWord}&langpair=en|vi`);
      const dataTrans = await resTrans.json();
      console.log(`🇻🇳 Dịch nghĩa: ${dataTrans.responseData.translatedText}`);
    } else {
      console.log("❌ Không tìm thấy định nghĩa cho từ này.");
    }
  } catch (error) {
    console.log(`⚠️ Lỗi: ${error.message}`);
  }
}

testDefinition(word);