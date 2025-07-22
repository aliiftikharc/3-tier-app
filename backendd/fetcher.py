import threading
import time
import requests
from models import APICall

def start_background_fetching(endpoint, frequency, session_factory):
    def fetch_loop():
        interval = 3600 // frequency  # Time between each call (in seconds)
        for _ in range(frequency):
            try:
                response = requests.get(endpoint)
                session = session_factory()
                session.add(APICall(data=response.text))
                session.commit()
                session.close()
                print("✅ Data fetched and saved")
            except Exception as e:
                print("❌ Error fetching:", e)
            time.sleep(interval)

    thread = threading.Thread(target=fetch_loop)
    thread.start()