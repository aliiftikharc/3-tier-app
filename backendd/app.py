from flask import Flask, request
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, APICall
from fetcher import start_background_fetching

app = Flask(__name__)
CORS(app)

# SQLite DB setup
engine = create_engine("sqlite:///data.db")
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

@app.route("/start-fetching", methods=["POST"])
def start_fetching():
    content = request.json
    endpoint = content.get("endpoint")
    frequency = int(content.get("frequency"))

    start_background_fetching(endpoint, frequency, Session)
    return {"message": "Fetching started"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)