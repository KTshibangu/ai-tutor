from fastapi import FastAPI

app = FastAPI()

@app.get("/")

def health_check():
    return {"status": "ai-tutor is running!"}



# def main():
#     print("Hello from ai-tutor!")


# if __name__ == "__main__":
#     main()
