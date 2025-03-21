# **Product Recommendation API**  

This project is an API built with FastAPI for product recommendation based on users' purchase history and preferences, such as categories and tags.  

## **Features**  

- **User creation**: Register new users.  
- **Product registration**: Register products with name, category, and tags.  
- **Purchase history**: Add products to a user's purchase history.  
- **Product recommendations**: Recommend products based on the user's purchase history and preferences.  

## **Technologies Used**  

- **Python 3.9+**  
- **FastAPI**  
- **Pydantic**  
- **Uvicorn** (to run the server)  
- **Pytest** (for automated testing)  

## **Installation and Setup**  

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/uranolais/boas-praticas-python-curso01.git
   cd recomendacao-produtos
   ```

2. **Create a virtual environment:**  
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**  
   - On Windows:  
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:  
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**  
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the server:**  
   ```bash
   uvicorn app.main:app --reload
   ```

6. **Access the interactive API documentation:**  
   Open your browser and go to `http://127.0.0.1:8000/docs` to view and test the API routes.  

