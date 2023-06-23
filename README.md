# MERN Stack Real-Time Chat App via Next Word Prediction
This project aims to develop a real-time chat application. But this application differs from common chat applications because it helps to guess the next word with users' last messages. Chatting is easier with this feature.
This project uses **React.js's framework Next.js** on the front end, uses **Node.js's framework Express.js** on the back end, and stores data with **MongoDB**. Also, this project will provide real-time chat and data flow with **Socket.io**.
This project takes users' last 200 messages and predicts the next word via using a **CNN model**. 
On next-word predictions, I tried the LTSM model but for efficiency, I decided on the CNN model. Btw, I'm using a Flask server for time-saving. I save 4 seconds on prediction with the Flask server. Also, with LTSM model  works in 6 seconds on prediction but with CNN model works under in 1 sec. I choose the CNN model cause' of this reason.

## Project Schema
![Untitled-2023-06-18-0816](https://github.com/kyraymege/mern-chatapp-finalproject/assets/61958118/586738f9-f6dc-4f3b-b93a-bd5522b94649)

## Database ER Diagram
![Real Time Chat App Db](https://github.com/kyraymege/mern-chatapp-finalproject/assets/61958118/b2ebda03-41c5-405e-8a32-2b8f4a2a36e9)

## User Interface

### User sign-in section
![Ekran görüntüsü 2023-05-09 212807](https://github.com/kyraymege/mern-chatapp-finalproject/assets/61958118/06e4bbd6-3e56-447e-97a0-49eea5b2e73c)

### User sign-up section
![Ekran görüntüsü 2023-06-19 094220](https://github.com/kyraymege/mern-chatapp-finalproject/assets/61958118/4874081b-b413-40e6-9715-899aa60fd3ac)

### User chat section
![Ekran görüntüsü 2023-06-19 094410](https://github.com/kyraymege/mern-chatapp-finalproject/assets/61958118/7209968a-b555-4797-a4c0-099438452fd5)

### Between two user chat section
![Ekran görüntüsü 2023-06-19 094459](https://github.com/kyraymege/mern-chatapp-finalproject/assets/61958118/113e297a-240f-4d20-be59-5419415c9918)

### Search user modal
![Ekran görüntüsü 2023-06-19 094220 (2)](https://github.com/kyraymege/mern-chatapp-finalproject/assets/61958118/9164ebfb-16c6-49df-b041-89956f4b8b72)

### User chat message container section
![Ekran görüntüsü 2023-06-19 094603](https://github.com/kyraymege/mern-chatapp-finalproject/assets/61958118/f5fef6e1-7acf-4e13-a715-0d9274fbd0d9)

### Image show modal
![Ekran görüntüsü 2023-06-19 094220 (1)](https://github.com/kyraymege/mern-chatapp-finalproject/assets/61958118/20ad8602-e518-4c46-af53-2ac6e8eb5316)

### Send image section
![Ekran görüntüsü 2023-06-19 094848](https://github.com/kyraymege/mern-chatapp-finalproject/assets/61958118/2cab7476-3f2a-4d5f-a35a-1702a31bb472)

### Left bar search chat section
![Ekran görüntüsü 2023-06-19 094752](https://github.com/kyraymege/mern-chatapp-finalproject/assets/61958118/01b7faf4-0bb9-434c-9958-cb451b3a2809)

### First predict word section
![Ekran görüntüsü 2023-06-19 095330](https://github.com/kyraymege/mern-chatapp-finalproject/assets/61958118/8167914d-4b53-469e-8229-7b1b719ff7d4)

### Second predict word section
![Ekran görüntüsü 2023-06-19 095353](https://github.com/kyraymege/mern-chatapp-finalproject/assets/61958118/cbaffe3c-db67-48fe-8441-f12d6db089bf)





