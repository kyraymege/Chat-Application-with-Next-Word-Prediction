# Gerekli kütüphaneleri içe aktar
import numpy as np
import pandas as pd
import tensorflow as tf
import sys
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense
import time

start_time = time.time()
userId = sys.argv[1] # Kullanıcı kimliğini al
input_message = sys.argv[2] # Giriş metnini al

# Metin verilerini oku
df = pd.read_json("http://localhost:8800/api/message/user/"+userId)
# Metin verilerini küçük harfe dönüştür
df = df[0].str.lower()

# Metin verilerini cümlelere ayır
sentences = df.values.tolist()

# Kelimeleri sayılara dönüştürmek için bir Tokenizer oluştur
tokenizer = Tokenizer(filters='!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~\t\n', lower=True)
tokenizer.fit_on_texts(sentences)

# Kelime sayısı (sözlük boyutu)
vocab_size = len(tokenizer.word_index) + 1

# Cümleleri sayı dizilerine dönüştür
sequences = tokenizer.texts_to_sequences(sentences)

# Giriş ve çıkış dizilerini oluştur
input_sequences = []
output_sequences = []

for sequence in sequences:
  for i in range(1, len(sequence)):
    input_sequences.append(sequence[:i]) # Cümlenin ilk i kelimesi
    output_sequences.append(sequence[i]) # Cümlenin i. kelimesi

# Giriş dizilerini aynı uzunlukta olacak şekilde doldur
max_length = max([len(x) for x in input_sequences])
input_sequences = pad_sequences(input_sequences, maxlen=max_length, padding="pre")

# Çıkış dizilerini one-hot kodlama yap
output_sequences = tf.keras.utils.to_categorical(output_sequences, num_classes=vocab_size)

# Derin öğrenme modelini oluştur
model = Sequential([
    Embedding(vocab_size, 64, input_length=max_length),
    LSTM(64),
    Dense(vocab_size, activation="softmax")
])

# Modeli derle ve özetini yazdır
model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])
model.summary()

# Modeli eğit
model.fit(input_sequences, output_sequences, epochs=10, batch_size=128, workers=4, use_multiprocessing=True)

# Yeni bir giriş dizisi için çıkış dizisini tahmin etme fonksiyonu
def predict_next_word(input_text):
  # Giriş metnini sayı dizisine dönüştür
  input_sequence = tokenizer.texts_to_sequences([input_text])[0]
  # Giriş dizisini aynı uzunlukta olacak şekilde doldur
  input_sequence = pad_sequences([input_sequence], maxlen=max_length, padding="pre")
  # Modeli kullanarak çıkış dizisini tahmin et
  output_sequence = model.predict(input_sequence)
  # Tahmin edilen diziyi en yüksek olasılığa sahip kelimeye dönüştür
  predicted_word = tokenizer.index_word[np.argmax(output_sequence)]
  # Tahmin edilen kelimeyi yazdır
  print(f"{predicted_word}")

# Yeni bir giriş metni için çıkış kelimesini tahmin et
predict_next_word(input_message) # Tahmin edilen ikinci kelime
print("--- %s seconds ---" % (time.time() - start_time))
