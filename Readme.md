# Getting Started with This Express App

## Related to frontend
- Url: [Backend Repo](http://localhost:3000)

## Running the Express App
- ### Production Mode (Docker)
    - Create Docker image `docker build -t backend:latest .`
    - Run Docker image `docker run -p 2000:2000 -d backend:latest`

- ### Development mode
    - #### `npm start`
        Runs the app in the production mode.\
        Open [http://localhost:2000](http://localhost:2000) to view it in the browser.

    - #### `npm run dev`
        Runs the app in the development mode.\
        Open [http://localhost:2000](http://localhost:2000) to view it in the browser.