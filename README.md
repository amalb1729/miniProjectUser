# Student Store - User UI

This is the user-facing storefront for the Student Store application. It allows students to browse products, add items to their cart, and place orders.

## Features

*   User registration and login.
*   Browse and search for products.
*   View detailed product information.
*   Shopping cart functionality (add, remove, update quantity).
*   Checkout process to place an order.
*   View personal order history.

## Technology Stack

*   **Framework**: React
*   **Routing**: React Router
*   **State Management**: Context API or Redux (can be specified)
*   **API Communication**: Axios

## Prerequisites

*   [Node.js](https://nodejs.org/) (v16 or later)
*   [npm](https://www.npmjs.com/)

## Getting Started

1.  **Navigate to the directory**
    From the root of the `studentStore` project, `cd user-ui`.

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in this directory and add the URL for the backend API.
    ```
    REACT_APP_API_URL=http://localhost:5000/api
    ```

4.  **Run the Development Server**
    ```bash
    npm start
    ```
    The application will be running at `http://localhost:3000`.

