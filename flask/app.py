from flask import Flask , request
import numpy as np
import pandas as pd
import tensorflow as tf
from flask_cors import CORS, cross_origin
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Conv1D, MaxPooling1D, Flatten, Dense

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/guessWord", methods=['GET'])
@cross_origin()
def guessWord():
    args = request.args
    userId = args.get('userId') # Kullanıcı kimliğini al
    input_message = args.get('word') # Giriş metnini al

        # Read the text data.
    df = pd.read_json("http://localhost:8800/api/message/user/{}".format(userId))
    df = df[0].str.lower()

    # Split the text data into sentences.
    sentences = df.values.tolist()

    # Create a tokenizer to convert words to numbers.
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(sentences)

    # Get the vocabulary size.
    vocab_size = len(tokenizer.word_index) + 1

    # Convert the sentences to number sequences.
    sequences = tokenizer.texts_to_sequences(sentences)

    # Create the input and output sequences.
    input_sequences = []
    output_sequences = []

    for sequence in sequences:
        for i in range(1, len(sequence)):
            input_sequences.append(sequence[:i])
            output_sequences.append(sequence[i])

    # Pad the input sequences to the same length.
    max_length = max([len(x) for x in input_sequences])
    input_sequences = pad_sequences(input_sequences, maxlen=max_length, padding="pre")

    # One-hot encode the output sequences.
    output_sequences = tf.keras.utils.to_categorical(output_sequences, num_classes=vocab_size)

    # Create the deep learning model.
    model = Sequential([
        Embedding(vocab_size, 128, input_length=max_length),
        Conv1D(filters=128, kernel_size=3, strides=1, padding="same"),
        Flatten(),
        Dense(vocab_size, activation="softmax")
    ])

    # Compile the model and print its summary.
    model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])
    model.summary()

    # Train the model.
    model.fit(input_sequences, output_sequences, epochs=10, batch_size=128, workers=4, use_multiprocessing=True)


    # Define a function to predict the next word in a new input sequence.
    def predict_next_word(input_text):
        # Convert the input text to a number sequence.
        input_sequence = tokenizer.texts_to_sequences([input_text])[0]

        # Pad the input sequence to the same length.
        input_sequence = pad_sequences([input_sequence], maxlen=max_length, padding="pre")

        # Predict the output sequence using the model.
        output_sequence = model.predict(input_sequence)

        # Convert the predicted sequence to the word with the highest probability.
        predicted_word = tokenizer.index_word[np.argmax(output_sequence)]

        # Return the predicted word.
        return predicted_word  

    # Yeni bir giriş metni için çıkış kelimesini tahmin et
    return predict_next_word(input_message) # Tahmin edilen ikinci kelime


if __name__ == "__main__":
    app.run(debug=True)