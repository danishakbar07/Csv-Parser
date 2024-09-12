CSV Image Processer

This project is an image processing system that accepts a CSV file containing product names and image URLs. The system validates the CSV, downloads the images, compresses them, and returns the output image URLs. It provides APIs for uploading the CSV, checking the status of processing, and storing the results.

Features

Upload CSV file with product names and image URLs.

Asynchronous image processing to compress images by 50% using the sharp library.

Unique request ID generation using uuid.

Parsing CSV files using csv-parser.

Downloading images using the got library.

Environment variables stored securely using .env.

Tech Stack

Node.js: Backend runtime environment.

Express.js: Web framework for building APIs.

UUID: To generate unique request IDs for tracking.

csv-parser: To parse CSV files.

got: To download images from the provided URLs.

sharp: For image compression.

dotenv: To manage environment variables.

Development

Running Locally

Install dependencies: npm install

Start the server: npm start

The server should now be running at http://localhost:3000.

You have to create two folders. uploads and compressed. Uploads folder is where csv file get uploaded using multer and compressed folder is where compressed image will get stored. I have set compressed file to serve as static using express.static
