import requests
import time
import json

def filter_valid_words():
    valid_words = []
    
    with open("words.txt", "r") as f:
        all_words = [line.strip() for line in f.readlines()]

    print(f"Bắt đầu lọc {len(all_words)} từ...")

    for word in all_words:
        try:
            response = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}")
            
            if response.status_code == 200:
                print(f"✅ Hợp lệ: {word}")
                valid_words.append(word)
                with open("valid_words.txt", "a") as out_f:
                    out_f.write(word + "\n")
            else:
                print(f"❌ Loại bỏ: {word}")

            time.sleep(0.5) 
            
        except Exception as e:
            print(f"⚠️ Lỗi tại từ {word}: {e}")
            time.sleep(5) 

    print("--- HOÀN THÀNH ---")

filter_valid_words()